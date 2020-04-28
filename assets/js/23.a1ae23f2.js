(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{350:function(s,a,t){"use strict";t.r(a);var n=t(9),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("p",[s._v("[TOC]")]),s._v(" "),t("p"),t("div",{staticClass:"table-of-contents"},[t("ul",[t("li",[t("a",{attrs:{href:"#linux-安装"}},[s._v("Linux 安装")]),t("ul",[t("li",[t("a",{attrs:{href:"#rpm-包方式（推荐）"}},[s._v("rpm 包方式（推荐）")])]),t("li",[t("a",{attrs:{href:"#源码编译方式"}},[s._v("源码编译方式")])])])]),t("li",[t("a",{attrs:{href:"#linux-开机自启动"}},[s._v("Linux 开机自启动")]),t("ul",[t("li",[t("a",{attrs:{href:"#rpm-包方式"}},[s._v("rpm 包方式")])]),t("li",[t("a",{attrs:{href:"#源码编译方式"}},[s._v("源码编译方式")])])])]),t("li",[t("a",{attrs:{href:"#二、docker-安装"}},[s._v("二、Docker 安装")])]),t("li",[t("a",{attrs:{href:"#三、脚本"}},[s._v("三、脚本")])]),t("li",[t("a",{attrs:{href:"#四、参考资料"}},[s._v("四、参考资料")])])])]),t("p"),s._v(" "),t("h2",{attrs:{id:"linux-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux-安装"}},[s._v("#")]),s._v(" Linux 安装")]),s._v(" "),t("h3",{attrs:{id:"rpm-包方式（推荐）"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rpm-包方式（推荐）"}},[s._v("#")]),s._v(" rpm 包方式（推荐）")]),s._v(" "),t("p",[s._v("（1）进入"),t("a",{attrs:{href:"http://nginx.org/packages/",target:"_blank",rel:"noopener noreferrer"}},[s._v("下载页面"),t("OutboundLink")],1),s._v("，选择合适版本下载。")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("（2）安装 nginx rpm 包")]),s._v(" "),t("p",[s._v("nginx rpm 包实际上安装的是 nginx 的 yum 源。")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rpm")]),s._v(" -ivh nginx-*.rpm\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("（3）正式安装 rpm 包")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ yum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" nginx\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("（4）关闭防火墙")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ firewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("/tcp --permanent\n$ firewall-cmd --reload\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h3",{attrs:{id:"源码编译方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#源码编译方式"}},[s._v("#")]),s._v(" 源码编译方式")]),s._v(" "),t("h4",{attrs:{id:"安装编译工具及库"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#安装编译工具及库"}},[s._v("#")]),s._v(" 安装编译工具及库")]),s._v(" "),t("p",[s._v("Nginx 源码的编译依赖于 gcc 以及一些库文件，所以必须提前安装。")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ yum -y "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" zlib zlib-devel gcc-c++ libtool  openssl openssl-devel\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("Nginx 依赖 pcre 库，安装步骤如下：")]),s._v(" "),t("p",[s._v("（1）下载解压到本地")]),s._v(" "),t("p",[s._v("进入"),t("a",{attrs:{href:"https://sourceforge.net/projects/pcre/files/pcre/",target:"_blank",rel:"noopener noreferrer"}},[s._v("pcre 官网下载页面"),t("OutboundLink")],1),s._v("，选择合适的版本下载。")]),s._v(" "),t("p",[s._v("我选择的是 8.35 版本：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -O /opt/pcre/pcre-8.35.tar.gz http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /opt/pcre\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" zxvf pcre-8.35.tar.gz\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("（2）编译安装")]),s._v(" "),t("p",[s._v("执行以下命令：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /opt/pcre/pcre-8.35\n./configure\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("（3）检验是否安装成功")]),s._v(" "),t("p",[s._v("执行 "),t("code",[s._v("pcre-config --version")]),s._v(" 命令。")]),s._v(" "),t("h4",{attrs:{id:"编译安装-nginx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#编译安装-nginx"}},[s._v("#")]),s._v(" 编译安装 Nginx")]),s._v(" "),t("p",[s._v("安装步骤如下：")]),s._v(" "),t("p",[s._v("（1）下载解压到本地")]),s._v(" "),t("p",[s._v("进入官网下载地址：http://nginx.org/en/download.html ，选择合适的版本下载。")]),s._v(" "),t("p",[s._v("我选择的是 1.12.2 版本：http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -O /opt/nginx/nginx-1.12.2.tar.gz http://nginx.org/download/nginx-1.12.2.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /opt/nginx\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" zxvf nginx-1.12.2.tar.gz\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("（2）编译安装")]),s._v(" "),t("p",[s._v("执行以下命令：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" /opt/nginx/nginx-1.12.2\n./configure --with-http_stub_status_module --with-http_ssl_module --with-pcre"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/opt/pcre/pcre-8.35\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("（3）关闭防火墙")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ firewall-cmd --zone"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("public --add-port"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("80")]),s._v("/tcp --permanent\n$ firewall-cmd --reload\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("p",[s._v("（4） 启动 Nginx")]),s._v(" "),t("p",[s._v("安装成功后，直接执行 "),t("code",[s._v("nginx")]),s._v(" 命令即可启动 nginx。")]),s._v(" "),t("p",[s._v("启动后，访问站点：")]),s._v(" "),t("p",[t("img",{attrs:{src:"http://dunwu.test.upcdn.net/snap/20180920181016133223.png",alt:"img"}})]),s._v(" "),t("h2",{attrs:{id:"linux-开机自启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#linux-开机自启动"}},[s._v("#")]),s._v(" Linux 开机自启动")]),s._v(" "),t("p",[s._v("Centos7 以上是用 Systemd 进行系统初始化的，Systemd 是 Linux 系统中最新的初始化系统（init），它主要的设计目标是克服 sysvinit 固有的缺点，提高系统的启动速度。Systemd 服务文件以 .service 结尾。")]),s._v(" "),t("h3",{attrs:{id:"rpm-包方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#rpm-包方式"}},[s._v("#")]),s._v(" rpm 包方式")]),s._v(" "),t("p",[s._v("如果是通过 rpm 包安装的，会自动创建 nginx.service 文件。")]),s._v(" "),t("p",[s._v("直接用命令：")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("$ systemctl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" nginx.service\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("设置开机启动即可。")]),s._v(" "),t("h3",{attrs:{id:"源码编译方式-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#源码编译方式-2"}},[s._v("#")]),s._v(" 源码编译方式")]),s._v(" "),t("p",[s._v("如果采用源码编译方式，需要手动创建 nginx.service 文件。")]),s._v(" "),t("h2",{attrs:{id:"二、docker-安装"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二、docker-安装"}},[s._v("#")]),s._v(" 二、Docker 安装")]),s._v(" "),t("ul",[t("li",[s._v("官网镜像：https://hub.docker.com/_/nginx/")]),s._v(" "),t("li",[s._v("下载镜像："),t("code",[s._v("docker pull nginx")])]),s._v(" "),t("li",[s._v("启动容器："),t("code",[s._v("docker run --name my-nginx -p 80:80 -v /data/docker/nginx/logs:/var/log/nginx -v /data/docker/nginx/conf/nginx.conf:/etc/nginx/nginx.conf:ro -d nginx")])]),s._v(" "),t("li",[s._v("重新加载配置（目前测试无效，只能重启服务）："),t("code",[s._v("docker exec -it my-nginx nginx -s reload")])]),s._v(" "),t("li",[s._v("停止服务："),t("code",[s._v("docker exec -it my-nginx nginx -s stop")]),s._v(" 或者："),t("code",[s._v("docker stop my-nginx")])]),s._v(" "),t("li",[s._v("重新启动服务："),t("code",[s._v("docker restart my-nginx")])])]),s._v(" "),t("h2",{attrs:{id:"三、脚本"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三、脚本"}},[s._v("#")]),s._v(" 三、脚本")]),s._v(" "),t("blockquote",[t("p",[s._v("CentOS7 环境安装脚本："),t("a",{attrs:{href:"https://github.com/dunwu/linux-tutorial/tree/master/codes/linux/soft",target:"_blank",rel:"noopener noreferrer"}},[s._v("软件运维配置脚本集合"),t("OutboundLink")],1)])]),s._v(" "),t("p",[t("strong",[s._v("安装说明")])]),s._v(" "),t("ul",[t("li",[s._v("采用编译方式安装 Nginx, 并将其注册为 systemd 服务")]),s._v(" "),t("li",[s._v("安装路径为："),t("code",[s._v("/usr/local/nginx")])]),s._v(" "),t("li",[s._v("默认下载安装 "),t("code",[s._v("1.16.0")]),s._v(" 版本")])]),s._v(" "),t("p",[t("strong",[s._v("使用方法")])]),s._v(" "),t("ul",[t("li",[s._v("默认安装 - 执行以下任意命令即可：")])]),s._v(" "),t("div",{staticClass:"language-shell line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v(" -o- https://gitee.com/turnon/linux-tutorial/raw/master/codes/linux/soft/nginx-install.sh "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" -qO- https://gitee.com/turnon/linux-tutorial/raw/master/codes/linux/soft/nginx-install.sh "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("bash")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("ul",[t("li",[s._v("自定义安装 - 下载脚本到本地，并按照以下格式执行：")])]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sh")]),s._v(" nginx-install.sh "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("version"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"四、参考资料"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#四、参考资料"}},[s._v("#")]),s._v(" 四、参考资料")]),s._v(" "),t("ul",[t("li",[s._v("http://www.dohooe.com/2016/03/03/352.html?utm_source=tuicool&utm_medium=referral")]),s._v(" "),t("li",[t("a",{attrs:{href:"https://blog.51cto.com/kling/1253474",target:"_blank",rel:"noopener noreferrer"}},[s._v("nginx+keepalived实现nginx双主高可用的负载均衡"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=e.exports}}]);