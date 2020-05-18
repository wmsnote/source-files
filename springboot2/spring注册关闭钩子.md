```java


import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;

/**
 * @author user
 */
@Slf4j
@SpringBootApplication
@MapperScan(basePackages = {"com.boe.retail.ses.mapper","com.boe.retail.crmses.common.mapper"}, annotationClass = Repository.class)
public class CrmSesApplication {

    public static void main(String[] args) {

        ConfigurableApplicationContext applicationContext = SpringApplication.run(CrmSesApplication.class, args);


    }

    @PostConstruct
    public void init(){
        log.debug("app register shutdownHook");
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {

            log.info("app shutdown now.");

        }));
    }

}

```

什么情况下, 采用执行这个钩子函数呢?

* 程序正常退出

* 使用System.exit()

* 终端使用Ctrl+C触发的中断

* 系统关闭

* OutofMemory宕机

* 使用Kill pid杀死进程（使用kill -9是不会被调用的）






















