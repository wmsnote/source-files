## 1. Dockerfile

```Dockerfile
### 胖jar方式
## FROM openjdk:11.0.6-jre
#FROM openjdk:8-jdk-alpine
## RUN addgroup -S spring && adduser -S spring -G spring
## USER spring:spring
#ARG JAR_FILE=build/libs/*.jar
#ENV PROFILE=default TZ=Asia/Shanghai JAVA_OPTS="-server -Xms1g -Xmx1g"
#RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
#WORKDIR /
#ADD ${JAR_FILE} /app.jar
#VOLUME /logs
#EXPOSE 8080
#ENTRYPOINT java ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -Dfile.encoding=utf-8 -Dspring.profiles.active=${PROFILE} -jar /app.jar
#CMD []

### 分离依赖和资源

FROM openjdk:8-jdk-alpine AS builder
WORKDIR target/dependency
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
RUN jar -xf ./app.jar

FROM openjdk:8-jre-alpine
ARG DEPENDENCY=target/dependency
ENV PROFILE=default
ENV TZ=Asia/Shanghai
ENV JAVA_OPTS="-Xms1g -Xmx1g"
ENV MAIN_CLASS=com.boe.admin.uiadmin.UiAdminApplication
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /
COPY --from=builder ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=builder ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=builder ${DEPENDENCY}/BOOT-INF/classes /app
VOLUME /app/logs
EXPOSE 8080
ENTRYPOINT java -server ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -Dfile.encoding=utf-8 -Dspring.profiles.active=${PROFILE} -cp app:app/lib/* ${MAIN_CLASS}
CMD []
```

## 2. 部署脚本

```sh
#!/usr/bin/env bash

set -u
set -e






## =================================================================
echo " ================== 开始打包";sleep 3

# mvn clean package -Dmaven.test.skip=true
gradle build
echo " ================== 打包完成"


## ===========================================================================
JAR_FILE="build/libs/*.jar"
IMAGE_NAME="springboot-admin"
IMAGE_ID=$(date +%Y%m%d%H%M)
IMAGE_REGISTRY="registry.cn-beijing.aliyuncs.com"
IMAGE_NAMESPACE="boe-com"
IMAGE_FULLNAME=$IMAGE_REGISTRY/$IMAGE_NAMESPACE/$IMAGE_NAME:$IMAGE_ID
echo "开始构建镜像: $IMAGE_FULLNAME"; sleep 3


docker build -t $IMAGE_FULLNAME --build-arg JAR_FILE=$JAR_FILE .

echo " ================== 镜像构建完成"

## ============================================================================

echo " ================== 推送镜像到远程仓库"; sleep 3

REGISTRY_USERNAME="t_1516617822136_0451"
read -p "please input image registry password: " -t 60 REGISTRY_PASSWORD
# docker login
echo ${REGISTRY_PASSWORD:-"woms0613"} | docker login $IMAGE_REGISTRY -u $REGISTRY_USERNAME --password-stdin
docker push $IMAGE_FULLNAME


echo " ================== 镜像推送完成 ================== ";sleep 3

## =====================================================================

echo " ========================== 删除本地none镜像"

docker rmi $(docker images | grep "none" | awk '{print $3}')
docker rmi $IMAGE_FULLNAME
echo " ============================ 本地镜像删除完成"
```


## 3. gradle构建


```groovy
plugins {
    id 'org.springframework.boot' version '2.2.5.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
}

group = 'com.boe.admin'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

dependencyManagement {
  imports {
    mavenBom 'io.spring.platform:platform-bom:Cairo-SR8'
    mavenBom 'org.springframework:spring-framework-bom:5.2.4.RELEASE'
    mavenBom 'org.springframework.boot:spring-boot-dependencies:2.2.5.RELEASE'
  }
}

repositories {
    mavenCentral()
}



dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-aop'
    implementation 'org.springframework.boot:spring-boot-starter-validation'

    implementation 'com.baomidou:mybatis-plus-boot-starter:3.3.0'
    runtimeOnly 'mysql:mysql-connector-java'

    implementation 'org.springframework.boot:spring-boot-configuration-processor'

    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    implementation 'org.springframework.boot:spring-boot-starter-cache'
    implementation 'net.sf.ehcache:ehcache'

    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'io.jsonwebtoken:jjwt:0.9.1'

    implementation 'org.apache.commons:commons-lang3'
    implementation 'commons-beanutils:commons-beanutils'
    implementation 'com.google.guava:guava'
    implementation 'com.alibaba:fastjson:1.2.45'
    implementation 'cn.miludeer:jsoncode:1.2.4'

}


```



