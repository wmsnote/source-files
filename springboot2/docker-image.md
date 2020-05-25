https://spring.io/blog/2020/01/27/creating-docker-images-with-spring-boot-2-3-0-m1


```groovy
plugins {
    id 'org.springframework.boot' version '2.3.0.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
}
bootJar {
    layered()
}
```

> https://docs.spring.io/spring-boot/docs/2.3.0.RELEASE/gradle-plugin/reference/html/

```xml

<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <layout>LAYERED_JAR</layout>
            </configuration>
        </plugin>
    </plugins>
</build>
```


```dockerfile

FROM openjdk:8-jre-alpine as builder
WORKDIR application
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} application.jar
RUN java -Djarmode=layertools -jar application.jar extract


FROM openjdk:8-jre-alpine
ENV PROFILE=default
ENV TZ=Asia/Shanghai
ENV JAVA_OPTS="-Xms1g -Xmx1g"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR application
COPY --from=builder application/dependencies/ ./
COPY --from=builder application/snapshot-dependencies/ ./
COPY --from=builder application/spring-boot-loader/ ./
# COPY --from=builder application/resources/ ./
COPY --from=builder application/application/ ./
VOLUME /application/logs
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -Dspring.profiles.active=${PROFILE} -Djava.security.egd=file:/dev/./urandom -Dfile.encoding=utf-8 org.springframework.boot.loader.JarLauncher"]
CMD []
```



> 1. 构建工具maven or gradle 要添加layered标记
> 2. dockerfile 启动命令, main类是org.springframework.boot.loader.JarLauncher, 不是自己的main类
> 3. ENTRYPOINT exec 格式, `${JAVA_OPTS}` 如果分开写的话,变量不能替换,要么用shell格式(这个地方对于springboot来讲无所谓的,不用太纠结)
> 4. `resources` 是静态文件,一般情况下,我们没有静态文件, 所以注释掉














