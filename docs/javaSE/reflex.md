---
title: 反射
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 类加载器
:::info no-icon
* 类加载
:::
当程序要使用某个类时，如果该类还未被加载到内存中，则系统会通过
[类的加载]{.label .info}，[类的连接]{.label .info}，[类的初始化]{.label .info}
这三个步骤来对类进行初始化。如果不出现意外情况，JVM将会连续完成这三个步骤，所以有时也把这三个步骤统称为类加载或者类初始化
**类的加载**
* 就是指将class文件读入内存，并为之创建一个java.lang.class对象
* 任何类被使用时，系统都会为之创建一个java.lang.class对象
**类的连接**
* 验证阶段：用于检验被加载的类是否有正确的内部结构，并和其他类协调一致
* 准备阶段：负责为类的类变量分配内存，并设置默认初始化值
* 解析阶段：将类的二进制数据中的符号引用替换为直接引用
**类的初始化**
* 主要对类变量进行初始化
## JVM类加载机制
**JVM类加载机制**
* 全盘负责：就是当一个类加载器负责加载某个Class时，该Class所依赖的和引用的其他Clss也将由该类加载器负责载入，除非显示使用另外一个类加载器来载入
* 父类委托：就是当一个类加载器负责加载某个Class时，先让父类加载器试图加载该Clss,只有在父类加载器无法加载该类时才尝试从自己的类路径中加载该类
* 缓存机制：保证所有加载过的Class都会被缓存，当程序需要使用某个Class对象时，类加载器先从缓存区中搜索该
Class,只有当缓存区中不存在该Clss对象时，系统才会读取该类对应的二进制数据，并将其转换成Class对象，存储到缓存区
```java
        //static classloader getsystemclassloader();返回系统类加载器
        ClassLoader cl = ClassLoader.getSystemClassLoader();
        System.out.println(cl);//$AppClassLoader@78308db1
        //ClassLoader.getParent 返回父类加载器
        ClassLoader c2 = cl.getParent();
        System.out.println(c2);//$PlatformClassLoader@16b98e56
```
# 反射
Java反射机制：是指在运行时去获取一个类的变量和方法信息。然后通过获取到的信息来创建对象，调用方法的一
种机制。由于这种动态性，可以极大的增强程序的灵活性，程序不用在编译期就完成确定，在运行期仍然可以扩展
```java
 		//class属性获取类对象
        Class<Student> c1 = Student.class;
        System.out.println(c1);
        //get.class获取类对象
        Student s1 = new Student();
        Class<? extends Student> c2 = s1.getClass();
        System.out.println(c2 == c1);//true

        //forName获取类对象
        Class<?> c3 = Class.forName("reflex.Student");
        System.out.println(c3 == c1);//true
```
## 获取类对象
:::info no-icon
* 获取构造方法
:::
1. Constructor<T> getConstructor(类<?>... parameterTypes) 
返回一个 Constructor对象，该对象反映 Constructor对象表示的类的指定的公共类函数。  
2. Constructor<?>[] getConstructors() 
返回包含一个数组 Constructor对象反射由此表示的类的所有公共构造类对象。
3. Constructor<?>[] getDeclaredConstructors() 
返回一个反映 Constructor对象表示的类声明的所有 Constructor对象的数组类 。  
```java
		//获取类
        Class<?> s = Class.forName("reflex.Student");

        //获取构造方法,只能获取公共的构造方法
        Constructor<?>[] constructors = s.getConstructors();
        for(Constructor con : constructors){
            System.out.println(con);
        }
        System.out.println("----------------");
        //获取所有的构造函数
        Constructor<?>[] cons = s.getDeclaredConstructors();
        for(Constructor con : cons){
            System.out.println(con);
        }
        //获取指定的构造函数
          //获取单个构造函数
        Constructor<?> con1 = s.getConstructor();
        Constructor<?> con2 = s.getDeclaredConstructor(String.class,int.class);//非公共
        Constructor<?> con3 = s.getConstructor(String.class,int.class,String.class);

```
## 创建对象
* newInstance() 创建由此类对象表示的类的新实例。
```java
 //创建实例化对象
        Object obj =con1.newInstance();
        System.out.println(obj);

        Object obj3 =con3.newInstance("张三",33,"上海海淀区");
        System.out.println(obj3);

        //暴力反射，当构造方法为私有时通过setAccessible(boolean true)暴力反射
        con.setAccessible(true);
        Object obj = con.newInstance("toooom");
        System.out.println(obj);
```
## 获取成员变量
* Field[] getFields() 
返回包含一个数组 Field对象反射由此表示的类或接口的所有可访问的公共字段 类对象。  
* Field[] getDeclaredFields() 
返回的数组 Field对象反映此表示的类或接口声明的所有字段 类对象。 
* Field getField() 获取单个公共变量
* Field getDeclaredField() 获取单个变量
```java
		//创建获取构造方法
        Constructor<?> classf = c.getConstructor();
        //创建实例化对象
        Object obj = classf.newInstance();
        //获取单个成员变量
        Field field1 = c.getDeclaredField("address");
        //给成员变量赋值
        field1.set(obj,"上海");//set(Object object,ObjuctValue value)
        Field field2 = c.getDeclaredField("name");
        //暴力反射
        field2.setAccessible(true);
        field2.set(obj,"张三"); 
```
## 获取成员方法
* method getMethod(String name, 类<?>... parameterTypes) 
返回一个 方法对象，它反映此表示的类或接口的指定公共成员方法 类对象。  
* method[] getMethods() 
返回包含一个数组 方法对象反射由此表示的类或接口的所有公共方法 类对象，包括那些由类或接口和那些从超类和超接口继承的声明。 
* method[] getDeclaredMethods() 
返回包含一个数组 方法对象反射的类或接口的所有声明的方法，通过此表示 类对象，包括公共，保护，默认（包）访问和私有方法，但不包括继承的方法。 
```java
 //获取类对象
        Class<?> c = Class.forName("reflex.Student");

 		//获取公共成员方法,拿到所有类和继承和接口的公共方法，包括超级类和超级接口
        Method[] m = c.getMethods();
        for(Method ms : m){
            System.out.println(ms);
        }
        System.out.println("----------");
        //获取所有成员方法,不包括继承和接口的公共方法
        Method[] m2 = c.getDeclaredMethods();
        for(Method ms : m2){
            System.out.println(ms);
        }
        System.out.println("-------");
        Method mm = c.getMethod("method");
        //创建对象实例化
        Constructor<?> con = c.getConstructor();
        Object obj = con.newInstance();
        //调用成员方法
        mm.invoke(obj);
        //私有的方法
        Method pm = c.getDeclaredMethod("function");
        pm.setAccessible(true);
        pm.invoke(obj);
```
## 反射越过泛型检查，返回原始方法
```java
  //反射越过泛型检查，获取原始方法
        ArrayList<Integer> arr = new ArrayList<>();

        //获取类对象
        Class<? extends ArrayList> c = arr.getClass();
        Method reflexadd = c.getMethod("add",Object.class);
        reflexadd.invoke(arr,"hello");
        reflexadd.invoke(arr,"world");

        System.out.println(arr);
```
# 模块化
:::info 
* 在改模块下的src下创建module-info.java文件
* 模块导出格式：exports 包名
* 模块使用格式：requires 模块名
:::