---
title: java异常处理
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 异常
## ERROR
:::tip
* 线程私有：表示各条线程之间互不影响，独立存储的内存区域
:::
[程序计数器]{.yellow}是不会发生OutOfMemoryError情况的区域，程序计数器控制着计算机指令的分支、
循环、跳转、异常处理和线程恢复，并且[程序计数器是每个线程私有的]{.yellow}。
除了程序计数器外，其他区域：[方法区(Method Area)]{.yellow}、[虚拟机栈(VM Stack)]{.yellow}
[本地方法栈(Native Method Stack)]{.yellow}和[堆(Heap)]{.yellow}都是可能发生`OutOfMemoryError`的区域。
* 虚拟机栈：如果线程清求的栈深度大于虚拟机栈所允许的深度，将会出现Stack0verflowError异常；如果虚拟机动态扩展无法申请到足够的内存，将出现0ut0fMemoryError。
* 本地方法栈和虚拟机栈一样
* 堆：Java堆可以处于物理上不连续，逻辑上连续，就像我们的磁盘空间一样，如果堆中没有内存完成实例分配，并且堆无法扩展时，将会抛出OutOfMemoryError。
* 方法区：方法区无法满足内存分配需求时，将抛出OutOfMemory Error异常。
## ERROR 与 throwable的区别
**ERROR**
ERROR是异常中比较严重的错误，一般不去试图捕获。
**thorw**
throw是异常的简单错误，合理应用程序可能想要捕获。
* Throwable类是java语言中所有错误和异常的超类。
## JVM的默认处理方式
```java
public static void method() {
            int[] arr = {1, 2, 3};
          System.out.println(arr[3]); 
        }
```
程序将会报错：
[ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3]{.red}
即索引值越界
## 处理异常
程序将停止运行，但正常情况下不能因为某个代码块异常就终止程序运行
所以有处理异常的方法
### try···catch
```java
 public static void method() {
            int[] arr = {1, 2, 3};
            //处理异常使程序继续执行
            try {
                System.out.println(arr[3]);
            } catch (ArrayIndexOutOfBoundsException e) {
```
代码输出中将输出错误信息：
[ArrayIndexOutOfBoundsException: Index 3 out of bounds for length 3]{.red}
但是与上面不同，程序仍可以继续向下执行。
### 三种异常的输出
```java
public static void method() {
            int[] arr = {1, 2, 3};
            //处理异常使程序继续执行
            try {
                System.out.println(arr[3]);
            } catch (ArrayIndexOutOfBoundsException e) {
                //三种异常的输出
                System.out.println(e.getMessage());//输出错误的详细信息
                e.printStackTrace();//将异常错误信息输出及代码行输出
                System.out.println(e.toString());//将异常错误信息输出
            }
        }
```
三种输出的错误不同可以自行尝试。
## throws处理异常
格式
```java
正常类() throws 异常类名;
```
此方法仅仅是抛出异常,谁调用谁处理，若不处理程序还是会终止！
## 自定义异常
先了解异常低层代码
将message传到父类
```java
public Exception(String message) {
        super(message);
    }
```
然后查看父类
```java
public Throwable(String message) {
        this.stackTrace = UNASSIGNED_STACK;
        this.suppressedExceptions = SUPPRESSED_SENTINEL;
        this.fillInStackTrace();
        this.detailMessage = message;
```
将message赋值给datailMessage
## throws 与 throw的区别
### throws
* 用在方法声明后面，跟的是异常类名
* 表示抛出异常，由该方法的调用者来处理
* 表示出现异常的一种可能性，并不一定会发生这些异常
### throw
* 用在方法体内，跟的是异常对象名
* 表示抛出异常，由方法体内的语句处理
* 执行 throw一定抛出了某种异常