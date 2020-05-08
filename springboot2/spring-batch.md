## 1. 环境搭建


### 1.1 maven

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.6.RELEASE</version>
        <relativePath />
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-batch</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.2</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```


### 1.2 环境配置

```properties
## redis
spring.redis.host=${REDIS_HOST:127.0.0.1}
spring.redis.port=${REDIS_PORT:6379}


## mysql
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:3306/batch_demo?useSSL=false&serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.platform=mysql


## mybatis

mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true
mybatis.configuration.use-column-label=true
mybatis.type-aliases-package=com.example.demo.po
mybatis.type-handlers-package=com.example.demo.mybatis
mybatis.mapper-locations=classpath:mapper/*.xml
```


### 1.3 sql

```sql
create database batch_demo  DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;
```

### 1.4 启动&测试

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}

```


```bash
curl "http://localhost:8080/actuator/health"
{"status":"UP"}
```

## 2. 框架介绍

![](https://wums.oss-cn-beijing.aliyuncs.com/springboot/20200507140641.png)

1. 一个 Batch(批处理)过程由一个 Job(作业)组成。这个实体封装了整个批处理过程
2. 一个 Job(作业)可以由一个或多个 Step(步骤)组成。在大多数情况下，一个步骤将读取数据(通过 ItemReader)，处理数据(使用 ItemProcessor)，然后写入数据(通过 ItemWriter)。
3. JobLauncher处理启动一个 Job(作业)。
4. 最后， JobRepository存储关于配置和执行的 Job(作业)的元数据。

任务存储仓库可以是关系型数据库MySQL，非关系型数据库MongoDB或者直接存储在内存中，本篇使用的是MySQL作为任务存储仓库。

导入org.springframework.batch.core目录下的schema-mysql.sql文件：`spring-batch-core-4.2.1.RELEASE.jar`




### 2.1 合理的使用Chunk机制

Spring batch在配置Step时采用的是基于Chunk的机制。即每次读取一条数据，再处理一条数据，累积到一定数量后再一次性交给writer进行写入操作。这样可以最大化的优化写入效率，整个事务也是基于Chunk来进行。

当我们在需要将数据写入到文件、数据库中之类的操作时可以适当设置Chunk的值以满足写入效率最大化。但有些场景下我们的写入操作其实是调用一个web service或者将消息发送到某个消息队列中，那么这些场景下我们就需要设置Chunk的值为1，这样既可以及时的处理写入，也不会由于整个Chunk中发生异常后，在重试时出现重复调用服务或者重复发送消息的情况。

### 2.2 各种listener

使用Listener来监视job执行情况并及时做相应的处理

Spring batch提供了大量的Listener来对job的各个执行环节进行全面的监控。

在job层面Spring batch提供了JobExecutionListener接口，其支持在Job开始或结束时进行一些额外处理。在step层面Spring batch提供了StepExecutionListener，ChunkListener,ItemReadListener,ItemProcessListener,ItemWriteListener,SkipListener等接口，同时对Retry和Skip操作也提供了RetryListener及SkipListener。

通常我们会为每个job都实现一个JobExecutionListener，在afterJob操作中我们输出job的执行信息，包括执行时间、job参数、退出代码、执行的step以及每个step的详细信息。这样无论是开发、测试还是运维人员都对整个job的执行情况了如指掌。

如果某个step会发生skip的操作，我们也会为其实现一个SkipListener，并在其中记录skip的数据条目，用于下一步的处理。

实现Listener有两种方式，一种是继承自相应的接口，比如继承JobExecutionListener接口，另一种是使用annoation（注解）的方式。经过实践我们认为使用注解的方式更好一些，因为使用接口你需要实现接口的所有方法，而使用注解则只需要对相应的方法添加annoation即可。 下面的这个类采用了继承接口的方式，我们看到其实我们只用到了第一个方法，第二个和第三个都没有用到。但是我们必须提供一个空的实现。

```java
public class CustomSkipListener implements SkipListener<String, String> {
    @Override
    public void onSkipInRead(Throwable t) {
        // business logic
    }

    @Override
    public void onSkipInWrite(String item, Throwable t) {
        // no need
    }

    @Override
    public void onSkipInProcess(String item, Throwable t) {
        // no need
    }
}
```

而使用annoation的方式可以简写为：

```java
public class CustomSkipListener {
    @OnSkipInRead
    public void onSkipInRead(Throwable t) {
        // business logic
    }
}
```

### 2.3 使用Retry和Skip增强批处理工作的健壮性

在处理百万级的数据过程过程中难免会出现异常。如果一旦出现异常而导致整个批处理工作终止的话那么会导致后续的数据无法被处理。Spring Batch内置了Retry（重试）和Skip（跳过）机制帮助我们轻松处理各种异常。我们需要将异常分为三种类型:

1. 第一种是需要进行Retry的异常，它们的特点是该异常可能会随着时间推移而消失，比如数据库目前有锁无法写入、web服务当前不可用、web服务满载等。所以对它们适合配置Retry机制。
2. 第二种是需要Skip的异常，比如解析文件的某条数据出现异常等，因为对这些异常即使执行Retry每次的结果也都是相同，但又不想由于某条数据出错而停止对后续数据的处理。
3. 第三种异常是需要让整个Job立刻失败的异常，比如如果出现了OutOfMemory的异常，那么需要整个Job立刻终止运行。

一般来说需要Retry的异常也要配置Skip选项，从而保证后续的数据能够被继续处理。我们也可以配置SkipLimit选项保证当Skip的数据条目达到一定数量后及时终止整个Job。 有时候我们需要在每次Retry中间隔做一些操作，比如延长Retry时间，恢复操作现场等，Spring Batch提供了BackOffPolicy来达到目的。下面是一个配置了Retry机制、Skip机制以及BackOffPolicy的step示例。

```java
@Bean
public Step step(){
    return stepBuilders.get("step")
        .<Partner,Partner>chunk(1)
        .reader(reader())
        .processor(processor())
        .writer(writer())
        .listener(logProcessListener())
        .faultTolerant()
        .skipLimit(10)
        .skip(UnknownGenderException.class)
        .skip(ServiceUnavailableException.class)
        .retryLimit(5)
        .retry(ServiceUnavailableException.class)
        .backOffPolicy(backoffPolicy)
        .listener(logSkipListener())
        .build();
}

```

### 2.4 使用自定义的Decider来实现Job flow

在Job执行过程中不一定都是顺序执行的，我们经常需要根据某个job的输出数据或执行结果来决定下一步的走向。以前我们会把一些判断放置在下游step中进行，这样可能会导致有些step实际运行了，但其实并没有做任何事情。

比如一个step执行过程中会将失败的数据条目记录到一个报告中，而下一个step会判断有没有生成报告，如果生成了报告则将该报告发送给指定联系人，如果没有则不做任何事情。这种情况下可以通过Decider机制来实现Job的执行流程。在Spring batch 3.0中Decider已经从Step中独立出来，和Step处于同一级别。

```java
public class ReportDecider implements JobExecutionDecider {
    @Override
    public FlowExecutionStatus decide(JobExecution jobExecution, StepExecution stepExecution) {
        if (report.isExist()) {
            return new FlowExecutionStatus("SEND");
        return new FlowExecutionStatus("SKIP");
    }
}
```
而在job配置中可以这样来使用Decider。这样整个Job的执行流程会更加清晰易懂。

```java
public Job job() {
    return new JobBuilder("petstore")
        .start(orderProcess())
        .next(reportDecider)
        .on("SEND").to(sendReportStep)
        .on("SKIP").end().build()
        .build();
}
```

### 2.5 采用多种机制加速Job的执行

批处理工作处理的数据量大，而执行窗口一般又要求比较小。所以必须要通过多种方式来加速Job的执行。一般我们有四种方式来实现：

1. 在单个step中多线程执行任务
2. 并行执行不同的Step
3. 并行执行同一个Step
4. 远程执行Chunk任务

#### 2.5.1 Multi-threaded Step

多线程Step,根据官网给出的例子，它的定义如下：

```java

@Bean
public TaskExecutor taskExecutor(){
    return new SimpleAsyncTaskExecutor("spring_batch");
}

@Bean
public Step sampleStep(TaskExecutor taskExecutor) {
    return this.stepBuilderFactory.get("sampleStep")
                .<String, String>chunk(5)
                .reader(itemReader())
                .writer(itemWriter())
                .taskExecutor(taskExecutor)
                .build();
}
```
上面这段代码配置就是用SimpleAsyncTaskExecutor线程池来进行一个多线程的读取，但是这个多线程并不是我们以前认为的一个线程处理一个setp，这里的多线程其实体现在chunk上面，就是说采用多个线程去进行数据的读取，等所有线程的reader操作完成后，然后将所有的数据封装成一个参数传给Writer，然后由writer进行提交。看下面这个模型图可能就会理解了。

![](https://wums.oss-cn-beijing.aliyuncs.com/springboot/20200507164238.png)

注意：如果这里的线程池不是SimpleAsyncTaskExecutor，而是ThreadPoolTaskExecutor，那么此时运行的线程并不是上面代码定义的5个，而是4个。

#### 2.5.2 Parallel Step

真正的并发Step，现在来看一下官网的demo：

```java

@Bean
public Job job() {
    return jobBuilderFactory.get("job")
        .start(splitFlow())
        .next(step4())
        .build()        //builds FlowJobBuilder instance
        .build();       //builds Job instance
}

@Bean
public Flow splitFlow() {
    return new FlowBuilder<SimpleFlow>("splitFlow")
        .split(taskExecutor())
        .add(flow1(), flow2())
        .build();
}

@Bean
public Flow flow1() {
    return new FlowBuilder<SimpleFlow>("flow1")
        .start(step1())
        .next(step2())
        .build();
}

@Bean
public Flow flow2() {
    return new FlowBuilder<SimpleFlow>("flow2")
        .start(step3())
        .build();
}

@Bean
public TaskExecutor taskExecutor(){
    return new SimpleAsyncTaskExecutor("spring_batch");
}
```

在上面这个例子中，是通过split关键字来实现并发的，但是需要注意一点的是只有Step1、Step2、Step3全部执行成功后，才会继续执行Step4。把上面的例子转化为模型图，相信大家一下就能看明白了：

![](https://wums.oss-cn-beijing.aliyuncs.com/springboot/20200507164652.png)


#### 2.5.3 Remote Chunking of Step

官方描述如下：在远程分块中，Step处理过程分为多个进程，并通过某种中间件相互通信。下图显示了该模式：

从这张图片上来看，可以很容易的知道，该模式适合主从结构场景，整个过程大概如下：Master Step先读取数据，然后将这个数据交给某个中间件，然后Slave Step对这个中间件进行监听，当监听到有自己需要的数据的时候就从中间件拿数据，然后将数据写入到指定的地方。但是这个模型在使用的时候需要考虑负载均衡的问题。

![](https://wums.oss-cn-beijing.aliyuncs.com/springboot/20200507164923.png)


#### 2.5.4 Partitioning Step

这个模型真正意义上实现了Step的多线程，每个线程都有一个Reader、Writer，相当于每一个线程有一个Step，但是该模型真正的好处是将需要处理的数据先进行分割，然后每一个reader、writer模块对应一个数据区，这样保证了数据的同步也充分发挥了多线程的优势。先看下官网的定义：


每一个Worker相当于一个Reader和Writer，每一个worker的执行流程如下：
![](https://wums.oss-cn-beijing.aliyuncs.com/springboot/20200507165254.png)


首先执行handler，这个hanlder的意义就是处理远程数据的划分，其实就是设置TaskExecutorPartitionHandler参数，主要是利用这个参数进行远程数据的切分，参数设置完成后，就调用spit函数，采用多线程的方式执行Step里面的reader和Writter操作。全部执行完成后将数据返回给下一个Step。参数配置代码如下所示：



```java
/**
     * Step配置
     * @return
     */
    @Bean
    public Step step1Manager() {
        return stepBuilderFactory.get("step1.manager")
                .partitioner("step1", testPartitioner())
                .partitionHandler(partitionHandler())
                .build();
    }

    /**
     * 设置Partitioner  数据的具体划分
     */
    public testPartitioner implements Partitioner{
        @Override
        public Map<String, ExecutionContext> partition(int gridSize)
     {
            Map<String, ExecutionContext> result = new HashMap<>();
            for (int i = 1; i <= gridSize; i++) {
                ExecutionContext value = new ExecutionContext();
                result.put("partition " + i, value);
            }
            return result;
      }

    /**
     * handler函数的配置
     * @return
     */
    @Bean
    public PartitionHandler partitionHandler() {
        TaskExecutorPartitionHandler retVal = new TaskExecutorPartitionHandler();
        retVal.setTaskExecutor(taskExecutor());
        retVal.setStep(step1());
        retVal.setGridSize(10);
        return retVal;
    }


    @Bean
    public TaskExecutor taskExecutor(){
    return new SimpleAsyncTaskExecutor("spring_batch");
     }
    @Bean
    public MultiResourceItemReader itemReader
    (@Value("#{stepExecutionContext['fileName']}/*") Resource [] resources)
    {
    return new MultiResourceItemReaderBuilder<String>()
            .delegate(fileReader())
            .name("itemReader")
            .resources(resources)
            .build();
      }
```



## 3. 快速开始

### 3.1 添加`EnableBatchProcessing`注解

```java
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableBatchProcessing
@EnableScheduling
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

### 3.2 batch配置

```properties
## redis
spring.redis.host=${REDIS_HOST:127.0.0.1}
spring.redis.port=${REDIS_PORT:6379}


## mysql
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:3306/batch_demo?useSSL=false&serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.platform=mysql


## mybatis

mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true
mybatis.configuration.use-column-label=true
mybatis.type-aliases-package=com.example.demo.po
mybatis.type-handlers-package=com.example.demo.mybatis
mybatis.mapper-locations=classpath:mapper/*.xml


## batch
# stop execute all spring batch jobs in the context on app startup
spring.batch.job.enabled=false
```

### 3.3 listener

```java
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class HelloWorldJobListener implements JobExecutionListener {

    @Override
    public void beforeJob(JobExecution jobExecution) {
        log.info("job before " + jobExecution.getJobParameters());

    }

    @Override
    public void afterJob(JobExecution jobExecution) {
         log.info("JOB STATUS : {}", jobExecution.getStatus());
    }

}
```

### 3.4 ItemReader

```java
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class HelloWroldRedisItemReader implements ItemReader<String> {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public String read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        String value = stringRedisTemplate.opsForList().rightPop("key");
        log.info("read value is [{}]", value);
        return value;
    }

}
```

### 3.5 ItemProcessor

```java
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Component
public class HelloWorldItemProcessor implements ItemProcessor<String, String> {

    @Override
    public String process(String item) throws Exception {
        log.info("process item [{}]", item);
        return item.toUpperCase();
    }


}
```

### 3.6 ItemWriter

```java
import java.util.List;

import org.springframework.batch.item.ItemWriter;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;


@Component
@Slf4j
public class HelloWorldItemWriter implements ItemWriter<String> {

    @Override
    public void write(List<? extends String> items) throws Exception {
        items.forEach(item->{
            log.info("batch write value is : [{}]", item);
        });
    }

}
```

### 3.7 配置Job

```java

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.batch.HelloWorldItemProcessor;
import com.example.demo.batch.HelloWorldItemWriter;
import com.example.demo.batch.HelloWorldJobListener;
import com.example.demo.batch.HelloWroldRedisItemReader;

@Configuration
public class HelloWorldJobConfig {

    @Autowired
    private JobBuilderFactory jobBuilders;

    @Autowired
    private StepBuilderFactory stepBuilders;

    @Autowired
    private HelloWorldJobListener listener;

    @Autowired
    private HelloWroldRedisItemReader helloWroldRedisItemReader;

    @Autowired
    private HelloWorldItemWriter helloWorldItemWriter;

    @Autowired
    private HelloWorldItemProcessor helloWorldItemProcessor;


    @Bean
    public Job helloWorldJob() {

        return jobBuilders.get("helloWorldJob")
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                //.start(helloWorldStep(stepBuilders)).next()
                .flow(helloWorldStep())
                .end()
                .build();

    }

    @Bean
    public Step helloWorldStep() {
        return stepBuilders.get("helloWorldStep")
                .<String, String>chunk(10)
                .reader(helloWroldRedisItemReader)
                .processor(helloWorldItemProcessor)
                .writer(helloWorldItemWriter)
                .build();

    }



}

```

### 3.8 schedule作启动器

```java

import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class HelloWorldSchedue {

    private final JobLauncher jobLauncher;

    private final Job helloWorldJob;

    public HelloWorldSchedue(@Autowired JobLauncher jobLauncher, @Qualifier("helloWorldJob")Job helloWorldJob) {
        this.jobLauncher = jobLauncher;
        this.helloWorldJob = helloWorldJob;
    }

     // 定时任务，每十秒执行一次
    @Scheduled(cron = "0/10 * * * * ?")
    public void runBatch() throws Exception {
        log.info("定时任务执行了...");
        //joninstance = job + parameter
        //job = jobname + stepname
        //jobinstance=jobname+stepname+parameter
        // 在运行一个job的时候需要添加至少一个参数，这个参数最后会被写到batch_job_execution_params表中，
        // 不添加这个参数的话，job不会运行，并且这个参数在表中中不能重复，若设置的参数已存在表中，则会抛出异常，
        // 所以这里才使用时间戳作为参数
        JobParameters jobParameters = new JobParametersBuilder()
                .addLong("timestamp", System.currentTimeMillis())
                .toJobParameters();


        JobExecution execution = jobLauncher.run(helloWorldJob, jobParameters);
        log.info("定时任务结束. Exit Status : {}", execution.getStatus());
    }

}


```

### 3.9 启动测试

```bash
docker run --name redis-cli -it --link redis:redis --rm redis redis-cli -h redis

redis:6379> lpush key a b c d e f g h i j k l m n o p q r s t
(integer) 20
redis:6379> lpush key a b c d e f g h i j k l m n o p q r s t u v w x y z
(integer) 26
redis:6379>


```


```log
2020-05-07 16:15:50.001  INFO 9933 --- [   scheduling-1] c.e.demo.schedule.HelloWorldSchedue      : 定时任务执行了...
2020-05-07 16:15:50.055  INFO 9933 --- [   scheduling-1] o.s.b.c.l.support.SimpleJobLauncher      : Job: [FlowJob: [name=helloWorldJob]] launched with the following parameters: [{timestamp=1588839350001}]
2020-05-07 16:15:50.073  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldJobListener     : job before {timestamp=1588839350001}
2020-05-07 16:15:50.115  INFO 9933 --- [   scheduling-1] o.s.batch.core.job.SimpleStepHandler     : Executing step: [helloWorldStep]
2020-05-07 16:15:50.156  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [a]
2020-05-07 16:15:50.158  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [b]
2020-05-07 16:15:50.159  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [c]
2020-05-07 16:15:50.161  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [d]
2020-05-07 16:15:50.162  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [e]
2020-05-07 16:15:50.163  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [f]
2020-05-07 16:15:50.164  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [g]
2020-05-07 16:15:50.165  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [h]
2020-05-07 16:15:50.166  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [i]
2020-05-07 16:15:50.167  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [j]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [a]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [b]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [c]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [d]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [e]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [f]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [g]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [h]
2020-05-07 16:15:50.168  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [i]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [j]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [A]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [B]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [C]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [D]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [E]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [F]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [G]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [H]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [I]
2020-05-07 16:15:50.169  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [J]
2020-05-07 16:15:50.186  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [k]
2020-05-07 16:15:50.187  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [l]
2020-05-07 16:15:50.189  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [m]
2020-05-07 16:15:50.191  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [n]
2020-05-07 16:15:50.192  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [o]
2020-05-07 16:15:50.193  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [p]
2020-05-07 16:15:50.194  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [q]
2020-05-07 16:15:50.196  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [r]
2020-05-07 16:15:50.197  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [s]
2020-05-07 16:15:50.198  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [t]
2020-05-07 16:15:50.198  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [k]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [l]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [m]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [n]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [o]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [p]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [q]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [r]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [s]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [t]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [K]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [L]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [M]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [N]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [O]
2020-05-07 16:15:50.199  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [P]
2020-05-07 16:15:50.200  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [Q]
2020-05-07 16:15:50.200  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [R]
2020-05-07 16:15:50.200  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [S]
2020-05-07 16:15:50.200  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [T]
2020-05-07 16:15:50.215  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [u]
2020-05-07 16:15:50.216  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [v]
2020-05-07 16:15:50.218  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [w]
2020-05-07 16:15:50.219  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [x]
2020-05-07 16:15:50.220  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [y]
2020-05-07 16:15:50.222  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [z]
2020-05-07 16:15:50.223  INFO 9933 --- [   scheduling-1] c.e.d.batch.HelloWroldRedisItemReader    : read value is [null]
2020-05-07 16:15:50.223  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [u]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [v]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [w]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [x]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [y]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemProcessor   : process item [z]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [U]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [V]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [W]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [X]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [Y]
2020-05-07 16:15:50.224  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldItemWriter      : batch write value is : [Z]
2020-05-07 16:15:50.241  INFO 9933 --- [   scheduling-1] o.s.batch.core.step.AbstractStep         : Step: [helloWorldStep] executed in 125ms
2020-05-07 16:15:50.259  INFO 9933 --- [   scheduling-1] c.e.demo.batch.HelloWorldJobListener     : JOB STATUS : COMPLETED
2020-05-07 16:15:50.282  INFO 9933 --- [   scheduling-1] o.s.b.c.l.support.SimpleJobLauncher      : Job: [FlowJob: [name=helloWorldJob]] completed with the following parameters: [{timestamp=1588839350001}] and the following status: [COMPLETED] in 204ms
2020-05-07 16:15:50.282  INFO 9933 --- [   scheduling-1] c.e.demo.schedule.HelloWorldSchedue      : 定时任务结束. Exit Status : COMPLETED
```




## 参考

1. https://docs.spring.io/spring-batch/docs/current/reference/html/index-single.html#listOfReadersAndWriters
2. https://docs.spring.io/spring-batch/docs/current/reference/html/readersAndWriters.html#customReadersWriters

































