## 依赖配置

```xml

<project xmlns="http://maven.apache.org/POM/4.0.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>ws</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>netty-ws</name>
    <description>springboot2.x netty websocket</description>


    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.1.RELEASE</version>
        <relativePath /> <!-- lookup parent from repository -->
    </parent>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-all</artifactId>
        </dependency>
         <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.3.9</version>
        </dependency>

         <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
         </dependency>
         <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
         </dependency>
         <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
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


## 2. 配置文件项

```properties
netty.ws.enabled=true
netty.ws.port=9090
netty.ws.boss-thread=2
netty.ws.worker-thread=2
netty.ws.connect-timeout-millis=30000
netty.ws.backlog=1024
netty.ws.allow-half-closure=false
netty.ws.high-water-mark=65536
netty.ws.low-water-mark=32768
netty.ws.write-spin-count=16
netty.ws.tcp-nodelay=true
netty.ws.keepalive=true
netty.ws.linger=-1
```

## 3. 自动配置

```java


import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;



@ConfigurationProperties(prefix = "netty.ws")
@Data
public class NettyWSProperties {

    private int port = 80;

    private int bossThread = 0;

    private int workerThread = 0;

    private int connectTimeoutMillis = 30000;

    private int backlog = 128;

    private boolean tcpNodelay = true;

    private int writeSpinCount = 16;


    private int linger = -1;

    private boolean allowHalfClosure = false;

    private boolean keepalive = false;

    private  int lowWaterMark = 32 * 1024;

    private  int highWaterMark = 64 * 1024;







}



import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelOption;
import io.netty.channel.FixedRecvByteBufAllocator;
import io.netty.channel.WriteBufferWaterMark;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.SocketChannel;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;

@Configuration(proxyBeanMethods = false)
@EnableConfigurationProperties(NettyWSProperties.class)
@ConditionalOnProperty(prefix = "netty.ws", value = "enabled", havingValue = "true", matchIfMissing = false)
public class NettyWSAutoConfiguration {

    private final NettyWSProperties nettyWSProperties;

    private final List<ChannelInitializer<SocketChannel>> initializers;

    private Channel channel;

    public NettyWSAutoConfiguration(NettyWSProperties nettyWSProperties, List<ChannelInitializer<SocketChannel>> initializers) {
        this.nettyWSProperties = nettyWSProperties;
        this.initializers = initializers;
    }

    @PostConstruct
    public void bootstrap() throws Exception {
        NioEventLoopGroup bossGroup = new NioEventLoopGroup(this.nettyWSProperties.getBossThread());
        NioEventLoopGroup workerGroup = new NioEventLoopGroup(this.nettyWSProperties.getBossThread());
        try {
            ServerBootstrap serverBootstrap = new ServerBootstrap();
            serverBootstrap.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .handler(new LoggingHandler(LogLevel.DEBUG))
                    .localAddress(this.nettyWSProperties.getPort())
                    .option(ChannelOption.SO_BACKLOG, this.nettyWSProperties.getBacklog())
                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, this.nettyWSProperties.getConnectTimeoutMillis())
                    .childOption(ChannelOption.WRITE_SPIN_COUNT, this.nettyWSProperties.getWriteSpinCount())
                    .childOption(ChannelOption.WRITE_BUFFER_WATER_MARK, new WriteBufferWaterMark(this.nettyWSProperties.getLowWaterMark(), this.nettyWSProperties.getHighWaterMark()))
                    .childOption(ChannelOption.TCP_NODELAY, this.nettyWSProperties.isTcpNodelay())
                    .childOption(ChannelOption.SO_LINGER, this.nettyWSProperties.getLinger())
                    .childOption(ChannelOption.ALLOW_HALF_CLOSURE, this.nettyWSProperties.isAllowHalfClosure())
                    .childOption(ChannelOption.SO_KEEPALIVE, this.nettyWSProperties.isKeepalive())
                    .childOption(ChannelOption.RCVBUF_ALLOCATOR, new FixedRecvByteBufAllocator(592048));

            this.initializers.forEach(serverBootstrap::childHandler);
            ChannelFuture channelFuture = serverBootstrap.bind().sync();

            channelFuture.addListener(future -> {
                if (!future.isSuccess()) {
                    future.cause().printStackTrace();
                }
            });

            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                bossGroup.shutdownGracefully().syncUninterruptibly();
                workerGroup.shutdownGracefully().syncUninterruptibly();
            }));

            channelFuture.channel().closeFuture().sync();

            this.channel = channelFuture.channel();


        }catch (Exception e) {
            System.exit(1);
            throw new RuntimeException(e);
        }finally {
            workerGroup.shutdownGracefully().sync(); // 释放线程池资源
            bossGroup.shutdownGracefully().sync();
        }

    }

    @PreDestroy
    public void stop() throws Exception {
        this.channel.close();
        this.channel.parent().close();
    }



}



```


4. 启动类

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {


    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);

    }

}

```

5. 业务逻辑类

```java


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelId;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.handler.codec.http.websocketx.TextWebSocketFrame;
import io.netty.util.AttributeKey;
import io.netty.util.concurrent.GlobalEventExecutor;

@Sharable
@Component
public class FirstChannelHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    public static final AttributeKey<String> KEY_CLIENT_ID = AttributeKey.valueOf("keyClientId");


    //  通道组池，管理所有 web socket 连接
    public static ChannelGroup CHANNEL_GROUP = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    //当前连接回话和用户id的对应关系
    public static Map<String, ChannelId> CHANNEL_ALL = new ConcurrentHashMap<>();




    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        logger.info(" === handlerAdded 接入 remoteAddress: [{}]", ctx.channel().remoteAddress());
        super.handlerAdded(ctx);
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        logger.info(" === handlerRemoved 离开 ===");
        super.handlerRemoved(ctx);
    }

    @Override
    public void channelRegistered(ChannelHandlerContext ctx) throws Exception {
        logger.info("=== channelRegistered ===");
        super.channelRegistered(ctx);
    }

    @Override
    public void channelUnregistered(ChannelHandlerContext ctx) throws Exception {
        logger.info("=== channelUnregistered ===");
        super.channelUnregistered(ctx);

    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
        super.channelReadComplete(ctx);
        ctx.flush();
        logger.info("=== channelReadComplete ===");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws Exception {
        // TODO Auto-generated method stub
        super.exceptionCaught(ctx, cause);
        logger.error(" === exceptionCaught 异常 ===", cause);
        ctx.close();
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) throws Exception {
        // TODO Auto-generated method stub
        //super.channelActive(ctx);
        logger.info(" === channelActive 在线 ===");
        Channel channel = ctx.channel();
//      ChannelId id = channel.id();
//      Channel find = CHANNEL_GROUP.find(id);

        logger.info("== [channel.id={}] and [remote.address={}]", channel.id(), channel.remoteAddress());
        CHANNEL_GROUP.add(ctx.channel());
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        // TODO Auto-generated method stub
        //super.channelInactive(ctx);
        logger.info(" === channelInactive 掉线 ===");
        CHANNEL_GROUP.remove(ctx.channel());
    }

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {

        Channel channel = ctx.channel();
        ChannelId id = channel.id();
//      channel.attr(KEY_CLIENT_ID).setIfAbsent("")
//      channel.attr(KEY_CLIENT_ID).get()


        logger.info("收到客户端数据: [{}]  & 客户端id: [{}]", msg.text(), id);
        String message = ctx.channel().id()  + "=======>>>>>" + msg.text();
        sendMsgGroup(message);

    }

    //群发信息
    private void sendMsgGroup(String message) {
        CHANNEL_GROUP.writeAndFlush(new TextWebSocketFrame(message));
    }


}


import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.handler.codec.http.HttpObjectAggregator;
import io.netty.handler.codec.http.HttpServerCodec;
import io.netty.handler.codec.http.websocketx.WebSocketServerProtocolHandler;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;
import io.netty.handler.stream.ChunkedWriteHandler;
import io.netty.handler.timeout.IdleStateHandler;



@Component
public class FirstChannelInitializer extends ChannelInitializer<SocketChannel> {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private final FirstChannelHandler firstChannelHandler;

    public FirstChannelInitializer(FirstChannelHandler firstChannelHandler) {
        this.firstChannelHandler = firstChannelHandler;
    }


    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        logger.debug(("收到新连接"));
        ChannelPipeline pipeline = ch.pipeline();
        //处理日志
        pipeline.addLast(new LoggingHandler(LogLevel.INFO));
        pipeline.addLast(new IdleStateHandler(0, 0, 1800, TimeUnit.SECONDS));
        pipeline.addLast(new HttpServerCodec());
        pipeline.addLast(new ChunkedWriteHandler());
        pipeline.addLast(new HttpObjectAggregator(65535));
        pipeline.addLast(new WebSocketServerProtocolHandler("/first"));
        pipeline.addLast(this.firstChannelHandler);
    }

}

```

























































































