# JAVA8新特性分析

## 1.函数式接口

### 概念

> 接口可以有默认方法和静态方法,也就是说接口中可以有实现方法
>
> 以前的版本定义接口是不能有实现机制的，现在这样用了一个default关键字后，就可以实现，然后子类可以重写，也可以直接使用了。好处多多，感觉有点抽象类了...越来越灵活了。加入静态方法后，你以后的工具类就可以参考接口来设计啦.这是一个优点啦.



- 任何接口，如果只包含唯一 一个抽象方法，那么它就是一个函数式接口
- @FunctionalInterface
- 可以有static静态方法
- 可以有default方法

### 代码

```java
@FunctionalInterface
public interface FunctionInterfaceDemo {
	
	String sayHello(String name);

}
```

### 特性

- #### 1.函数式接口内部允许定义静态方法

```java
@FunctionalInterface
public interface FunctionInterfaceDemo {

	String sayHello(String name);

	static String doSomething() {
		return "helloWorld";
	}

}
```

调用函数式接口静态方法

```java
public class APPDemo {
	
	public static void main(String[] args) {
		System.out.println(FunctionInterfaceDemo.doSomething());
	}

}
```

- #### 2.允许定义java.lang.Object里的public方法

```java
@FunctionalInterface
public interface FunctionInterfaceDemo {

	String sayHello(String name);
//内部允许定义静态方法
	static String doSomething() {
		return "helloWorld";
	}

//	允许定义java.lang.Object里的public方法
	boolean equals(Object object);
}
```

- 3.父接口是函数式接口子接口也有可能是函数式接口

## 2.lambda表达式

每一个lambda表达式都对应一个类型，通常是接口类型。而“函数式接口”是指仅仅只包含一个抽象方法的接口，每一个该类型的lambda表达式都会被匹配到这个抽象方法.因为默认方法不算抽象方法，所以你也可以给你的函数式接口添加默认方法。

> **一定要和函数式接口组合使用**
>
> **其实质就是一个匿名内部类,对函数式接口的一个实现**
>
> **说白了就是函数式接口匿名内部类的实现**



### lambda表达式自我实现语法

(parameters,param2)->{method body}

1. 第一部分():一个括号内用逗号分隔形式参数,这个参数就是函数式接口内定义的参数
2. 第二部分->:固定写法
3. 第三部分:方法体或者是表达式

> - (parameter...)->{方法体}

>- 如果参数只有一个,()可以省略

>- 对于函数体只有一行代码的，你可以去掉大括号{}以及return关键字

>- Java编译器可以自动推导出参数类型，所以你可以不用再写一次类型,类型自动匹配

>- Java 8 允许你使用 :: 关键字来传递方法或者构造函数引用



Lambda允许把函数作为一个方法的参数（函数作为参数传递进方法中），或者把代码看成数据



```java
@FunctionalInterface
public interface FunctionInterfaceDemo {
	
	String sayHello(String name);

}

public class LambdaDemo {

	
	public static void main(String[] args) {
      //匿名内部类
		FunctionInterfaceDemo demo=(name)->{
			return name;
		};
      //表达式的写法
      FunctionInterfaceDemo demo=(name)->name;
      
		System.out.println(demo.sayHello("hello"));
	}
}
```

### lambda表达式方法的引用

- 第一种方法引用是构造器引用，它的语法是Class::new，或者更一般的Class< T >::new。请注意构造器没有参数。

```java
FunctionInterfaceDemo demo=String::new;
```

- 第二种方法引用是静态方法引用，它的语法是Class::static_method。请注意这个方法接受一个Car类型的参数

```java
FunctionInterfaceDemo demo=String::valueOf;
```

- 第三种方法引用是特定类的任意对象的方法引用，它的语法是Class::method

> 隐式lambda表达式,较其他三种比较特殊,要求被引用方法的调用者是抽象方法的第一个参数
>
> 被引用方法的参数是抽象方法除第一个参数外的其他参数

```java
@FunctionalInterface
public interface FunctionInterfaceDemo {
	
	String sayHello(ConverterStr str2);

}

public class ConverterStr {
	
	public String converter() {
		
		return "hello";
	}

}

public  void demo3() {

		FunctionInterfaceDemo demo=ConverterStr::converter;
		
}
```

类似的例子还有

```java
Arrays.sort(stringArray, String::compareToIgnoreCase);
```

- 第四种方法引用是特定对象的方法引用，它的语法是instance::method。请注意，这个方法接受一个Car类型的参数

```java
public class ConverterStr {
	
	public String converter(String str) {
		return str+"hello";
	}
}

public void demo3() {
		//创建一个对象
		ConverterStr converterStr = new ConverterStr();
		//对象的方法引用
		FunctionInterfaceDemo demo=converterStr::converter;	
}
```


## 3.集合的流式操作

## 4.注解的更新

## 5.安全性增强

## 6.IO/NIO改进

## 7.接口的增强

1. 可以允许static声明的实现方法
2. default方法