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