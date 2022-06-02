---
title: DbUtils
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# Apache-DBUtils简介
* commons--dbutils是`Apache`
组织提供的一个开源JDBC工具类库，它是对JDBC的简单封装，学习成本极低，并且使用dbutils能极大简化dbc编码的工作量，同时也不会影响程序的性能。
* API介绍：
1. org.apache.commons.dbutils.QueryRunner
2. org.apache.commons.dbutils.ResultSetHandler
3. 工具类：org.apache.commons.dbutils.DbUtils
# 测试
## 测试插入
```java
 @Test
    public void testInsert() throws SQLException {
        Connection connection = null;
        try {
            connection = JDBCutil.getConnection();

            QueryRunner queryRunner = new QueryRunner();
            String sql = "insert into beauty(id,name,boyfriend_id) values(?,?,?)";
            queryRunner.update(connection,sql,2,"zerotwo",3);

            System.out.println("修改成功");
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JDBCutil.close(connection,null);
        }
    }
```
## 测试删除
```java
 @Test
    public void testDelete() {
        Connection conn = null;
        try {
            conn = JDBCutil.getConnection();
            QueryRunner queryRunner = new QueryRunner();
            String sql = "delete from beauty where id = ?";
            queryRunner.update(conn, sql, 1);
            System.out.println("删除成功");
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCutil.close(conn,null);
        }
    }
```
## 测试修改
```java

    @Test
    public void testUpdate(){
        Connection conn = null;
        try {
            conn = JDBCutil.getConnection();
            QueryRunner queryRunner = new QueryRunner();
            String sql = "UPDATE beauty set name = ? where id = ?";
            queryRunner.update(conn, sql, "阿宁",9);
            System.out.println("修改成功");
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCutil.close(conn,null);
        }

    }
```
# 查找
## 查找表中得一条数据
:::tip
使用BeanHandler
:::
```java
/**
     * BeanHandler是resultSetHander接口实现类，用于处理表中得一条数据
     * @Author panther
     * @return void
     **/
    @Test
    public void testQuery1(){
        Connection conn = null;
        try {
            QueryRunner queryRunner1 = new QueryRunner();

            conn = JDBCutil.getConnection();
            String sql = "select id,name,sex from beauty where id = ?";

            user user = queryRunner1.query(conn, sql, new BeanHandler<>(user.class), 14);
            System.out.println(user);
        } catch (Exception e){
            e.printStackTrace();
        }finally {
            JDBCutil.close(conn,null,null);
        }
    }
```
:::tip
使用MapHandler
:::
```java
 /**
     * @Author panther
     * @return MapHanler处理表中得一条数据，以map方式存储
     **/
    @Test
    public void testQuery3(){
        Connection connection = null;
        try {
            QueryRunner runner = new QueryRunner();

            connection = JDBCutil.getConnection();
            String sql = "select id,name,sex from beauty where id = ?";

            MapHandler handler = new MapHandler();

            Map<String, Object> map = runner.query(connection, sql, 9, handler);

            System.out.println(map);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCutil.close(connection,null);
        }

    }
```
## 查找表中得多条数据
:::tip
使用BeanListHandler
:::
```java
/**
     * BeanListHandler是resultSetHander接口实现类，用于处理表中得多条数据
     * @Author panther
     * @return
     **/
    @Test
    public void testQuery2(){
        Connection connection =null;
        try {
            QueryRunner runner = new QueryRunner();
            connection = JDBCutil.getConnection();

            String sql = "select id,name,sex from beauty where id > ?";
            BeanListHandler<user> handler = new BeanListHandler<>(user.class);

            List<user> list = runner.query(connection, sql, 4, handler);
            list.forEach(System.out::println);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCutil.close(connection,null);
        }
    }
```
:::tip
使用MapListHandler
:::
```java
/**
     * @Author panther
     * @return MapListHanler处理表中得多条数据
     **/
    @Test
    public void testQuery4() {
        Connection connection = null;
        try {
            QueryRunner runner = new QueryRunner();
            connection = JDBCutil.getConnection();
            String sql = "select id,name,sex from beauty where id > ?";

            MapListHandler mapListHandler = new MapListHandler();

            List<Map<String, Object>> list = runner.query(connection, sql, 4, mapListHandler);

            list.forEach(System.out::println);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCutil.close(connection,null);
        }

    }
```
## 查找特殊字段
```java
 /**
     * @Author panther
     * @return 处理特殊字段
     **/
    @Test
    public void testQuery5(){
        Connection connection = null;
        try {
            QueryRunner runner = new QueryRunner();

            connection = JDBCutil.getConnection();
            String sql = "select COUNT(*) from beauty";

            ScalarHandler scalarHandler = new ScalarHandler();
            Long query = (Long)runner.query(connection, sql, scalarHandler);

            System.out.println(query);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            JDBCutil.close(connection,null);
        }

    }
```