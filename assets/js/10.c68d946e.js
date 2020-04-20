(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{334:function(s,t,a){"use strict";a.r(t);var e=a(18),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"_1-install-prometheus"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-install-prometheus"}},[s._v("#")]),s._v(" 1. Install Prometheus")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://prometheus.io/docs/prometheus/latest/installation/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方安装指南"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/prometheus/prometheus",target:"_blank",rel:"noopener noreferrer"}},[s._v("Github"),a("OutboundLink")],1)])]),s._v(" "),a("blockquote",[a("p",[s._v("可以从源码里找一个配置文件，配置文件的源码地址在：https://github.com/prometheus/prometheus/blob/master/documentation/examples/prometheus.yml")])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://raw.githubusercontent.com/prometheus/prometheus/master/documentation/examples/prometheus.yml\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果是在公司，--rm参数换成-d")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 如果是在公司，要挂载data-volume，防止数据丢失，方便升级")]),s._v("\ndocker run --rm --name prometheus\n    -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9090")]),s._v(":9090 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    -v /tmp/prometheus.yml:/etc/prometheus/prometheus.yml "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n    prom/prometheus\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("blockquote",[a("p",[s._v("如果raw.githubusercontent.com无法访问？")]),s._v(" "),a("ol",[a("li",[s._v("通过https://www.ipaddress.com查询ip，raw.githubusercontent.com => 199.232.68.133")]),s._v(" "),a("li",[s._v("修改hosts文件  199.232.68.133 raw.githubusercontent.com")])])]),s._v(" "),a("p",[a("a",{attrs:{href:"http://localhost:9090",target:"_blank",rel:"noopener noreferrer"}},[a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"_2-install-grafana"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-install-grafana"}},[s._v("#")]),s._v(" 2. Install Grafana")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://grafana.com/grafana/download?platform=docker",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方docker安装"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://grafana.com/docs/grafana/latest/installation/configure-docker/",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方docker配置"),a("OutboundLink")],1)])]),s._v(" "),a("blockquote",[a("ul",[a("li",[s._v("grafana的配置使用-e环境变量的方式，不是直接修改配置文件")]),s._v(" "),a("li",[s._v("生产环境，要修改配置数据存储和密码")])])]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("docker pull grafana/grafana\ndocker run -d --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("grafana -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3000")]),s._v(":3000 grafana/grafana\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("blockquote",[a("p",[s._v("浏览器访问http://localhost:3000 初始用户名和密码是admin/admin")])]),s._v(" "),a("h2",{attrs:{id:"_3-springboot2-x"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-springboot2-x"}},[s._v("#")]),s._v(" 3. SpringBoot2.x")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"http://micrometer.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("micrometer官方"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://micrometer.io/docs/registry/prometheus",target:"_blank",rel:"noopener noreferrer"}},[s._v("micrometer桥接prometheus"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://micrometer.io/docs/registry/jmx",target:"_blank",rel:"noopener noreferrer"}},[s._v("micrometer桥接jmx"),a("OutboundLink")],1)])]),s._v(" "),a("h3",{attrs:{id:"_3-1-依赖"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-依赖"}},[s._v("#")]),s._v(" 3.1 依赖")]),s._v(" "),a("p",[s._v("https://github.com/prometheus/client_java")]),s._v(" "),a("div",{staticClass:"language-groovy line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-groovy"}},[a("code",[s._v("implementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-starter-actuator'")]),s._v("\nimplementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-starter-web'")]),s._v("\ncompileOnly "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.projectlombok:lombok'")]),s._v("\nannotationProcessor "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.projectlombok:lombok'")]),s._v("\ncompile "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'io.micrometer:micrometer-registry-prometheus'")]),s._v("\ncompile "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'io.prometheus:simpleclient_hotspot:0.8.1'")]),s._v("\ncompile "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'io.prometheus:simpleclient_servlet:0.8.1'")]),s._v("\ncompile "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'io.prometheus:simpleclient_logback:0.8.1'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("h3",{attrs:{id:"_3-2-配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-配置"}},[s._v("#")]),s._v(" 3.2 配置")]),s._v(" "),a("div",{staticClass:"language-properties line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-properties"}},[a("code",[a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("spring.application.name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("my-prometheus")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.endpoints.web.exposure.include")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("*")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.endpoints.web.exposure.exclude")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("env,beans")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.endpoint.shutdown.enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("true")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.endpoint.metrics.enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("true")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.endpoint.prometheus.enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("true")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.metrics.tags.application")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("${spring.application.name}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.metrics.export.simple.enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("false")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.metrics.enable.all")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("true")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("management.metrics.export.prometheus.enabled")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("true")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("info.mobile")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("huawei")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("info.author")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[s._v("wums")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br")])]),a("ul",[a("li",[s._v("http://localhost:8080/actuator/info")]),s._v(" "),a("li",[s._v("http://localhost:8080/actuator/metrics")]),s._v(" "),a("li",[s._v("http://localhost:8080/actuator/prometheus")])]),s._v(" "),a("h3",{attrs:{id:"_3-3-prometheus配置springboot"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-prometheus配置springboot"}},[s._v("#")]),s._v(" 3.3 prometheus配置springboot")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready-metrics-export-prometheus",target:"_blank",rel:"noopener noreferrer"}},[s._v("SpringBoot指南"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("prometheus.yml")]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("global")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("scrape_interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("     15s\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("evaluation_interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 15s\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("alerting")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("alertmanagers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("static_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("rule_files")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# - "first_rules.yml"')]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('# - "second_rules.yml"')]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("scrape_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("job_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'prometheus'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("static_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost:9090'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("job_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'springboot'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metrics_path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/actuator/prometheus'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("scheme")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("static_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'192.168.1.7:8080'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("hr"),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("docker run --rm --name prometheus -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9090")]),s._v(":9090 -v /home/user/eclipse-workspace/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/202526_1eacb8c6_1034180.png",alt:""}})]),s._v(" "),a("h3",{attrs:{id:"_3-4-启动grafana"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-启动grafana"}},[s._v("#")]),s._v(" 3.4 启动grafana")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("docker run --rm --name"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("grafana -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3000")]),s._v(":3000 grafana/grafana\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("用户名和密码默认都是admin、admin")]),s._v(" "),a("p",[s._v("浏览器访问：http://localhost:3000")]),s._v(" "),a("p",[s._v("创建数据源：")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/203317_dad38215_1034180.png",alt:""}})]),s._v(" "),a("p",[s._v("使用4701模板")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/203655_bb93b56c_1034180.png",alt:""}})]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/204007_3143a9f0_1034180.png",alt:""}})]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/204139_507fe059_1034180.png",alt:""}})]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/204620_cf0ff183_1034180.png",alt:""}})]),s._v(" "),a("h2",{attrs:{id:"_4-grafana模板"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-grafana模板"}},[s._v("#")]),s._v(" 4. grafana模板")]),s._v(" "),a("h2",{attrs:{id:""}},[a("a",{staticClass:"header-anchor",attrs:{href:"#"}},[s._v("#")]),s._v(" "),a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/212310_0876ea5f_1034180.png",alt:""}})]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/212853_0bae9237_1034180.png",alt:""}})]),s._v(" "),a("h2",{attrs:{id:"_5-prometheus告警"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-prometheus告警"}},[s._v("#")]),s._v(" 5. prometheus告警")]),s._v(" "),a("p",[a("code",[s._v("https://prometheus.io/download/")]),s._v(" => "),a("code",[s._v("alertmanager")])]),s._v(" "),a("ol",[a("li",[s._v("AlertManager配置以及启动")]),s._v(" "),a("li",[s._v("Prometheus报警规则的配置")]),s._v(" "),a("li",[s._v("prometheus.yml添加AlertManager 9093端口以及报警规则")])]),s._v(" "),a("h3",{attrs:{id:"_5-1-alertmanager配置-启动"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-alertmanager配置-启动"}},[s._v("#")]),s._v(" 5.1 alertManager配置&启动")]),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://quay.io/repository/prometheus/alertmanager",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方镜像"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://hub.docker.com/r/prom/alertmanager",target:"_blank",rel:"noopener noreferrer"}},[s._v("dockerhub"),a("OutboundLink")],1)]),s._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/prometheus/alertmanager",target:"_blank",rel:"noopener noreferrer"}},[s._v("github"),a("OutboundLink")],1)])]),s._v(" "),a("hr"),s._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/prometheus/alertmanager/blob/master/doc/examples/simple.yml",target:"_blank",rel:"noopener noreferrer"}},[s._v("官方配置文件"),a("OutboundLink")],1)])]),s._v(" "),a("p",[s._v("alertmanager.yml")]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("global")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("smtp_smarthost")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'smtp.126.com:25'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("smtp_from")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'wu_mingsheng@126.com'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("smtp_auth_username")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'wu_mingsheng'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("smtp_auth_password")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'woms0613'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("route")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("group_by")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'alertname'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("group_wait")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 30s\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("group_interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 5m\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("repeat_interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 3h\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("receiver")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'mail-receiver'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("inhibit_rules")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("source_match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("severity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'critical'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("target_match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("severity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'warning'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("equal")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'alertname'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("receivers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'mail-receiver'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("email_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("to")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'wu_mingsheng@126.com'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br")])]),a("hr"),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -O alertmanager.yml https://raw.githubusercontent.com/prometheus/alertmanager/master/doc/examples/simple.yml\ndocker pull prom/alertmanager\ndocker run --rm --name alertmanager -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9093")]),s._v(":9093 -v /home/user/eclipse-workspace/prometheus/alertmanager.yml:/etc/alertmanager/alertmanager.yml prom/alertmanager\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("h3",{attrs:{id:"_5-2-prometheus"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-prometheus"}},[s._v("#")]),s._v(" 5.2 prometheus")]),s._v(" "),a("p",[s._v("然后，修改 prometheus.yml 配置文件，添加 rules 规则文件。")]),s._v(" "),a("p",[s._v("rule.yml")]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("groups")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" springboot"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("alert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v("rule\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("rules")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" ApplicationJobDown\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("expr")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" sum(up"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v('job="springboot"'),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(") == 0\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 1m\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("labels")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("severity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" critical\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("hr"),s._v(" "),a("p",[s._v("prometheus.yml")]),s._v(" "),a("div",{staticClass:"language-yml line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("global")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("scrape_interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("     15s\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("evaluation_interval")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 15s\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("alerting")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("alertmanagers")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("static_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'192.168.1.7:9093'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("rule_files")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'rule.yml'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("scrape_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("job_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'prometheus'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("static_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost:9090'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("job_name")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'springboot'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("metrics_path")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/actuator/prometheus'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("scheme")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'http'")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("static_configs")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("-")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("targets")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'192.168.1.7:8080'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br")])]),a("p",[s._v("重启prometheus")]),s._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[s._v("\ndocker run --rm --name prometheus -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9090")]),s._v(":9090 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /home/user/eclipse-workspace/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\n-v /home/user/eclipse-workspace/prometheus/rule.yml:/etc/prometheus/rule.yml "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("\\")]),s._v("\nprom/prometheus\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("查看是否生效")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/224317_38472d7e_1034180.png",alt:""}}),s._v(" "),a("img",{attrs:{src:"https://images.gitee.com/uploads/images/2020/0412/224621_f88719b6_1034180.png",alt:""}})]),s._v(" "),a("p",[s._v("测试")]),s._v(" "),a("p",[s._v("关闭应用，15s进入pending，1m进入firing")]),s._v(" "),a("hr"),s._v(" "),a("p",[a("img",{attrs:{src:"https://wums.oss-cn-beijing.aliyuncs.com/prometheus/20200412230351.png",alt:""}})])])}),[],!1,null,null,null);t.default=n.exports}}]);