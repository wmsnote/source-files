## 添加多数据源的配置

先在Spring Boot的配置文件application.properties中设置两个你要链接的数据库配置，比如这样：


```properties
spring.datasource.primary.jdbc-url=jdbc:mysql://localhost:3306/test1
spring.datasource.primary.username=root
spring.datasource.primary.password=123456
spring.datasource.primary.dirver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.primary.jdbc-url=jdbc:mysql://localhost:3306/test2
spring.datasource.primary.username=root
spring.datasource.primary.password=123456
spring.datasource.primary.dirver-class-name=com.mysql.cj.jdbc.Driver
```

**说明:**


1. 多数据源配置的时候，与单数据源不同点在于spring.datasource之后多设置一个数据源名称primary和secondary来区分不同的数据源配置，这个前缀将在后续初始化数据源的时候用到。
2. 数据源连接配置2.x和1.x的配置项是有区别的：2.x使用spring.datasource.secondary.jdbc-url，而1.x版本使用spring.datasource.secondary.url。如果你在配置的时候发生了这个报错java.lang.IllegalArgumentException: jdbcUrl is required with driverClassName.，那么就是这个配置项的问题。
3. 可以看到，不论使用哪一种数据访问框架，对于数据源的配置都是一样的。



##　初始化数据源与MyBatis配置

完成多数据源的配置信息之后，就来创建个配置类来加载这些配置信息，初始化数据源，以及初始化每个数据源要用的MyBatis配置。

这里我们继续将数据源与框架配置做拆分处理：

1. 单独建一个多数据源的配置类，比如下面这样：

```java
@Configuration
public class DataSourceConfiguration {

    @Primary
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    public DataSource primaryDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.secondary")
    public DataSource secondaryDataSource() {
        return DataSourceBuilder.create().build();
    }

}
```

可以看到内容跟JdbcTemplate、Spring Data JPA的时候是一模一样的。
通过`@ConfigurationProperties`可以知道这两个数据源分别加载了`spring.datasource.primary.*`和`spring.datasource.secondary.*`的配置。
`@Primary`注解指定了主数据源，就是当我们不特别指定哪个数据源的时候，就会使用这个Bean真正差异部分在下面的JPA配置上。

2. 分别创建两个数据源的MyBatis配置

Primary数据源的JPA配置：

```java
@Configuration
@MapperScan(
        basePackages = "com.didispace.chapter39.p",
        sqlSessionFactoryRef = "sqlSessionFactoryPrimary",
        sqlSessionTemplateRef = "sqlSessionTemplatePrimary")
public class PrimaryConfig {

    private DataSource primaryDataSource;

    public PrimaryConfig(@Qualifier("primaryDataSource") DataSource primaryDataSource) {
        this.primaryDataSource = primaryDataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactoryPrimary() throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(primaryDataSource);
        return bean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplatePrimary() throws Exception {
        return new SqlSessionTemplate(sqlSessionFactoryPrimary());
    }

    @Bean(name="primaryTransactionManager")
    public PlatformTransactionManager primaryTransactionManager(@Qualifier("primaryDataSource") DataSource primaryDataSource){
        return new DataSourceTransactionManager(primaryDataSource);
    }

}
```

Secondary数据源的JPA配置：

```java
@Configuration
@MapperScan(
        basePackages = "com.didispace.chapter39.s",
        sqlSessionFactoryRef = "sqlSessionFactorySecondary",
        sqlSessionTemplateRef = "sqlSessionTemplateSecondary")
public class SecondaryConfig {

    private DataSource secondaryDataSource;

    public SecondaryConfig(@Qualifier("secondaryDataSource") DataSource secondaryDataSource) {
        this.secondaryDataSource = secondaryDataSource;
    }

    @Bean
    public SqlSessionFactory sqlSessionFactorySecondary() throws Exception {
        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(secondaryDataSource);
        return bean.getObject();
    }

    @Bean
    public SqlSessionTemplate sqlSessionTemplateSecondary() throws Exception {
        return new SqlSessionTemplate(sqlSessionFactorySecondary());
    }

    @Bean(name="secondaryTransactionManager")
    public PlatformTransactionManager secondaryTransactionManager(@Qualifier("secondaryDataSource") DataSource secondaryDataSource){
        return new DataSourceTransactionManager(secondaryDataSource);
    }


}
```

**说明与注意：**

配置类上使用`@MapperScan`注解来指定当前数据源下定义的Entity和Mapper的包路径；
另外需要指定`sqlSessionFactory`和`sqlSessionTemplate`，这两个具体实现在该配置类中类中初始化。
配置类的构造函数中，通过`@Qualifier`注解来指定具体要用哪个数据源，其名字对应在`DataSourceConfiguration`配置类中的数据源定义的函数名。
配置类中定义SqlSessionFactory和SqlSessionTemplate的实现，注意具体使用的数据源正确（如果使用这里的演示代码，只要第二步没问题就不需要修改）。

上一篇介绍JPA的时候，因为之前介绍JPA的使用时候，说过实体和Repository定义的方法，所以省略了 User 和 Repository的定义代码，但是还是有读者问怎么没有这个，其实都有说明，仓库代码里也都是有的。未避免再问这样的问题，所以这里就贴一下吧。

根据上面Primary数据源的定义，在`com.didispace.chapter39.p`包下，定义Primary数据源要用的实体和数据访问对象，比如下面这样：

```java
@Data
@NoArgsConstructor
public class UserPrimary {

    private Long id;

    private String name;
    private Integer age;

    public UserPrimary(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}

public interface UserMapperPrimary {

    @Select("SELECT * FROM USER WHERE NAME = #{name}")
    UserPrimary findByName(@Param("name") String name);

    @Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
    int insert(@Param("name") String name, @Param("age") Integer age);

    @Delete("DELETE FROM USER")
    int deleteAll();

}
```


根据上面Secondary数据源的定义，在`com.didispace.chapter39.s`包下，定义Secondary数据源要用的实体和数据访问对象，比如下面这样：


```java
@Data
@NoArgsConstructor
public class UserSecondary {

    private Long id;

    private String name;
    private Integer age;

    public UserSecondary(String name, Integer age) {
        this.name = name;
        this.age = age;
    }
}

public interface UserMapperSecondary {

    @Select("SELECT * FROM USER WHERE NAME = #{name}")
    UserSecondary findByName(@Param("name") String name);

    @Insert("INSERT INTO USER(NAME, AGE) VALUES(#{name}, #{age})")
    int insert(@Param("name") String name, @Param("age") Integer age);

    @Delete("DELETE FROM USER")
    int deleteAll();
}
```














