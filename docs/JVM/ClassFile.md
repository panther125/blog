---
title: 详解类字节码
date: 2022-05-29
categories:
 - 后端
tags:
 - JVM
---
# Java字节码文件
class文件本质上是一个以8位字节为基础单位的二进制流，各个数据项目严格按照顺序紧凑的排列在class文件中。jvm根据其特定的规则解析该二进制数据，从而得到相关信息。
# Class文件结构属性
![](https://pdai.tech/_images/jvm/java-jvm-class-2.png)
## 魔数
```java
public class Main{
	public static void main(String[] args){
		System.out.print("hello world");
	}
}
```
* 生成字节码文件
```java
javac Main.java
```
```java
cafe babe 0000 003c 001d 0a00 0200 0307
0004 0c00 0500 0601 0010 6a61 7661 2f6c
616e 672f 4f62 6a65 6374 0100 063c 696e
6974 3e01 0003 2829 5609 0008 0009 0700
0a0c 000b 000c 0100 106a 6176 612f 6c61
6e67 2f53 7973 7465 6d01 0003 6f75 7401
0015 4c6a 6176 612f 696f 2f50 7269 6e74
5374 7265 616d 3b08 000e 0100 0b68 656c
6c6f 2077 6f72 6c64 0a00 1000 1107 0012
0c00 1300 1401 0013 6a61 7661 2f69 6f2f
5072 696e 7453 7472 6561 6d01 0005 7072
696e 7401 0015 284c 6a61 7661 2f6c 616e
672f 5374 7269 6e67 3b29 5607 0016 0100
044d 6169 6e01 0004 436f 6465 0100 0f4c
696e 654e 756d 6265 7254 6162 6c65 0100
046d 6169 6e01 0016 285b 4c6a 6176 612f
6c61 6e67 2f53 7472 696e 673b 2956 0100
0a53 6f75 7263 6546 696c 6501 0009 4d61
696e 2e6a 6176 6100 2100 1500 0200 0000
0000 0200 0100 0500 0600 0100 1700 0000
1d00 0100 0100 0000 052a b700 01b1 0000
0001 0018 0000 0006 0001 0000 0001 0009
0019 001a 0001 0017 0000 0025 0002 0001
0000 0009 b200 0712 0db6 000f b100 0000
0100 1800 0000 0a00 0200 0000 0300 0800
0400 0100 1b00 0000 0200 1c
```
* 文件开头的4个字节`cafe babe`称之为 魔数，唯有以`cafe babe`开头的class文件方可被虚拟机所接受，这4个字节就是字节码文件的身份识别。 0000是编译器jdk版本的次版本号0，003c转化为十进制是60,是主版本号，
# 反编译字节码文件
:::info
使用到java内置的一个反编译工具javap可以反编译字节码文件, 用法: javap <options> <classes>
:::
```java
  -help  --help  -?        输出此用法消息
  -version                 版本信息
  -v  -verbose             输出附加信息
  -l                       输出行号和本地变量表
  -public                  仅显示公共类和成员
  -protected               显示受保护的/公共类和成员
  -package                 显示程序包/受保护的/公共类
                           和成员 (默认)
  -p  -private             显示所有类和成员
  -c                       对代码进行反汇编
  -s                       输出内部类型签名
  -sysinfo                 显示正在处理的类的
                           系统信息 (路径, 大小, 日期, MD5 散列)
  -constants               显示最终常量
  -classpath <path>        指定查找用户类文件的位置
  -cp <path>               指定查找用户类文件的位置
  -bootclasspath <path>    覆盖引导类文件的位置
```
:::info
javap -verbose -p Main.class
:::
```java
Classfile /D:/download/java/JVM/字段码练习/Main.class    //所在位置
  Last modified 2022年4月25日;							//最后修改时间
   size 411 bytes           //文件大小
   //MD5值
  SHA-256 checksum 14920fc5f18693867097fe8a42f013580f5207184006ada302aa64ed60651d30
  Compiled from "Main.java"

public class Main 		//类名
  minor version:    	//此版本号
  major version: 60 	//主版本号
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER	  //访问标志
```
| 标志名称 | 含义 | 
|-|-|
| ACC_PUBLIC | 是否为Public类型 |
| ACC_FINAL | 是否被声明为final，只有类可以设置 |
| ACC_SUPER	 | 是否允许使用invokespecial字节码指令的新语义 |
| ACC_INTERFACE | 标志这是一个接口 |
| ACC_ABSTRACT | 是否为abstract类型，对于接口或者抽象类来说，次标志值为真，其他类型为假 |
| ACC_SYNTHETIC | 标志这个类并非由用户代码产生 |
| ACC_ANNOTATION | 标志这是一个注解 |
| ACC_ENUM | 标志这是一个枚举 |
## 常量池
```java
  this_class: #21                         // Main
  super_class: #2                         // java/lang/Object
  interfaces: 0, fields: 0, methods: 2, attributes: 1
  //常量池
Constant pool:
   #1 = Methodref          #2.#3          // java/lang/Object."<init>":()V
   #2 = Class              #4             // java/lang/Object
   #3 = NameAndType        #5:#6          // "<init>":()V
   #4 = Utf8               java/lang/Object
   #5 = Utf8               <init>
   #6 = Utf8               ()V
   #7 = Fieldref           #8.#9          // java/lang/System.out:Ljava/io/PrintStream;
   #8 = Class              #10            // java/lang/System
   #9 = NameAndType        #11:#12        // out:Ljava/io/PrintStream;
  #10 = Utf8               java/lang/System
  #11 = Utf8               out
  #12 = Utf8               Ljava/io/PrintStream;
  #13 = String             #14            // hello world
  #14 = Utf8               hello world
  #15 = Methodref          #16.#17        // java/io/PrintStream.print:(Ljava/lang/String;)V
  #16 = Class              #18            // java/io/PrintStream
  #17 = NameAndType        #19:#20        // print:(Ljava/lang/String;)V
  #18 = Utf8               java/io/PrintStream
  #19 = Utf8               print
  #20 = Utf8               (Ljava/lang/String;)V
  #21 = Class              #22            // Main
  #22 = Utf8               Main
  #23 = Utf8               Code
  #24 = Utf8               LineNumberTable
  #25 = Utf8               main
  #26 = Utf8               ([Ljava/lang/String;)V
  #27 = Utf8               SourceFile
  #28 = Utf8               Main.java
```
## 方法声明
```java
{
  public Main();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC   			  //定义了一个公共方法
    Code:
    //stack: 最大操作数栈，JVM运行时会根据这个值来分配栈帧(Frame)中的操作栈深度,此处为1
    //locals: 局部变量所需的存储空间单位为Slot
    //args_size: 方法参数的个数，这里是1，因为每个实例方法都会有一个隐藏参数this
      stack=1, locals=1, args_size=1
      //方法体内容
         0: aload_0
         1: invokespecial #1                 // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 1: 0

  public static void main(java.lang.String[]);
    descriptor: ([Ljava/lang/String;)V
    flags: (0x0009) ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #7                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #13                 // String hello world
         5: invokevirtual #15                 // Method java/io/PrintStream.print:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 3: 0
        line 4: 8
}
SourceFile: "Main.java"
```
