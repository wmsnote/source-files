Travis 为上面这些阶段提供了7个钩子。:seven:




```
- before_install：install 阶段之前执行
- before_script：script 阶段之前执行
- after_failure：script 阶段失败时执行
- after_success：script 阶段成功时执行
- before_deploy：deploy 步骤之前执行
- after_deploy：deploy 步骤之后执行
- after_script：script 阶段之后执行
```





完整的生命周期，从开始到结束是下面的流程。



```
- before_install
- install
- before_script
- script
- aftersuccess or afterfailure
- [OPTIONAL] before_deploy
- [OPTIONAL] deploy
- [OPTIONAL] after_deploy
- after_script
```

