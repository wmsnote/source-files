git clone https://github.com/happyfish100/fastdfs.git
cd fastdfs/docker/dockerfile_network
docker build -t hiboe/fdfs .
mkdir -p ~/fdfs_data
docker run -d -e FASTDFS_IPADDR=192.168.43.21 -p 8888:8888 -p 22122:22122 -p 23000:23000 -p 8011:80 -v ~/fdfs_data:/home/dfs --name fdfs hiboe/fdfs






```xml
<dependency>
    <groupId>io.github.bluemiaomiao</groupId>
    <artifactId>fastdfs-spring-boot-starter</artifactId>
    <version>2.0.1-RELEASE</version>
</dependency>
```

```properties
## fdfs

fastdfs.nginx-servers=192.168.43.21:8888
fastdfs.tracker-servers=192.168.43.21:22122
fastdfs.http-secret-key=FastDFS1234567890
fastdfs.http-anti-steal-token=true
fastdfs.http-tracker-http-port=8011
fastdfs.network-timeout=30
fastdfs.connect-timeout=5
fastdfs.connection-pool-max-idle=18
fastdfs.connection-pool-min-idle=2
fastdfs.connection-pool-max-total=18
fastdfs.charset=UTF-8
```


```java
import io.github.bluemiaomiao.annotation.EnableFastdfsClient;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFastdfsClient
public class FdfsConfig {
}
```


```java

import com.boe.retail.cms.service.FileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import static com.boe.retail.cms.common.CMSResponse.err;

@RestController
@RequestMapping("file")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService){
        this.fileService = fileService;
    }

    @PostMapping("upload")
    public Object upload(@RequestParam("file") MultipartFile file){

        if (file.isEmpty()){
            return err("file is empty", 400);
        }

        return fileService.save(file);
    }

}


import com.boe.retail.cms.common.CMSResponse;
import com.boe.retail.cms.service.FileService;
import com.google.common.base.Joiner;
import io.github.bluemiaomiao.service.FastdfsClientService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;

@Service
@Slf4j
public class FileServiceImpl implements FileService {


    private final FastdfsClientService fastdfsClientService;

    public FileServiceImpl(FastdfsClientService fastdfsClientService){
        this.fastdfsClientService = fastdfsClientService;
    }



    @Override
    public CMSResponse<Object> save(MultipartFile multipartFile) {


        try {
            byte[] bytes = multipartFile.getBytes();
            final String[] remoteInfo = fastdfsClientService.autoUpload(bytes, FilenameUtils.getExtension(multipartFile.getOriginalFilename()));
            log.info(" === file upload remote info: [{}]", Arrays.toString(remoteInfo));
            return CMSResponse.ok(Joiner.on("/").skipNulls().join(remoteInfo));
        }catch (Exception e){
            log.error("file upload fail", e);
            throw new RuntimeException("file upload fail", e);
        }


    }





}










```



2020-07-22 10:02:26.644  INFO 1797 --- [nio-8080-exec-2] c.b.r.cms.service.impl.FileServiceImpl   :  === file upload remote info: [[group1, M00/00/00/rBEAAV8XnjKAVfUEAAF4xfDbYrs254.jpg]]



{
"data": "group1/M00/00/00/rBEAAV8XnjKAVfUEAAF4xfDbYrs254.jpg",
"message": "success",
"code": 200
}


使用8888端口访问静态文件

http://localhost:8888/group1/M00/00/00/rBEAAV8XnjKAVfUEAAF4xfDbYrs254.jpg






















