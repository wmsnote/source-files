## 1. 环境搭建

### 1.1 maven

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.6.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.2</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-lang3</artifactId>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```


### 1.2 mysql

```sql
create database demo  DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;
```


```properties
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:3306/demo?useSSL=false&serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.platform=mysql
```

### 1.3 启动&测试

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {


    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
```

```java
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("say-hello")
    public Object sayHello(String name) {
        return "hello " + name;
    }

}
```

```bash
curl "http://localhost:8080/say-hello?name=wms"
hello wms%
```

## 2. 自定义 SpringMVC 枚举转换器

### 2.1 环境准备

首先，创建一个枚举，既有数字，又有字符串

```java
package com.example.demo.enums;

import lombok.Getter;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum MyNameEnum {


    WMS(1, "WMS"), WOMS(2, "WOMS"), WUMINGSHENG(3, "WUMINGSHENG");

    private Integer code;

    private String name;


}

```

改造一下controller，升级后的样子

```java
package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.enums.MyNameEnum;

@RestController
public class HelloController {

    private static final Logger Logger = LoggerFactory.getLogger(HelloController.class);

    @GetMapping("say-hello")
    public Object sayHello(@RequestParam("name") MyNameEnum myName) {
        Logger.info("[code={}&name={}]", myName.getCode(), myName.getName());
        return myName;
    }

}

```

测试一下

```bash
curl "http://localhost:8080/say-hello?name=WMS"
"WMS"%
```

日志输出如下：

```log
[code=1&name=WMS]
```

### 2.2 SpringMVC 自带枚举转换器

SpringMVC 自带了两个和枚举相关的转换器：

* org.springframework.core.convert.support.StringToEnumConverterFactory
* org.springframework.boot.convert.StringToEnumIgnoringCaseConverterFactory

这两个转换器是通过调用枚举的 `valueOf` 方法来进行转换的，感兴趣的同学可以自行查阅源码。

### 2.3 明确需求

springboot自身的转换器是根据枚举的 `valueOf` 方法，只能转换字符串形式的参数。如果前端给我们传递code数值，后端使用枚举类型接受，是否可以？（还用想吗）

### 2.4 实现自定义枚举转换器

虽然这两个转换器不能满足我们的需求，但它也给我们带来了思路，我们可以通过模仿这两个转换器来实现我们的需求：

实现 ConverterFactory 接口，该接口要求我们返回 Converter，这是一个典型的工厂设计模式

实现 Converter 接口，完成自定义数字属性到枚举类的转化


```java
package com.example.demo.config;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EnumConvertMethod {

}
```



```java


import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.apache.commons.lang3.reflect.MethodUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.lang.Nullable;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import lombok.AllArgsConstructor;

/**
 * springMVC 枚举类的转换器
 * 如果枚举类中有工厂方法(静态方法)被标记为{@link EnumConvertMethod },则调用该方法转为枚举对象
 */
@SuppressWarnings("all")
public class EnumMvcConverterFactory implements ConverterFactory<String, Enum<?>> {
    private final ConcurrentMap<Class<? extends Enum<?>>, EnumMvcConverterHolder> holderMapper = new ConcurrentHashMap<>();

    @Override
    public <T extends Enum<?>> Converter<String, T> getConverter(Class<T> targetType) {
        EnumMvcConverterHolder holder = holderMapper.computeIfAbsent(targetType, EnumMvcConverterHolder::createHolder);
        return (Converter<String, T>) holder.converter;
    }

    @AllArgsConstructor
    static class EnumMvcConverterHolder {
        @Nullable
        final EnumMvcConverter<?> converter;

        static EnumMvcConverterHolder createHolder(Class<?> targetType) {
            List<Method> methodList = MethodUtils.getMethodsListWithAnnotation(targetType, EnumConvertMethod.class, false, true);
            if (CollectionUtils.isEmpty(methodList)) {
                return new EnumMvcConverterHolder(null);
            }
            Assert.isTrue(methodList.size() == 1, "@EnumConvertMethod 只能标记在一个工厂方法(静态方法)上");
            Method method = methodList.get(0);
            Assert.isTrue(Modifier.isStatic(method.getModifiers()), "@EnumConvertMethod 只能标记在工厂方法(静态方法)上");
            return new EnumMvcConverterHolder(new EnumMvcConverter<>(method));
        }

    }

    static class EnumMvcConverter<T extends Enum<T>> implements Converter<String, T> {

        private final Method method;

        public EnumMvcConverter(Method method) {
            this.method = method;
            this.method.setAccessible(true);
        }

        @Override
        public T convert(String source) {
            if (source.isEmpty()) {
                // reset the enum value to null.
                return null;
            }
            try {
                return (T) method.invoke(null, Integer.valueOf(source));
            } catch (Exception e) {
                throw new IllegalArgumentException(e);
            }
        }

    }

}

```

1. EnumMvcConverterFactory ：工厂类，用于创建 EnumMvcConverter
2. EnumMvcConverter：自定义枚举转换器，完成自定义数字属性到枚举类的转化
3. EnumConvertMethod：自定义注解，在自定义枚举类的工厂方法上标记该注解，用于 EnumMvcConverter 来进行枚举转换



```java
package com.example.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    @Bean
    public EnumMvcConverterFactory enumMvcConverterFactory() {
        return new EnumMvcConverterFactory();
    }

    @Override
    public void addFormatters(FormatterRegistry registry) {
        // org.springframework.core.convert.support.GenericConversionService.ConvertersForPair.add
        // this.converters.addFirst(converter);
        // 所以我们自定义的会放在前面
        registry.addConverterFactory(enumMvcConverterFactory());
    }

}
```

> springboot会首先使用我们自己注册的转换器，然后才使用框架自带的字符串 `valueOf` 转换器

```java

package com.example.demo.enums;

import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.lang.Nullable;

import com.example.demo.config.EnumConvertMethod;


import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum MyNameEnum {

    WMS(1, "WMS"), WOMS(2, "WOMS"), WUMINGSHENG(3, "WUMINGSHENG");

    private Integer code;

    private String name;

     private static final Map<Integer, MyNameEnum> mappings;

    static {
        Map<Integer, MyNameEnum> temp = new HashMap<>();
        for (MyNameEnum courseType : values()) {
            temp.put(courseType.code, courseType);
        }
        mappings = Collections.unmodifiableMap(temp);
    }

    @EnumConvertMethod
    @Nullable
    public static MyNameEnum resolve(int code) {
        return mappings.get(code);
    }


}

```


```bash
curl "http://localhost:8080/say-hello?name=3"
"WUMINGSHENG"%
## 日志输出
# [code=3&name=WUMINGSHENG]
```


## 3. 自定义 ORM 枚举映射

```java
package com.example.demo.po;

import com.example.demo.enums.MyNameEnum;

import lombok.Data;


@Data
public class CourseMeta {

    private Long id;
    /**
     * {@link MyNameEnum}
     */
    private MyNameEnum code;

}
```


```java
package com.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.po.CourseMeta;

@Mapper
public interface CourseMetaMapper {

    int insert(CourseMeta courseMeta);

}

```

```properties
spring.datasource.url=jdbc:mysql://${MYSQL_HOST:127.0.0.1}:3306/demo?useSSL=false&serverTimezone=GMT%2B8&useUnicode=true&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.platform=mysql


mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true
mybatis.configuration.use-column-label=true
mybatis.type-aliases-package=com.example.demo.po
mybatis.mapper-locations=classpath:mapper/*.xml
```

> 最小配置有两种方式开启mybatis
> 1. 在每一个dao上加@mapper注解
> 2. 在启动类上加注解指定dao包@MapperScan("com.example.demo.dao")

```sql
create database demo  DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS course_meta (
id bigint(11) NOT NULL AUTO_INCREMENT primary key COMMENT 'ID',
code varchar(32) NOT NULL DEFAULT 0 COMMENT 'name'
) engine=innodb AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COMMENT='demo';
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.mapper.CourseMetaMapper">

  <insert id="insert" useGeneratedKeys="true" keyProperty="id" parameterType="CourseMeta">
    insert into course_meta(code) values (#{code})
  </insert>

</mapper>
```



首先，我们先看看MyBatis是否能够满足我们的需求。

MyBatis内置了两个枚举转换器分别是：

* org.apache.ibatis.type.EnumTypeHandler
* org.apache.ibatis.type.EnumOrdinalTypeHandler。

EnumTypeHandler 这是默认的枚举转换器，该转换器将枚举实例转换为实例名称的字符串，即将ComputerState.OPEN转换OPEN。
EnumTypeHandler是mybatis默认的枚举类型转换器，如果pojo类中使用了枚举类型，而配置文件没有指定类型转换类，mybatis将使用EnumTypeHandler处理枚举属性。
EnumTypeHandler的将把枚举类的name进行存储，枚举类的name即枚举类名。



EnumOrdinalTypeHandler 顾名思义这个转换器将枚举实例的ordinal属性作为取值，即ComputerState.OPEN转换为0,ComputerState.CLOSE转换为1。
EnumOrdinalTypeHandler是mybatis提供的另一种转换器，顾名思义这个转换类使用了枚举类的ordinal属性作为数据库存储信息，由于ordinal属性是int类型的，按照官网的说明数据库中对应资源应该是int或double类型的，但是个人测试过程中MYSQL的varchar字段也可以存储。

使用它的方式是在MyBatis配置文件中定义：

```xml
<typeHandlers>
    <typeHandler handler="org.apache.ibatis.type.EnumOrdinalTypeHandler" javaType="com.example.entity.enums.ComputerState"/>
</typeHandlers>
```
EnumTypeHandler和EnumOrdinalTypeHandler的区别主要是数据库中存储字段的类型差别，由于EnumOrdinalTypeHandler使用枚举类型的ordinal作为存储，所以必须使用数字类型字段存储。

Enum的属性中包含两个字段：
1）name（String类型，存储enum元素的字符串）
2）ordinal（int类型，存储enum元素的顺序，从0开始）

以上的两种转换器都不能满足我们的需求，所以看起来要自己编写一个转换器了。


```java

import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.lang.Nullable;

import com.example.demo.config.EnumConvertMethod;


import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum MyNameEnum {


    WMS(1, "WMS0000"), WOMS(2, "WOMS0000"), WUMINGSHENG(3, "WUMINGSHENG0000");

    private Integer code;

    private String name;



}

```

> mybatis-plus自带处理方法，没有这么麻烦


```java
package com.example.demo.mybatis;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import com.example.demo.enums.MyNameEnum;
import static org.apache.ibatis.type.JdbcType.*;

@MappedTypes(String.class)
@MappedJdbcTypes(value = {CLOB,CLOB,VARCHAR,LONGVARCHAR,NVARCHAR,NCHAR,NCLOB},includeNullJdbcType = true)
public class EnumMyNameHandler extends BaseTypeHandler<MyNameEnum> {


    // 用于定义设置参数时，该如何把Java类型的参数转换为对应的数据库类型
    // // baseTypeHandler已经帮我们做了parameter的null判断
    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, MyNameEnum parameter, JdbcType jdbcType) throws SQLException {
        // 根据数据库存储类型决定获取类型，本例子中数据库中存放int类型
         ps.setString(i, parameter.getName());
        //ps.setInt(i, parameter.ordinal());
    }

    // 用于定义通过字段名称获取字段数据时，如何把数据库类型转换为对应的Java类型
    @Override
    public MyNameEnum getNullableResult(ResultSet rs, String columnName) throws SQLException {
        // 根据数据库存储类型决定获取类型，本例子中数据库中存放string类型
        String name = rs.getString(columnName);
        //int i = rs.getInt(columnName);
        if (rs.wasNull()) {
            return null;
        } else {
            // 根据数据库中的值，定位Enum子类
            return locateEnum(name);
        }
    }

    // 用于定义通过字段索引获取字段数据时，如何把数据库类型转换为对应的Java类型
    @Override
    public MyNameEnum getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        // 根据数据库存储类型决定获取类型，本例子中数据库中存放int类型
        String name = rs.getString(columnIndex);
        //int i = rs.getInt(columnIndex);
        if (rs.wasNull()) {
            return null;
        } else {
            // 根据数据库中的值，定位Enum子类
            return locateEnum(name);
        }
    }

    // 用定义调用存储过程后，如何把数据库类型转换为对应的Java类型
    @Override
    public MyNameEnum getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        // 根据数据库存储类型决定获取类型，本例子中数据库中存放int类型
        String name = cs.getString(columnIndex);
        //int i = cs.getInt(columnIndex);
        if (cs.wasNull()) {
            return null;
        } else {
            // 根据数据库中的值，定位Enum子类
            return locateEnum(name);
        }
    }

    /**
     * 枚举类型转换
     *
     * @param value 数据库中存储的自定义属性
     * @return value对应的枚举类
     */
    private MyNameEnum locateEnum(String name) {
        for (MyNameEnum myNameEnum : MyNameEnum.values()) {
            if (myNameEnum.getName().equals(name)) {
                return myNameEnum;
            }
        }
        throw new IllegalArgumentException("未知的枚举类型：" + name);
    }
}



```

### 3.1 局部使用

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.example.demo.mapper.CourseMetaMapper">

  <insert id="insert" useGeneratedKeys="true" keyProperty="id" parameterType="CourseMeta">
    insert into course_meta(code) values (#{code, typeHandler=com.example.demo.config.EnumMyNameHandler})
  </insert>

</mapper>
```

查询可以参考下面这个案例

```xml
  <resultMap id="get" type="com.yulaiz.model.order.entity.OrderInfo">
    <result column="status" property="status"
            typeHandler="com.yulaiz.model.order.entity.enums.mybatis.EnumOrderStatusHandler"/>
</resultMap>
<select id="getOrderById" id="getOrderById" resultMap="get">
    SELECT id, status
    FROM order_test
    WHERE id = #{id}
</select>
```

### 3.2 全局使用

不需要修改xml

```xml
  <insert id="insert" useGeneratedKeys="true" keyProperty="id" parameterType="CourseMeta">
    insert into course_meta(code) values (#{code})
  </insert>
```

```properties
mybatis.configuration.map-underscore-to-camel-case=true
mybatis.configuration.use-generated-keys=true
mybatis.configuration.use-column-label=true
mybatis.type-aliases-package=com.example.demo.po
mybatis.type-handlers-package=com.example.demo.mybatis
mybatis.mapper-locations=classpath:mapper/*.xml
```


`mybatis.type-handlers-package=com.example.demo.mybatis` 多个用都好隔开，支持通配符`*`



测试一下

```
CourseMeta courseMeta = new CourseMeta();
courseMeta.setCode(MyNameEnum.WMS);
courseMetaMapper.insert(courseMeta);
```

## 4. Json序列化

到这里，我们已经解决了 SpringMVC 和 ORM 对自定义枚举的支持，那是不是这样就足够了呢？还有什么问题呢？

SpringMVC 的枚举转化器只能支持 GET 请求的参数转化，如果前端提交 JSON 格式的 POST 请求，那还是不支持的。

另外，在给前端输出 VO 时，默认情况下，还是要手动把枚举类型映射成 Integer 类型，并不能在 VO 中直接使用枚举输出。

### 4.1 @JsonValue 和 @JsonCreator

Jackson 是一个非常强大的 JSON 序列化工具，SpringMVC 默认也是使用 Jackson 作为其 JSON 转换器。

Jackson 为我们提供了两个注解，刚好可以解决这个问题。

- @JsonValue：在序列化时，只序列化 @JsonValue 注解标注的值
- @JsonCreator：在反序列化时，调用 @JsonCreator 标注的构造器或者工厂方法来创建对象


### 4.2 准备工作

```java
package com.example.demo.enums;

import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.lang.Nullable;

import com.example.demo.config.EnumConvertMethod;


import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum MyNameEnum {

    WMS(1, "WMS0000"), WOMS(2, "WOMS0000"), WUMINGSHENG(3, "WUMINGSHENG0000");

    private Integer code;

    private String name;

    private static final Map<Integer, MyNameEnum> mappings;

    static {
        Map<Integer, MyNameEnum> temp = new HashMap<>();
        for (MyNameEnum courseType : values()) {
            temp.put(courseType.code, courseType);
        }
        mappings = Collections.unmodifiableMap(temp);
    }

    @EnumConvertMethod
    @Nullable
    public static MyNameEnum resolve(int code) {
        return mappings.get(code);
    }

}
```

```java

package com.example.demo.vo;

import com.example.demo.enums.MyNameEnum;

import lombok.Data;


@Data
public class CourseMetaVO {

    private MyNameEnum name;

}

```

```java


    @GetMapping("say-hello")
    public Object sayHello() {

        CourseMetaVO courseMetaVO = new CourseMetaVO();
        courseMetaVO.setName(MyNameEnum.WOMS);
        return courseMetaVO;
    }
```


```bash
curl "http://localhost:8080/say-hello"
{"name":"WOMS"}%
```

### 4.3 序列化json

```java
import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.lang.Nullable;

import com.example.demo.config.EnumConvertMethod;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum MyNameEnum {
    WMS(1, "WMS0000"), WOMS(2, "WOMS0000"), WUMINGSHENG(3, "WUMINGSHENG0000");
    private Integer code;
    @JsonValue
    private String name;
    private static final Map<Integer, MyNameEnum> mappings;

    static {
        Map<Integer, MyNameEnum> temp = new HashMap<>();
        for (MyNameEnum courseType : values()) {
            temp.put(courseType.code, courseType);
        }
        mappings = Collections.unmodifiableMap(temp);
    }

    @EnumConvertMethod
    @Nullable
    public static MyNameEnum resolve(int code) {
        return mappings.get(code);
    }


}
```

```bash
{"name":"WOMS0000"}%
```

如果注解两个字段，会返回什么？

直接报错了：Multiple 'as-value' properties defined

### 反序列化Json

```java

import lombok.Getter;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.lang.Nullable;

import com.example.demo.config.EnumConvertMethod;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Getter
public enum MyNameEnum {

    WMS(1, "WMS0000"), WOMS(2, "WOMS0000"), WUMINGSHENG(3, "WUMINGSHENG0000");

    @JsonValue
    private Integer code;
    @JsonValue
    private String name;

    private static final Map<Integer, MyNameEnum> mappings;

    static {
        Map<Integer, MyNameEnum> temp = new HashMap<>();
        for (MyNameEnum courseType : values()) {
            temp.put(courseType.code, courseType);
        }
        mappings = Collections.unmodifiableMap(temp);
    }

    @EnumConvertMethod
    @JsonCreator(mode = JsonCreator.Mode.DELEGATING)
    @Nullable
    public static MyNameEnum resolve(int code) {
        return mappings.get(code);
    }


}
```

```java
    @PostMapping("say-hello")
    public Object sayHello(@RequestBody CourseMetaVO courseMetaVO) {
        System.out.println(courseMetaVO.toString());
        return "hello";

    }
```

```bash
curl "http://localhost:8080/say-hello" -X POST -H "Content-type: application/json" -d '{"name": 2}'
```














