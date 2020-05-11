配置文件在源码中可以找到参考: [github](https://github.com/antirez/redis)

> 不同的版本配置项有区别,且不兼容,一定要用自己当前版本的redis的配置文件


查看redis的版本有两种方式：

1. redis-server --version 和 redis-server -v
得到的结果是：Redis server v=2.6.10 sha=00000000:0 malloc=jemalloc-3.2.0 bits=32

2. redis-cli --version 和 redis-cli -v
　得到的结果是：redis-cli 2.6.10



严格上说：通过　redis-cli 得到的结果应该是redis-cli 的版本，但是 redis-cli 和redis-server　一般都是从同一套源码编译出的。所以应该是一样的。





