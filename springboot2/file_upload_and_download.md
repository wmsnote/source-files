基于Spring Boot 2.2.6实现Rest风格的文件上传&下载APIs


Spring Boot 2.0 Restful Style MultipartFile Upload and Download APIs

文件上传与下载在Web应用中是一个比较常见的功能。在本教程中，我将基于Spring 2.2.6版本实现一个基于Restful风格的文件上传与下载APIs。

基于Spring Boot 2.0实战系列源码已经Push到Github仓库：[Github仓库地址](https://github.com/ramostear/springboot2.0-action)
感兴趣的朋友欢迎Star/Fork。

## 1. ENVIRONMENT

* JDK: Java 1.8
* Framework: Spring Boot 2.2.6(Only Using Spring Web MVC)
* Maven: Maven 3.5.0+
* IDE: IntelliJ IDEA 2019.2
* Test: Postman 7.23.0

## 2. FUNCTION

本教程中，使用Spring 2.2.6实现Restful风格的APIs并提供以下的功能：

1. 客户端上传文件到服务端
2. 对客户端上传文件大小进行限制（50MB）
3. 点击链接地址下载文件
4. 获得已上传文件列表（文件名和下载地址）

下面是教程所实现的APIs列表（服务端请求端口默认8080）：

| 请求方式 | URL地址 | 说明 |
| ------------- | ------------- |  ------------- |
| POST | /upload           | 上传一份文件          |
| GET  | /files            | 获取已上传的文件列表 |
| GET  | /files/{fileName} | 根据文件地址下载文件 |


## 3. PROJECT ARCHITECTURE

工程目录结构说明如下：

1. config/FileUploadConfiguration.java: 常规组件，主要在重启应用时清理历史文件；
2. controller/FileUploadController.java: 主要的控制器，负责处理文件的上传，下载，浏览等请求；
3. exception/FileUploadExceptionAdvice.java: 全局的异常处理类，提供用户友好的异常提示信息；
4. service/FileStorageService.java: 文件上传接口类，提供存储地址初始化，保存文件，加载文件，清理文件等操作；
5. service/impl/FileStorageServiceImpl.java: 文件上传接口实现类；
6. valueobject/UploadFile.java: 封装了文件名和存储地址的POJO类；
7. valueobject/Message.java: 请求/响应的消息对象；
8. resources/application.yml: 项目配置文件，主要配置了文件上传大小限制；
9. pom.xml:Maven依赖配置文件。

## 4. QUICK START

本教程是基于IntelliJ IDEA创建Spring Boot项目的，你也可以选择自己喜欢的IDE创建项目。创建完项目后，请检查pom.xml文件中是否包含如下配置：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

本教程只使用到Spring Web MVC的功能，因此只需添加spring-boot-starter-web依赖。

### 4.1 文件上传接口

按照面向接口编程的约定(规范)，创建一个用于操作上传文件的接口类FileStorageService.java，并提供相应的方法。

service/FileStorageService.java

```java
package com.ramostear.springboot.uploadfile.service;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

/**
 * @ClassName FileStorageService
 * @Description TODO
 * @Author 树下魅狐
 * @Date 2020/4/28 0028 18:35
 * @Version since 1.0
 **/
public interface FileStorageService {

    void init();

    void save(MultipartFile multipartFile);

    Resource load(String filename);

    Stream<Path> load();

    void clear();

}
```

在启动应用时，先调用clear()方法清理历史文件，再调用init()方法初始化文件上传地址。

### 4.2 实现文件上传接口

文件上传接口实现类比较简单，这里直接给出代码：

service/impl/FileStorageServiceImpl.java

```java
/**
 * @ClassName FileStorageServiceImpl
 * @Description TODO
 * @Author 树下魅狐
 * @Date 2020/4/28 0028 18:38
 * @Version since 1.0
 **/
@Service("fileStorageService")
public class FileStorageServiceImpl implements FileStorageService {
    private final Path path = Paths.get("fileStorage");

    @Override
    public void init() {
        try {
            Files.createDirectory(path);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void save(MultipartFile multipartFile) {
        try {
            Files.copy(multipartFile.getInputStream(),this.path.resolve(multipartFile.getOriginalFilename()));
        } catch (IOException e) {
            throw new RuntimeException("Could not store the file. Error:"+e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        Path file = path.resolve(filename);
        try {
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()){
                return resource;
            }else{
                throw new RuntimeException("Could not read the file.");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error:"+e.getMessage());
        }
    }

    @Override
    public Stream<Path> load() {
        try {
            return Files.walk(this.path,1)
                    .filter(path -> !path.equals(this.path))
                    .map(this.path::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files.");
        }
    }

    @Override
    public void clear() {
        FileSystemUtils.deleteRecursively(path.toFile());
    }
}
```

其中，Files、Path和Paths是java.nio.file提供的类，Resource是org.springframework.core.io包中提供的类。

### 4.3 定义值对象

本教程中，定义了两个简单的对象UploadFile.java和Message.java，分别封装了上传文件信息和响应消息，代码如下：

valueobject/UploadFile.java

```java
/**
 * @ClassName UploadFile
 * @Description TODO
 * @Author 树下魅狐
 * @Date 2020/4/28 0028 18:48
 * @Version since 1.0
 **/
public class UploadFile {
    private String fileName;
    private String url;

    public UploadFile(String fileName, String url) {
        this.fileName = fileName;
        this.url = url;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
```

valueobject/Message.java


```java
/**
 * @ClassName Message
 * @Description TODO
 * @Author 树下魅狐
 * @Date 2020/4/28 0028 19:21
 * @Version since 1.0
 **/
public class Message {
    private String message;

    public Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
```

### 4.4 控制器

在controller包下创建文件上传控制器，用于处理客户端的请求。代码如下：

controller/FileUploadController.java

```java
/**
 * @ClassName FileUploadController
 * @Description TODO
 * @Author 树下魅狐
 * @Date 2020/4/28 0028 18:52
 * @Version since 1.0
 **/
@RestController
public class FileUploadController {
    @Autowired
    FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<Message> upload(@RequestParam("file")MultipartFile file){
        try {
            fileStorageService.save(file);
            return ResponseEntity.ok(new Message("Upload file successfully: "+file.getOriginalFilename()));
        }catch (Exception e){
            return ResponseEntity.badRequest()
                    .body(new Message("Could not upload the file:"+file.getOriginalFilename()));
        }
    }

    @GetMapping("/files")
    public ResponseEntity<List<UploadFile>> files(){
        List<UploadFile> files = fileStorageService.load()
                .map(path -> {
                    String fileName = path.getFileName().toString();
                    String url = MvcUriComponentsBuilder
                            .fromMethodName(FileUploadController.class,
                                    "getFile",
                                    path.getFileName().toString()
                            ).build().toString();
                    return new UploadFile(fileName,url);
                }).collect(Collectors.toList());
        return ResponseEntity.ok(files);
    }

    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable("filename")String filename){
        Resource file = fileStorageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment;filename=\""+file.getFilename()+"\"")
                .body(file);
    }
}
```

在控制器中，使用@RestController组合注解替换了@Controller+@ResponseBody的注解方式，并采用@RequestMapping的快捷方式注解方法。

### 4.5配置上传文件大小

通常，出于安全和性能考虑，我们需要限定客户端上传文件的大小，本教程限定的文件大小最大为50MB。

在application.yml(application.properties)文件中添加如下配置：

application.yml

```yml
spring:
  servlet:
    multipart:
      max-request-size: 50MB
      max-file-size: 50MB
```

application.properties

```properties
spring.servlet.multipart.max-request-size=50MB
spring.servlet.multipart.max-file-size=50MB
spring.servlet.multipart.max-request-size=50MB
```

单次请求所能上传文件的总文件大小spring.servlet.multipart.max-file-size=50MB：单个文件所能上传的文件大小

### 4.6 全局异常处理

在控制器中，文件上传过程中可能产生的异常我们使用try-catch语句进行了用户友好处理，但当客户端上传文件大小超过50MB时，应用会抛出MaxUploadSizeExceededException异常信息，我们需要对此异常信息做处理。最简单的方式是使用@ControllerAdvice+@ExceptionHandler组合方式处理异常。在exception包下创建异常处理类，代码如下：

exception/FileUploadExceptionAdvice.java

```java
/**
 * @ClassName FileUploadExceptionAdvice
 * @Description TODO
 * @Author 树下魅狐
 * @Date 2020/4/28 0028 19:10
 * @Version since 1.0
 **/
@ControllerAdvice
public class FileUploadExceptionAdvice extends ResponseEntityExceptionHandler {
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Message> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e){
       return ResponseEntity.badRequest().body(new Message("Upload file too large."));
    }
}
```


### 4.7 初始化文件存储空间

为了在测试时获得干净的测试数据，同时也为了在应用启动后分配好上传文件存储地址，我们需要在config包下创建一个配置类，在应用启动时调用FileStorageService中的clear()方法和init()方法。实现该功能，最快的方式是配置类实现CommandLineRunner接口类的run()方法，代码如下：

config/FileUploadConfiguration.java

```java
@Service
public class FileUploadConfiguration implements CommandLineRunner {
    @Autowired
    FileStorageService fileStorageService;

    @Override
    public void run(String... args) throws Exception {
        fileStorageService.clear();
        fileStorageService.init();
    }
}
```

使用`@Autowired`注解将`FileStorageService`注入到`FileUploadConfiguration.java`中。

## 5. RUN&TEST

运行Spring Boot应用程序的方式有很多，例如：

1. 命令方式：mvn spring-boot:run
2. IntelliJ IDEA：点击IntelliJ IDEA的“Run”按钮
3. main()方法：直接运行主类中的main()方法
4. 运行jar包：java -jar springboot-fileupload.jar

选择一种你比较熟悉的方式运行Spring Boot应用程序。

当应用程序启动成功后，该项目的根目录会创建一个名为fileStorage的文件夹，该文件夹将用于存放客户端上传的文件。


> Github仓库地址: https://github.com/ramostear/springboot2.0-action















