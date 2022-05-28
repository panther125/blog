---
title: 基本类型的包装类
date: 2022-05-20
categories:
 - 后端
tags:
 - JAVA
---
# 前言
今天我们来一起聊聊基本类型的包装类我们在学习 Java 的时候有了解Java有四类八种基本数据类型这些基本数据类型都有对应的包装类。
# 基本类型包装类的概述
将基本数据类型封装成对象的好处在于可以在对象中定义更多的功能方法操作该数据。
# 基本数据类型与包装类的对应关系
| 基本类型 | 大小 | 包装类型 |
|--|--|--|
| boolean | / | Boolean |
| byte | 8bit | Byte |
| char | 16bit | Character |
| short | 16bit | Short |
| int | 32bit | Integer |
| float | 32bit | Float |
| long | 64bit | Long |
| double | 64bit | Double |
| void | / | Void |
# Integer
Integer类包装一个对象中的原始类型int的值。 类型为Integer的对象包含一个单一字段，其类型为int 。 
此外，该类还提供了一些将int转换为String和String转换为int ，以及在处理int时有用的其他常量和方法。 
实施说明：“bit twiddling”方法（如highestOneBit和numberOfTrailingZeros ）
的实现基于Henry S. Warren，Jr.的Hacker's Delight （Addison Wesley，2002）的材料。 
## Integer的构造函数
Integer(int value) 
构造一个新分配的 Integer对象，该对象表示指定的 int值。  
Integer(String s) 
构造一个新分配 Integer对象，表示 int由指示值 String参数。  
## 方法摘要
| Modifier and Type | Method and Description |
|--|--|
| static int | bitCount(int i) 返回指定的int值的二进制补码二进制表示中的 int数。 |
| byte | byteValue() 返回此值 Integer为 byte的基本收缩转换后。 |
| static int | compare(int x, int y) 比较两个 int数字值。 |
| int | compareTo(Integer anotherInteger) 数字比较两个 Integer对象。 |
| static int | compareUnsigned(int x, int y) 比较两个 int值，以数值方式将值视为无符号。 |
| static Integer | decode(String nm) 将 String解码成 Integer 。 |
| boolean | equals(Object obj) 将此对象与指定的对象进行比较。 |
| int | hashCode() 返回这个 Integer的哈希码。  |
| int | hashCode(int value) 返回值为int的哈希码; 兼容Integer.hashCode()。 |
| int | max(int a, int b) 返回两个 int的较大值，就像调用 Math.max一样。 |
| int | min(int a, int b) 返回两个 int的较小值，就像调用 Math.min一样。 |
| static int | reverse(int i)返回由指定的二进制补码表示反转位的顺序而获得的值 |
| String | toString() 返回 String表示此对象 Integer的价值。 |
| static Integer | valueOf(String s)返回一个 Integer对象保存指定的值为 String |
| static int | parseInt(String s)返回一个String对象保存指定的值为 Integer |
## JDK5的新特性自动装箱和拆箱
[自动装箱]{.yellow}：
把基本类型转换为包装类类型
[自动拆箱]{.blue}：
把包装类类型转换为基本类型
## Integer的面试题
```java
Integer i1 = 97;
Integer i2 = 97;

System.out.println(i1 == i2);
System.out.println(i1.equals(i2));
System.out.println("-----------");


Integer i3 = 197;
Integer i4 = 197;

System.out.println(i3 == i4);
System.out.println(i3.equals(i4));
```
输出结果为：
+++info
true
true
-----------
false
true
-----------
[解析]{.red}:是不是一脸懵逼，匪夷所思的答案，其实是因为-128~127是byte的取值范围，如果在这个取值范围内，自动装箱就不会创建新的对象，而是从常量池中获取，超过了byte取值范围就会再创建新对象~这个就是 i1==i2 的结果为 true 的原因了，想详细了解的建议去看源码分析
+++
# Character
| 方法 | 描述 |
|--|--|
| isLetter() | 是否是一个字母 |
| isWhitespace() | 是否是一个空白字符 |
| isUpperCase() | 是否是一个大写字母 |
| isLowerCase() | 是否是一个小写字母 |
| toUpperCase() | 指定字母的大写形式 |
| toLowerCase() | 指定字母的小写形式 |
| toString() | 返回字符的字符串形式，字符串的长度仅为1 |