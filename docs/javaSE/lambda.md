---
title: 函数编程思想和接口组成更新
date: 2022-05-20
categories:
 - 后端
tags:
 - JAVA
---
# 函数编程
## Lambda表达式
* 格式：(形参)->{代码块}
```java
//匿名内部类
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("启动多线程！");
            }
        }).start();

        //Lambda改进
        new Thread( () ->{
            System.out.println("多线程启动！");
        } ).start();
```
* 使用lambda必须要有接口，并且接口中有且仅有一个抽象方法
* 可以理解为重写接口中的方法
:::warning
* 匿名内部类可以实现形参为`具体类`和`抽象类`和`接口`的方法
* lambda表达式只能实现形参为[接口]{.label .info}的方法
* 匿名内部类可以实现多方法的接口，lambda只能有一个方法
* 匿名内部类编译之后会产生一个独立的字节码文件
* lambda编译时不会产生独立的字节码文件，对应的字节码文件在运行时动态生成
:::
## 方法引用符
:::tip
* 类名引用静态方法
:::
```java
interface Calcable{
    int calc(int num);
}
//定义一个类并在类中定义一个静态方法
class Math{
    //求绝对值
    public static int abs(int num){
        if(num < 0){
            return -num;
        }else{
            return num;
        }
    }
}
public class example{
    public static void main(String[] args){
        //lambda表达式
        printabs(-10,n->Math.abs(n));
        //方法引用
        printabs(-10,Math::abs);
    }

    private static void printabs(int num,Calcable cal){
        System.out.println(cal.calc(num));
    }
}

```
:::tip
* 对象名引用方法
:::
```java
interface printable{
    void print(String str);
}
class StringUtils{
    public void printUpperCase(String str){
        System.out.println(str.toUpperCase);
    }
}

public class example{

    public static void main(String[] args){
        StringUtils stu = new StringUtils();
        //lambda表达式
        printUpper("hello",str->stu.printUpperCase(str));
        //方法引用
        printUpper("hello",stu::printUpperCase);
    }


    private static void printUpper(String text,printable pt){
            pt.print(text);
    }
}
```
:::tip
* 构造器引用
:::
```java
interface PersonBuilder{
    Person buildPerson(String name);
}
class Person{
    private String name;
    Public Person(String name){
        this.name=name;
    }
    public String getname(){
        return name;
    }
}

public class example{

    public static void main(String[] args){
        //lambda表达式
        printName("亚托克斯",str->new Person(str));
        //方法引用
        printName("亚托克斯",Person::new);
    }

    public static void printName(String name,PersonBuilder builder){
        System.out.println(builder.buildPerson(name).getname());
    }
}
```
:::tip
* 类名引用普通方法
:::
```java
interface printAble{
    void print(StringUtils stu,String str);
}
class StringUtils{
    public void printUpperCase(String str){
        System.out.println(str.toUpperCase);
    }
}

public static example{

    public static void main(String[] args){
        //lambda表达式
        printUpper(new StringUtils,"hello",(object str)->object.printUpperCase(str));
        //方法引用
        printUpper(new StringUtils,"hello",StringUtils::printUpperCase);
    }

    private static void printUpper(StringUtils stu,String text,printAble pt){
            pt.print(su,text);
    }
}

```
## 函数式接口
```java
@functionalInterface
interface Animal{
    void shout();
}
interface Calculate{
    int sum(int a,int b);
}

public class example{
    public static void main(String[] args){
        //lambda表达式
        animal(()->System.out.println("动物叫"));
        showSum(5,9,(x,y)->{
            return x+y
        });

    }
    //动物叫的方法
    private static void animalShout(Animal animal){
        animal.shout();
    }
    //求和方法
    private static void showSum(int x,int y,Calculate){
            System.out.print(x+" + "+"y"+" = "+Calculate.sum(x,y))
    }
}
``` 
**常用的函数式接口**
:::tip
* Supplier
* 可以将Supplier理解为获取一个常量
:::
```java
    public static void main(String[] args) {

        String s = getString(()->"灰太狼");
        System.out.println(s);
        
        Integer i = getInteger(()->30);
        System.out.println(i);

    }
    //获取字符串类型
    private static String getString(Supplier<String> sup){
        return sup.get();
    }
    //获取整数类型
    private static Integer getInteger(Supplier<Integer> sup2){
        return sup2.get();
    }
```
:::tip
* Consumer
* 将Consumer理解为接受一个常量
:::
```java
 public static void main(String[] args) {
        operatorString("刘亦菲",System.out::println);

        operatorString("刘亦菲",s->{
            System.out.println(s);
        },s2->{
            System.out.println(new StringBuilder(s2).reverse().toString());
        });
    }
    private static void operatorString(String name, Consumer<String> con){
        con.accept(name);
    }
    private static void operatorString(String name, Consumer<String> con1,Consumer<String> con2){

        con1.andThen(con2).accept(name);
    }
```
:::tip
* Predicate
* 将Predicate理解为字符串的操作的判断
:::
```java
 public static void main(String[] args) {

        Boolean b1=checkString("hello world", s-> s.length()>8);
        System.out.println(b1);

        boolean b2 = checkString3("hello world",s1->s1.length() > 12
        ,s2->s2.length() < 15);
        System.out.println(b2);

        boolean b3 = checkString4("hello world",s1->s1.length() > 12
        ,s2 ->s2.length()<15);
        System.out.println(b3);

    }
    private static boolean checkString(String text, Predicate<String> pre){
        return pre.test(text);
    }
    private static boolean checkString2(String text, Predicate<String> pre){
        return pre.negate().test(text);
    }

    private static boolean checkString3(String text, Predicate<String> pre1,Predicate<String> pre2){
        return pre1.and(pre2).test(text);
    }
    private static boolean checkString4(String text, Predicate<String> pre1,Predicate<String> pre2){
        return pre1.or(pre2).test(text);
    }
```
:::tip
* Function
* 将Predicate理解为字符串的操作的判断
:::
```java
public static void main(String[] args) {
        //lambda表达式
        convert("100",(String s)->{
           return Integer.parseInt(s);
        });
    }
    //Function<T,R>,T为传入参数类型，R为结果返回类型
    private static void convert(String s, Function<String,Integer> fun){
        int i = fun.apply(s);
        System.out.println(i);
    }
```
# Stream流
## collection体系生成流
```java
        List<String> list = new ArrayList<>();
        list.add("张三");list.add("张无忌");
        list.add("张曼玉");list.add("刘三郎");
        list.add("烛九阴");list.add("达式");
        Stream<String> s1=list.stream();

        Set<String> hset = new HashSet<>();
        hset.add("猛汉张"); hset.add("孤寡孙");
        Stream<String> s2=hset.stream();

        //map间接生成流
        Map<Integer,String> mp1 = new HashMap<>();
        mp1.put(1,"无邪");mp1.put(2,"王胖子");
        mp1.put(3,"张起灵");
        //生成键流
        Stream s3 = mp1.keySet().stream();
        //生成值流
        Stream s4 = mp1.values().stream();
        //生成键值对流
        Stream<Map.Entry<Integer, String>> entryStream = mp1.entrySet().stream();

        //字符串数组生成流
        String[] strArr = {"hello","world","java"};
        Stream strArrStream = Stream.of(strArr);
```
## stream常见方法
:::tip
* filter可以想象成判段然后过滤,判断字符串是否以张开头，长度是否等于3
:::
```java
list.stream().filter(s->s.startsWith("张")).filter(s->s.length()==3).
     forEach(System.out::println);
```
:::tip
* limit限制元素个数
* skip跳过元素个数
* concat合并两个流
* distinct去重
* sorted排序
:::
```java
//输出前三个数据
        list1.stream().limit(3).forEach(System.out::println);
        System.out.println("-------------");
        //跳过前三个数据输出后面的数据
        list1.stream().skip(3).forEach(System.out::println);
        System.out.println("--------------");
        //跳过前两个数据输出后面的两个数据
        list1.stream().skip(2).limit(2).forEach(System.out::println);
        System.out.println("-----------");

        //concat合并两个流,distinct除重复元素
        Stream s1 = list1.stream().skip(3).limit(1);
        Stream s2 = list1.stream().skip(5);
        Stream.concat(s1,s2).distinct().forEach(System.out::println);
        //顺序排序
        list.stream().sorted().forEach(System.out::println);
        System.out.println("-----------------");
        //逆序排序
        list.stream().sorted((s1,s2)->{
            return Integer.parseInt(s2)-Integer.parseInt(s1);
        }).forEach(System.out::println);
        System.out.println("-------------------");
        //使用map使list转换成整数在输出
        list.stream().map(Integer::parseInt).forEach(System.out::println);
        System.out.println("-------------");
        //求集合中元素的总和
        int sum = list.stream().mapToInt(Integer::parseInt).sum();
        System.out.println(sum);
```
# 接口组成更新
## 接口的默认方法
```java
public interface myinterfaceone {
    void show1();
    void show2();

    //接口更新
    public default void show3(){
        System.out.println("show3");
    }
}
```
:::info
实现接口更新的默认方法时，使用default可以不用在接口的实现类中重写方法，当然也可以重写
重写去掉default关键字
:::
## 接口的静态方法
```java
public interface myinterfaceone {
    void show1();
    void show2();

    public static void show4(){
        System.out.println("show4");
    }
}

```
:::info
实现接口更新的静态方法时，使用static可以不用在接口的实现类中重写方法
只能由接口调用静态方法
:::