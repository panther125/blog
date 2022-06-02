---
title: JDBC进阶
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# JDBC进阶使用
## 事务
* 案例代码
```java
        Connection con = null;
        PreparedStatement psm =null;
        //张无忌给郭襄转账500
        try{
            //注册驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            //获取连接
            String url="jdbc:mysql://127.0.0.1:3306/books?serverTimezone=UTC&useSSL=false";
            con = DriverManager.getConnection(url,"root","panther9985");
            //创建执行对象
            String sql="update test1 set salary=? where username=?";
            psm = con.prepareStatement(sql);
            //编写事务，并执行
            //开启事务
            con.setAutoCommit(false);
            //编写sql语句并执行
            psm.setDouble(1,500);
            psm.setString(2,"张无忌");
            psm.executeUpdate();
            //测试异常
            int i = 1/0;
            psm.setDouble(1,1500);
            psm.setString(2,"郭襄");
            psm.executeUpdate();
            //无异常提交
            con.commit();
        }catch(Exception e){
            try{
                //有异常回滚
                assert con != null;
                con.rollback();
            }catch(SQLException s){
                s.printStackTrace();
            }
        }finally{
            try{
                psm.close();
                con.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
```
:::warning
* 开启事务，取消事务自动提交功能`con.setAutoCommit(false)`
* 结束事务：提交`commit`或者回滚`rollback`
* 事务一般与try...catch连用，不处理异常会引起数据异常
* 开启事务的连接对象和获取命令的连接对象必须是同一个，否则事务无效。
:::
## 批处理
```java
private static void JDBCBatch() throws ClassNotFoundException, SQLException {
        //注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
        //建立连接
        String url="jdbc:mysql://127.0.0.1:3306/girls?rewriteBatchedStatements=true";
        Connection con = DriverManager.getConnection(url,"root","panther9985");
        //创建执行对象
        String sql = "insert into user values(null,?,?)";
        PreparedStatement psm = con.prepareStatement(sql);

        long startTime = System.currentTimeMillis();
        //通过批处理方法插入2000条数据
        for(int i =1; i <= 2000; i++){
            psm.setString(1,"john"+i);
            psm.setString(2,"666");
            psm.addBatch();//将sql语句添加到批处理中
            
            if(i%200==0){
                psm.executeBatch();//执行批处理sql语句
                psm.clearBatch();//情况批处理
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println(endTime-startTime);//90ms
```
:::warning
* 允许多条语句一次性提交给数据库批量处理，通常情况下效率更高
* JDBC如果需要批处理需要在url后面添加rewriteBatchedStatements=true
:::
## 存取BLOB类型文件
```java
//注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
        //建立连接
        String url="jdbc:mysql://127.0.0.1:3306/girls";
        Connection con = DriverManager.getConnection(url,"root","panther9985");
        //创建执行对象
        String sql = "update beauty set photo = ? where id = 1";
        PreparedStatement psm = con.prepareStatement(sql);
        psm.setString(1,new FileInputStream("D:\\1.jpg"));
        psm.executeUpdate();

        psm.close()
        con.close();
```
# 数据库连接池
**数据库连接池的必要性**
不使用数据库连接池存在的问题：
普通的JDBC数据库连接使用DriverManager.来获取，每次向数据库建立连接的时候都要将Connection加载到内存中，再验证IP地址，用户名和密码（得花费0.05s~ 1s的时间）。需要数据库连接的时候，就向数据库要求一个，执行完成后再断开连接。这样的方式将会消耗大量的资源和时间。
[数据库的连接资源并没有得到很好的重复利用]{.blue}，若同时有几百人甚至几千人在线，频繁的进行数据库连接操作将占用很多的系统资源，严重的甚至会造成服务器的崩溃。
* 对于每一次数据库连接，使用完后都得断开。否则，如果程序出现异常而[未能关闭]{.blue}，将会导致数据库系统中的[内存泄漏]{.blue}，最终将导致重启数据库。
* 这种开发不能控制被创建的连接对象数，系统资源会被毫无顾及的分配出去，如连接过多，也可能导致
[内存泄漏，服务器崩溃]{.blue}。
**为解决传统开发中的数据库连接问题**
可以采用[数据库连接池技术(connection pool)]{.red}:
* 数据库连接池的基本思想就是为数据库连接建立一个“缓冲池”。预先在缓冲池中放入一定数量的连接，当
需要建立数据库连接时，只需从`缓冲池`中取出一个，使用完毕之后再放回去。
[数据库连接池负责分配、管理和释放数据库连接]{.blue}，它允许应用程序
[重复使用一个现有的数据库连接，而不是重新建立一个]{.blue}。连接池的最大数据库连接数量限定了这个连接池能点有的最大连接数，当应用程序向连接池请求的连接数超过最大连接数量时，这些请求将被加入到等待队列中。
![](https://static01.imgkr.com/temp/e39dedccbd564670adac21ef57d697b4.png)
:::tip
数据库连接池技术的优点
:::
* **资源重用**：
由于数据库连接得以重用，避免了频繁创建，释放连接引起的大量性能开销。在减少系统消耗的基础上，另一方面也增加了系统运行环境的平稳性。
* **更快的系统反应速度**
数据连接池在初始化过程中，往往已经创建了若干数据库连接置于连接池中备用。此时连接的初始化工作均已完成。对于业务请求处理而言，直接利用现有可用连接，避免了数据库连接初始化和释放过程的时间开销，从而减少了系统的响应时间
* **新的资源分配手段**
对于多应用共享同一数据库的系统而言，可在应用层通过数据库连接池的配置，实现某一应用最大可用数据库连接数的限制，避免某一应用独占所有的数据库资源
* **统一的连接管理，避免数据库连接泄露**
在较为完善的数据库连接池实现中，可根据预先的占用超时设定，强制回收被占用连接，从而避免了常规数据库连接操作中可能出现的资源泄露
## Druid
 Druid是阿里巴巴开源平台上一个数据库连接池实现，它结合了C3P0、DBCP、Proxool等DB池的优点，同时加入了日志监控，可以很好的监控DB池连接和SQL的执行情况，可以说是针对监控而生的DB连接池，据说是目前最好的连接池。
:::tip
基本配置
:::
```java
1.initialSize ：连接池启动时创建的初始化连接数量（默认值为0）

2.maxActive ：连接池中可同时连接的最大的连接数（默认值为8，调整为20，高峰单机器在20并发左右）

3.maxIdle：连接池中最大的空闲的连接数，超过的空闲连接将被释放，如果设置为负数表示不限制(默认为8个,不能设置太小,因为假如在高负载的情况下，连接的打开时间比关闭的时间快，会引起连接池中idle的个数上升超过maxIdle,而造成频繁的连接销毁和创建,类似于jvm参数中的Xmx设置)

4.minIdle：连接池中最小的空闲的连接数，低于这个数量会被创建新的连接（默认为0，调整为5，该参数越接近maxIdle，性能越好，因为连接的创建和销毁，都是需要消耗资源的；但是不能太大，因为在机器很空闲的时候，也会创建低于minidle个数的连接，类似于jvm参数中的Xmn设置）

5.maxWait  ：最大等待时间，当没有可用连接时，连接池等待连接释放的最大时间，超过该时间限制会抛出异常，如果设置-1表示无限等待

6.poolPreparedStatements：开启池的prepared(默认是false，未调整，经过测试，开启后的性能没有关闭的好)

7.maxOpenPreparedStatements：开启池的prepared后的同时最大连接数(默认无限制，同上，未配置)

8.minEvictableIdleTimeMillis：连接池中连接，在时间段内一直空闲， 被逐出连接池的时间

9.removeAbandonedTimeout：超过时间限制，回收没有用的连接（默认为 300秒，调整为180）

10.removeAbandoned  ：超过removeAbandonedTimeout时间后，是否进行没用连接的回收(默认为false，调整为true)
```
:::tip
* 使用方式一
:::
由于有许多繁琐的调用导致对书写不友好接下来还会提供第二种方法
```java
DruidDataSource ds = new DruidDataSource();
        ds.setUrl("jdbc:mysql://localhost:3306/库名");
        ds.setUsername("root");
        ds.setPassword("123456");
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        
        ds.setInitialSize(10);//默认值0，应该在maxActive和minIdle之间
        ds.setMaxActive(20);//默认值8
        ds.setMinIdle(1);//默认值0
        //maxIdle是Druid为了方便DBCP用户迁移而增加的，maxIdle是一个混乱的概念。连接池只应该有maxPoolSize和minPoolSize，druid只保留了maxActive和minIdle，分别相当于maxPoolSize和minPoolSize。
        ds.setMaxIdle(5);
        //  获取连接时最大等待时间，单位毫秒。配置了maxWait之后，缺省启用公平锁，并发效率会有所下降，如果需要可以通过配置useUnfairLock属性为true使用非公平锁。
        ds.setMaxWait(1000);
        
        //配置间隔多久才进行一次检测，检测需要关闭的空闲连接，单位是毫秒
        ds.setTimeBetweenEvictionRunsMillis(60000);
        
        //配置一个连接在池中最小生存的时间，单位是毫秒
        ds.setMinEvictableIdleTimeMillis(300000);
        
        //是否缓存preparedStatement，也就是PSCache。PSCache对支持游标的数据库性能提升巨大，比如说oracle。在mysql下建议关闭。
        ds.setPoolPreparedStatements(true);
        //  要启用PSCache，必须配置大于0，当大于0时，poolPreparedStatements自动触发修改为true。在Druid中，不会存在Oracle下PSCache占用内存过多的问题，可以把这个数值配置大一些，比如说100
        ds.setMaxPoolPreparedStatementPerConnectionSize(10);
        //配置多个英文逗号分隔
        //通过别名的方式配置扩展插件，常用的插件有： 监控统计用的filter:stat日志用的filter:log4j防御sql注入的filter:wall
        ds.setFilters("stat,wall");
        
        Connection conn = ds.getConnection();
        System.out.println(conn);
```
:::tip
* 使用方式二
:::
* 通过配置文件可以省去大量的调用
```text
url=jdbc:mysql://localhost:3306/库名
username=root
password=panther9985
driverClassName=com.mysql.cj.jdbc.Driver
initialSize=10
maxActive=20
maxWait=1000
filters=wall
```
```java
//加载文件信息
Properties pro = new Properties();
        pro.load(new FileInputStream(src\\druid.properties));
        //创建数据库连接池
        DataSource ds = DruidDataSourceFactory.createDataSource(pro);
        //获取连接
        Connection conn = ds.getConnection();
```