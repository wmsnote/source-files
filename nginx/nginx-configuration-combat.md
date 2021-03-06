<!-- MarkdownTOC autolink="true" levels="2,3" style="ordered" -->

1. [Outline](#outline)
1. [Installation and Use](#installation-and-use)
    1. [installation](#installation)
    1. [use](#use)
1. [nginx configuration combat](#nginx-configuration-combat)
    1. [http reverse proxy configuration](#http-reverse-proxy-configuration)
    1. [Load Balancing Configuration](#load-balancing-configuration)
    1. [Site configuration of multiple webapp](#site-configuration-of-multiple-webapp)
    1. [https reverse proxy configuration](#https-reverse-proxy-configuration)
    1. [Static Site Configuration](#static-site-configuration)
    1. [Build a file server](#build-a-file-server)
    1. [Cross-domain solutions](#cross-domain-solutions)
1. [reference](#reference)

<!-- /MarkdownTOC -->




## Outline

**what is Nginx?**


Nginx (engine x)  is a lightweight Web server, reverse proxy server and e-mail (IMAP / POP3) proxy server.

![](https://wums.oss-cn-beijing.aliyuncs.com/nginx/whatisnginx.jpeg)

**What is a reverse proxy?**

Reverse proxy (Reverse Proxy) mode refers to the proxy server to accept connection requests on the internet, and then forwards the request to the server on the internal network, and returns the result obtained from the server to the client on request internet connection, At this point the external proxy server on the performance of a reverse proxy server.





## Installation and Use

### installation

Please refer to the detailed installation method: Nginx installation

### use

nginx is relatively simple to use, is a few commands.

Common to the following commands:

| Command           | Comment |
| -------------     | ------------- |
| nginx -s stop     |  快速关闭Nginx，可能不保存相关信息，并迅速终止web服务。|
| nginx -s quit     |  平稳关闭Nginx，保存相关信息，有安排的结束web服务。|
| nginx -s reload   |  因改变了Nginx相关配置，需要重新加载配置而重载。|
| nginx -s reopen   |  重新打开日志文件。|
| nginx -c filename |  为 Nginx 指定一个配置文件，来代替缺省的。|
| nginx -t          |  不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性。|
| nginx -v          |  显示 nginx 的版本。|
| nginx -V          |  显示 nginx 的版本，编译器版本和配置参数。|


If you do not want to knock on every command, a start can be added a new batch file in the installation directory nginx startup.bat , double-click to run. It reads as follows:

```bat
@echo off
rem 如果启动前已经启动nginx并记录下pid文件，会kill指定进程
nginx.exe -s stop

rem 测试配置文件语法正确性
nginx.exe -t -c conf/nginx.conf

rem 显示版本信息
nginx.exe -v

rem 按照指定配置去启动nginx
nginx.exe -c conf/nginx.conf
```

If you are running on Linux, write a shell script, very much the same.


## nginx configuration combat

I have always believed that various configurations or a combination of the actual development tools to tell the story, will make people easier to understand.

### http reverse proxy configuration

Let's achieve a small goal: do not consider the complexity of the configuration, just completed a reverse http proxy.

nginx.conf configuration file as follows:
Note: conf/nginx.conf is nginx default profile. You can also use nginx -c to specify your profile

```nginx
#运行用户
#user somebody;

#启动进程,通常设置成和cpu的数量相等
worker_processes  1;

#全局错误日志
error_log  D:/Tools/nginx-1.10.1/logs/error.log;
error_log  D:/Tools/nginx-1.10.1/logs/notice.log  notice;
error_log  D:/Tools/nginx-1.10.1/logs/info.log  info;

#PID文件，记录当前启动的nginx的进程ID
pid        D:/Tools/nginx-1.10.1/logs/nginx.pid;

#工作模式及连接数上限
events {
    worker_connections 1024;    #单个后台worker process进程的最大并发链接数
}

#设定http服务器，利用它的反向代理功能提供负载均衡支持
http {
    #设定mime类型(邮件支持类型),类型由mime.types文件定义
    include       D:/Tools/nginx-1.10.1/conf/mime.types;
    default_type  application/octet-stream;

    #设定日志
    log_format  main  '[$remote_addr] - [$remote_user] [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log    D:/Tools/nginx-1.10.1/logs/access.log main;
    rewrite_log     on;

    #sendfile 指令指定 nginx 是否调用 sendfile 函数（zero copy 方式）来输出文件，对于普通应用，
    #必须设为 on,如果用来进行下载等应用磁盘IO重负载应用，可设置为 off，以平衡磁盘与网络I/O处理速度，降低系统的uptime.
    sendfile        on;
    #tcp_nopush     on;

    #连接超时时间
    keepalive_timeout  120;
    tcp_nodelay        on;

    #gzip压缩开关
    #gzip  on;

    #设定实际的服务器列表
    upstream zp_server1{
        server 127.0.0.1:8089;
    }

    #HTTP服务器
    server {
        #监听80端口，80端口是知名端口号，用于HTTP协议
        listen       80;

        #定义使用www.xx.com访问
        server_name  www.helloworld.com;

        #首页
        index index.html

        #指向webapp的目录
        root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp;

        #编码格式
        charset utf-8;

        #代理配置参数
        proxy_connect_timeout 180;
        proxy_send_timeout 180;
        proxy_read_timeout 180;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarder-For $remote_addr;

        #反向代理的路径（和upstream绑定），location 后面设置映射的路径
        location / {
            proxy_pass http://zp_server1;
        }

        #静态文件，nginx自己处理
        location ~ ^/(images|javascript|js|css|flash|media|static)/ {
            root D:\01_Workspace\Project\github\zp\SpringNotes\spring-security\spring-shiro\src\main\webapp\views;
            #过期30天，静态文件不怎么更新，过期可以设大一点，如果频繁更新，则可以设置得小一点。
            expires 30d;
        }

        #设定查看Nginx状态的地址
        location /NginxStatus {
            stub_status           on;
            access_log            on;
            auth_basic            "NginxStatus";
            auth_basic_user_file  conf/htpasswd;
        }

        #禁止访问 .htxxx 文件
        location ~ /\.ht {
            deny all;
        }

        #错误处理页面（可选择性配置）
        #error_page   404              /404.html;
        #error_page   500 502 503 504  /50x.html;
        #location = /50x.html {
        #    root   html;
        #}
    }
}
```

Well, let's try it:

1. Start webapp, attention is bound to start port of nginx and  upstream port settings consistent.
2. Change the host: in C:\Windows\System32\host file in the drivers \etc directory, add a DNS record

    ```
    127.0.0.1 www.helloworld.com
    ```
3. Start earlier in order startup.bat
4. Access www.helloworld.com in the browser, not surprisingly, already visited.

### Load Balancing Configuration

In the previous example, only point to a proxy server.

However, the actual site of operations, most of all have multiple servers running the same app, then you need to use load balancing to split.

nginx can also achieve a simple load balancing.

Assume that such a scenario: an application deployed on 192.168.1.11:80,192.168.1.12:80,192.168.1.13:80 three linux server environment. Domain called www.helloworld.com, public IP is 192.168.1.11. Nginx deployed on the server where the public IP, load balancing process all requests.

nginx.conf configuration is as follows:

```nginx
http {
     #设定mime类型,类型由mime.type文件定义
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    #设定日志格式
    access_log    /var/log/nginx/access.log;

    #设定负载均衡的服务器列表
    upstream load_balance_server {
        #weigth参数表示权值，权值越高被分配到的几率越大
        server 192.168.1.11:80   weight=5;
        server 192.168.1.12:80   weight=1;
        server 192.168.1.13:80   weight=6;
    }

   #HTTP服务器
   server {
        #侦听80端口
        listen       80;

        #定义使用www.xx.com访问
        server_name  www.helloworld.com;

        #对所有请求进行负载均衡请求
        location / {
            root        /root;                 #定义服务器的默认网站根目录位置
            index       index.html index.htm;  #定义首页索引文件的名称
            proxy_pass  http://load_balance_server ;#请求转向load_balance_server 定义的服务器列表

            #以下是一些反向代理的配置(可选择性配置)
            #proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_connect_timeout 90;          #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_send_timeout 90;             #后端服务器数据回传时间(代理发送超时)
            proxy_read_timeout 90;             #连接成功后，后端服务器响应时间(代理接收超时)
            proxy_buffer_size 4k;              #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k;               #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
            proxy_busy_buffers_size 64k;       #高负荷下缓冲大小（proxy_buffers*2）
            proxy_temp_file_write_size 64k;    #设定缓存文件夹大小，大于这个值，将从upstream服务器传

            client_max_body_size 10m;          #允许客户端请求的最大单文件字节数
            client_body_buffer_size 128k;      #缓冲区代理缓冲用户端请求的最大字节数
        }
    }
}
```

### Site configuration of multiple webapp

When a website more functional, often need some independent functional modules spin-off, independent maintenance. In this case, usually, there will be more webapp.

For example: If www.helloworld.com site has several webapp, finance (finance), product (product), admin (User Center). Access to these applications are distinguished by the context (context):

www.helloworld.com/finance/

www.helloworld.com/product/

www.helloworld.com/admin/

We know that the default port number for http is 80, if you start these three webapp applications simultaneously on a single server, with all 80 ports, definitely succeed. So, these three applications need to bind a different port number, respectively.

So, the question is, when the user actually accessing www.helloworld.com site, access to different webapp, you would not also with corresponding port number to access it. So, again, you need to use a reverse proxy to do the processing.

Configuration is not difficult to see how to do it:

```nginx
http {
    #此处省略一些基本配置

    upstream product_server{
        server www.helloworld.com:8081;
    }

    upstream admin_server{
        server www.helloworld.com:8082;
    }

    upstream finance_server{
        server www.helloworld.com:8083;
    }

    server {
        #此处省略一些基本配置
        #默认指向product的server
        location / {
            proxy_pass http://product_server;
        }

        location /product/{
            proxy_pass http://product_server;
        }

        location /admin/ {
            proxy_pass http://admin_server;
        }

        location /finance/ {
            proxy_pass http://finance_server;
        }
    }
}
```

### https reverse proxy configuration

Some of the higher security requirements of the site, may use HTTPS (ssl communication using standard HTTP protocol security).

Here is not science HTTP protocol and SSL standards. However, using https nginx configuration needs to know that:

* HTTPS fixed port number is 443, unlike HTTP port 80
* Standard SSL security certificate needs to be introduced, so nginx.conf you need to specify the certificate and its corresponding key

Other http and reverse proxy is basically the same, but in  Server some different parts of the configuration.

```nginx
#HTTP服务器
  server {
      #监听443端口。443为知名端口号，主要用于HTTPS协议
      listen       443 ssl;

      #定义使用www.xx.com访问
      server_name  www.helloworld.com;

      #ssl证书文件位置(常见证书文件格式为：crt/pem)
      ssl_certificate      cert.pem;
      #ssl证书key位置
      ssl_certificate_key  cert.key;

      #ssl配置参数（选择性配置）
      ssl_session_cache    shared:SSL:1m;
      ssl_session_timeout  5m;
      #数字签名，此处使用MD5
      ssl_ciphers  HIGH:!aNULL:!MD5;
      ssl_prefer_server_ciphers  on;

      location / {
          root   /root;
          index  index.html index.htm;
      }
  }
```

### Static Site Configuration

Sometimes, we need to configure a static site (ie a bunch of static html files and resources).

For example: If all the static resources are placed in the  /app/dist directory, we only need the  nginx.conf host can be specified as well as the site's home page.

Configuration is as follows:

```nginx
worker_processes  1;

events {
    worker_connections  1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    gzip on;
    gzip_types text/plain application/x-javascript text/css application/xml text/javascript application/javascript image/jpeg image/gif image/png;
    gzip_vary on;

    server {
        listen       80;
        server_name  static.zp.cn;

        location / {
            root /app/dist;
            index index.html;
            #转发任何请求到 index.html
        }
    }
}
```

Then, HOST:

127.0.0.1 static.zp.cn

In this case, access static.zp.cn in the local browser, you can access a static site.

### Build a file server

Sometimes, teams need to archive some data or information, the file server is essential. Use Nginx can be very quick and easy to build a simple file service.

Nginx configuration points:

* Autoindex will open to display the directory, the default is not open.

* Autoindex_exact_size will open to display the file size.

* Autoindex_localtime will open to display the file modification time.

* root used to set the root path open for the file services.

* charset set to  charset utf-8,gbk;avoid Chinese garbage problem (after setting the windows server is still garbled, it temporarily no solution is found).

One of the most simplified configuration is as follows:

```nginx

autoindex on;# 显示目录
autoindex_exact_size on;# 显示文件大小
autoindex_localtime on;# 显示文件时间

server {
    charset      utf-8,gbk; # windows 服务器下设置后，依然乱码，暂时无解
    listen       9050 default_server;
    listen       [::]:9050 default_server;
    server_name  _;
    root         /share/fs;
}
```

### Cross-domain solutions

web development field, separated front and rear ends frequently used mode. In this mode, the front and rear ends are each independently of the web application, for example: the rear end is a Java program, a distal React Vue or application.

Separate web app when visiting each other, there is bound to cross-domain problems. Solve the problem of cross-domain There are two general ideas:

#### HEARTS

Set HTTP response header at the back-end server, you need to run the domain name is added to join  Access-Control-Allow-Originin.

#### jsonp

The rear end of the request, json configuration data, and returns, with the distal end cross-domain jsonp.

These two ideas, this article does not discuss.

It should be noted, nginx according to the first idea, but also provides a solution to cross-domain solutions.

For example: www.helloworld.com site was created by a front-end app, consisting of a back-end app. Front-end port number is 9000, the port number is 8080.

If you use the front and rear http interact request will be rejected because of the cross-domain problems. Take a look, nginx is how to solve it:

First, set the enable-cors.conf cors file:

```nginx
# allow origin list
set $ACAO '*';

# set single origin
if ($http_origin ~* (www.helloworld.com)$) {
  set $ACAO $http_origin;
}

if ($cors = "trueget") {
    add_header 'Access-Control-Allow-Origin' "$http_origin";
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
}

if ($request_method = 'OPTIONS') {
  set $cors "${cors}options";
}

if ($request_method = 'GET') {
  set $cors "${cors}get";
}

if ($request_method = 'POST') {
  set $cors "${cors}post";
}
```

Next, in your server  include enable-cors.conf to the introduction of cross-domain configuration:

```nginx
# ----------------------------------------------------
# 此文件为项目 nginx 配置片段
# 可以直接在 nginx config 中 include（推荐）
# 或者 copy 到现有 nginx 中，自行配置
# www.helloworld.com 域名需配合 dns hosts 进行配置
# 其中，api 开启了 cors，需配合本目录下另一份配置文件
# ----------------------------------------------------
upstream front_server{
  server www.helloworld.com:9000;
}
upstream api_server{
  server www.helloworld.com:8080;
}

server {
  listen       80;
  server_name  www.helloworld.com;

  location ~ ^/api/ {
    include enable-cors.conf;
    proxy_pass http://api_server;
    rewrite "^/api/(.*)$" /$1 break;
  }

  location ~ ^/ {
    proxy_pass http://front_server;
  }
}
```

This, is complete.

## reference

* Nginx's Chinese Wiki

* Nginx installation

