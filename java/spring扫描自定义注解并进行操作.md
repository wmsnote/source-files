# spring扫描自定义注解并进行操作

转载：http://blog.csdn.net/cuixuefeng1112/article/details/45331233

```java
/**
 * 扫描注解添加服务到缓存以供判断时候为对外开放service
 */
@Component
@Lazy(true)
class AnnotationScannerConfigurer implements BeanDefinitionRegistryPostProcessor {
    
ArrayList<String> cache=RemoteCache.getCache();





    @Override

    public void postProcessBeanDefinitionRegistry(BeanDefinitionRegistry beanDefinitionRegistry) throws BeansException {

    }

    @Override

    public void postProcessBeanFactory(ConfigurableListableBeanFactory postProcessBeanFactory) throws BeansException {

         Map<String, Object> map=configurableListableBeanFactory.getBeansWithAnnotation(RemoteTag.class);

         for (String key : map.keySet()) {

        cache.add(key);

            //System.out.println("beanName= "+ key );

         }

    }

}
```

我的`AnnotationScannerConfigurer ` 实现了`BeanDefinitionRegistryPostProcessor` ，spring启动时会执行`postProcessBeanFactory`方法，
通过`postProcessBeanFactory`我们就可以拿到`@RemoteTag`所修饰的bean了。然后随你怎么操作。

使用`BeanDefinitionRegistryPostProcessor` 是从mybaties的spring扫描实现类得到灵感的。

注意：@Lazy(true)是因为最后加载才能确保把所有@RemoteTag修饰的bean得到并进行操作。

 

SpringBoot：已经找到方法了。我用的是类继承`ApplicationListener<ContextRefreshedEvent> `
然后用`event.getApplicationContext().getBeansWithAnnotation(TableBind.class);`即可
多谢大家