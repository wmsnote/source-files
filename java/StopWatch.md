有时候需要记录一段代码执行时间，常见的方法就是打印当前时间与执行完时间的差值，缺点是这样如果执行大量测试的话就很麻烦，并且不直观，如果想对执行的时间做进一步控制，则需要在程序中很多地方修改，spring-framework提供了一个StopWatch类可以做类似任务执行时间控制，也就是封装了一个对开始时间，结束时间记录操作的Java类。一下是例子：



```java

import org.springframework.util.StopWatch;

    StopWatch stopWatch = new StopWatch();
    stopWatch.start("aaa");
    Thread.sleep(1000);
    stopWatch.stop();
    stopWatch.start("bbb");
    Thread.sleep(1000);
    stopWatch.stop();
    System.out.println(stopWatch.prettyPrint());
```


```log
---------------------------------------------
ns         %     Task name
---------------------------------------------
1000255501  050%  aaa
1000314124  050%  bbb
```








