## MyBatis插件-慢sql耗时监控插件

很多情况我们系统要分析出来那些查询很慢，其实可以通过mybatis开发一个插件，去监控每次执行的sql耗时，如果超过配置的时间，则认为该sql属于慢sql需要优化。日志里面就会打印每一个sql及相应的时间消耗

MyBatis插件-慢sql耗时监控插件

```xml
<!-- SQL 执行性能分析，开发环境使用，线上不推荐。 maxTime 指的是 sql 最大执行时长 -->
<plugin interceptor="com.easy521.performance.SqlPerformanceInterceptor">
    <property name="maxTime" value="1000" />
</plugin>
```



```java
/**
 * @author 郏高阳
 * @date 2020/4/29
 * @jdk.version 1.8
 * @desc mybatis执行sql性能分析插件
 */
package com.easy521.performance;
import java.lang.reflect.Field;
import java.sql.Statement;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.defaults.DefaultSqlSession.StrictMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
@Intercepts({@Signature(
    type = StatementHandler.class,
    method = "query",
    args = {Statement.class, ResultHandler.class}
), @Signature(
    type = StatementHandler.class,
    method = "update",
    args = {Statement.class}
), @Signature(
    type = StatementHandler.class,
    method = "batch",
    args = {Statement.class}
)})
public class SqlPerformanceInterceptor implements Interceptor {
    private static final Logger logger = LoggerFactory.getLogger(SqlPerformanceInterceptor.class);
    private long maxTime = 1000L; // 最大耗时
    public SqlPerformanceInterceptor() {
    }
    public Object intercept(Invocation invocation) throws Throwable {
        Object target = invocation.getTarget();
        StatementHandler statementHandler = (StatementHandler)target;
        long start = SystemClock.now();
        Object result = invocation.proceed();
        long sqlCost = SystemClock.now() - start;
        BoundSql boundSql = statementHandler.getBoundSql();
        String sql = boundSql.getSql();
        Object parameterObject = boundSql.getParameterObject();
        List<ParameterMapping> parameterMappingList = boundSql.getParameterMappings();
        sql = this.formatSql(sql, parameterObject, parameterMappingList);
        if (sqlCost < this.maxTime) {
            logger.info("SQL:{}  执行耗时:{}ms", sql, sqlCost);
        } else {
            logger.info("SQL:{}  执行耗时:{}ms  超过最大执行时间", sql, sqlCost);
        }
        return result;
    }
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }
    public void setProperties(Properties properties) {
        String maxTime = properties.getProperty("maxTime");
        if (!StringUtils.isEmpty(maxTime)) {
            this.maxTime = Long.parseLong(maxTime);
        }
    }
    private String formatSql(String sql, Object parameterObject, List<ParameterMapping> parameterMappingList) {
        if (sql != null && sql.length() != 0) {
            sql = this.beautifySql(sql);
            if (parameterObject != null && parameterMappingList != null && parameterMappingList.size() != 0) {
                try {
                    if (parameterMappingList != null) {
                        Class<?> parameterObjectClass = parameterObject.getClass();
                        if (this.isStrictMap(parameterObjectClass)) {
                            StrictMap<Collection<?>> strictMap = (StrictMap)parameterObject;
                            if (this.isList(((Collection)strictMap.get("list")).getClass())) {
                                sql = this.handleListParameter(sql, (Collection)strictMap.get("list"));
                            }
                        } else if (this.isMap(parameterObjectClass)) {
                            Map<?, ?> paramMap = (Map)parameterObject;
                            sql = this.handleMapParameter(sql, paramMap, parameterMappingList);
                        } else {
                            sql = this.handleCommonParameter(sql, parameterMappingList, parameterObjectClass, parameterObject);
                        }
                    }
                    return sql;
                } catch (Exception var7) {
                    return sql;
                }
            } else {
                return sql;
            }
        } else {
            return "";
        }
    }
    private String beautifySql(String sql) {
        sql = sql.replaceAll("[\\s\n ]+", " ");
        return sql;
    }
    private String handleListParameter(String sql, Collection<?> col) {
        String value;
        if (col != null && col.size() != 0) {
            for(Iterator var3 = col.iterator(); var3.hasNext(); sql = sql.replaceFirst("\\?", value)) {
                Object obj = var3.next();
                value = null;
                Class<?> objClass = obj.getClass();
                if (this.isPrimitiveOrPrimitiveWrapper(objClass)) {
                    value = obj.toString();
                } else if (objClass.isAssignableFrom(String.class)) {
                    value = "\"" + obj.toString() + "\"";
                }
            }
        }
        return sql;
    }
    private String handleMapParameter(String sql, Map<?, ?> paramMap, List<ParameterMapping> parameterMappingList) {
        Iterator var4 = parameterMappingList.iterator();
        while(var4.hasNext()) {
            ParameterMapping parameterMapping = (ParameterMapping)var4.next();
            Object propertyName = parameterMapping.getProperty();
            Object propertyValue = paramMap.get(propertyName);
            if (propertyValue != null) {
                if (propertyValue.getClass().isAssignableFrom(String.class)) {
                    propertyValue = "\"" + propertyValue + "\"";
                }
                sql = sql.replaceFirst("\\?", propertyValue.toString());
            }
        }
        return sql;
    }
    private String handleCommonParameter(String sql, List<ParameterMapping> parameterMappingList, Class<?> parameterObjectClass, Object parameterObject) throws Exception {
        String propertyValue;
        for(Iterator var5 = parameterMappingList.iterator(); var5.hasNext(); sql = sql.replaceFirst("\\?", propertyValue)) {
            ParameterMapping parameterMapping = (ParameterMapping)var5.next();
            propertyValue = null;
            if (this.isPrimitiveOrPrimitiveWrapper(parameterObjectClass)) {
                propertyValue = parameterObject.toString();
            } else {
                String propertyName = parameterMapping.getProperty();
                Field field = parameterObjectClass.getDeclaredField(propertyName);
                field.setAccessible(true);
                propertyValue = String.valueOf(field.get(parameterObject));
                if (parameterMapping.getJavaType().isAssignableFrom(String.class)) {
                    propertyValue = "\"" + propertyValue + "\"";
                }
            }
        }
        return sql;
    }
    private boolean isPrimitiveOrPrimitiveWrapper(Class<?> parameterObjectClass) {
        return parameterObjectClass.isPrimitive() || parameterObjectClass.isAssignableFrom(Byte.class) || parameterObjectClass.isAssignableFrom(Short.class) || parameterObjectClass.isAssignableFrom(Integer.class) || parameterObjectClass.isAssignableFrom(Long.class) || parameterObjectClass.isAssignableFrom(Double.class) || parameterObjectClass.isAssignableFrom(Float.class) || parameterObjectClass.isAssignableFrom(Character.class) || parameterObjectClass.isAssignableFrom(Boolean.class);
    }
    private boolean isStrictMap(Class<?> parameterObjectClass) {
        return parameterObjectClass.isAssignableFrom(StrictMap.class);
    }
    private boolean isList(Class<?> clazz) {
        Class<?>[] interfaceClasses = clazz.getInterfaces();
        Class[] var3 = interfaceClasses;
        int var4 = interfaceClasses.length;
        for(int var5 = 0; var5 < var4; ++var5) {
            Class<?> interfaceClass = var3[var5];
            if (interfaceClass.isAssignableFrom(List.class)) {
                return true;
            }
        }
        return false;
    }
    private boolean isMap(Class<?> parameterObjectClass) {
        Class<?>[] interfaceClasses = parameterObjectClass.getInterfaces();
        Class[] var3 = interfaceClasses;
        int var4 = interfaceClasses.length;
        for(int var5 = 0; var5 < var4; ++var5) {
            Class<?> interfaceClass = var3[var5];
            if (interfaceClass.isAssignableFrom(Map.class)) {
                return true;
            }
        }
        return false;
    }
    public long getMaxTime() {
        return this.maxTime;
    }
    public void setMaxTime(long maxTime) {
        this.maxTime = maxTime;
    }
}
```











