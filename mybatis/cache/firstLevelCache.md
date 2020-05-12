原来一级缓存默认开启,我们一直在使用,只是我们不知道

![](https://wums.oss-cn-beijing.aliyuncs.com/mybatis/20200511144704.png)

![](https://wums.oss-cn-beijing.aliyuncs.com/mybatis/20200511145850.png)


命中原则?

两次查询是完全相同的查询且有缓存.

完全相同的查询:

1. statementId必须相同否则无法命中缓存,即使sql语句和参数完全相同
2. 查询参数全完相同(这里的查询参数是sql语句参数)
3. 分页参数必须相同(缓存的粒度是整个分页结果,不是结果中的每条)
4. 传递给sql语句的文本必须一样
5. 环境必须一样(dev/stage/prod不同环境不同的sql)

一级缓存的声明周期?

* 执行查询的时候会产生缓存
* 关闭session的时候会销毁
    - session.commit()
    - session.rollback()
    - update、insert、delete


**mybatis一级缓存的生命周期是在数据库事物生命周期之内的**












