(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{350:function(s,n,a){"use strict";a.r(n);var t=a(9),r=Object(t.a)({},(function(){var s=this,n=s.$createElement,a=s._self._c||n;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("现在有两个springboot项目,这两个项目毫不相干(没有父子关系也没有兄弟关系)")]),s._v(" "),a("p",[s._v("和这两个项目同级还有一个公共模块的common项目,两个springboot项目都依赖这个common项目")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ tree -L "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v(".")]),s._v("\n\n├── common\n├── crm-ses\n└── sync-api\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("hr"),s._v(" "),a("p",[a("strong",[s._v("common项目配置")])]),s._v(" "),a("p",[s._v("settings.gradle文件")]),s._v(" "),a("div",{staticClass:"language-groovy line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-groovy"}},[a("code",[s._v("rootProject"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'common'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("build.gradle文件")]),s._v(" "),a("div",{staticClass:"language-groovy line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-groovy"}},[a("code",[s._v("plugins "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    id "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'java'")]),s._v("\n    id "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'java-library'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\nsourceCompatibility "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.8")]),s._v("\ngroup "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'com.boe.retail.crm-ses'")]),s._v("\nversion "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1.0-SNAPSHOT'")]),s._v("\n\nconfigurations "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    compileOnly "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        extendsFrom annotationProcessor\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nrepositories "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mavenCentral")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\ndependencies "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    compileOnly "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.projectlombok:lombok:1.18.12'")]),s._v("\n    annotationProcessor "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.projectlombok:lombok:1.18.12'")]),s._v("\n\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'com.baomidou:mybatis-plus-boot-starter:3.3.0'")]),s._v("\n\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'com.google.guava:guava:29.0-jre'")]),s._v("\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.apache.commons:commons-lang3:3.9'")]),s._v("\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.apache.commons:commons-pool2:2.7.0'")]),s._v("\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'commons-beanutils:commons-beanutils:1.9.4'")]),s._v("\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'commons-io:commons-io:2.6'")]),s._v("\n    api "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'com.google.guava:guava:29.0-jre'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br")])]),a("blockquote",[a("p",[s._v("api 可以传递依赖,将公共依赖放到common项目中,springboot项目可以不用添加公共依赖,只要依赖了common项目,依赖就可以传递\napi 需要插件 java-library")])]),s._v(" "),a("hr"),s._v(" "),a("p",[a("strong",[s._v("springboot项目配置")])]),s._v(" "),a("p",[s._v("settings.gradle文件")]),s._v(" "),a("div",{staticClass:"language-groovy line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-groovy"}},[a("code",[s._v("rootProject"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("name "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'crm-ses'")]),s._v("\nincludeFlat "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'common'")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("build.gradle文件")]),s._v(" "),a("div",{staticClass:"language-groovy line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-groovy"}},[a("code",[s._v("plugins "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    id "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot'")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2.2.6.RELEASE'")]),s._v("\n    id "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'io.spring.dependency-management'")]),s._v(" version "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1.0.9.RELEASE'")]),s._v("\n    id "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'java'")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\ngroup "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'com.boe.retail.data'")]),s._v("\nversion "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'0.0.1'")]),s._v("\nsourceCompatibility "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1.8'")]),s._v("\n\nconfigurations "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    compileOnly "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        extendsFrom annotationProcessor\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\nrepositories "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("mavenCentral")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\ndependencies "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n    implementation "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("project")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("':common'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n    implementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-starter-actuator'")]),s._v("\n    implementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-starter-web'")]),s._v("\n    implementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-starter-validation'")]),s._v("\n    annotationProcessor "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-configuration-processor'")]),s._v("\n\n    compileOnly "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.projectlombok:lombok:1.18.12'")]),s._v("\n    annotationProcessor "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.projectlombok:lombok:1.18.12'")]),s._v("\n\n    implementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.springframework.boot:spring-boot-starter-data-redis'")]),s._v("\n    runtimeOnly "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'mysql:mysql-connector-java'")]),s._v("\n\n\n\n    implementation "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'org.apache.commons:commons-csv:1.8'")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br"),a("span",{staticClass:"line-number"},[s._v("26")]),a("br"),a("span",{staticClass:"line-number"},[s._v("27")]),a("br"),a("span",{staticClass:"line-number"},[s._v("28")]),a("br"),a("span",{staticClass:"line-number"},[s._v("29")]),a("br"),a("span",{staticClass:"line-number"},[s._v("30")]),a("br"),a("span",{staticClass:"line-number"},[s._v("31")]),a("br"),a("span",{staticClass:"line-number"},[s._v("32")]),a("br"),a("span",{staticClass:"line-number"},[s._v("33")]),a("br"),a("span",{staticClass:"line-number"},[s._v("34")]),a("br"),a("span",{staticClass:"line-number"},[s._v("35")]),a("br"),a("span",{staticClass:"line-number"},[s._v("36")]),a("br"),a("span",{staticClass:"line-number"},[s._v("37")]),a("br"),a("span",{staticClass:"line-number"},[s._v("38")]),a("br"),a("span",{staticClass:"line-number"},[s._v("39")]),a("br"),a("span",{staticClass:"line-number"},[s._v("40")]),a("br"),a("span",{staticClass:"line-number"},[s._v("41")]),a("br")])])])}),[],!1,null,null,null);n.default=r.exports}}]);