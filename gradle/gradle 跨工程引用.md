# gradle 跨工程引用

由于项目需要，SDK的工程和主工程需要在不同的目录：

```
root
    |-SDK-project
        |-lib
    |-App-project
        |-app
```

模块app需要SDK-project工程目录下的lib，但在`settings.gradle`中是不能直接include ‘:SDK-project:lib’的。
这时候就需要一个特殊方法：`includeFlat`
`includeFlat `可以引入和当前工程同一级上的工程，但不能引入模块。模块还是需要`include`来引入。

`settings.gradle`中修改为：

```groovy
includeFlat 'SDK-project'
include 'SDK-project:lib'
include 'app'

```
在 app 的build.gradle中的 dependencies的引用：
```
dependencies {
     implementation project(':SDK-project:lib')
}
```