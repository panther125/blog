---
title: sql知识补充
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# 自然连接
* 自然连接是把同名列通过等值测试连接起来的，同名列可以有多个。
* 内连接和自然连接的区别：内连接提供连接的列，而自然连接自动连接所有同名列。
```sql
SELECT A.value, B.value
FROM tablea AS A NATURAL JOIN tableb AS B;

自然连接(natural join)
    自动判断连接条件完成连接。
    相当于省略了using，会自动查找相同字段名。
    natural join
    natural left join
    natural right join
```
# 游标
1. 声明游标
```sql
MYSQL、SQL server、DB2语法：
    DECLARE 游标名称 CURSOR FOR 查询语句
ORACLE:
    DECLARE 游标名称 CURSOR IS 查询语句
```
2. 打开游标
```sql
OPEN 游标名称
```
3. 使用游标
```sql
FETCH 游标名称 INTO 变量1，变量2.....变量n
```
:::warning
变量需要和查询语句的变量个数相同
:::
4. 关闭游标
```sql
CLOSE 游标名称
```
## 游标案列
* 查询按逆序排好序的员工的员工工资总和大于10万需要几名员工
```sql
# 使用游标
DELIMITER //
CREATE PROCEDURE GET_SUM_SALARY(IN limite_sal DOUBLE,OUT COUNT_SAL INT)
BEGIN
    # 声明局部变量
    DECLARE SUM_SAL DOUBLE DEFAULT 0;#记录工资总和
    DECLARE EMP_SAL DOUBLE;#记录游标的临时变量
    DECLARE EMP_COUNT INT;#记录总人数
    #声明游标
    DECLARE sal_cursor CURSOR FOR SELECT salary from employees ORDER BY salary DESC;
     # 定义了一个 continue handler，当 sqlstate '02000' 这个条件出现时，
     #会执行 set COUNT_SAL = EMP_COUNT
     declare continue handler for sqlstate '02000' set COUNT_SAL = EMP_COUNT;

    #打开游标
    OPEN sal_cursor;
    # 循环将游标所指数据加入总和中
    REPEAT
        #使用游标
        FETCH SAL_CURSOR INTO EMP_SAL;

        SET SUM_SAL = SUM_SAL + EMP_SAL;
        SET EMP_COUNT = EMP_COUNT + 1;

    until SUM_SAL >= limite_sal
        end REPEAT;
    # 设置返回值
    SET COUNT_SAL = EMP_COUNT;
    # 关闭游标
    CLOSE sal_cursor;

END //
DELIMITER ;
# 调用
call GET_SUM_SALARY(100000,@COUNT_SAL);
select @COUNT_SAL;
```
**游标**是MySQL的一个重要的功能，为[逐条读取]{.label .warning}结果集中的数据，提供了完美的解决方案。跟在应用层面实现相同的功能相比，游标可以在存储程序中使用，效率高，程序也更加简洁。
# 触发器
* 监听：记录的增加、修改、删除
触发器会在某个表执行以下语句时而自动执行: `DELETE`、`INSERT`、`UPDATE`。 触发器**必须指定**在语句执行之前还是之后自动执行，之前执行使用 `BEFORE` 关键字，之后执行使用 `AFTER` 关键字。BEFORE 用于数据验证和净化，AFTER 用于审计跟踪，将修改记录到另外一张表中。 
* INSERT 触发器包含一个名为 NEW 的虚拟表。
* DELETE 触发器包含一个名为 OLD 的虚拟表，并且是只读的。
* UPDATE 触发器包含一个名为 NEW 和一个名为 OLD 的虚拟表。
:::warning
其中 `NEW` 是可以被修改的，而 `OLD` 是只读的。 
MySQL 不允许在触发器中使用 CALL 语句，也就是不能调用存储过程。
:::
```sql
语法：
CREATE TRIGGER 触发器名称
{BEFORE|AFTER} {INSERT|UPDATE|DELETE} ON 表名
FOR EACH ROW
执行的语句块;
```
:::tip
监听插入
:::
```sql
# 创建触发器监听用户对myuser表的操作
# 监听插入
delimiter //
create trigger use_operation_insert after insert on myadmin
    for each row
begin
    insert into myadmin_logo(use_log) values('use inserts a piece of data');
end //

delimiter ;
# 监听删除
delimiter //
create trigger use_operation_insert after delete on myadmin
    for each row
begin
    insert into myadmin_logo(use_log) values('use delete a piece of data');
end //

delimiter ;
# 监听跟新
delimiter //
create trigger use_operation_insert after update on myadmin
    for each row
begin
    insert into myadmin_logo(use_log) values('use update a piece of data');
end //

delimiter ;
```
## 案列
* 创建触发器判断插入的员工工资是否大于老板工资
```sql
delimiter //

create trigger chack_salary before insert on employees
    for each row
begin
     declare manager_sar double;
     select salary into manager_sar from employees
         where employee_id = NEW.manager_id;
     IF NEW.salary > manager_sar
         then SIGNAL SQLSTATE 'HY000' SET MESSAGE_TEXT='员工工资高于领导';
     END IF;
end //
delimiter ;
//报错：[HY000][1644] 员工工资高于领导
insert into employees(employee_id, last_name,salary,manager_id) values(207,'john',12000,103);
```
## 查看和三处触发器
:::tip
* 查看触发器
:::
```sql
#方式1
show triggers;
#方式2
show create trigger chack_salary;
#方式3
select * from toprmation_schema.TRIGGERS;
``` 
:::tip
* 删除触发器
:::
```sql
-- 删除
DROP TRIGGER [schema_name.]trigger_name
```
可以使用old和new代替旧的和新的数据
* 更新操作，更新前是old，更新后是new.
* 删除操作，只有old.
* 增加操作，只有new.
:::warning
对于具有相同触发程序动作时间和事件的给定表，不能有两个触发程序
:::
# 变量持久化
```sql
show variables like '%max_connections'
max_connections,151
mysqlx_max_connections,100
#mysql重启后也会生效，MySQL会将该命令的配置保存到mysqld-auto.cnf文件中
set persist max_connections=1000;
```
# 锁表
```sql
/* 锁表 */
表锁定只用于防止其它客户端进行不正当地读取和写入
MyISAM 支持表锁，InnoDB 支持行锁
-- 锁定
    LOCK TABLES tbl_name [AS alias]
-- 解锁
    UNLOCK TABLES
```
# 建表规范
**建表规范** 
- 每个表保存一个实体信息
- 每个具有一个ID字段作为主键
- ID主键 + 原子表
:::tip
1NF, 第一范式
:::
字段不能再分，就满足第一范式。
:::tip
2NF, 第二范式
:::
满足第一范式的前提下，不能出现部分依赖。
消除复合主键就可以避免部分依赖。增加单列关键字。
:::tip
3NF, 第三范式
:::
满足第二范式的前提下，不能出现传递依赖。
某个字段依赖于主键，而有其他字段依赖于该字段。这就是传递依赖。
将一个实体信息的数据放在一个表内实现。
