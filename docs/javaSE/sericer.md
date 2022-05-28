---
title: 序列化流
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 对象序列化流
* 对象序列化流：ObjectOutputStream将Java对象的原始数据类型和图形写入OutputStream。可以使用ObjectInputStream读取（重构）对象。可以通过使用流的文件来实现对象的持久存储。如果流是网络套接字流，则可以在另一个主机上或另一个进程中重构对象
* 构造方法:ObjectOutputStream(OutputStream out)：创建一个写入指定的OutputStream的ObjectOutputStream
* 序列化对象的方法：
void writeObject(Object obj)：将指定的对象写入ObjectOutputStream
```java
public static void main(String[] args) throws IOException {
        //创建序列化流对象
        ObjectOutputStream os = new ObjectOutputStream(new
                FileOutputStream("oos.txt"));
        //创建学生对象
        Students s1 = new Students("李大嘴",45);
        //写入数据
        os.writeObject(s1);
        //释放资源
        os.close();
```
* 对象序列化流写入文件的编码格式为ANSI，需要反序列化才能读懂。
* [NotSerializableException]{.red}抛出一个实例需要一个Serializable接口。
 序列化运行时或实例的类可能会抛出此异常。 参数应该是类的名称。
 * [注意]{.yellow}：
一个对象要想被序列化，该对象所属的类必须必须实现[Serializable]{.yellow} 接口
Serializable是一个[标记接口]{.yellow}，实现该接口，不需要重写任何方法
# 反序列化流
* 对象反序列化流：ObjectInputStream
* ObjectInputStream反序列化先前使用ObjectOutputStream编写的原始数据和对象
构造方法：
* ObjectInputStream(InputStream in)：创建从指定的InputStream读取的ObjectInputStream
* 反序列化对象的方法：
Object readObject0：从ObjectlnputStream读取一个对象
```java
  ObjectInputStream ois = new ObjectInputStream(new
                FileInputStream("oos.txt"));

        Object s1= ois.readObject();
        Students s = (Students)s1;
        System.out.println("name is :"+s.getName()+"\tage is :"+s.getAge());
        ois.close();
```
* readObject()方法返回的是Object类型的，需要向下转型才可以调用类成员。
# 特殊操作流
## 修改对象类方法
1. Class InvalidClassException
当序列化运行时检测到类中的以下问题之一时抛出。 
* 类的串行版本与从流中读取的类描述符的类型不匹配 
* 该类包含未知的数据类型 
* 该类没有可访问的无参数构造函数 
2. 解决
ANY-ACCESS-MODIFIER static final long serialVersionUID = 42L;

如果可序列化类没有显式声明serialVersionUID，则序列化运行时将根据Java（TM）对象序列化规范中所述的类的各个方面计算该类的默认serialVersionUID值。 但是， 强烈建议所有可序列化的类都明确声明serialVersionUID值，因为默认的serialVersionUID计算对类详细信息非常敏感，这可能会因编译器实现而异，因此可能会在反InvalidClassException化期间导致InvalidClassException的InvalidClassException。 因此，为了保证不同Java编译器实现之间的一致的serialVersionUID值，一个可序列化的类必须声明一个显式的serialVersionUID值。 还强烈建议，显式的serialVersionUID声明在可能的情况下使用private修饰符，因为这种声明仅适用于立即声明的类 - serialVersionUID字段作为继承成员无效。 数组类不能声明一个显式的serialVersionUID，所以它们总是具有默认的计算值，但是对于数组类，放弃了匹配serialVersionUID值的要求。 

3. transient关键字，对象将不参与序列化
```java
privat transient String name;
```
# Properties
## 使用
```java
Properties prop = new Properties();
        prop.put("702001","小钢炮");
        prop.put("702002","火枪手");
        prop.put("702003","大钢炮");

        //遍历
        Set<Object> keys = prop.keySet();
        for(Object key : keys){
            Object value = prop.get(key);
            System.out.println(key+","+value);
        }
```
## 方法
| 方法名 | 说明 |
|-|-|
| Object setProperty(String key,String value) | 设置键和值，底层调用HashMap |
| String getProperty(String key) | 根据键值获取属性 |
| set<String> StringProptyname(String key,String value) | 返回不可修改的键集 |
## Properties和IO的方法
| 方法名 | 说明 |
|-|-|
| void load(InputStream input) | 从输入字节流读取属性列表（键和值) |
| void store(OutputString outp,String comments) | 将此属性列表写入Properties表中以适和使用于load(InputStream)方式写入输出字节流 |
| void stroe(Writer writer,String comments) | 将此属性列表写入Properties表中以适和使用于load(OutputStream)方式写入输出字符流 |
# Properties
## 普通方法使用
* 开发中经常使用Properties集合类来存取应用的配置项
假设有个properties.txt文件
```txt
Backgroup-color=red
font-size=14px
language=zh-CN
```
:::info no-icon
我们就可以修改配置文件来修改我们的代码，使用Properties类的好处就是你可以很轻松的理解和修改它们
:::
```java
//创建Properties对象
Properties prop = new Properties();
//加载文件
prop.load(new FileInputStream("properties.txt"));
//遍历键值对的值
prop.forEach((K,V)->System.out.println(K+" --->>> "+V));
//写文件操作
FileOutputStream fos = new FileOutputStream("properties.txt");
//写入键值对
prop.setProperty("charset","GBK");
//保存数据至文件
prop.store(fos,"charset:");
```
**输出结果**

        Backgroup-color --->>> red
        font-size --->>> 14px
        language --->>> zh-CN
**文件内容**

        #charset:
        #Wed Apr 13 15:55:53 GMT+08:00 2022
        Backgroup-color=red
        charset=GBK
        font-size=14px
        language=zh-CN
## 加上反射使用
假设有个properties2.txt文件
```txt
className=java.student
methodName=study
```
```java
class student{
        String name;
        int age;
        void study(){
                System.out.println("我是 "+name+"学生"+"今年"+age+"岁")；
        }
}
class teacher{
        String name;
        int age;
        void study(){
                System.out.println("我是 "+name+"老师"+"今年"+age+"岁")；
        }
}

public class example{
        Public static void main(String[] args){
                //创建Properties对象
                Properties prop = new Properties();
                FileReader fr = new FileReader("java\\properties2.txt");
                //加载文件
                prop.load(fr);
                fr.close(); 
                //获取类名和方法名
                String classname = prop.getProperty("className");
                String methodname = prop.getProperty("className");

                //反射获取类
                Class<?> c = Class.forName(classname);
                //获取无参构造
                Constructor con = c.getConstructor();
                //创建对象
                Object obj = con.newInstance();
                //获取方法
                Method method = c.getMethod(methodname);
                m.invoke(obj);
        }
}
```