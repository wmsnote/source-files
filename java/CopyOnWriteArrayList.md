CopyOnWriteArrayList 虽然是一个线程安全的 ArrayList

但因为其实现方式是，每次修改数据时都会复制一份数据出来，所以有明显的适用场景，即**读多写少或者说希望无锁读的场景。**

> 如果读写比例均衡或者有大量写操作的话，使用 CopyOnWriteArrayList 的性能会非常糟糕。

我们写一段测试代码，来比较下使用 CopyOnWriteArrayList 和普通加锁方式 ArrayList 的读写性能吧。

在这段代码中我们针对并发读和并发写分别写了一个测试方法，测试两者一定次数的写或读操作的耗时。

```java


//测试并发写的性能
@GetMapping("write")
public Map testWrite() {
    List<Integer> copyOnWriteArrayList = new CopyOnWriteArrayList<>();
    List<Integer> synchronizedList = Collections.synchronizedList(new ArrayList<>());
    StopWatch stopWatch = new StopWatch();
    int loopCount = 100000;
    stopWatch.start("Write:copyOnWriteArrayList");
    //循环100000次并发往CopyOnWriteArrayList写入随机元素
    IntStream.rangeClosed(1, loopCount).parallel().forEach(
        __ -> copyOnWriteArrayList.add(ThreadLocalRandom.current().nextInt(loopCount)));
    stopWatch.stop();
    stopWatch.start("Write:synchronizedList");
    //循环100000次并发往加锁的ArrayList写入随机元素
    IntStream.rangeClosed(1, loopCount).parallel().forEach(
        __ -> synchronizedList.add(ThreadLocalRandom.current().nextInt(loopCount)));
    stopWatch.stop();
    log.info(stopWatch.prettyPrint());
    Map result = new HashMap();
    result.put("copyOnWriteArrayList", copyOnWriteArrayList.size());
    result.put("synchronizedList", synchronizedList.size());
    return result;
}

//帮助方法用来填充List
private void addAll(List<Integer> list) {
    list.addAll(IntStream.rangeClosed(1, 1000000).boxed().collect(Collectors.toList()));
}

//测试并发读的性能
@GetMapping("read")
public Map testRead() {
    //创建两个测试对象
    List<Integer> copyOnWriteArrayList = new CopyOnWriteArrayList<>();
    List<Integer> synchronizedList = Collections.synchronizedList(new ArrayList<>());
    //填充数据
    addAll(copyOnWriteArrayList);
    addAll(synchronizedList);
    StopWatch stopWatch = new StopWatch();
    int loopCount = 1000000;
    int count = copyOnWriteArrayList.size();
    stopWatch.start("Read:copyOnWriteArrayList");
    //循环1000000次并发从CopyOnWriteArrayList随机查询元素
    IntStream.rangeClosed(1, loopCount).parallel().forEach(__ -> copyOnWriteArrayList.get(ThreadLocalRandom.current().nextInt(count)));
    stopWatch.stop();
    stopWatch.start("Read:synchronizedList");
    //循环1000000次并发从加锁的ArrayList随机查询元素
    IntStream.range(0, loopCount).parallel().forEach(__ -> synchronizedList.get(ThreadLocalRandom.current().nextInt(count)));
    stopWatch.stop();
    log.info(stopWatch.prettyPrint());
    Map result = new HashMap();
    result.put("copyOnWriteArrayList", copyOnWriteArrayList.size());
    result.put("synchronizedList", synchronizedList.size());
    return result;
}
```

1. ThreadLocalRandom: 一个线程获得的随机数不受另一个线程的影响,随机数生成是一个非常常见的操作，而且 Java 也提供了 java.util.Random 类用于生成随机数，而且呢，这个类也是线程安全的，就是有一点不好，在多线程下，它的性能不佳(它采用了多个线程共享一个 Random 实例。这样就会导致多个线程争用)
2. lambda中,`__` 作参数占位符, 可以忽略参数(因为我们用不到或者不需要的参数, 没有必要定义了, 定义的太多混乱)
3. `Collections.synchronizedList(new ArrayList<>())` 返回原则操作线程安全的list. 但是注意一点的是，所谓的线程安全仅仅指的是直接使用它提供的函数，如list.add(),list.get(i); 也就是说仅仅是原子操作的时候才是线程安全的。 适合不需要使用Iterator、对性能要求也不高的情况, 如果需要使用Iterator, 外面还要家一层锁(equals,hasCode,get,set,add,remove,indexOf,lastIndexOf,addAll,replaceAll,sort都添加了锁)

    ```java
    List list = Collections.synchronizedList(new ArrayList());
          ...
      synchronized (list) {
          Iterator i = list.iterator(); // Must be in synchronized block
          while (i.hasNext())
              foo(i.next());
      }
    ```

4. stream 中 boxed() 方法是装箱操作,相当于把 IntStream -> IntegerStream
5. `IntStream.rangeClosed(1, 5).forEach(IntConsumer)` 从1开始循环到5(包括5),可以代替`for(int i = 1; i <= 5; i++)`
6. parallel() -> ParallelStream,底层使用的是ForkJoinPool线程池,如果不指定(自定义),使用系统默认的ForkJoinPool(线程数=cpu核数)

CopyOnWriteArrayList 和 CopyOnWriteArraySet 这两个 Copy-on-Write 容器，它们背后的设计思想就是 Copy-on-Write；通过 Copy-on-Write 这两个容器实现的读操作是无锁的，由于无锁，所以将读操作的性能发挥到了极致。


CopyOnWriteArrayList 和 CopyOnWriteArraySet 这两个 Copy-on-Write 容器在修改的时候会复制整个数组，所以如果容器经常被修改或者这个数组本身就非常大的时候，是不建议使用的。反之，如果是修改非常少、数组数量也不大，并且对读性能要求苛刻的场景，使用 Copy-on-Write 容器效果就非常好了


CopyOnWrite: 读多写少, 读性能要求很高, 弱一致性

首先我讲一下什么是Copy-On-Write，顾名思义，在计算机中就是当你想要对一块内存进行修改时，我们不在原有内存块中进行写操作，而是将内存拷贝一份，在新的内存中进行写操作，写完之后呢，就将指向原来内存指针指向新的内存，原来的内存就可以被回收掉嘛！

如果多线程同时操作一个list?
1. 因为多线程环境中，你在迭代的时候是不允许有其他线程对这个集合list进行添加元素的，看下面这段代码，你会发现抛出java.util.ConcurrentModificationException的异常。这里的迭代表示我当前正在读取某种集合中的数据,属于读操作.线程则模拟当前程序处于多线程环境中，有其他线程正在修改该数据
2. 多线程会对迭代集合产生影响，影响读操作

那么你可能会问？就算是对原集合进行复制，在多线程环境中不也是一样会导致写入冲突吗？没错，但是你可能还不知道CopyOnWriteArrayList中增加删除元素的实现细节，下面我就说说网上老是提到的add()方法

add() 方法源码
```java
/**
     * Appends the specified element to the end of this list.
     *
     * @param e element to be appended to this list
     * @return {@code true} (as specified by {@link Collection#add})
     */
    public boolean add(E e) {
        final ReentrantLock lock = this.lock;//重入锁
        lock.lock();//加锁啦
        try {
            Object[] elements = getArray();
            int len = elements.length;
            Object[] newElements = Arrays.copyOf(elements, len + 1);//拷贝新数组
            newElements[len] = e;
            setArray(newElements);//将引用指向新数组  1
            return true;
        } finally {
            lock.unlock();//解锁啦
        }
    }

```
恍然大悟，小样，原来add()在添加集合的时候加上了锁，保证了同步，避免了多线程写的时候会Copy出N个副本出来


##　CopyOnWriteArrayList优缺点

缺点：

1. 耗内存（集合复制）
2. 实时性不高

优点：

1. 数据一致性完整，为什么？因为加锁了，并发数据不会乱
2. 解决了像ArrayList、Vector这种集合多线程遍历迭代问题，记住，Vector虽然线程安全，只不过是加了synchronized关键字，迭代问题完全没有解决！

## CopyOnWriteArrayList使用场景

1. 读多写少（白名单，黑名单，商品类目的访问和更新场景），为什么？因为写的时候会复制新集合
2. 集合不大，为什么？因为写的时候会复制新集合

实时性要求不高，为什么，因为有可能会读取到旧的集合数据































