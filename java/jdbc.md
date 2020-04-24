# jdbc

## 基本流程步骤

```java
		//1.加載驅動程序
		//	Class.forName(driverClass);
		//	加載mysql驅動		Class.forName("com.mysql.jdbc.Driver");
		//	加載oracle驅動	Class.forName("oracle.jdbc.driver.OracleDriver");
		Class.forName("com.mysql.jdbc.Driver");
		
		//2.獲取數據庫鏈接
		Connection conn = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/imooc", "root", "1234");

		//3.創建statement\PreparedStatement對象
		//conn.prepareStatement(sql);
		Statement statement = conn.createStatement();

		//4.通過statement創建查詢
		ResultSet resultSet = statement.executeQuery("select * from user");

		//5.從結果集中獲取下一行數據,指針同時移動到下一行
		while(resultSet.next()) {
          
			//通過field名獲取字段值
			String username = resultSet.getString("username");
			int password = resultSet.getInt("password");
          
			//通過字段角標獲取字段值
			String username = resultSet.getString(1);
		}
		//6.关闭资源
		resultSet.close();
		statement.close();
		
```

## DBUtil

```java
public class DBUtil {
	
	private static String URL = "jdbc:mysql://127.0.0.1:3306/imooc";
	private static String USERNAME = "root";
	private static String PASSWORD = "1234";
	private static Connection conn;
	//静态代码块先执行且只执行一次,获取数据库connection
	static {	
				try {
					Class.forName("com.mysql.jdbc.Driver");
					 conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		
	}
	public static Connection getConnection() {
		return conn;
	}

}
```

## insert数据

```java
	//获取数据库链接
		Connection conn = DBUtil.getConnection();
		//创建预编译Statement  
		PreparedStatement prepareStatement = conn.prepareStatement("insert into user (username,password) values (?,?)");
		//给预编译传参数赋值
		prepareStatement.setString(1, "woms");
		prepareStatement.setInt(2, 20);
		//执行sql
		prepareStatement.execute();
		prepareStatement.close();
```

## update数据

```java
	//获取数据库链接
		Connection conn = DBUtil.getConnection();
		//创建预编译Statement  
		PreparedStatement prepareStatement = conn.prepareStatement("update  user set username = ? and password = ? where id = ?");
		//给预编译传参数赋值
		prepareStatement.setString(1, "woms");
		prepareStatement.setInt(2, 20);
		prepareStatement.setInt(3, 1232132131);
		//执行sql
		prepareStatement.execute();
		prepareStatement.close();
```

## delete数据

```java
	//获取数据库链接
		Connection conn = DBUtil.getConnection();
		//创建预编译Statement  
		PreparedStatement prepareStatement = conn.prepareStatement("delete from user where id = ?");
		//给预编译传参数赋值
		prepareStatement.setInt(1, 1232132131);
		//执行sql
		prepareStatement.execute();
		prepareStatement.close();
```

## select数据

```java
	//获取数据库链接
		Connection conn = DBUtil.getConnection();
		//创建预编译Statement  
		PreparedStatement prepareStatement = conn.prepareStatement("select * from user where id = ?");
		//给预编译传参数赋值
		prepareStatement.setInt(1, 1232132131);
		//执行sql
		ResultSet resultSet = prepareStatement.executeQuery();
		while(resultSet.next()) {
			String username = resultSet.getString("username");
			//String username = resultSet.getString(1);通过索引index查询field
		}
		resultSet.close();
		prepareStatement.close();
```

## Statement和PrepareStatement区别

> Statement和PrepareStatement可以认为是与数据库的一次交互,可以执行多sql语句(包括insert,update,select,delete)

1. preparedstatement预处理sql减少sql执行,支持批处理效率更高; statement在对数据库只执行一次性存取的时侯，用 Statement 对象进行处理。PreparedStatement对象的开销比Statement大，对于一次性操作并不会带来额外的好处。

2. prepareStatement可以替换变量?动态参数化防止sql注入

   ​



## JDBC事物

如果JDBC连接处于自动提交模式，默认情况下，则每个SQL语句在完成后都会提交到数据库。

对于简单的应用程序可能没有问题，但是有三个原因需要考虑是否关闭自动提交并管理自己的事务 -

- 提高性能
- 保持业务流程的完整性
- 使用分布式事务

事务能够控制何时更改提交并应用于数据库。 它将单个SQL语句或一组SQL语句视为一个逻辑单元，如果任何语句失败，整个事务将失败。

要启用手动事务支持，而不是使用JDBC驱动程序默认使用的自动提交模式，请调用`Connection`对象的`setAutoCommit()`方法。 如果将布尔的`false`传递给`setAutoCommit()`，则关闭自动提交。 也可以传递一个布尔值`true`来重新打开它。

```java
//设置事物自动提交为手动
conn.setAutoCommit(false);
//提交事物
conn.commit( );
//回滚事物
conn.rollback( );
```

> http://www.yiibai.com/jdbc/jdbc-transactions.html

```java
try{
   //Assume a valid connection object conn
   conn.setAutoCommit(false);
   Statement stmt = conn.createStatement();

   String SQL = "INSERT INTO Employees  " +
                "VALUES (106, 20, 'Rita', 'Tez')";
   stmt.executeUpdate(SQL);  
   //Submit a malformed SQL statement that breaks
   String SQL = "INSERTED IN Employees  " +
                "VALUES (107, 22, 'Sita', 'Singh')";
   stmt.executeUpdate(SQL);
   // If there is no error.
   conn.commit();
}catch(SQLException se){
   // If there is any error.
   conn.rollback();
}
```



## JDBC批量处理

批量处理允许将相关的SQL语句分组到批处理中，并通过对数据库的一次调用来提交它们，一次执行完成与数据库之间的交互。

一次向数据库发送多个SQL语句时，可以减少通信开销，从而提高性能。

- 不需要JDBC驱动程序来支持此功能。应该使用`DatabaseMetaData.supportsBatchUpdates()`方法来确定目标数据库是否支持批量更新处理。如果JDBC驱动程序支持此功能，该方法将返回`true`。
- `Statement`，`PreparedStatement`和`CallableStatement`的`addBatch()`方法用于将单个语句添加到批处理。 `executeBatch()`用于执行组成批量的所有语句。
- `executeBatch()`返回一个整数数组，数组的每个元素表示相应更新语句的更新计数。
- 就像将批处理语句添加到处理中一样，可以使用`clearBatch()`方法删除它们。此方法将删除所有使用`addBatch()`方法添加的语句。 但是，无法指定选择某个要删除的语句。

```java
// Create SQL statement
String SQL = "INSERT INTO Employees (id, first, last, age) " +
             "VALUES(?, ?, ?, ?)";

// Create PrepareStatement object
PreparedStatemen pstmt = conn.prepareStatement(SQL);

//Set auto-commit to false
conn.setAutoCommit(false);

// Set the variables
pstmt.setInt( 1, 400 );
pstmt.setString( 2, "JDBC" );
pstmt.setString( 3, "Li" );
pstmt.setInt( 4, 33 );
// Add it to the batch
pstmt.addBatch();

// Set the variables
pstmt.setInt( 1, 401 );
pstmt.setString( 2, "CSharp" );
pstmt.setString( 3, "Liang" );
pstmt.setInt( 4, 31 );
// Add it to the batch
pstmt.addBatch();

//add more batches
.
.
.
.
//Create an int[] to hold returned values
int[] count = stmt.executeBatch();

//Explicitly commit statements to apply changes
conn.commit();
```





























