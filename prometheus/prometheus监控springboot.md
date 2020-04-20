## 1. Install Prometheus

- [官方安装指南](https://prometheus.io/docs/prometheus/latest/installation/)
- [Github](https://github.com/prometheus/prometheus)


> 可以从源码里找一个配置文件，配置文件的源码地址在：https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus.yml

```sh
wget https://raw.githubusercontent.com/prometheus/prometheus/master/documentation/examples/prometheus.yml
# 如果是在公司，--rm参数换成-d
# 如果是在公司，要挂载data-volume，防止数据丢失，方便升级
docker run --rm --name prometheus
    -p 9090:9090 \
    -v /tmp/prometheus.yml:/etc/prometheus/prometheus.yml \
    prom/prometheus
```


> 如果raw.githubusercontent.com无法访问？
> 1. 通过https://www.ipaddress.com查询ip，raw.githubusercontent.com => 199.232.68.133
> 2. 修改hosts文件  199.232.68.133 raw.githubusercontent.com

[](http://localhost:9090)

## 2. Install Grafana

- [官方docker安装](https://grafana.com/grafana/download?platform=docker)
- [官方docker配置](https://grafana.com/docs/grafana/latest/installation/configure-docker/)


> - grafana的配置使用-e环境变量的方式，不是直接修改配置文件
> - 生产环境，要修改配置数据存储和密码

```sh
docker pull grafana/grafana
docker run -d --name=grafana -p 3000:3000 grafana/grafana

```

> 浏览器访问http://localhost:3000 初始用户名和密码是admin/admin


## 3. SpringBoot2.x

- [micrometer官方](http://micrometer.io/)
- [micrometer桥接prometheus](https://micrometer.io/docs/registry/prometheus)
- [micrometer桥接jmx](https://micrometer.io/docs/registry/jmx)


### 3.1 依赖

https://github.com/prometheus/client_java

```groovy
implementation 'org.springframework.boot:spring-boot-starter-actuator'
implementation 'org.springframework.boot:spring-boot-starter-web'
compileOnly 'org.projectlombok:lombok'
annotationProcessor 'org.projectlombok:lombok'
compile 'io.micrometer:micrometer-registry-prometheus'
compile 'io.prometheus:simpleclient_hotspot:0.8.1'
compile 'io.prometheus:simpleclient_servlet:0.8.1'
compile 'io.prometheus:simpleclient_logback:0.8.1'
```


### 3.2 配置

```properties
spring.application.name=my-prometheus

management.endpoints.web.exposure.include=*
management.endpoints.web.exposure.exclude=env,beans
management.endpoint.shutdown.enabled=true
management.endpoint.metrics.enabled=true
management.endpoint.prometheus.enabled=true

management.metrics.tags.application=${spring.application.name}
management.metrics.export.simple.enabled=false
management.metrics.enable.all=true
management.metrics.export.prometheus.enabled=true

info.mobile=huawei
info.author=wums
```


- http://localhost:8080/actuator/info
- http://localhost:8080/actuator/metrics
- http://localhost:8080/actuator/prometheus

### 3.3 prometheus配置springboot

[SpringBoot指南](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready-metrics-export-prometheus)

prometheus.yml

```yml
global:
  scrape_interval:     15s
  evaluation_interval: 15s
alerting:
  alertmanagers:
  - static_configs:
    - targets:
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
    - targets: ['localhost:9090']
  - job_name: 'springboot'
    metrics_path: '/actuator/prometheus'
    scheme: 'http'
    static_configs:
      - targets: ['192.168.1.7:8080']
```
-----

```sh
docker run --rm --name prometheus -p 9090:9090 -v /home/user/eclipse-workspace/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
```

![](https://images.gitee.com/uploads/images/2020/0412/202526_1eacb8c6_1034180.png)




### 3.4 启动grafana

```sh
docker run --rm --name=grafana -p 3000:3000 grafana/grafana
```

用户名和密码默认都是admin、admin

浏览器访问：http://localhost:3000

创建数据源：

![](https://images.gitee.com/uploads/images/2020/0412/203317_dad38215_1034180.png)

使用4701模板

![](https://images.gitee.com/uploads/images/2020/0412/203655_bb93b56c_1034180.png)

![](https://images.gitee.com/uploads/images/2020/0412/204007_3143a9f0_1034180.png)

![](https://images.gitee.com/uploads/images/2020/0412/204139_507fe059_1034180.png)

![](https://images.gitee.com/uploads/images/2020/0412/204620_cf0ff183_1034180.png)


## 4. grafana模板

![](https://images.gitee.com/uploads/images/2020/0412/212310_0876ea5f_1034180.png)
-----
![](https://images.gitee.com/uploads/images/2020/0412/212853_0bae9237_1034180.png)

## 5. prometheus告警

`https://prometheus.io/download/` => `alertmanager`

1. AlertManager配置以及启动
2. Prometheus报警规则的配置
3. prometheus.yml添加AlertManager 9093端口以及报警规则

### 5.1 alertManager配置&启动

- [官方镜像](https://quay.io/repository/prometheus/alertmanager)
- [dockerhub](https://hub.docker.com/r/prom/alertmanager)
- [github](https://github.com/prometheus/alertmanager)

-----

- [官方配置文件](https://github.com/prometheus/alertmanager/blob/master/doc/examples/simple.yml)

alertmanager.yml
```yml
global:
  smtp_smarthost: 'smtp.126.com:25'
  smtp_from: 'wu_mingsheng@126.com'
  smtp_auth_username: 'wu_mingsheng'
  smtp_auth_password: 'woms0613'
route:
  group_by: ['alertname']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 3h
  receiver: 'mail-receiver'
inhibit_rules:
- source_match:
    severity: 'critical'
  target_match:
    severity: 'warning'
  equal: ['alertname']
receivers:
- name: 'mail-receiver'
  email_configs:
  - to: 'wu_mingsheng@126.com'
```
-----

```sh
wget -O alertmanager.yml https://raw.githubusercontent.com/prometheus/alertmanager/master/doc/examples/simple.yml
docker pull prom/alertmanager
docker run --rm --name alertmanager -p 9093:9093 -v /home/user/eclipse-workspace/prometheus/alertmanager.yml:/etc/alertmanager/alertmanager.yml prom/alertmanager

```

### 5.2 prometheus

然后，修改 prometheus.yml 配置文件，添加 rules 规则文件。

rule.yml

```yml
groups:
- name: springboot-alert-rule
  rules:
  - alert: ApplicationJobDown
    expr: sum(up{job="springboot"}) == 0
    for: 1m
    labels:
      severity: critical
```

-----

prometheus.yml

```yml
global:
  scrape_interval:     15s
  evaluation_interval: 15s
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - '192.168.1.7:9093'
rule_files:
  - 'rule.yml'
scrape_configs:
  - job_name: 'prometheus'
    static_configs:
    - targets: ['localhost:9090']
  - job_name: 'springboot'
    metrics_path: '/actuator/prometheus'
    scheme: 'http'
    static_configs:
      - targets: ['192.168.1.7:8080']
```



重启prometheus

```sh

docker run --rm --name prometheus -p 9090:9090 \
-v /home/user/eclipse-workspace/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml \
-v /home/user/eclipse-workspace/prometheus/rule.yml:/etc/prometheus/rule.yml \
prom/prometheus
```

查看是否生效

![](https://images.gitee.com/uploads/images/2020/0412/224317_38472d7e_1034180.png)
![](https://images.gitee.com/uploads/images/2020/0412/224621_f88719b6_1034180.png)


测试

关闭应用，15s进入pending，1m进入firing

-----

![](https://wums.oss-cn-beijing.aliyuncs.com/prometheus/20200412230351.png)

















