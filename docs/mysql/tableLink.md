---
title: SQL表连接查询
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
USE myemployees;
USE girls;
# 连接查询
{% raw %}
<pre>
又称多表查询
如果多表查询将会出现笛卡尔乘积现象 
        若表一有n行 表二有m行 则结果会出现m*n行 
分类：
        内连接 
                    等值连接 :多表的等值连接为多表的交集部分，可搭配排序，分组，筛选。
                             ：n表连接至少需要n-1个条件 ，顺序无要求，起别名也无要求
                    非等值连接 
                    自连接
        外连接 
                    左外连接 
                    右外连接
        交叉连接 
</pre>
{% endraw %}
```sql
SELECT * FROM beauty;
SELECT * FROM boys;
# 笛卡尔乘积现象 
SELECT NAME, boyName FROM boys,beauty; 
# 使用连接查询解决
SELECT NAME,boyName FROM boys,beauty
WHERE beauty.boyfriend_id = boys.id;
```
# 等值连接
## 查询员工名和对应的部门名 
```sql
SELECT last_name,department_name
FROM employees,departments
WHERE employees.department_id = departments.department_id;
```
## 附带筛选条件 
```sql 
SELECT department_name,city
FROM departments,locations
WHERE departments.location_id = locations.location_id AND city LIKE '_o%';
```
# 理顺思路
理顺sql语句逻辑：
1、FROM employees,jobs
WHERE jobs.job_id = employees.job_id
通过两个大表的相同部分进行合成一个大表
2、GROUP BY job_title
通过job_title进行分组，将相同的job_title分成一个个小表，count（*）会将一个个小表的数据全部统计进行分组统计
3、SELECT job_title,COUNT(*)
通过SELECT 显示并统计个个小表的job_title最后合成大表显示出来 
4、ORDER BY COUNT(*) desc;
排序
# 非等值连接 
```sql
SELECT * FROM job_grades;
# 查询圆工的工资和工资级别 
SELECT salary,grade_level
FROM employees,job_grades
WHERE job_grades.lowest_sal <= employees.salary AND employees.salary <= job_grades.highest_sal;
#WHERE salary between job_grades.lowest_sal AND job_grades.highest_sal;
```
# 自连接 
```sql
#查询员工名和对应上级名
SELECT e.employee_id,e.last_name,m.manager_id,m.last_name
FROM employees AS e,employees m
WHERE m.employee_id = e.manager_id;

SELECT md5('hello world');
```
# 二、99语法
{% raw %}
<pre>
又称多表查询
如果多表查询将会出现笛卡尔乘积现象 
        若表一有n行 表二有m行 则结果会出现m*n行 
分类：
        内连接 
                    等值连接 :多表的等值连接为多表的交集部分，可搭配排序，分组，筛选。
                             ：n表连接至少需要n-1个条件 ，顺序无要求，起别名也无要求
                    非等值连接 
                    自连接
        外连接 
                    左外连接 
                    右外连接
                    全外
        交叉连接 
    语法：
        SELECT 查询列表 
        FROM 表1 别名【连接类型】
        join 表2 别名 on 连接条件
        【WHERE 筛选条件 】
        【GROUP BY 筛选条件 】
        【HAVING 筛选条件 】
        【ORDER BY 排序 】
        分类：
        内连接 inner
                    等值连接 :多表的等值连接为多表的交集部分，可搭配排序，分组，筛选。
                             ：n表连接至少需要n-1个条件 ，顺序无要求，起别名也无要求
                    非等值连接 
                    自连接
        外连接 
                    左外连接 left【outer】
                    右外连接 right【outer】
                    全外 full【outer】
        交叉连接 cross
</pre>
{% endraw %}
# 自连接 
## 等值连接
语法： 
SELECT 查询列表 
        FROM 表1 别名 
        inner join 表2 别名
        on 连接条件
```sql
SELECT last_name,First_name
FROM employees e inner
JOIN departments d 
ON e.department_id = d.department_id;
```
# 非等值连接
```sql
SELECT grade_level,count(*)
FROM employees e
inner join job_grades g
on e.salary between g.lowest_sal and g.highest_sal
GROUP BY grade_level
ORDER BY grade_level asc;
```
# 外连接
{% raw %}
<pre>
应用场景：
        查询一个表中有，另一个表中没有的元素
        特点：
            1、外连接的查询结果为主表中的所有记录
            如果从表中有和它匹配的，则显示匹配的值
            如果从表中没有和它匹配的，则显示null
            外连接查询结果=内连接结果+主表中有而从表没有的记录
            2、左外连接，left join左边的是主表
            右外连接，right join右边的是主表
</pre>
{% endraw %}
## 案列
```sql
SELECT * FROM boys;
SELECT * FROM beauty;

#案列左外连接
SELECT b.name,bo.boyname
FROM beauty b
LEFT OUTER JOIN boys bo
ON b.boyfriend_id = bo.id
where boyname is not null;

#案列右外连接
SELECT b.name,bo.boyname
FROM boys bo
RIGHT OUTER JOIN beauty b
ON b.boyfriend_id = bo.id
where boyname is not null;

# 交叉连接
SELECT bo.*,b.*
FROM beauty b
CROSS JOIN boys bo
```
# 总结
1. 内连接语法
```sql
SELECT <select_list>
FROM A
INNER JOIN B
ON A.key = B.key
WHERE B.key IS NULL;
```
2. 左外连接语法
```sql
SELECT <select_list>
FROM A
LEFT JOIN B
ON A.key = B.key
WHERE B.key IS NUL
```
3. 右外连接语法
```sql
SELECT <select_list>
FROM A
RIGHT JOIN B
ON A.key = B.key
WHERE A.key is nul
```
4. 全外连接语法
```sql
SELECT <select_list>
FROM A
FULL JOIN B
ON A.key = B.key
```
![](https://pic.imgdb.cn/item/626e6201239250f7c58a0007.png)

