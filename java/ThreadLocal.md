

定义: 提供线程局部变量;一个线程局部变量在多个线程中,分别有独立的值(副本)

特点: 简单.快速.安全

场景: 多线程场景

1. 资源持有
2. 线程一致性
3. 并发计算
4. 线程安全等场景


## api

构造函数 `ThreadLocal<T>()`
初始化 `initialValue()`
访问器 `get/set`
回收 `remove`

## 基本使用

```java
// 创建对象 一般我们都用static修饰
public static ThreadLocal<Long> tl = new ThreadLocal<>();
// 我们也可以在创建对象的时候, 初始化值

public static ThreadLocal<Long> tl = new ThreadLocal<Long>(){

        //延迟加载...只有在没有调过set方法,且get的时候, 才会执行方法
        @Override
        protected Long initialValue() {
            return 100L;
        }

    };

    public static void main(String[] args) {

        System.out.println(tl.get());
    }

```

## 每个线程都有一个自己的ThreadLocal变量

![](https://images.gitee.com/uploads/images/2020/0406/122058_2d40fb43_1034180.png)


## remove 非常重要

```java
public static ThreadLocal<Long> tl = new ThreadLocal<Long>(){

        //延迟加载...只有在没有调过set方法,且get的时候, 才会执行方法
        @Override
        protected Long initialValue() {
            System.out.println("initialValue");
            return 100L;
        }

    };

    public static void main(String[] args) {

        tl.set(200L);
        System.out.println(tl.get());
        tl.remove();// remove() 方法非常重要, 防止内存泄露, 用完之后一定要remove()
        System.out.println(tl.get()); // remove 之后在此get的时候, 会再次执行 initialValue() 方法
    }
```



1. 如果不去remove, 容易内存泄露
2. 如果不去remove, 容易并发安全?

但我们要意识到，程序运行在 Tomcat 中，执行程序的线程是 Tomcat 的工作线程，而 Tomcat 的工作线程是基于线程池的。

顾名思义，线程池会重用固定的几个线程，一旦线程重用，那么很可能首次从 ThreadLocal 获取的值是之前其他用户的请求遗留的值。这时，ThreadLocal 中的用户信息就是其他用户的信息。



```java

@GetMapping("right")
public Map right(@RequestParam("userId") Integer userId) {
    String before  = Thread.currentThread().getName() + ":" + currentUser.get();
    currentUser.set(userId);
    try {
        String after = Thread.currentThread().getName() + ":" + currentUser.get();
        Map result = new HashMap();
        result.put("before", before);
        result.put("after", after);
        return result;
    } finally {
        //在finally代码块中删除ThreadLocal中的数据，确保数据不串
        currentUser.remove();
    }
}
```


我们可能会抱怨学多线程没用，因为代码里没有开启使用多线程。但其实，可能只是我们没有意识到，在 Tomcat 这种 Web 服务器下跑的业务代码，本来就运行在一个多线程环境（否则接口也不可能支持这么高的并发），并不能认为没有显式开启多线程就不会有线程安全问题。

因为线程的创建比较昂贵，所以 Web 服务器往往会使用线程池来处理请求，这就意味着线程会被重用。这时，使用类似 ThreadLocal 工具来存放一些数据时，需要特别注意在代码运行完后，显式地去清空设置的数据。如果在代码中使用了自定义的线程池，也同样会遇到这个问题。







