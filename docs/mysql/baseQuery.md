---
title: SQL基础查询
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# 基础
SQL 语句不区分大小写，但是数据库表名、列名和值是否区分依赖于具体的 DBMS 以及配置。
sql基本操作
```sql
-- 启动MySQL
    net start mysql
-- 创建Windows服务
    sc create mysql binPath= mysqld_bin_path(注意：等号与值之间有空格)
/* 连接与断开服务器 */
mysql -h 地址 -P 端口 -u 用户名 -p 密码
SHOW PROCESSLIST -- 显示哪些线程正在运行
SHOW VARIABLES -- 显示系统变量信息
```

SQL 支持以下三种注释:
```sql
# 注释
SELECT *
FROM mytable; -- 注释
/* 注释1
   注释2 */
```
## 数据库创建
```sql
CREATE DATABASE myemployees;
```
## 导入数据库
使用库名，类似于Java导包
```sql
USE myemployees;
```
## 创建表
```sql
CREATE TABLE mytable (
  id INT NOT NULL AUTO_INCREMENT,
  col1 INT NOT NULL DEFAULT 1,
  col2 VARCHAR(45) NULL,
  col3 DATE NULL,
  PRIMARY KEY (`id`));
```
## 修改表
**普通插入**
```sql
INSERT INTO mytable(col1, col2)
VALUES(val1, val2);
```
**插入检索出来的数据**
```sql
INSERT INTO mytable1(col1, col2)
SELECT col1, col2
FROM mytable2;
```
**将一个表的内容插入一个新表**
```sql
CREATE TABLE newtable AS
SELECT * FROM mytable;
```
**删除表**
```sql
DROP TABLE mytable;
```
## 修改表数据
**添加列**
```sql
ALTER TABLE mytable
ADD col CHAR(20);
```
:::warning
新增的属性不能定义位NOT NULL，因为基本表在增加一个属性后，原来所有记录在新增的属性列的值都被定义为空值（NULL）
:::
**修正原属性数据类型**
```sql
ALTER TABLE mytable COLUMN AGE SMALLINT
ALTER TABLE mytable MODIFY COLUMN 列名 新类型
```
**修改列名**
```sql
ALTER TABLE mytable CHANGE COLUMN 旧列名 新列名
```
**删除列**
```sql
ALTER TABLE mytable 
DROP COLUMN col;
```
**修改表名**
```sql
ALTER TABLE mytable rename to 新表名
```
使用更新和删除操作时一定要用 WHERE 子句，不然会把整张表的数据都破坏。可以先用 SELECT 语句进行测试，防止错误删除。
## 修改数据
:::top no-icon
**插入数据**
```sql
INSERT INTO 表名 value (值，...)
INSERT INTO 表名 values (值,...),(值,...)
```
:::
**更新数据**
:::top no-icon
```sql
UPDATE 表名 SET 列名=值 WHERE 筛选条件
```
:::
:::top no-icon
**删除数据**
```sql
DELETE FROM 表名 WHERE 筛选条件
TRUNCATE FROM 表名
```
:::
## 修改约束
**添加约束或修改约束**
:::top no-icon
* 列级约束修改
```sql
ALTER TABLE 表名 MODIFY COLUMN 列名 新类型 新约束;
```
* 表级约束添加
```sql
ALTER TABLE 表名 ADD COLUMN 约束
```
:::
**删除约束**
:::top no-icon
```sql
ALTER TABLE 表名 DROP PRIMARY KEY;
```
:::
# 查询语法
        语法：
                select  接需要查询的东西
                form   接表名;
        特点：
1. 查询列表可以是：表中的字段，常量，表达式，函数
2. 查询的结构是一个虚拟的表格


查询表中的单个字段，例如last_namelast_namelast_name
```sql
SELECT last_name FROM employees;
```
查询表中多个字段
```sql
SELECT last_name,email,salary FROM employees;
```
查询表中所有字段
```sql
SELECT * FROM employees;
```
查询常量值
```sql
SELECT 100;
SELECT 'john';
```
查询函数显示sql版本
```sql
SELECT VERSION();
```
# 起别名
起别名 方便阅读便于理解 as可加可不加
```sql
SELECT 100/5 AS 结果;
SELECT last_name AS 姓,first_name AS 名 FROM employees;
SELECT last_name 姓,first_name 名 FROM employees;
```
# 去重 
关键字：DISTINCT
```sql
SELECT DISTINCT department_id FROM employees;
```
# 拼接字符串
```sql
SELECT
        CONCAT(last_name,' ',first_name)
AS
        姓名
FROM
        employees;
```
# 查询表中数据的结构类型
```sql 
DESC employees;
```
# 转换空值
判断空值，字符串拼接时空值使得整个值为null，需要用IFNULL()函数转换成别的值
```sql 
SELECT 
        IFNULL(commission_pct,0)*100 AS 奖金率
FROM
        employees;
```
# LIMIT
限制返回的行数。可以有两个参数，第一个参数为起始行，从 0 开始；第二个参数为返回的总行数。
放入查询的末尾
```sql
SELECT *
FROM mytable
LIMIT 0, 5;
```
# sql语句执行顺序
```sql
SELECT *                        7
FROM   表                       1
连接类型 JOIN 表二               2
ON 连接条件                      3
WHERE 筛选条件                   4
GROUP BY 分组列表                5
HAVING 筛选条件                  6
ORDER BY 排序                    8
LIMIT 起始，size                 9
```
# 建库案列
```sql
CREATE DATABASE school;
USE school;

CREATE TABLE S(
    SNO char(3),
    SNAME VARCHAR(10),
    SADDR VARCHAR(10),
    PRIMARY KEY (SNO)
);

CREATE TABLE P(
    PNO CHAR(3),
    PNAME VARCHAR(4),
    COLOR CHAR(4),
    WEIGHT INT(3),
    PRIMARY KEY (PNO)
);

CREATE TABLE J(
    JNO CHAR(3),
    JNAME VARCHAR(6),
    JCITY VARCHAR(4),
    BALANCE DECIMAL(5,2),
    PRIMARY KEY (JNO)
);

CREATE TABLE SPJ(
    SNO char(3),
    PNO CHAR(3),
    JNO CHAR(3),
    PRICE DECIMAL(4,2),
    QTY INT(3),
CONSTRAINT PK_SPJ PRIMARY KEY(SNO,PNO,JNO),
CONSTRAINT SPJ_S FOREIGN KEY(SNO) REFERENCES S(SNO),
CONSTRAINT SPJ_P FOREIGN KEY(PNO) REFERENCES P(PNO),
CONSTRAINT SPJ_J FOREIGN KEY(JNO) REFERENCES J(JNO)
);
# s的数据
INSERT INTO S(SNO,SNAME,SADDR) VALUE ('S1','原料公司','南京北门23号');
INSERT INTO S(SNO,SNAME,SADDR) VALUE ('S2','红星钢管厂','上海浦东100号');
INSERT INTO S(SNO,SNAME,SADDR) VALUE ('S3','零件制造公司','南京东晋路55号');
INSERT INTO S(SNO,SNAME,SADDR) VALUE ('S4','配件公司','江西上饶58号');
INSERT INTO S(SNO,SNAME,SADDR) VALUE ('S5','原料厂','北京红星路88号');
INSERT INTO S(SNO,SNAME,SADDR) VALUE ('S6','东方配件厂','天津叶西路100号');

# p的数据
INSERT INTO P(PNO,PNAME,COLOR,WEIGHT) VALUE ('P1','钢筋','黑','25');
INSERT INTO P(PNO,PNAME,COLOR,WEIGHT) VALUE ('P2','钢管','白','26');
INSERT INTO P(PNO,PNAME,COLOR,WEIGHT) VALUE ('P3','螺母','红','11');
INSERT INTO P(PNO,PNAME,COLOR,WEIGHT) VALUE ('P4','螺丝','黄','12');
INSERT INTO P(PNO,PNAME,COLOR,WEIGHT) VALUE ('P5','齿轮','红','18');

# J的数据
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J1','东方明珠','上海',0.00);
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J2','炼油厂','长春',-11.20);
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J3','地铁三号','北京',678.00);
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J4','明珠线','上海',456.00);
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J5','炼钢工地','天津',123.00);
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J6','南浦大桥','上海',234.70);
INSERT INTO J(JNO,JNAME,JCITY,BALANCE) VALUE('J7','红星水泥地','江西',343.00);

# spj的数据
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S1','P1','J1',22.60,80);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S1','P1','J4',22.60,60);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S1','P3','J1',22.80,100);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S1','P3','J4',22.80,60);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S3','P3','J5',22.10,100);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S3','P4','J1',11.90,30);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S3','P4','J4',11.90,60);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S4','P2','J4',33.80,60);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S5','P5','J1',22.80,20);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S5','P5','J4',22.80,60);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S8','P3','J1',13.00,20);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S1','P3','J6',22.80,6);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S3','P4','J6',11.90,6);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S4','P2','J6',33.80,8);
INSERT INTO SPJ(SNO,PNO,JNO,PRICE,QTY) VALUE('S5','P5','J6',22.80,8);

# 增加一个telephone，字符型 修改可变字符型
ALTER TABLE S ADD telephone char(13);
ALTER TABLE S ALTER COLUMN telephone varchar(13);
# 删除表的字段telephone
ALTER TABLE S DROP COLUMN telephone;
```