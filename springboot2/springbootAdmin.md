## 参考

- https://github.com/codecentric/spring-boot-admin
- https://codecentric.github.io/spring-boot-admin/2.2.3/#getting-started


## 1. boot-admin-server

环境 gradle or maven, 用 https://start.spring.io/

```groovy
plugins {
    id 'org.springframework.boot' version '2.3.0.RELEASE'
    id 'io.spring.dependency-management' version '1.0.9.RELEASE'
    id 'java'
}

group = 'com.boe.retail.monitor'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'

configurations {
    compileOnly {
        extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}

ext {
    set('springBootAdminVersion', "2.2.3")
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    implementation 'de.codecentric:spring-boot-admin-starter-server'
    implementation 'org.springframework.boot:spring-boot-starter-mail'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    compileOnly 'org.projectlombok:lombok'
    runtimeOnly 'io.micrometer:micrometer-registry-prometheus'
    annotationProcessor 'org.projectlombok:lombok'
}

dependencyManagement {
    imports {
        mavenBom "de.codecentric:spring-boot-admin-dependencies:${springBootAdminVersion}"
    }
}

bootJar {
    layered()
}
```


```properties
spring.application.name=boot-admin-server
server.port=5000

spring.mail.host=smtp.126.com
spring.mail.port=25
spring.mail.username=wu_mingsheng
spring.mail.password=woms0613
spring.boot.admin.notify.mail.to=wu_mingsheng@126.com
spring.boot.admin.notify.mail.from=wu_mingsheng@126.com
spring.boot.admin.notify.mail.cc=wums.wu@gmail.com
```


```java

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import de.codecentric.boot.admin.server.config.EnableAdminServer;

@EnableAdminServer
@SpringBootApplication
public class AdminApplication {
    public static void main(String[] args) {
        SpringApplication.run(AdminApplication.class, args);
    }
}
```

## 2. spring-boot-client

```groovy

implementation 'de.codecentric:spring-boot-admin-starter-client'
```


```properties
logging.file.name=./logs/app.log

spring.boot.admin.client.url=http://localhost:5000
spring.boot.admin.client.instance.prefer-ip=true
spring.boot.admin.client.instance.metadata.tags.environment=dev
info.tags.environment=dev
```













































