---
title: JSON和AJAX
date: 2022-06-11
categories:
 - 后端
tags:
 - JAVAWEB
sticky: 
   true
---
# JSON
## JSON的定义
:::tip
* jso是由键值对组成，并且由花括号（大括号）包围。每个键由引号引起来，键和值之间使用冒号进行分隔，多组键值对之间进行逗号进行分隔。
:::
```javascript
// json的定义
         var JsonObj = {
            "key1": 15,
            "key2": "abc",
            "key3": false,
            "key4": [11,"str",true],
            //键值套娃
            "key5":{
               "key5_1": 1,
               "key5_2": "asc"
            },
            //json数组
            "key6":[
               {"key6_1": 15, "key_611": true},
               {"key6_2": "abc"}
            ]
         }
```
## JSON的访问
```javascript
// json的访问
         alert(JsonObj.key1);
         alert(JsonObj.key4);
         alert(JsonObj.key4[0]);
         alert(JsonObj.key5.key5_2);
         alert(JsonObj.key6[1].key6_2);
```
:::tip
两个常用转换方法
:::
```javascript
// json对象转字符串
         var JSONString = JSON.stringify(JsonObj);
         alert(JSONString);
         // json字符串转json对象
         var JSONObj2 = JSON.parse(JSONString);
         alert(JSONObj2)
```
## JSON和JAVA之间的相互转换
```java
public class Person {
    private Integer id;
    private String name;

    public Person() {
    }

    public Person(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
      ........
}
 /**
     * javaBean与JSON转换
     * @author: panther
     * @date: 2022/6/11 23:02
     * @param: []
     * @return: void
     **/
    @Test
    public  void Test1() {
        Person person = new Person(1,"panther");

        //创建GSON对象
        Gson gson = new Gson();
        //将java对象转换成JSON字符串
        String s = gson.toJson(person);
        System.out.println(s);//{"id":1,"name":"panther"}

        String s2 = "{\"id\":2,\"name\":\"Gin琴酒\"}";
        Person person1 = gson.fromJson(s2,Person.class);
        System.out.println(person1);
    }
```

