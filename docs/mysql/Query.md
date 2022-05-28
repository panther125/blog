---
title: SQL条件查询
#sticky: true 置顶文章
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# 使用库名，类似于Java导包
```sql
USE myemployees;
```
# 条件查询
进阶2：条件查询
```sql
    语法：
    SELECT 
        查询列表 
    FROM
        表名
    WHERE
        筛选条件;
        
分类： 
        一、按条件表达式筛选
        条件运算符：>   <   =  <>(!=)  >=   <=  
        二、按逻辑表达式筛选
        逻辑表达式： &&    ||   ！或者 and  or not
        三、模糊查询
        like      between and      in      is full
        
        
```
# 一、按条件表达式筛选
## 例：查询工资大于15000的员工信息
```sql
SELECT
    *
FROM
    employees
WHERE
    salary > 15000;
```
# 二、按逻辑表达式筛选
## 例：查询工资在10000到20000之间的员工姓名和奖金率
```sql
SELECT
    concat(last_name,first_name) AS 姓名,
    salary AS 工资,
    commission_pct AS 奖金率
FROM
    employees
WHERE
    salary > 10000 and salary < 20000;
```

# 三、模糊查询
## 一、like
特点：
1. 一般和通配符搭配使用
通配符：
        % 任意多个字符，包含零个字符。
        _ 任意单个字符。
## 例：查询员工姓名中包含a字符的员工信息
```sql
SELECT
    *
FROM
    employees
WHERE
    concat(last_name,first_name) like '%a%';

```
## 二、between and 
        特点：
                1. 提高简洁度
                2. 包含临界值 
                3. 数值按顺序填入 
## 例： 查询员工id在100到120之间的员工信息
```sql
SELECT 
        *
FROM
        employees
WHERE
        employee_id BETWEEN 100 AND 120;

```
## 三、in 
        特点： 
                1. 提高简洁度。
                2. 框号中的类型必须统一或兼容。
## 例： 查询‘AD_VP’,'AD_PRES'在工种中的员工姓名和工种
```sql
SELECT
        concat(last_name,first_name) AS 姓名,
        job_id
FROM
        employees
WHERE
        job_id in('AD_VP','AD_PRES');
```
## 四、is null 或 is not null
特点：
        1. =和！=不能判断null值只能用is来判断
## 例：查询奖金率不为NULL的员工姓名和奖金率
```sql
SELECT
        concat(last_name,first_name) AS 姓名,
        commission_pct AS 奖金率
FROM
        employees
WHERE
        commission_pct IS NOT NULL;
```
# 排序查询
        语法：
                SELECT 
                        查询列表
                FROM
                        employees
                ORDER BY  排序列表 asc顺序|desc逆序 
        特点：
                1. 排序默认为升序
                2. order by 支持多个字段进行排序
                3. 支持别名
## 例查询员工工资按逆序排序
```sql
SELECT
        salary
FROM
        employees
ORDER BY salary DESC;
```
# 日期和时间处理
* 日期格式: YYYY-MM-DD
* 时间格式: HH:MM:SS
| 函数 | 说明 | - | 函数 | 说明 | 
|-|-|-|-|-|
| AddDate() | 增加一个日期(天、周等) | - | AddTime() | 增加一个时间(时、分等) |
| CurDate() | 返回当前日期 | - | CurTime() | 返回当前时间 |
| Date() | 返回日期时间的日期部分 | - | DateDiff() | 计算两个日期之差 |
| Date_Add() | 高度灵活的日期运算函数 | - | Date_Format()   | 返回一个格式化的日期或时间串 |
| Day() | 返回一个日期的天数部分 | - | DayOfWeek() | 对于一个日期，返回对应的星期几 |
| Hour() | 返回一个时间的小时部分 | - | Minute() | 返回一个时间的分钟部分 |
| Month() | 返回一个日期的月份部分 | - | Now() | 返回当前时间和日期 |
| Second() | 返回一个时间的秒部分 | - | Year() | 返回一个日期的年份部分 |
```sql
SELECT NOW();
```
# 数值处理
| 函数 | 说明 |
|-|-|
| SIN() | 正弦 |
| COS() | 余弦 |
| TAN() | 正切 |
| ABS() | 绝对值 |
| SQRT() | 平方根 |
| MOD() | 余数 |
| EXP() | 指数 |
| PI() | 圆周率 |
| RAND() | 随机数 |