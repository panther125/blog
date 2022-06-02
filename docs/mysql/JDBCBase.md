---
title: JDBC
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
JDBC API是一个Java API可以访问任何类型的数据库的数据，尤其是存储在关系数据库中的数据。 JDBC的工作原理与Java在各种平台一样，如Windows，Mac OS和各种版本的UNIX系统。
# 使用JDBC
:::tip
1. 导入jar包
:::
![](/bokepicture/mysql-connector-java-5.1.37-bin.zip)
:::tip
2. 注册驱动
:::
![](https://static01.imgkr.com/temp/16dc73cf79894b2da99a87be0542e0ec.png)
```java
import com.mysql.jdbc.Driver

public static void main(String[] args) throws ClassNotFoundException {
        Class.forName("com.mysql.jdbc.Driver");
    }
```
:::tip
3. 获取连接
:::
```java
  Connection con =DriverManager.getConnection("jdbc:mysql://localhost:3306/表名","用户","密码");
```
:::tip
4. 获取执行者对象
:::
```java
 Statement stm=con.createStatement();//返回一个向数据库发送语句的Statement对象
 //返回一个PreparedStatement对象，向数据库发送参数化sql语句
 PreparedStatement ppd =con.PreparedStatement(String s);
//返回CallableStatement对象，该对象用于调用sql的存储过程
 CallableStatement cs = con.prepareCall();
```
[PreparedStatement]{.label .tip}
```java
String sql = "insert into user value(?,?,?)";
 PreparedStatement psm = conn.prepareStatement(sql);

//在PreparedStatement对象中执行sql语句，必须是DML语句或无返回值的sql语句
 int executeUpdate()
 //
 ResultSet executeQuert()//执行sql查询
void setInt(int parameterIndex,int x)//将指定的参数设置为int类型的x
void setFloat(int parameterIndex,float x)//将指定的参数设置为float类型的x
void setString(int parameterIndex,String x)//将指定的参数设置为String类型的x
void setDate(int parameterIndex,Date x)//将指定的参数设置为Date类型的x
void addBatch()//将一组参数添加到PreparedStatement对象的批处理命令中

```
:::tip
5. 写sql语句并执行
:::
```java
 String sql = "select * from 表名"
 RusultSet rs1 = stm.executeQuery(sql);//用于执行sql语句的select语句
 int rs2 = stm.executeUpdate(sql);//用于执行sql语句的update,delete,insert语句
 boolean rs1 = stm.execute(sql);//用于执行各种sql语句
```
:::tip
6. 保存JDBC查询的结果集，并输出
:::
```java
 rs.getString(int ColumnIndex)//获取string类型的值，columnindex代码字段索引
 rs.getString(String ColumnName)//获取string类型的值，columnName代码字段名称
 rs.getInt(int ColumnIndex)//获取int类型的值，columnindex代码字段索引
 rs.getInt(String ColumnName)//获取int类型的值，columnName代码字段名称
 rs.getDate(int ColumnIndex)//获取date类型的值，columnindex代码字段索引
 rs.getDate(String ColumnName)//获取date类型的值，columnName代码字段名称

 boolean next();//将游标向下移一行
 boolean absolute(int row)//将游标移动到指定行
 boolean previous()//将游标向上移一行
```
## 完整的JDBC代码
```java
 Connection con = null;
        Statement star =null;
        ResultSet rs =null;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            //创建连接
            String url = "jdbc:mysql://127.0.0.1:3306/girls?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC&useSSL=false";
            con = DriverManager.getConnection(url, "root", "panther9985");
            //生成执行者
            star =con.createStatement();
            //写sql语句
            String sql = "SELECT * FROM test";
            //执行
            rs =star.executeQuery(sql);
            //处理结果
            while(rs.next()){
                System.out.println(rs.getInt("id")+"\t"+rs.getString("name"));
            }
        }catch(Exception e){
            e.printStackTrace();
        }finally{
            assert rs != null;
            rs.close();
            star.close();
            con.close();
        }
```
## 案列sql版的判断登录
```java
         //注册驱动
        Class.forName("com.mysql.cj.jdbc.Driver");
        //建立连接
        String url = "jdbc:mysql://127.0.0.1:3306/girls?useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC&useSSL=false";
        Connection conn = DriverManager.getConnection(url,"root","panther9985");

        //生成执行对象
        //Statement stam = conn.createStatement();
        PreparedStatement psm = conn.prepareStatement("?");
        //写sql语句执行
        String sql  = "select * from user";
        //接受sql执行的语句
        ResultSet rs =psm.executeQuery(sql);
        String[] number = new String[3];
        String[] password = new String[3];
        int i=0;
        while(rs.next()){
           number[i] = rs.getString(2);
           password[i] = rs.getString(3);
            i++;
        }
        Scanner sc = new Scanner(System.in);
        for(int j =0; j < 5; j++){
            System.out.println("请输入账号");
            String UserNumber =sc.nextLine();
            System.out.println("请输入密码");
            String UserPassword = sc.nextLine();
            for(int k =0; k < 3; k++){
                if(UserNumber.equals(number[k])&&UserPassword.equals(password[k])){
                    System.out.println("登录成功");
                    return;
                }else if(UserNumber.equals(number[k])){
                    System.out.println("密码输入错误");
                }else if(UserPassword.equals(password[k])){
                    System.out.println("账号不存在");
                    break;
                }else{
                    System.out.println("输入错误");
                    break;
                }
            }
            System.out.println("还剩"+(4-j)+"次机会");
        }
        rs.close();
        psm.close();
        conn.close();

```
## 案例通过配置文件完成JDBC
* 由于Driver和connection和数据库地址及用户名都是几乎相同的，所以我们可以用配置文件将他们封装起来,创建一个JDBC.properties文件存放以下数据
```text
driver=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://127.0.0.1:3306/表名
user=用户名
password=密码
```
* 通过Properties加载文件数据
```java
//通过配置文件书写JDBC
        Properties prop = new Properties();
        //加载配置文件数据
        prop.load(new FileInputStream("D:\\download\\java\\JDBC\\src\\jdbc.properties"));
        //获取对应键值并与JDBC配合注册连接
        String driver = prop.getProperty("driver");
        Class.forName(driver);
        //获取连接
        String sql = prop.getProperty("url");
        String user = prop.getProperty("user");
        String password = prop.getProperty("password");
        System.out.println(sql);
        Connection con = DriverManager.getConnection(sql,user,password);

        //创建执行对象
        PreparedStatement psm = con.prepareStatement("?");
        String mysql = "select id,name,sex,borndate from beauty";
        ResultSet ps = psm.executeQuery(mysql);
        //输出一行sql数据
        //移动游标，默认在第一行的上面
        boolean flag = ps.next();
        //输出
        int id = ps.getInt(1);
        String name = ps.getString("name");
        String sex = ps.getString(3);
        Date born = ps.getDate("borndate");
        System.out.println(id+"\t"+name+"\t"+sex+"\t"+born);

        //关闭资源
        ps.close();
        psm.close();
        con.close();
```
# JDBC踩坑
:::warning
* MySQLNonTransientConnectionException
:::
[报错原因]{.label .tip}
mysql驱动版本与mysql数据库不一致;
[解决方法]{.label .warning}
更换mysql数据库版本一致的mysql驱动
我的Mysql是8.0版本，导入项目里的jar包是5.1版本，导致不匹配出错。
更换为8.0版本可以(jdk是1.8版本)
:::warning
* Loading class com.mysql.jdbc.Driver.This is deprecated. The new driver
:::
[报错原因]{.label .tip}
加载类`com.mysql.jdbc.Driver`已经被弃用
[解决方法]{.label .warning}
新的驱动程序类是`com.mysql.cj.jdbc.Driver`。驱动程序是通过SPI自动注册的，手动加载驱动程序类通常是不必要的。所以只需要在`application.yml`文件中把`com.mysql.jdbc.Driver`修改为`com.mysql.cj.jdbc.Driver`即可
:::warning
WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
:::
[报错原因]{.label .tip}
警告:不建议在没有服务器身份验证的情况下建立SSL连接。根据MySQL 5.5.45+，如果没有设置显式选项，默认情况下必须建立5.6.26+和5.7.6+要求的SSL连接。您需要通过设置useSSL=false显式禁用SSL，或者设置useSSL=true并为服务器证书验证提供信任存储。
[解决方法]{.label .warning}
其实这个错并不用管，如果看着烦可以加上这句话
```java
useSSL=false
```
:::warning
Server returns invalid timezone. Go to 'Advanced' tab and set 'serverTimezon'
:::
[报错原因]{.label .tip}
intellij idea连接mysql数据库时报错:Server returns invalid timezone. Go to ‘Advanced’ tab and set ‘serverTimezon’,即时区无效，需要设置时区
[解决方法]{.label .warning}
在Advanced中将serverTimezone设置成UTC即可
:::warning
javax.net.ssl.SSLException: closing inbound before receiving peer‘s close_notify
:::
[报错原因]{.label .tip}
MySQL 8.0 以上版本不需要建立 SSL 连接的，需要显式关闭。
[解决方法]{.label .warning}
之前版本，安全性做的并不够好，比如安装时生成的root空密码账号、存在任何用户都能连接上的 test 库等，导致数据库存在较大的安全隐患。从5.7版本开始MySQL官方对这些问题逐步进行了修复，到了 MySQL 8.0 以上版本已经不需要使用 SSL 进行连接加密了。但是高版本仍然保留了这个接口，所以需要在连接的时候手动写明是否需要进行 SSL 连接，这里我们手动关闭 SSL 连接加密就OK。即在sql地址后面添加`useSSL=false`