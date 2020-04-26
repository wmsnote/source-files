## jvm

| 参数 | 含义 |
| ------------- | ------------- |
| -XX:MetaspaceSize=128m |（元空间默认大小）|
| -XX:MaxMetaspaceSize=128m |（元空间最大大小）|
| -Xms1024m |（堆最大大小）|
| -Xmx1024m |（堆默认大小）|
| -Xmn256m |（新生代大小）|
| -Xss256k |（棧最大深度大小）|
| -XX:SurvivorRatio=8 |（新生代分区比例 8 : 2 ）|
| -XX:+UseConcMarkSweepGC |（指定使用的垃圾收集器，这里使用CMS收集器）|
| -XX:+PrintGCDetails |（打印详细的GC日志）|




```bash
$ java -jar \
-XX:MetaspaceSize=128m \
-XX:MaxMetaspaceSize=128m \
-Xms1024m \
-Xmx1024m \
-Xmn512m \
-Xss256k \
-XX:SurvivorRatio=8 \
-XX:ParallelGCThreads=2 \
-XX:+UseConcMarkSweepGC \
-XX:+PrintGCDetails \
-XX:+PrintTenuringDistribution \
-XX:+PrintGCTimeStamps \
-XX:+HeapDumpOnOutOfMemoryError \
-XX:HeapDumpPath=/ \
-Xloggc:/gc.log \
-XX:+UseGCLogFileRotation \
-XX:NumberOfGCLogFiles=5 \
-XX:GCLogFileSize=10M \
newframe-1.0.0.jar
```

-----

**下面是公司实战的一个配置**



```Dockerfile
FROM registry.cn-hangzhou.aliyuncs.com/ci-base/jre-alpine:latest
EXPOSE 8887
WORKDIR /app
COPY ./target/bigbay-h5-payment-0.0.1-SNAPSHOT.jar /app/bigbay-h5-payment.jar
ENV JAVA_OPTS="\
-Xmx1g \
-Xms1g \
-Xmn512m \
-XX:SurvivorRatio=8 \
-XX:MetaspaceSize=64m \
-XX:MaxMetaspaceSize=128m \
-XX:ParallelGCThreads=2 \
-XX:+UseConcMarkSweepGC \
-XX:+PrintGCDetails \
-XX:+PrintTenuringDistribution \
-XX:+PrintGCTimeStamps \
-XX:+HeapDumpOnOutOfMemoryError \
-XX:HeapDumpPath=/ \
-Xloggc:/gc.log \
-XX:+UseGCLogFileRotation \
-XX:NumberOfGCLogFiles=5 \
-XX:GCLogFileSize=10M"

ENTRYPOINT ["sh","-c","java -jar -server ${JAVA_OPTS} -Dfile.encoding=UTF-8 bigbay-h5-payment.jar"]
```








