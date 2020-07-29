1. 依赖

```xml

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```


2. 自动配置

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Configuration
public class WebSocketConfig {


    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }



}

```

## 3. 业务逻辑处理类


```java



import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
@Component
@ServerEndpoint("/webSocket/{sid}")
public class TestWS {

    private static final AtomicInteger onlineCount = new AtomicInteger(0);

    private static final ConcurrentHashMap<String, Session> map = new ConcurrentHashMap<>();

    private static final CopyOnWriteArraySet<Session> set = new CopyOnWriteArraySet<>();

    @PostConstruct
    public void init(){
        log.debug(" === web-socket init success ===");
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("sid") String sid){
        set.add(session);
        map.put(sid, session);
        final int count = onlineCount.incrementAndGet();
        log.debug("有连接加入,当前连接数为: [{}]", count);
        try {
            session.getBasicRemote().sendText("连接成功");
        } catch (IOException e) {
            log.error("向[{}]发送消息出错,信息内容:[{}]", sid, "连接成功", e);
        }

    }

    @OnClose
    public void onClose(Session session, @PathParam("sid") String sid){
        set.remove(session);
        map.remove(sid);
        final int count = onlineCount.decrementAndGet();
        log.debug("客户端[{}]连接断开,当前连接数为: [{}]", sid, count);
    }


    @OnMessage
    public void onMessage(String message, Session session){
        final Map<String, String> pathParameters = session.getPathParameters();
        final String sid = pathParameters.get("sid");
        log.info("来自客户端[{}]-[{}]的信息: [{}]", session.getId(), sid, message);
    }



    @OnError
    public void onError(Session session, Throwable cause){
        final String sid = session.getPathParameters().get("sid");

        log.error("客户端[{}]发生错误", sid, cause);
    }






}

```












































