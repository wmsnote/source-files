## 从 LongAdder 中窥见并发组件的设计思路

最近在看阿里的 Sentinel 的源码的时候。发现使用了一个类 LongAdder 来在并发环境中计数。这个时候就提出了疑问，JDK 中已经有 AtomicLong 了，为啥还要使用 LongAdder ？ AtomicLong 已经是基于 CAS 的无锁结构，已经有很好的并发表现了，为啥还要用 LongAdder ？于是赶快找来源码一探究竟。


## AtomicLong 的缺陷

大家可以阅读我之前写的 JAVA 中的 CAS 详细了解 AtomicLong 的实现原理。需要注意的一点是，AtomicLong 的 Add() 是依赖自旋不断的 CAS 去累加一个 Long 值。如果在竞争激烈的情况下，CAS 操作不断的失败，就会有大量的线程不断的自旋尝试 CAS 会造成 CPU 的极大的消耗。

## LongAdder 解决方案

通过阅读 LongAdder 的 Javadoc 我们了解到：

> This class is usually preferable to {@link AtomicLong} when multiple threads update a common sum that is used for purposes such as collecting statistics, not for fine-grained synchronization control. Under low update contention, the two classes have similar characteristics. But under high contention, expected throughput of this class is significantly higher, at the expense of higher space consumption.

大概意思就是，LongAdder 功能类似 AtomicLong ，在低并发情况下二者表现差不多，在高并发情况下 LongAdder 的表现就会好很多。

LongAdder 到底用了什么黑科技能做到高性比 AtomicLong 还要好呢呢？对于同样的一个 add() 操作，上文说到 AtomicLong 只对一个 Long 值进行 CAS 操作。
而 LongAdder 是针对 Cell 数组的某个 Cell 进行 CAS 操作 ，把线程的名字的 hash 值，作为 Cell 数组的下标，然后对 Cell[i] 的 long 进行 CAS 操作。
简单粗暴的分散了高并发下的竞争压力。

## LongAdder VS AtomicLong

看上去 LongAdder 性能全面超越了 AtomicLong。为什么 jdk 1.8 中还是保留了 AtomicLong 的实现呢？

其实我们可以发现，LongAdder 使用了一个 cell 列表去承接并发的 cas，以提升性能，但是 LongAdder 在统计的时候如果有并发更新，可能导致统计的数据有误差。

如果用于自增 id 的生成，就不适合使用 LongAdder 了。这个时候使用 AtomicLong 就是一个明智的选择。

而在 Sentinel 中 LongAdder 承担的只是统计任务，且允许误差。

## 总结

LongAdder 使用了一个比较简单的原理，解决了 AtomicLong 类，在极高竞争下的性能问题。但是 LongAdder 的具体实现却非常精巧和细致，分散竞争，逐步升级竞争的解决方案，相当漂亮，值得我们细细品味。


在实际工作中，可根据LongAdder和AtomicLong的特点来使用这两个工具。
当需要在高并发下有较好的性能表现，且对值的精确度要求不高时，可以使用LongAdder（例如网站访问人数计数）。
当需要保证线程安全，可允许一些性能损耗，要求高精度时，可以使用AtomicLong。





