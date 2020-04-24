## Optional类深度解析

> http://www.importnew.com/6675.html

身为一名Java程序员，大家可能都有这样的经历：调用一个方法得到了返回值却不能直接将返回值作为参数去调用别的方法。我们首先要判断这个返回值是否为null，只有在非空的前提下才能将其作为其他方法的参数。

新版本的Java，比如[Java 8](http://blog.sanaulla.info/tag/java-8/)引入了一个新的[Optional](http://download.java.net/jdk8/docs/api/java/util/Optional.html)类。Optional类的Javadoc描述如下：

这是一个可以为null的容器对象。如果值存在则isPresent()方法会返回true，调用get()方法会返回该对象。


## 创建optional对象

**of**

> 为非null的值创建一个Optional

of方法通过工厂方法创建Optional类。需要注意的是，创建对象时传入的参数不能为null。如果传入参数为null，则抛出NullPointerException

```java
//调用工厂方法创建Optional实例
Optional<String> name = Optional.of("Sanaulla");
//传入参数为null，抛出NullPointerException.
Optional<String> someNull = Optional.of(null);
```

**ofNullable**

> 为指定的值创建一个Optional，如果指定的值为null，则返回一个空的Optional

ofNullable与of方法相似，唯一的区别是可以接受参数为null的情况

```java
//下面创建了一个不包含任何值的Optional实例
//例如，值为'null'
Optional empty = Optional.ofNullable(null);
```



## 判断是否有值

**isPresent**

> 如果值存在返回true，否则返回false。

```java
//isPresent方法用来检查Optional实例中是否包含值
if (name.isPresent()) {
  //在Optional实例内调用get()返回已存在的值
  System.out.println(name.get());//输出Sanaulla
}
```



## 取值

**get**

> 如果Optional有值则将其返回，否则抛出NoSuchElementException

```java
//执行下面的代码会输出：No value present
try {
  //在空的Optional实例上调用get()，抛出NoSuchElementException
  System.out.println(empty.get());
} catch (NoSuchElementException ex) {
  System.out.println(ex.getMessage());
}
```

**orElse**

> 如果有值则将其返回，否则返回指定的其它值。

如果Optional实例有值则将其返回，否则返回orElse方法传入的参数

```java
//如果值不为null，orElse方法返回Optional实例的值。
//如果为null，返回传入的消息。
//输出：There is no value present!
System.out.println(empty.orElse("There is no value present!"));
//输出：Sanaulla
System.out.println(name.orElse("There is some value!"));
```

**orElseGet**

> orElseGet与orElse方法类似，区别在于得到的默认值。orElse方法将传入的字符串作为默认值，orElseGet方法可以接受[Supplier接口](http://blog.sanaulla.info/2013/04/02/supplier-interface-in-java-util-function-package-in-java-8/)的实现用来生成默认值

```java
//orElseGet与orElse方法类似，区别在于orElse传入的是默认值，
//orElseGet可以接受一个lambda表达式生成默认值。
//输出：Default Value
System.out.println(empty.orElseGet(() -> "Default Value"));
//输出：Sanaulla
System.out.println(name.orElseGet(() -> "Default Value"));
```

**orElseThrow**

> 如果有值则将其返回，否则抛出supplier接口创建的异常

```java
try {
  //orElseThrow与orElse方法类似。与返回默认值不同，
  //orElseThrow会抛出lambda表达式或方法生成的异常

  empty.orElseThrow(ValueAbsentException::new);
} catch (Throwable ex) {
  //输出: No value present in the Optional instance
  System.out.println(ex.getMessage());
}
```



## 消费

**fPresent**

> 如果Optional实例有值则为其调用consumer，否则不做处理

```java
//ifPresent方法接受lambda表达式作为参数。
//lambda表达式对Optional的值调用consumer进行处理。
name.ifPresent((value) -> {
  System.out.println("The length of the value is: " + value.length());
});
```

## 对值进行转换并返回

**map**

> 如果有值，则对其执行调用mapping函数得到返回值。如果返回值不为null，则创建包含mapping返回值的Optional作为map方法返回值，否则返回空Optional

```java
//map方法执行传入的lambda表达式参数对Optional实例的值进行修改。
//为lambda表达式的返回值创建新的Optional实例作为map方法的返回值。
Optional<String> upperName = name.map((value) -> value.toUpperCase());
System.out.println(upperName.orElse("No value found"));
```



**flatMap**

> 如果有值，为其执行mapping函数返回Optional类型返回值，否则返回空Optional。flatMap与map（Funtion）方法类似，区别在于flatMap中的mapper返回值必须是Optional。调用结束时，flatMap不会对结果用Optional封装。

flatMap方法与map方法类似，区别在于mapping函数的返回值不同。map方法的mapping函数返回值可以是任何类型T，而flatMap方法的mapping函数必须是Optional

```java
//flatMap与map（Function）非常类似，区别在于传入方法的lambda表达式的返回类型。
//map方法中的lambda表达式返回值可以是任意类型，在map函数返回之前会包装为Optional。
//但flatMap方法中的lambda表达式返回值必须是Optionl实例。
upperName = name.flatMap((value) -> Optional.of(value.toUpperCase()));
System.out.println(upperName.orElse("No value found"));//输出SANAULLA
```



## 对值进行过滤

**filter**

> 如果有值并且满足断言条件返回包含该值的Optional，否则返回空Optional

```java
//filter方法检查给定的Option值是否满足某些条件。
//如果满足则返回同一个Option实例，否则返回空Optional。
Optional<String> longName = name.filter((value) -> value.length() > 6);
System.out.println(longName.orElse("The name is less than 6 characters"));//输出Sanaulla

//另一个例子是Optional值不满足filter指定的条件。
Optional<String> anotherName = Optional.of("Sana");
Optional<String> shortName = anotherName.filter((value) -> value.length() > 6);
//输出：name长度不足6字符
System.out.println(shortName.orElse("The name is less than 6 characters"));
```




## 使用 Java 8 Optional 的正确姿势

> http://blog.csdn.net/wisgood/article/details/52503052



我们知道 [Java ](http://lib.csdn.net/base/java)8 增加了一些很有用的 API, 其中一个就是 Optional. 如果对它不稍假探索, 只是轻描淡写的认为它可以优雅的解决 NullPointException 的问题, 于是代码就开始这么写了

```java
Optional<User> user = ......
if (user.isPresent()) {
    return user.getOrders();
} else {
    return Collections.emptyList();
}
```

那么不得不说我们的思维仍然是在原地踏步, 只是本能的认为它不过是 User 实例的包装, 这与我们之前写成

```java
User user = .....
if (user != null) {
    return user.getOrders();
} else {
    return Collections.emptyList();
}
```

实质上是没有任何分别. 这就是我们将要讲到的使用好 [java ](http://lib.csdn.net/base/java)8 Optional 类型的正确姿势.

在里约奥运之时, 新闻一再提起五星红旗有问题, 可是我怎么看都看不出来有什么问题, 后来才道是小星星膜拜中央的姿势不对. 因此我们千万也别对自己习以为常的事情觉得理所当然, 丝毫不会觉得有何不妥, 换句话说也就是当我们切换到 [Java](http://lib.csdn.net/base/java) 8 的 Optional 时, 不能继承性的对待过往 null 时的那种思维, 应该掌握好新的, 正确的使用 Java 8 Optional 的正确姿势.

直白的讲, 当我们还在以如下几种方式使用 Optional 时, 就得开始检视自己了

1. 调用 `isPresent()` 方法时
2. 调用 `get()` 方法时
3. Optional 类型作为类/实例属性时
4. Optional 类型作为方法参数时

> 使用任何像 Optional 的类型作为字段或方法参数都是不可取的. Optional 只设计为类库方法的, 可明确表示可能无值情况下的返回类型. Optional 类型不可被序列化, 用作字段类型会出问题的

所以 Optional 中我们真正可依赖的应该是除了 `isPresent()` 和 `get()` 的其他方法:

1. public<U> Optional<U> map(Function<? super T, ? extends U> mapper)
2. public T orElse(T other)
3. public T orElseGet(Supplier<? extends T> other)
4. public void ifPresent(Consumer<? super T> consumer)
5. public Optional<T> filter(Predicate<? super T> predicate)
6. public<U> Optional<U> flatMap(Function<? super T, Optional<U>> mapper)
7. public <X extends Throwable> T orElseThrow(Supplier<? extends X> exceptionSupplier) throws X

我略有自信的按照它们大概使用频度对上面的方法排了一下序.

## optional实例的创建

先又不得不提一下 Optional 的三种构造方式:

```java
//obj不可以为null
Optional.of(obj)
//obj可以为null
Optional.ofNullable(obj)
//创建null值的optional实例对象
Optional.empty()
```



- `Optional.of(obj)`: 它要求传入的 obj 不能是 null 值的, 否则还没开始进入角色就倒在了 `NullPointerException` 异常上了.
- `Optional.ofNullable(obj)`: 它以一种[智能](http://lib.csdn.net/base/aiplanning)的, 宽容的方式来构造一个 Optional 实例. 来者不拒, 传 null 进到就得到 `Optional.empty()`, 非 null 就调用 `Optional.of(obj)`.

那是不是我们只要用 `Optional.ofNullable(obj)` 一劳永逸, 以不变应二变的方式来构造 Optional 实例就行了呢? 那也未必, 否则 `Optional.of(obj)` 何必如此暴露呢, 私有则可?

我本人的观点是:

1. 当我们非常非常的明确将要传给 `Optional.of(obj)` 的 `obj` 参数不可能为 null 时, 比如它是一个刚 `new` 出来的对象(`Optional.of(new User(...))`), 或者是一个非 null 常量时;


2. 当想为 `obj` 断言不为 null 时, 即我们想在万一 `obj` 为 null 立即报告 `NullPointException` 异常, 立即修改, 而不是隐藏空指针异常时, 我们就应该果断的用 `Optional.of(obj)` 来构造 Optional 实例, 而不让任何不可预计的 null 值有可乘之机隐身于 Optional 中.

现在才开始怎么去使用一个已有的 Optional 实例, 假定我们有一个实例 `Optional<User> user`, 下面是几个普遍的, 应避免 `if(user.isPresent()) { ... } else { ... }` 几中应用方式.

## optional实例的使用

存在即返回, 无则提供默认值

```java
return user.orElse(null);  //而不是 return user.isPresent() ? user.get() : null;
return user.orElse(UNKNOWN_USER);
```

存在即返回, 无则由函数来产生

```java
return user.orElseGet(() -> fetchAUserFromDatabase()); //而不要 return user.isPresent() ? user: fetchAUserFromDatabase();
```

存在才对它做点什么(消费)

```java
user.ifPresent(System.out::println);

//而不要下边那样
if (user.isPresent()) {
  System.out.println(user.get());
}
```

map 函数隆重登场

```java
//当 user.isPresent() 为真, 获得它关联的 orders, 为假则返回一个空集合时
return user.map(u -> u.getOrders())
        .orElse(Collections.emptyList())
```













