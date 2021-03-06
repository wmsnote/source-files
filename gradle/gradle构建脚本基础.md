# gradle构建脚本基础

## 1. gradle常用命令

```groovy
//列出项目的所有属性. 这样你就可以看到插件加入的属性以及它们的默认值.
gradle properties

//列出项目的所有任务
gradle -q tasks --all
//列出所有项目
gradle -q project

```

## 2. 字符串

1. ' '      仅仅表示一个字符串
2. " "     字符串拼接，可以拼接变量${变量}，也可以拼接任务$$任务
3. ''' '''    可以用来换行


## 3. 定义常量

> 一个项目对应一个project实例,gradle根据build.gradle配置内容实例化project实例
>
> project属性有group,name,version
>
> 方法有apply ,repositories,dependencies,task
>
> 属性的其他配置方式可以通过 : ext , gradle.properties

```groovy
ext.property1 = "this is property1"
//也可以用闭包的方式
ext {
   property2 = "this is property2"
}
```


## 4. 定义任务



```groovy
task hello {
    doLast {
        println 'Hello world!'
    }
}
```

快捷的定义方式，使用<< 代替 doLast{}  

 << 操作符是 doLast 的简单别称.

```groovy
task helloWorld << {

	
		println 'helloWorld343'
	
}
```

默认任务定义，调用任何任务都会执行的任务,没有<< 也米有doLast{}

```groovy
task defaultmytask {
	println 'ddddddd'
}
```

声明任务之间的依赖

```groovy
build.dependsOn hello
```



intro 依赖于 hello, 所以执行 intro 的时候 hello 命令会被优先执行来作为启动 intro 任务的条件.

在加入一个依赖之前, 这个依赖的任务不需要提前定义

```groovy
task hello << {
    println 'Hello world!'
}

task intro(dependsOn: hello) << {
    println "I'm Gradle"
}
//多依赖
任务测试（dependsOn：[compile，compileTest]）{
    doLast {
        println '运行单元测试'
    }
}
```

动态任务

下面的times是遍历，counter是遍历的变量名

```groovy
4.times { counter ->
    task "task$counter" << {
        println "I'm task number $counter"
    }
}
```



## 5. 使用插件

```groovy
//方式一
plugins {
	id 'war'
    id 'org.hidetake.ssh' version '2.9.0' apply false
}


//方式二
//插件
apply plugin: 'java-library'
apply plugin: 'eclipse'
apply plugin: 'maven'
apply plugin: 'java'
```


## 6. 使用仓库

```groovy
repositories
{
  //第三方仓库
	maven{url 'http://maven.aliyun.com/nexus/content/groups/public/'}
  //maven中央仓库
	mavenCentral()
	jcenter()
}
```


## 7. 添加依赖

```groovy
dependencies {
    compile group: 'commons-collections', name: 'commons-collections', version: '3.2'
    testCompile group: 'junit', name: 'junit', version: '4.+'
}
```


## 8. 定制项目

```groovy
//jdk版本
sourceCompatibility = 1.8
//编码
[compileJava,compileTestJava,javadoc]*.options*.encoding = 'UTF-8' 
//项目版本
version = '1.0'
```


## 9. 上传jar包

```groovy
uploadArchives {
    repositories {
       flatDir {
           dirs 'repos'
       }
    }
}
```

```groovy
uploadArchives {  
    repositories {  
        mavenDeployer {  
			//userName  和 password 为maven的用户名和密码  
            repository(url: "http://172.30.10.160:8081/nexus/content/repositories/snapshots/") {  
                authentication(userName: "deploy", password: "deploy123")  
            }  
            pom.project {  
                name=project.name  
                packaging='jar'  
                description='a test'  
            }  
        }  
    }  
}  
```

> 也可以使用maven-publish插件


## 10. 多项目构建

```groovy
//settings.gradle

//上下层级构建多项目

rootProject.name = '111'

include '111-1'
include '111-2'
//同一层级构建多项目

rootProject.name = '111'

includeFlat '111-1'
includeFlat '111-2'
```

## 11. 项目之间的依赖

```groovy
dependencies {
   
   compile project(":111-2") 
   
}
```

## 12. 解决版本冲突

1. 查看依赖报告
2. 排除传递性依赖
3. 强制指定一个版本

>groovy默认使用最高版本帮助我们解决版本冲突

```groovy
//修改默认策略,如果由版本冲突,就构建失败
configurations.all {
	resolutionStrategy {
		failOnVersionConflict()
	}
}

//解决方式
//1-1.在制定模块上排除传递性依赖
dependencies {
 	compile (''){
 		exclude 
 	}
}

//1-2.排除整个模块参考：http://www.paincker.com/gradle-dependencies#i-2
configurations {
　　//exclude后的参数有group和module，可以分别单独使用
   all*.exclude group: 'org.slf4j', module: 'slf4j-log4j12'
}


//2.强制指定一个版本
configurations.all {
	resolutionStrategy {
		failOnVersionConflict()
        force ''
	}
}
```



## 13. 多项目构建-公共配置

> allprojects对所有的项目有效
>
> subprojects对所有的项目有效也可以个性化定制

```groovy
allprojects {
	apply plugin: 'java'
	sourceCompatibility = 1.8
	
	
	
	//修改默认策略,如果由版本冲突,就构建失败
	configurations.all {
		resolutionStrategy {
			failOnVersionConflict()
		}
	}

	uploadArchives {
	    repositories {
	       flatDir {
	           dirs 'repos'
	       }
	    }
	}

}
//仓库,依赖放在allprojects中也可以
subprojects {
	//仓库
	repositories {
    	jcenter()
	}
	//依赖
	dependencies {
	 	
	}
	
	
}
```

属性也可以定义在gradle.properties

```pro
group=com.home.woms
version=1.1.1
```

## 14. 多项目构建-独享配置

在父项目bulid.gradle中配置子项目

```groovy
project(‘:core’) {
      ext{
                   hibernateVersion = ‘4.2.1.Final’
      }
	dependencies { 
    		compile “org.hibernate:hibernate-core:${hibernateVersion}”
	}
}
```

## 15. 多项目构建-多环境配置

> http://www.infoq.com/cn/articles/Gradle-application-in-large-Java-projects/

### 15-1. 通过指定不同的资源文件目录

> https://github.com/someok/gradle-multi-project-example

- resources： 通用配置放在这儿
- resources-dev： 开发环境配置
- resources-prod： 生产环境配置

```groovy
apply plugin: 'war'

archivesBaseName = 'project-web'
version = '1.0.0'

//
// 设置默认 resources 为开发环境状态
//
// 这儿如果不设置的话，idea 编译时只会默认获取 resources 目录
//
sourceSets {
    main {

        resources {
            srcDirs = ['src/main/resources', 'src/main/resources-dev']
        }
    }
}



task release (dependsOn : war)  {
	doFirst{
	
		 sourceSets {
            main {
                resources {
                    srcDirs = ["src/main/resources", "src/main/resources-prod"]
                }
            }
        }
	
	}
	doLast{
	
		println "${sourceSets.main.resources.srcDirs}"
	}

}
```

- gradle war： 这个是用来打测试的 war 包，采用的是 resources-dev。
- gradle release： 这个才是用来打生产用的 war 包，采用的是 resources-prod。

```groovy

  if (!hasProperty('profile')) ext.profile = 'dev'


sourceSets {
    main {
        resources {
            srcDir "config/application/spring/${profile}", 
                        "config/application/properties/${profile}"
        }
    }
}
//这样在打包的过程中，就可以使用-P传入的参数的资源文件夹下面的properties和xml文件作为项目的配置文件。
```

### 15-2. 传统的properties文件

```groovy
//第一种方式是使用传统的properties文件， 然后在使用Gradle时，通过传入不同的参数加载不同的properties文件。例如，我们可以在项目中提供development.properties、test.properties和production.properties。在项目运行时，使用-Pprofile=development来指定加载开发环境的配置。构建脚本中加载properties文件的代码如下

allprojects{
	apply plugin: 'java'
	if (!hasProperty('profile')) ext.profile = 'dev'
  //gradle构建过程中的默认任务processResources，重写
	processResources {//替换文件使用@key@来标注要被替换的位置，例如 username=@username@
	    from(sourceSets.main.resources.srcDirs) {
	        filter(org.apache.tools.ant.filters.ReplaceTokens,tokens: loadProperties())
	    }
	}
}
def loadProperties(){
    def props = new Properties()
    new File("${rootProject.projectDir}/conf/${profile}.properties")
            .withInputStream {
                stream -> props.load(stream)
            }
    props
}
```



### 15-3. config.groovy配置文件

```groovy

def loadGroovy(){
    def configFile = file('config.groovy')
    new ConfigSlurper(profile).parse(configFile.toURL()).toProperties()
}
//替换
processResources {
	    from(sourceSets.main.resources.srcDirs) {
	        filter(org.apache.tools.ant.filters.ReplaceTokens,tokens: loadGroovy())
	    }
	   
	    
	}
```



## 16. 构建脚本的依赖



除了项目需要依赖之外，构建脚本本身也可以有自己的依赖。当使用一个非Gradle官方提供的插件时，就需要在构建脚本里指定其依赖，当然还需要指定该插件的Repository。在Gradle中，使用buildscript块为构建脚本配置依赖。

比如在项目中使用cucumber-JVM作为项目BDD工具，而Gradle官方没有提供它的插件，好在开源社区有人提供cucumber的插件。在构建脚本中添加如下代码：

```groovy
buildscript {
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath "gradle-cucumber-plugin:gradle-cucumber-plugin:0.2"
    }
}
apply plugin: com.excella.gradle.cucumber.CucumberPlugin
```



## 17. apply其他Gradle文件

当一个项目很复杂的时候，Gradle脚本也会很复杂，除了将子项目的配置移到对应项目的构建脚本之外，还可以可以按照不同的功能将复杂的构建脚本拆分成小的构建脚本，然后在build.gradle里使用apply from，将这些小的构建脚本引入到整体的构建脚本中去。比如在一个项目中既使用了Jetty，又使用了Cargo插件启动JBoss，就可以把他们分别提到jetty.gradle和jboss.gradle，然后在build.gradle里使用如下的代码将他们引入进来：

```groovy
apply from: "jetty.gradle"
apply from: "jboss.gradle"
```

## 18. 定义资源目录

```groovy
sourceSets {
    main {
        java {
            srcDir 'src/main/java' // 指定源码目录
        }
        resources {
            srcDir 'src/main/resources' //资源目录
        }
    }
}

//或者
sourceSets {
    main.java.srcDirs = ['src/main/java']
    main.resources.srcDirs = ['src/main/resources']
}
```


## 19. gradle三大脚本

| Type of script  | Delegates to instance of | 脚本名称                          | 脚本位置    |
| --------------- | ------------------------ | ----------------------------- | ------- |
| Build script    | Project                  | build.gradle                  | 项目路径下   |
| Init script     | Gradle                   | xxx.gradle 例如buildScan.gradle | init.d  |
| Settings script | Settings                 | settings.gradle               | root项目下 |

1. 全局配置 : 在gradle安装目录下../gradle-3.5/init.d
2. 用户配置 : 在用户主目录下../.gradle/init.d


## 20. -P和-D

**在命令行中通过-D或者-P给Gradle实时创建属性。** `-D`属性会被传送给启动Gradle的jvm，作为一个系统属性被jvm使用。`-P`属性则会被直接加载到Gradle领域对象上。



```groovy
task hello  {
     println System.properties['guestName']
     println project['dev']
}
```

```shell
user@user-PC:~/user/workspace/hhde$ gradle hello -DguestName=uat -Pdev=hello
Picked up _JAVA_OPTIONS:   -Dawt.useSystemAAFontSettings=gasp
uat
hello
:hello UP-TO-DATE

BUILD SUCCESSFUL

Total time: 0.844 secs
```

```groovy
//分别判断是否存在可以使用下面两种方式
System.getProperty("name") == null ? "lly" : System.getProperty("name")
project.hasProperty('dev')
```

```groovy
//官方写法
if (!hasProperty('profile')) ext.profile = 'dev'


	
task hello{

println "${profile}"

}

```

