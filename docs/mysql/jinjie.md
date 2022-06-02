---
title: sql进阶知识
data: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# 常见约束

     六大约束：
                NOT NULL：非空约束，保证字段不能为空
                CHEAK:检查约束，限定字符（mysql不支持）
                UNIQUE:唯一约束，保证字段唯一性，可以为空
                DEFAULT:默认约束，字段的默认值
                PRIMARY KEY : 主键约束，主键字段唯一且不为空
                FOREIGN KEY:外键约束，保证字段的值必须来至主表的关联列的值
     约束添加分类：
                列级约束：
                         六大约束都可以写，但是外键没有效果
                表级约束：
                         除了非空和默认都可以写
     主键和约束的比较
                主键：唯一性 最多一个 可以组合
                唯一：唯一性 可以为空 可以多个 可以组合
     
## 列级约束
* 只需在创建字段时在后面添加约束即可
```sql
CREATE TABLE stutop(
    stuid int PRIMARY KEY, --主键
    stunama varchar(5) NOT NULL, --非空
    seat int UNIQUE, --唯一
    gender char(1) CHECK(gender in('男','女')), --检查
    age int DEFAULT 18 --默认

);
```
## 表级约束
```sql
CREATE TABLE stutop2(
    stuid int,
    stuname varchar(5),
    seat int,
    gender char(1),
    major_id int,
    CONSTRAINT pk PRIMARY KEY(stuid),
    CONSTRAINT name_y UNIQUE(stuname),
    CONSTRAINT gender_y CHECK(gender in('男','女')),
    CONSTRAINT FS_STU_major FOREIGN KEY(major_id) REFERENCES major(major_id) --外键

);
CREATE TABLE major(
    major_id int PRIMARY KEY,
    major_name varchar(10) UNIQUE

);
```
:::tip no-icon
 一般使用表级约束写外键，其他的都可以写成列级约束
:::
**修改约束和添加约束**
```sql
ALTER TABLE 表名 MODIFY COLUMN 字段 varchar(10) UNIQUE;
# 列级约束
ALTER TABLE 表名 MODIFY COLUMN 字段 int PRIMARY KEY;
# 表级约束
ALTER TABLE 表名 ADD COLUMN PRIMARY KEY(字段);
```

# 标识列（
* 自增长列，无需插入）类型只能时数值型 关键字：AUTO_INCREMENT
```sql
CREATE TABLE IF NOT EXISTS id_identity(
    id int PRIMARY KEY AUTO_INCREMENT,
    name varchar(10)
); 
```
:::warning
* 一个表仅仅可以有一个自增长列
* 自增长列必须为一个键(primary key|unique|foreign key)
:::

**查看auto_increment参数**
```sql
SHOW VARIABLES LIKE '%AUTO_INCREMENT%';

/*
    auto_increment_increment,1  步长为1
    auto_increment_offset,1     起始值为1
 */
 # 设置步长和初始值
SET auto_increment_increment=2;
SET auto_increment_offset=5;  -- MYSQL不支持设置初始值，设置后没效果，设置初始值需要自己在插入第一个元素时设置
```
# 事务
        TCL语言（Transaction Control Language）事务控制语言
    事务：
        一个或一组sql语句构成一个执行单元，要么全部执行要么全部不执行
    事务的4大属性（ACID）：
        1.原子性（Atomicity）
                事务是一个不可分割的单位，要么一起执行，要么全不执行
        2.一致性（cansistency）
                事务必须从数据库的一致性转换到另一个一致性状态（即数据不变状态能量守恒）
        3.隔离性（isolation）
                一个事务的执行不能被其他事务干扰，并发执行的各事务之间不能相互干扰
        4.持久性（Durability）
                事务一旦提交，对数据的改变时永久性的
    回滚：回到最初的状态

## 查看存储引擎
```sql
SHOW ENGINES;
/*
    MEMORY,YES,"Hash based, stored in memory, useful for temporary tables",NO,NO,NO
    MRG_MYISAM,YES,Collection of identical MyISAM tables,NO,NO,NO
    CSV,YES,CSV storage engine,NO,NO,NO
    FEDERATED,NO,Federated MySQL storage engine,,,
    PERFORMANCE_SCHEMA,YES,Performance Schema,NO,NO,NO
    MyISAM,YES,MyISAM storage engine,NO,NO,NO
    InnoDB,DEFAULT,"Supports transactions, row-level locking, and foreign keys",YES,YES,YES
    BLACKHOLE,YES,/dev/null storage engine (anything you write to it disappears),NO,NO,NO
    ARCHIVE,YES,Archive storage engine,NO,NO,NO

    InnoDB支持事务myisam、memory不支持事务
 */
```

:::tip
**InnoDB** 
:::
* 是 MySQL 默认的事务型存储引擎，只有在需要它不支持的特性时，才考虑使用其它存储引擎。 
实现了四个标准的隔离级别，默认级别是可重复读(REPEATABLE READ)
。在可重复读隔离级别下，通过多版本并发控制(MVCC)+ 间隙锁(Next-Key Locking)防止幻影读。 
主索引是**聚簇索引**，在索引中保存了数据，从而[避免直接读取磁盘]{.yellow}，
因此对查询性能有很大的提升。 内部做了很多优化，包括从磁盘读取数据时采用的可预测性读、能够加快读操作
并且自动创建的自适应哈希索引、能够加速插入操作的插入缓冲区等。 支持真正的在线热备份。
其它存储引擎不支持在线热备份，要获取一致性视图需要停止对所有表的写入，而在读写混合场景中，停止写入可能也意味着停止读取。
:::tip
**MyISAM** 
:::
* 设计简单，数据以紧密格式存储。对于只读数据，或者表比较小、可以容忍修复操作，则依然可以使用它。
提供了大量的特性，包括压缩表、空间数据索引等。
:::warning
* 事务: InnoDB 是事务型的，可以使用 Commit 和 Rollback 语句。 
* 并发: MyISAM 只支持表级锁，而 InnoDB 还支持行级锁。 
* 外键: InnoDB 支持外键。 
* 备份: InnoDB 支持在线热备份。
* 崩溃恢复: MyISAM 崩溃后发生损坏的概率比 InnoDB 高很多，而且恢复的速度也更慢。 
* 其它特性: MyISAM 支持压缩表和空间数据索引。
:::
**事务的创建隐式事务没有明显的开启和结束的标记列如：insert、updata等**
* 前提:必须关闭自动提交
```sql
    开启事务
        set autocommit = off;
        start transaction;
        编写sql语句
    结束事务
        commit;提交事务
        rollback;回滚数据
```
## 事务案列 转账
```sql
set autocommit = off;
start transaction;
update test1 set salary= 500 WHERE username='张无忌';
update test1 set salary= 1500 WHERE username='郭襄';
commit;
```
## 事务的隔离级别
* mysql 默认repeatable read级别
* oracle 默认read commit 级别
**查看隔离级别**
```sql
SELECT @@transaction_isolation
```
**设置隔离级别**
```sql
SET session|global transaction isolaction level 隔离级别
```
| 事务的隔离级别 | 脏读 | 不可重复读 | 幻读 |
|-|-|-|-|
| read uncommit | √ | √ | √ |
| read commit | × | √ | √ |
| repeatable read | × | × | √ |
| serializable | × | × | × |
## 回滚
**演示delete和truncate回滚**
```sql
set autocommit = 0;
start transaction;
delete from 表名;
ROLLBACK  --回滚将此操作回滚到上一次数据（相当于没有此操作）
```
```sql
set commit = 0;
start transaction;
truncate from 表名;
rollback;
```
:::warning
* delete支持回滚
* truncate不支持回滚
:::
**设置回滚点**
```sql
set autocommit = 0;
start transaction;
delete from 表名 where id=1;
savepoint a;
delete from 表名 where id =3;
rollback to a; --回滚到保存点a三号数据没有被删除
```
# 视图
* 在使用视图时动态生成，只保存了sql逻辑，不保存查询结果
* 一种虚拟存在的表
```sql
CREATE VIEW v1 AS
    查询语句
```
* 重用sql语句
* 简化复杂的sql语句
* 保护数据
# 删除外键
## 级联删除
* 级联删除，如果有外键存在怎么删除外键和从表中有外键约束的元素
* 在添加外键时添加级联子句 ON DELETE CASCADE
```sql
#添加级联删除
alter table 表名 
add constraint 外键名 foreign key(字段) references 从表(字段) ON DELETE CASCADE;

delete from major where major_id =3;#删除3号专业时stutop中的数据与3号相关的也会删除
```
## 级联制空
* 级联删除，如果有外键存在怎么制空外键和从表中有外键约束的元素
* 在添加外键时添加级联子句 ON DELETE SET NULL
```sql
# 级联制空
ALTER TABLE stutop ADD constraint stu_maj2
    foreign key(majorid) references major(major_id) ON DELETE SET NULL;
delete from major where major_id = 3;
    -- 删除3号专业时stutop中的数据与3号相关的会变成null
```
# 变量：
## 系统变量
* 变量有系统提供，属于服务器层面
**查看系统变量**
```sql
SHOW GLOBAL|SESSION VARIABLES
```
* global 全局变量
* session 会话变量
**查看条件的系统变量**
```sql
SHOW GLOBAL|SESSION VARIABLES LIKE '%character%'
```
**查看指定的系统变量名**
```sql
SELECT @@GLOBAL|SESSION.系统变量名; 
```
**给变量名赋值**
```sql
SET global|session 变量=值;
set @@global|session.变量=值;
```
:::warning no-icon
* 全局作用域：服务器每次启动将为全局变量赋初值，修改值只在本次生效，重启后将恢复初值
* 会话作用域：仅对当前会话（连接）有效
:::
## 自定义变量
* 用户变量
```sql
SET @用户变量名=值;
SET @用户变量名:=值;
SELECT @用户变量名:=值;
```
* 局部变量
```sql
声明：
DECLARE 变量名 类型;
赋值：
SET 用户变量名=值;
SET 用户变量名:=值;
SELECT @用户变量名:=值;
```
:::warning no-icon
* 用户变量作用域：针对当前会话有效
* 局部变量作用域：仅仅在定义的bdgin end中生效
* 局部变量的声明只能在begin end的第一句
:::
# 存储过程和函数
**类似java的方法**
1. 提高代码重用性
2. 简化操作
3. 减少了编译次数并减少了与服务器连接的次数，提高了效率
* 含义:一组预先编译好的sql语句集合
```sql
CREATE PROCEDURE 存储名（参数模式 参数名 参数类型 ）
BEGIN
        方法体
END
```
**参数模式**
```sql
in      该参数可以作为输入，也就是该参数需要传入值
out     该参数可以作为输出，也就是该参数作为返回值
inout   该参数可以作为输入和输出，也就是该参数既需要输入值也可以作为返回值

结尾   DELIMITER 结束标记 
```
**调用存储过程**
```sql
call 存储名(参数);
```
## 创建存储过程的案例
:::tip
* 无参存储过程
:::
```sql
# 用函数插入五条数据
DELIMITER //   -- 设置结束标记
CREATE PROCEDURE sum()
BEGIN
        INSERT INTO admin(username,'password') values ('jerry',1111),('jack',2222)
        ,('anny',3333),('lite',4444),('tom',7777);
end //;

call sum();  -- 调用函数
```
:::tip
* 带in的存储过程
:::
```sql
# 判断登录人员信息
DELIMITER //
CREATE PROCEDURE myprocedure3(IN usernamae varchar(10),IN password varchar(10))
BEGIN
    declare result int default 0; -- 定义局部变量

    select count(*) INTO result
    from admin
    where admin.username=username 
    and admin.password=password;

    select IF(result>0,'登录成功，欢迎管理员','登录失败，无关人员') AS '结果';

end //
```
:::tip
* 带out的存储过程
:::
```sql
# 根据女生名字显示出男生姓名
DELIMITER //
CREATE PROCEDURE myprocedure4(IN beautyname varchar(10),OUT boname varchar(10))
BEGIN
    SELECT bo.boyName
    from boys bo
    right join beauty b
    on b.boyfriend_id = bo.id
    where b.name = beautyname;

end //

call myprocedure4('小昭',@resultname);
```
:::tip
* 带inout的存储过程
:::
```sql
# 返回参数的2倍
DELIMITER //
CREATE procedure myprocedure5(INOUT a INT,INOUT b INT)
BEGIN
    SET a=a*2;
    SET b=b*2;
end //

SET @m=10;
SET @n=30;
call myprocedure5(@m,@n);
select @m,@n;
```
**删除存储过程**
```sql
DROP PROCEDURE 存储名;
```
## 函数
**创建函数**
```sql
CREATE FUNCTION 函数名() RETURNS 返回类型
BEGIN
        函数体
END
```
**调用函数**
```sql
select 函数名()
```
**函数案列**
```sql
# 返回beauty表的字段个数
SET global log_bin_trust_function_creators=true; -- 如果出现1418错误可以设置这个

delimiter //
CREATE FUNCTION myfunction1() returns int
begin
    declare c int default 0;
    select count(*) into c
    from beauty;
    return c;
end //

select myfunction1();
```
**查看函数**
```sql
SHOW CREATE FUNCTION 函数名
```
**删除函数**
```sql
DROP FUNCTION 函数名
```
## 区别
:::warning
* 存储过程能有多个返回
* 函数只能有一个返回
:::
# 分支结构
**IF**
```sql
IF(表达式1，表达式2，表达式3)
如果表达式1成立返回表达式2，否则返回表达式3
```
**case**
```sql
    case 变量|表达式|字段
    WHEN 判断 then 值;
    WHEN 判断 then 值;
    。。。。;
    ELSE 值;
    END case;
```
**if结构**
```sql
    if 条件 then 语句;
    elseif 条件 then 语句;
    。。。。
    else 语句;
```
## case案例
```sql
# 根据成绩判断等级
delimiter //
CREATE PROCEDURE myfunc3(IN score int)
begin
    CASE
        when score>=90 and score <=100 then select 'A';
        when score>=80 then select 'B';
        when score>=60 then select 'C';
        else select 'D';
        end case;
end //;

call myfunc3(85);
```
## IF案例
```sql
# 根据成绩判断等级
set global log_bin_trust_function_creators = true;

delimiter //
CREATE FUNCTION myfunc3(score int) returns char(1)
begin
        IF score>=90 and score <=100 then return 'A';
        ELSEIF score>=80 then return 'B';
        ELSEIF score>=60 then return 'C';
        else return 'D';
        end IF;
end //;

select myfunc3(85);
```
# 循环结构
* while、loop、repeat
* iterate 类似java的continue
* leave   类似java的break
**while**
```sql
开始标签：while 循环条件 do
                循环体
            end while  结束标签;
```
**loop**
```sql
开始标签：loop
            循环体
        end loop  结束标签;
```
:::warning
* 一般搭配leave使用，否则成死循环
:::
**repeat**
```sql
开始标签： repeat
            循环体
        until 结束循环条件
        end repeat  结束标签;
```
:::warning
* while类似于java的while
* repeat类似于java的do。。while
* loop类似于死循环
:::
## 案列
```sql
# 添加数据（限制最多添加10个）
delimiter //
create procedure pro_while2(IN insertcount int)
begin
    declare i int default 1;
   s: while i<= insertcount do
        insert into admin(username,password) value(concat('panther',i),concat('111',i));
        set i=i+1;
        IF i >10 then leave s;
        end if;
        end while s;
end //
call pro_while2(15);
```
