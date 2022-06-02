---
title: 注解
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 注解基础
注解是`JDK1.5`版本开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。它主要的作用有以下四方面： 
1. 生成文档，通过代码里标识的元数据生成javadoc文档。 
2. 编译检查，通过代码里标识的元数据让编译器在编译期间进行检查验证。 
3. 编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。 
4. 运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。 

这么来说是比较抽象的，我们具体看下注解的常见分类： 
* Java自带的标准注解，包括`@Override`、`@Deprecated`和`@SuppressWarnings`，分别用于标明重写某个方法、标明某个类或方法过时、标明要忽略的警告，用这些注解标明后编译器就会进行检查。 
* 元注解，元注解是用于定义注解的注解，包括`@Retention`、`@Target`、`@Inherited`、`@Documented`，`@Retention`用于标明注解被保留的阶段，`@Target`用于标明注解使用的范围，`@Inherited`用于标明注解可继承，`@Documented`用于标明是否生成javadoc文档。 
* 自定义注解，可以根据自己的需求定义注解，并可用元注解对自定义注解进行注解。
# Annotation的定义
```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}

@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface FunctionalInterface {}

```
:::tip
`@Target`
:::
判断注解使用的区域
1. ElementType.METHOD:只能在方法使用
:::tip
`@Retention`
:::
1. RetentionPolicy.RUNTIME：在运行时期触发
# Annotaation组成
## annotation.java
```java
package java.lang.annotation;
public interface Annotation {

    boolean equals(Object obj);

    int hashCode();

    String toString();

    Class<? extends Annotation> annotationType();
}
```
## ElementType.java
ElementType 是 `Enum` 枚举类型，它用来指定 Annotation 的类型。就是说明了我的注解将来要放在哪里。
```java
package java.lang.annotation;

public enum ElementType {
    // 类、接口（包括注释类型）或枚举声明
    TYPE,          
    //  字段声明（包括枚举常量
    FIELD,       
    //  方法声明
    METHOD,       
    //  参数声明
    PARAMETER,      
    //  构造方法声明
    CONSTRUCTOR,     
    //  局部变量声明
    LOCAL_VARIABLE,  
    //   注释类型声明
    ANNOTATION_TYPE,   
    //  包声明
    PACKAGE      
}

```
## RetentionPolicy.java
RetentionPolicy 是 `Enum` 枚举类型，它用来指定 Annotation 的策略。就是不同
RetentionPolicy 类型的 `Annotation` 的**作用域**不同。

若 Annotation 的类型为 `SOURCE`，则意味着：
Annotation 仅存在于编译器处理期间，编译器处理完之后，该 Annotation 就没用了。 

若 Annotation 的类型为 `CLASS`，则意味着：编译器将 Annotation 存储于类对应的 .class 文件中，它是 Annotation 的默认行为。

若 Annotation 的类型为 `RUNTIME`，则意味着：编译器将 Annotation 存储于 class 文件中，并且可由JVM读入。
```java
package java.lang.annotation;
public enum RetentionPolicy {
    //Annotation信息仅存在于编译器处理期间，编译器处理完之后就没有该Annotation信息了
    SOURCE,       
    //编译器将Annotation存储于类对应的.class文件中。但不会加载到JVM中。默认行为 
    CLASS,       
    // 编译器将Annotation存储于class文件中，并且可由JVM读入，因此运行时我们可以获取。
    RUNTIME       
}
```
# java自带的注解
Java 定义了一套注解,共有`10`个,6个在 `java.lang`中，剩下4个在java.lang.annotation 中。

* 作用在代码的注解是
:::tip
`@Override` 
:::
检查该方法是否是重写方法。如果发现其父类，或者是引用的接口中并没有该方法时，会报编译错误。
:::tip
`@Deprecated` 
:::
标记过时方法。如果使用该方法，会报编译警告。
:::tip
`@SuppressWarnings` 
:::
指示编译器去忽略注解中声明的警告。
:::tip
`@SafeVarargs` 
:::
忽略任何使用参数为泛型变量的方法或构造函数调用产生的警告。
:::tip
`@FunctionalInterface` 
:::
标识一个匿名函数或函数式接口
:::tip
`@Repeatable` 
:::
标识某注解可以在同一个声明上使用多次。

* 作用在其他注解的注解(或者说**元注解**)是:
:::warning
`@Retention` 
:::
标识这个注解怎么保存，是只在代码中，还是编入class文件中，或者是在运行时可以通过反射访问。
:::warning
`@Documented` 
:::
标记这些注解是否包含在用户文档中。
:::warning
`@Target` 
:::
标记这个注解可以修饰哪些 Java 成员。
:::warning
`@Inherited` 
:::
如果一个类用上了@Inherited修饰的注解，那么其子类也会继承这个注解
