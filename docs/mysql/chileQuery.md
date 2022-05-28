---
title: SQL子查询
date: 2022-05-29
categories:
- 数据库
tags:
- mySQL
---
# 子查询

    含义：
            出现在其他语句中的select语句，称为子查询或内查询
            外部的查询语句，称为主查询或外查询
    分类：
            按子查询出现的位置：
            select后面
            from后面
            where或having后面
            exists后面（相关子查询）
    按结果集的行列数不同：
            标量子查询（结果集只有一行一列）//查指定属性的单个值 
            列子查询（结果集只有一列多行） //查某个属性
            行子查询（结果集有一行多列）  // 查属性
            表子查询（结果集）            //查表


    where或having后面
            1、标量子查询（单行子查询）
            2、列子查询
            （多行子查询）
            3、行子查询
            （多列多行）
    特点：
            ①子查询放在小括号内
            ②子查询一般放在条件的右侧
            ③标量子查询，
            一般搭配着单行操作符使用
            > < >= <= = <
            列子查询，一般搭配着多行操作符使用
            in、any/some、all
            4.子查询的执行优先于主查询

## 标量子查询
* **案例1**：谁的工资比 `Abel` 高？
```sql
1.查询Abel的工资
USE myemployees;
SELECT salary
FROM employees
WHERE last_name = 'Abel';
2.查询员工的信息
#满足salary>①结果
SELECT *
FROM employees
WHERE salary>(
        SELECT salary FROM employees
        WHERE last_name = 'Abel'
);
```
* **案例2**：返回job_id与141号员工相同，salary比143号多的员工 姓名，job_id 和工资
```sql
#①查询141号员工的job_id
SELECT job_id
FROM employees
WHERE employee_id = 141;
#②查询143号员工的salary
SELECT salary
FROM employees
WHERE employee_id = 143;
#③查询员工的姓名，job_id 和工资，要求job_id=①并且salary>②
SELECT last_name,salary,job_id
FROM employees
where job_id = (
    select job_id FROM employees
    where employee_id = 141
    ) AND salary > (
        select salary FROM employees
        where employee_id = 143
    );
```
## 列子查询
     in/not in 等于列表中的任意一个（常被使用）
     any/some 和子查询返回的某一个值比较
     all  和子查询返回的所有值相比

* **案列**返回`location_id`为1400或1700的部门中的所有员工姓名
```sql
SELECT first_name,last_name
FROM employees
WHERE department_id IN (
    SELECT DISTINCT department_id
    FROM departments
    where location_id in (1400,1700)
    );
```
* **案列二**返回其他部门中比job_id为‘IT_PROG’部门`任一`工资低员工的员工号、姓名
job_id以及salary
```sql
SElECT first_name,last_name,job_id,salary
FROM employees
where salary < ANY(
    SELECT salary
    FROM employees
    WHERE job_id = 'IT_PROG'
    );
```
* **案列二**。返回其他部门中比job_id为‘IT_PROG’部门`任意`工资低员工的员工号、姓名
job_id以及salary
```sql
SElECT first_name,last_name,job_id,salary
FROM employees
where salary < ALL(
    SELECT salary
    FROM employees
    WHERE job_id = 'IT_PROG'
    );
```
## 行子查询

* **案列**：查询员工编号最小且工资最高的员工信息
```sql
# 行子查询实现
SELECT * FROM employees
WHERE (employee_id,salary) = (
    SELECT min(employee_id),MAX(salary)
    FROM employees
    );
```
* **案列**：查询每个部门的员工个数
```sql
SELECT d.*,(
    SELECT count(*) FROM employees e
    WHERE e.department_id = d.department_id
    )
FROM departments d;
```
* **案列**：查询每个部门的平均工资和工资等级
```sql
SELECT avg_g.*,job_grades.grade_level
FROM (
     SELECT AVG(salary) ag FROM employees
     GROUP BY department_id
         ) AS avg_g inner
join job_grades
on avg_g.ag BETWEEN lowest_sal AND  highest_sal;
``` 
# 案列总结
1. 查询和zlotkey相同部门的员工姓名和工资
```sql
SELECT last_name,salary
FROM employees
WHERE department_id = (
    SELECT department_id
    FROM employees
    WHERE last_name = 'zlotkey'
    );
```
2. 查询工资比公司平均工资高的员工的员工号，姓名和工资。
```sql
SELECT employee_id,last_name,salary
FROM employees
WHERE salary >(
    SELECT AVG(salary)
    FROM employees
    );
```
3. 查询各部门中工资比本部门平均工资高的员工的员工号，姓名和工资
```sql
SELECT employee_id,last_name,salary
FROM employees e
INNER JOIN (
    SELECT avg(salary) ag,department_id
    FROM employees d
    GROUP BY d.department_id
    ) avg_dep
ON e.department_id = avg_dep.department_id
WHERE salary > avg_dep.ag;
```
4. 查询和姓名中包含字母u的员工在相同部门的员工的员工号和姓名
```sql
SELECT employee_id,last_name
FROM employees
WHERE department_id IN(
    SELECT DISTINCT department_id
    FROM employees
    WHERE last_name LIKE '%u%'
    );
```
5. 查询在部门的location_id为1700的部门工作的员工的员工号
```sql
SELECT employee_id
FROM employees
WHERE department_id= ANY(
    SELECT department_id
    FROM departments
    WHERE location_id = 1700
);
```
6. 查询管理者是King的员工姓名和工资
```sql
SELECT last_name,salary
FROM employees
WHERE manager_id IN (
    SELECT employee_id
    FROM employees
    WHERE last_name = 'K_ing'
    );
```
7. 查询工资最高的员工的姓名，要求first_name和last_name显示为一列，列名为 name
```sql
SELECT CONCAT(first_name,last_name) AS name
FROM employees
WHERE salary =(
    SELECT MAX(salary)
    FROM employees
    );
```