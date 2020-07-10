yum install postgresql10-server postgresql10

postgresql.org/download/linux/redhat             网址


验证是否安装成功   rpm -qa|grep postgresql10

安装完成以后,默认创建用户 postgresql:postgresql   [linux用户, 非DB用户]


默认数据库路径: /var/lib/pgsql/10/data

修改数据库路径: 配置文件=> /usr/lib/systemd/system/postgresql-10.service

    如果修改数据库路径:
    mdkir /mydb
    chown -R postgres:postgres mydb
    chmod 700 mydb
    vi /usr/lib/system/systemd/postgresql-10.service
    # on line 30
    Environment=PGDATA=/mydb

初始化数据库,并没有启动数据库进程
/usr/pgsql-10/bin/postgresql-10-setup initdb

设置远程访问[这个配置文件在上面初始化完成以后生成的,配置文件所在的路径是数据库路径,就是上面默认的数据库路径]
vi /var/lib/pgsql/10/data/postgresql.conf
修改 `listen_addresses = "*"`

信任远程连接(文件位置同上)
vi /var/lib/pgsql/10/data/pg_hba.conf
添加   `host     all     all     0.0.0.0/0     md5`

systemctl enable postgresql-10   开机自启动
systemctl start postgresql-10   启动数据库    ss -lunt|grep 5432  默认端口5432







-----



su - postgres   切换到postgres用户 `-`: 不仅切换到postgres身份 还切换到了postgres的shell环境
pgsql -h 主机
      -p 端口
      -U 用户


psql -U postgres(数据库用户) postgres(数据库)

说明:

- 数据库用户是初始化数据库,自动创建的数据库用户
  1. 超级用户
  2. 和安装程序时创建的系统用户同名(不指定数据库用户,默认使用当前linux同名的用户登录, so, 直接运行 psql 也是可以的, 因为当前shell用户是postgres正好和数据库用户同名 )
- postgres数据库是初始化数据库自动创建的默认数据库

修改密码的两种方式:
方式一: psql -c "alter user postgres with password '123456'"
ALTER ROLE 说明修改成功
方式二:
psql
postgres = #\password



postgresql和oracle很像, mysql是现有用户,给用户分配库
postgresql是先有模式(逻辑区),模式下面创建库



-------------

\password 修改密码
\q 退出
\l 列出database
\du 列出role
\c dbname 切换DB
\d show tables
\d+ table describe table
\d table show columns from dbtable
\? 查看psql命令列表
\conninfo 列出连接信息
\h command 查看command详细使用方法




mysql 简单.快速.高效.流行(全世界最流行的数据库)
psql  高级.安全.稳定.全名(全世界最高级的数据库)

psql建表有三种表:常规.外部.分区

外部表是把外部的数据库表或者文件映射成一张好像是psql自己的表一样
分区表是psql内置了分表的功能,通过一些规则自动拆分表

自增di怎么实现? create table 模式.表名 (id serial);
serial其实是int类型的,会自动创建一个sequence,从这个sequence获取id































































