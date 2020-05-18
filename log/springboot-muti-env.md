```xml
<springProfile name="staging">
    <!-- configuration to be enabled when the "staging" profile is active -->
</springProfile>

<springProfile name="dev | staging">
    <!-- configuration to be enabled when the "dev" or "staging" profiles are active -->
</springProfile>

<springProfile name="!production">
    <!-- configuration to be enabled when the "production" profile is not active -->
</springProfile>
```



https://docs.spring.io/spring-boot/docs/current-SNAPSHOT/reference/htmlsingle/


```xml
<springProperty scope="context" name="fluentHost" source="myapp.fluentd.host" defaultValue="localhost"/>
```
