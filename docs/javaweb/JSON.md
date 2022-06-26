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
     --------------------------------------------------
      /**
     * List和JSON相互转换
     * @author: panther
     * @date: 2022/6/11 23:40
     * @param: []
     * @return: void
     **/
    @Test
    public void test2(){
        List<Person> list = new ArrayList<>();
        list.add(new Person(1,"panther"));
        list.add(new Person(2,"Gin琴酒"));

        Gson gson = new Gson();
        //List集合转换成java String对象
        String s = gson.toJson(list);
        //[{"id":1,"name":"panther"},{"id":2,"name":"Gin琴酒"}]
        System.out.println(s);
        //java Strig转换成List中的对象
        String s1 = "[{\"id\":1,\"name\":\"panther\"},{\"id\":2,\"name\":\"Gin琴酒\"}]";
        //必须 否则转换的类型将会是Map类型
          List list1 = gson.fromJson(s1, new TypeToken<ArrayList<Person>>(){}.getType());
        System.out.println(list1);  
    }

     ------------------------------------------------------------
    /**
     * Map和JSON的相互转换
     * @author: panther
     * @date: 2022/6/12 0:07
     * @param: []
     * @return: void
     **/
    @Test
    public void test3(){

        Map<Integer,Person> map = new HashMap<>();
        map.put(1,new Person(1,"panther"));
        map.put(2,new Person(2,"Gin琴酒"));

        Gson gson = new Gson();
        //{"1":{"id":1,"name":"panther"},"2":{"id":2,"name":"Gin琴酒"}}
        String s = gson.toJson(map);
        System.out.println(s);

        String s2 = "{\"1\":{\"id\":1,\"name\":\"panther\"},\"2\":{\"id\":2,\"name\":\"Gin琴酒\"}}";

        Map map1 = gson.fromJson(s2, new TypeToken<HashMap<Integer,Person>>(){}.getType());
        System.out.println(map1);
    }
```
# AJAX
AJAX(Asynchronous javascript and xml)异步javascript和xml创建交互式网站页面应用的开发技术.
ajax通过js异步发起的请求，局部更新页面的技术
## 书写
```javascript
   <script type="text/javascript">
         function ajaxRequest() {
//        1、我们首先要创建XMLHttpRequest 
            var xmlhttprequest = new XMLHttpRequest();
//        2、调用open方法设置请求参数
//               opne(method,url,true||false)true是异步false是同步
            xmlhttprequest.open("post","http://localhost:8081/Json/ajaxscr?action=javascriptAjax",true)

//        4、在send方法前绑定onreadystatechange事件，处理请求完成后的操作。
//   
            xmlhttprequest.onreadystatechange = function(){
//           xmlhttprequest.responseText获取字符串响应数据
//           xmlhttprequest.responseXML获取XML形式响应数据
            var jsonObj = JSON.parse(xmlhttprequest.responseText);
//  readystate : 5种状态
//                 0：请求未初始化     1：服务器连接已建立 
// 2：请求已接受    3：请求处理中       4：请求已完成，响应以就绪
            if(xmlhttprequest.readyState === 4 && xmlhttprequest.status === 200){

               document.getElementById("div01").innerHTML="编号"+jsonObj.id+" 姓名:"+jsonObj.name ;
            }
         };
//             3、调用send方法发送请求
            xmlhttprequest.send();

         }
      </script>
````
## jquery请求ajax
:::tip
ajax请求
:::
```javascript
$(function(){
            // ajax请求
            $("#button").click(function(){
               $.ajax({
                  url: "http://localhost:8081/Json/ajaxscr",
                  data: "action=jqueryAjax",//不能有空格
                  type: "POST",
                  success: function (msg) {
                     //alert("获取的服务器数据"+msg);
                     $("#msg").html("编号："+msg.id+"  姓名："+msg.name);
                  },
                  dataType: "json"   //text,xml,json
               });

            });
```
# i18n国际化
```java
    @Test
    public void test1(){
        Locale locale = Locale.getDefault();
        //获取系统默认语言国家信息
        System.out.println(locale);

        System.out.println(Locale.CHINA);
        System.out.println(Locale.US);
    }

//   配置文件
//    i18n_zh_CN.properties:username=用户名 password=密码
//    i18n_en_US.properties:username=username password=password

    @Test
    public void testi18n(){

        Locale locale = Locale.CHINA;

        ResourceBundle i18n = ResourceBundle.getBundle("i18n", locale);
        System.out.println(i18n.getString("username"));
        System.out.println(i18n.getString("password"));
    }
```