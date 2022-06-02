---
title: 了解JVM
date: 2022-05-29
categories:
 - 后端
tags:
 - JVM
---
# JVM
			Java Virtual Machine  java虚拟机
**好处**
  * 一次编写，到处运行
  * 自动内存管理，垃圾回收
  * 数组下标越界检查
  * 多态
* 与jre和jdk的比较
![](https://pic.imgdb.cn/item/626e5974239250f7c572ef38.png)
## JVM用途
* 面试
* 理解底层实现原理
* java程序员的必备技能

## JVM组成
![](https://pic.imgdb.cn/item/626e598b239250f7c5732b69.png)

# 内存结构
1. 程序计数器
2. 虚拟机栈
3. 本地方法栈
4. 堆
5. 方法区
:::warning
* JDK 1.8 同 JDK 1.7 比，最大的差别就是：元数据区取代了永久代。元空间的本质和永久代类似，都是对 JVM 规范中方法区的实现。不过元空间与永久代之间最大的区别在于：元数据空间并不在虚拟机中，而是使用本地内存。
:::
## 程序计数器
* 定义： program counter register 程序计数器
* 用途：记住下一条JVM指令的执行地址
* 特点：
1. 是现场私有的
2. 不存在内存溢出
3. 它是一块很小的内存空间
4. 是运行速度最快的存储区域
## 虚拟机栈
设置栈内存大小：VM options：-Xss 1024KB（大小可自己设置）
* [栈]{.yellow}：线程运行时需要的内存空间，一个栈由多个栈帧组成。
* [栈帧]{.yellow}：对应着一次方法的调用，每个方法运行时需要的内存。
* 调用栈（Call stack）相对某个进程而言，栈帧（stack frame）则是相对某个函数而言。
* 每个线程只能有一个活动栈帧，对应当前执行的方法。
+++info 线程安全
如何判断一个程序是否会有线程安全问题？
 * 是否是多线程环境
 * 是否有共享数据
 * 是否有多条语句操作共享数据
 * 是否逃离了方法
+++
**栈内存溢出**
* 栈帧过多导致栈内存溢出
* 栈帧过大导致栈内存溢出
**栈内存诊断**
* top定位那个进程cpu占用过高
* ps H -eo pid,tid,%cpu | grep 进程id
* jstack 进程id
## 本地方法栈
1. 本地方法是使用C语言实现的
2. 它的具体做法是Native Method Stack中登记native方法，在Execution Engine执行时加载本地方法库。
3. **当某个线程调用一个本地方法时，它就进入了一个全新的并且不再受虚拟机限制的世界。它和虚拟机拥有同样的权限**
## 堆
设置堆内存大小：VM options：-Xmx 1024KB（大小可自己设置）
**定义**
* 通过new关键字，创建对象都会使用堆内存
特点
* 线程共享，堆中对象都需要考虑线程安全的问题
* 有垃圾回收机制
**堆内存诊断**
1. jps：查看当前系统中有哪些java进程
2. jmap：查看堆内存占用情况
```java
jmap -heap 进程id
```
3. jconsole：图形界面，多功能检查界面
4. jvisualVM:可视化界面
## 方法区
* 方法区，Method Area， 对于习惯在HotSpot虚拟机上开发和部署程序的开发者来说，很多人愿意把方法区称为“永久代”（Permanent Generation），本质上两者并不等价，仅仅是因为HotSpot虚拟机的设计团队选择把GC分代收集扩展至方法区，或者说使用永久代来实现方法区而已。对于其他虚拟机（如BEA JRockit、IBM J9等）来说是不存在永久代的概念的。
主要存放已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等数据（比如spring 使用IOC或者AOP创建bean时，或者使用cglib，反射的形式动态生成class信息等）。
* 常量池：就是一张表，虚拟机指令根据这张表找到要执行的类名、方法名、参数类型等信息
* 运行时常量池，常量池时.class文件中，当该类被加载，它的常量池信息就会放入运行时常量池并把里面换成真实地址。
# StringTable
* 利用串池避免重复创建字符串对象
* 常量池中的信息会被加载到运行常量池中，这是a、b、ab都是常量池的符号，还没变成java字符串对象
* 字符串常量拼接的原理是编译期优化
* ldc #数字 会把a符号变成"a"字符串对象
* StringTable["a","b","ab"] HashTable结构不能扩充。‘
* 可以使用intern方法将串池还没有的对象放入串池中
* 如果串池中有则不会放入并返回串池的对象(jdk1.8)
```java
String s1 = "a";
String s2 = "b";
String s3 = "ab";
```
**测试一**
```java
//输出结果
String s4 = s1 + s2;
System.out.print(s4 == s3);
```
1. 输出结果 []{.gap}。 {.quiz}
    - true
    - false {.correct}
    - 钝角
    - 毁灭吧，累了
{.options}
+++info 解析
[false]{.red}
---
```java
String s4 = s1 + s2;
/*
  底层分析:
            1. new StringBuilder
            2. 添加元素 StringBuilder.append("a").append("b");
            3. 调用toString方法StringBuilder.append("a").append("b").toString()
            4. new String("ab")对象说明地址已经改变
            5. s1和s2都是变量
*/
```
+++
**测试二**
```java
//输出结果
String s5 = "a" + "b";
System.out.print(s5 == s3);
```
2. 输出结果 []{.gap}。 {.quiz}
    - true {.correct}
     - 钝角
    - false 
    - 毁灭吧，累了
{.options}
    > - 通过反编译java程序可以清楚看到没有新new一个对象。
    > - 通过常量池寻找等同的值
    > - 'a','b'都是常量
**测试三**
```java
//输出结果
String ss = "ab";
String s6 = ss.intern();
System.out.print(s6 == s3);
```
3. 输出结果 []{.gap}。 {.quiz}
    - true {.correct}
    - 钝角
    - false 
    - 毁灭吧，累了
{.options}
    > - 可以使用intern方法将串池还没有的对象放入串池中
    > - 如果串池中有则不会放入并返回串池的对象
**测试四（jdk1.6与1.8的qubie）**
```java
//输出结果
String s = new String("a") + new String("b");
//常量池["a","b","ab"]
//堆 [new String("a"),new String("b"),new String("ab")]
String s2 = s.intern(); 
System.out.print(s2 == "ab");
System.out.print(s2 = s);
```
4. jdk1.6输出结果 []{.gap},jdk1.8输出结果[]{.gap} {.quiz .multi}
    - true,true {.correct}
    - true,false {.correct}
    - false,true
    - false,false
{.options}
    > - 可以使用intern方法将串池还没有的对象放入串池中
    > - jdk1.8如果串池中有则不会放入并返回串池的对象
    > - jdk1.6r如果串池中有则会复制一份，将复制的放入常量池所以s2不等于s