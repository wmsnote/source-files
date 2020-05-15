| 组件                    | 功能介绍                |
| --------------------- | ------------------- |
| commons-configuration | 读取配置文件工具类           |
| commons-beanutils     | javabean工具类         |
| commons-lang3          | 字符串，数组，日期工具类        |
| commons-collections4   | 集合工具类               |
| commons-io            | io、file、filename工具类 |
| commons-fileupload    | 文件上传工具类             |
|                       |                     |

# commons-configuration

commons-configuration 最主要的作用是读取资源文件，每一种文件格式都有一个对应的类，如下

- properties文件--PropertiesConfiguration类
- xml文件--XMLConfiguration
- .ini文件--INIConfiguration
- .plist文件--PropertyListConfiguration
- 还可以从JNDI中读取properties--JNDIConfiguration
- 当然还可以使用system的properties--SystemConfiguration
- 等等...

http://blog.csdn.net/davidhsing/article/details/5846944

读取properties文件

```java
//注意路径默认指向的是 classpath 的根目录
Configuration config = new PropertiesConfiguration("te/test.properties");
String ip=config.getString("ip");
int port=config.getInt("port");
String title=config.getString("application.title");
//再举个Configuration的比较实用的方法吧,在读取配置文件的时候有可能这个键值对应的值为空，那么在下面这个方法中
//你就可以为它设置默认值。比如下面这个例子就会在test.properties这个文件中找id的值，如果找不到就会给id设置值为123
Integer id=config.getInteger("id", new Integer(123));
//如果在properties 文件中有如下属性keys=cn,com,org,uk,edu,jp,hk
//可以实用下面的方式读取：
String[] keys1=config.getStringArray("keys");
List keys2=config.getList("keys");
```

读取xml文件

```java
XMLConfiguration config = new XMLConfiguration("XMLtest.xml");
String backColor = config.getString("colors.background");
String textColor = config.getString("colors.text");
//现在我们知道了如何读取标签下的数据，那么如何读标签中的属性呢？看下面
//<link normal="#000080" visited="#800080"/>
String linkNormal = config.getString("colors.link[@normal]");
//还支持引用呢！
//<default>${colors.header}</default>
String defColor = config.getString("colors.default");
//也支持其他类型，但是一定要确定类型正确，否则要报异常哦
//<rowsPerPage>15</rowsPerPage>
int rowsPerPage = config.getInt("rowsPerPage");
```

# commons-beanutils

使用`commons-beanutils`，我们可以很方便的对bean对象的属性进行操作

- MethodUtils,通过反射访问对象的方法并且执行方法

- ConstructorUtils,通过反射提供了构造方法相关的便捷操作方法

- PropertyUtils,通过反射提供了对象属性的便捷操作方法

- BeanUtils,通过反射提供了Bean对象的便捷操作方法

- ConvertUtils,提供了数据类型相互转换的方法


克隆bean

```java
     //克隆
        Person person2 =  (Person)BeanUtils.cloneBean(person);
```

bean和map相互转换

```java
		//将一个map转换成一个bean
		Map<String,Object> map = new HashMap<>();
		map.put("username", "woms");
		map.put("age", 18);
		Person person = new Person();
		BeanUtils.populate(person, map);
		//bean->map
		person.setAge(17);
		person.setUsername("woms");
		Map<String, String> map = BeanUtils.describe(person);//<String, String>
		Map<String, Object> map = PropertyUtils.describe(person);//<String, Object>
```

# commons-lang

**Lang **主要是一些公共的工具集合，比如对字符、数组、日期的操作等等

- StringUtils 该类主要提供对字符串的操作,对null是安全的,主要提供了字符串查找,替换,分割,去空白,去掉非法字符等等操作
- ObjectUtils 主要是对null进行安全处理,可以设置为null时的默认返回值,比较相等时是调用对象的equals方法,因此需要对对象进行方法进行覆盖
- SystemUtils 主要获取一些系统属性,例如工作目录等等
- DateUtils/CalendarUtils 主要提供了对日期的操作,包括日期加减,日期格式化,日期比较,一定时间范围内日期的迭代等等
- StopWatch 提供秒表的计时,暂停等功能
- EqualsBuilder/HashCodeBuilder提供了方便的方法来覆盖equals() 和hashCode()方法
- 以Range结尾的类主要提供一些范围的操作,包括判断某些字符,数字等是否在这个范围以内
- ArrayUtils 提供了数组的复制,查找,获取子数组,反转等功能

# commons-collections

- org.apache.commons.collections – Commons Collections自定义的一组公用的接口和工具类
- org.apache.commons.collections.bag – 实现Bag接口的一组类
- org.apache.commons.collections.bidimap – 实现BidiMap系列接口的一组类
- org.apache.commons.collections.buffer – 实现Buffer接口的一组类
- org.apache.commons.collections.collection – 实现java.util.Collection接口的一组类
- org.apache.commons.collections.comparators – 实现java.util.Comparator接口的一组类
- org.apache.commons.collections.functors – Commons Collections自定义的一组功能类
- org.apache.commons.collections.iterators – 实现java.util.Iterator接口的一组类
- org.apache.commons.collections.keyvalue – 实现集合和键/值映射相关的一组类
- org.apache.commons.collections.list – 实现java.util.List接口的一组类
- org.apache.commons.collections.map – 实现Map系列接口的一组类
- org.apache.commons.collections.set – 实现Set系列接口的一组类

# commons-io

- 工具类
  - FileUtils主要提供方便操作文件/目录的方法
  - FilenameUtils
  - IOUtils主要提供更便捷的操作流的方法
- 输入
- 输出
- 过滤器
- 比较器
- 文件监控器


http://www.importnew.com/13715.html

# commons-fileupload

- FileItem接口是对用户上传文件的封装
- DiskFileItemFactory 实现了FileItemFactory接口
- ServletFileUpload从FileUpload继承，而FileUpload又从FileUploadBase继承，功能：分析传入的request对象、得到文件列表FileItemIterator……

```java
	//* 检查请求是否含有上传文件
    boolean isMultipart = ServletFileUpload.isMultipartContent(request);

```

