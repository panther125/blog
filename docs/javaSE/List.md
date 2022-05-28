---
title: Java集合类框架的基本接口
date: 2022-05-20
categories:
 - 后端
tags:
 - JAVA
---
# java集合框架的基本接口
Java中的集合分为value（Conllection），key-value(Map)两种存储结构

[存储value有分为List 、Set、Queue]{.label .info}
![](https://pic.imgdb.cn/item/626e5b1e239250f7c5777540.png)

List：有序，可存储重复元素

Set：无序，元素不可重复。根据equals和hashcode判断（如果一个对象要存储在Set中，必须重写equals和hashCode方法）

Queue：队列

[存储key-value的为map]{.label .info}
![](https://pic.imgdb.cn/item/626e5b40239250f7c577e4bc.jpg)
## 常用集合
![](https://pic.imgdb.cn/item/627138da0947543129078064.png)
# 各集合的遍历方法
## ArrayList
```java
//创建Arraylist对象
        ArrayList<String> arr = new ArrayList<String>();
        //添加元素
        arr.add("萨格芬妮");
        arr.add("斯蒂芬");
        arr.add("米奇妙妙屋");
        //遍历
        //1,生成迭代器
        Iterator<String> it = arr.iterator();
        while(it.hasNext()){
            String s = it.next();
            System.out.println(s);
        }
        System.out.println("_-----------------_");
        //2.for循环
        for(int i = 0; i < arr.size(); i++){
            System.out.println(arr.get(i));
        }
        System.out.println("_-----------------_");
        //3.增强for
        for(String i : arr){
            System.out.println(i);
        }
```
## LinkedList
```java
        //创建linkedlist
        LinkedList<String> link = new LinkedList<>();
        //添加元素
        link.add("艾欧尼亚");
        link.add("库里");
        link.add("蟹堡王");
        //循环
        //1.生成迭代器
        Iterator<String> it2 = link.iterator();
        while(it2.hasNext()){
            String s2 = it2.next();
            System.out.println(s2);
        }
        System.out.println("_-----------------_");
        //2.for循环
        for(int i = 0; i < link.size(); i++){
            System.out.println(link.get(i));
        }
        System.out.println("_-----------------_");
        //增强for
        for(String e : link){
            System.out.println(e);
        }
```
## Set
```java
 //创建set对象
        Set<String> se = new HashSet<>();
        //添加元素
        se.add("汤姆");
        se.add("杰瑞");
        se.add("大表哥");
        se.add("大表哥");
        //生成迭代器
        Iterator<String> i = se.iterator();
        while(i.hasNext()){
            String s = i.next();
            System.out.println(s);
        }
        System.out.println("_----------------_");
        //增强for
        for(String e : se){
            System.out.println(e);
        }
```
## HashSet
```java
//创建hashset集合
        HashSet<students1> ha = new HashSet<>();
        //添加学生对象
        students1 s1 = new students1("艾瑞利亚",555);
        students1 s2 = new students1("亚托克斯",666);
        students1 s3 = new students1("暮光精灵",444);
        students1 s4 = new students1("亚托克斯",666);
        //添加到hashset集合中
        ha.add(s1);
        ha.add(s2);
        ha.add(s3);
        //二种方式遍历，hashset不存在索引不能用普通的for循环
        //生成迭代器
        Iterator<students1> it = ha.iterator();
        while(it.hasNext()){
            students1 ss = it.next();
            System.out.println("name: "+ss.getName()+"   age: "+ss.getAge());
        }
        System.out.println("_-----------------_");
        //增强for循环
        for(students1 sss : ha){
            System.out.println("name: "+sss.getName()+"   age: "+sss.getAge());
        }
        //避免元素重复，需要重写hashcoed和equals方法
```
## HashMap
```java
 //遍历方式一
        Map<String,String> mp = new HashMap<>();

        mp.put("张无忌","赵敏");
        mp.put("杨过","小龙女");
        mp.put("郭靖","黄蓉");
        //keyset获取键值
        Set<String> s1 = mp.keySet();
        for(String i : s1){
            String key = i;
            String value = mp.get(i);
            System.out.println(key+"love"+value);
        }
        System.out.println("—___---___----__------");
        //遍历方式二
        Map<String,String> mp2 = new HashMap<>();

        mp2.put("猪八戒","青霞仙子");
        mp2.put("嫦娥","后裔");
        mp2.put("孙悟空","紫霞仙子");
        //Entry方法获取键合对应的值
        Set<Map.Entry<String,String>> ent = mp2.entrySet();
        for(Map.Entry<String,String> i : ent){
           String key = i.getKey();
           String value = i.getValue();
           System.out.println(key+"love"+value);
        }
```
# 汇总图片
![](https://pic.imgdb.cn/item/626e611c239250f7c587c350.png)
# Set

    TreeSet 基于红黑树实现，支持有序性操作，例如根据一个范围查找元素的操作。但是查找效率不如 HashSet，HashSet 查找的时间复杂度为 O(1)，TreeSet 则为 O(logN)。
    HashSet 基于HashMap实现，支持快速查找，但不支持有序性操作。并且失去了元素的插入顺序信息，也就是说使用 Iterator 遍历 HashSet 得到的结果是不确定的。
    LinkedHashSet 是 HashSet 的子类，并且其内部是通过 LinkedHashMap 来实现的。内部使用双向链表维护元素的插入顺序。

# List

    ArrayList 基于动态数组实现，支持随机访问。
    Vector 和 ArrayList 类似，但它是线程安全的。
    LinkedList 基于双向链表实现，只能顺序访问，但是可以快速地在链表中间插入和删除元素。不仅如此，LinkedList 还可以用作栈、队列和双向队列。

# Queue

    LinkedList 可以用它来实现双向队列。
    PriorityQueue 基于堆结构实现，可以用它来实现优先队列。
    ArrayQueue基于数组实现，可以用它实现双端队列，也可以作为栈。

# 说说Map有哪些类及他们各自的区别和特点？

    TreeMap 基于红黑树实现。
    HashMap 1.7基于数组+链表实现，1.8基于数组+链表+红黑树。链表则是主要为了解决哈希冲突而存在的（“拉链法”解决冲突）。JDK1.8 以后在解决哈希冲突时有了较大的变化，当链表长度大于阈值（默认为 8）（将链表转换成红黑树前会判断，如果当前数组的长度小于 64，那么会选择先进行数组扩容，而不是转换为红黑树）时，将链表转化为红黑树，以减少搜索时间。
    HashTable 和 HashMap 类似，但它是线程安全的，这意味着同一时刻多个线程可以同时写入 HashTable 并且不会导致数据不一致。它是遗留类，不应该去使用它。（现在可以使用 ConcurrentHashMap 来支持线程安全，并且 ConcurrentHashMap 的效率会更高(1.7 ConcurrentHashMap 引入了分段锁, 1.8 引入了红黑树)。）
    LinkedHashMap继承自 HashMap。使用双向链表来维护元素的顺序，顺序为插入顺序或者最近最少使用(LRU)顺序。


