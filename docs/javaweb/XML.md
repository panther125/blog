---
title: XML
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVAWEB
sticky: 
   true
---
# XML格式
```xml
<?xml version="1.0" encoding="utf-8" ?>
<!-- xml声明 version是版本的意思   encoding是编码  -->
<books> <!-- 这是xml注释 -->
    <book id="SN123123413241"> <!-- book标签描述一本图书   id属性描述 的是图书 的编号  -->
        <name>java编程思想</name> <!-- name标签描述 的是图书 的信息 -->
        <author>panther</author> <!-- author单词是作者的意思 ，描述图书作者 -->
        <price>29.9</price>		 <!-- price单词是价格，描述的是图书 的价格 -->
    </book>
    <book id="SN12341235123">	<!-- book标签描述一本图书   id属性描述 的是图书 的编号  -->
        <name>java核心编程</name>
        <author>panther</author>	
        <price>39.9</price>	
    </book>
</books>
```
# 使用dom4j解析xml文件
由于dom4j它不是sun公司的技术，而属于第三方公司的技术，我们需要使用dom4j就需要到dom4官网下载dom4j的jar包。
```java

    /**
     * @Author panther
     * @return 读取XML生成的
     **/
    @Test
    public void test2() {
        SAXReader saxReader = new SAXReader();
        try{
            Document read = saxReader.read("src/XMLTest/books.xml");
            //通过Document对象获取根元素
            Element rootElement = read.getRootElement();
//            System.out.println(rootElement);
            //通过根元素获取标签对象
            List<Element> books = rootElement.elements("book");
            for(Element book : books){
                //asXML将标签对象转化为标签字符串
//                System.out.println(book.asXML());
                Element name = book.element("name");
//                System.out.println(name);
                String bookname = name.getText();
                //System.out.println(bookname);
                String bookauthor = book.elementText("author");
                //System.out.println(bookauthor);
                String bookprice = book.elementText("price");
                String id = book.attributeValue("id");
                //System.out.println(id);

                System.out.println(new booksDemo(id,bookname,bookauthor,Double.parseDouble(bookprice)));
            }

        }catch (DocumentException d){
            d.printStackTrace();
        }


    }
```
# Tomcat
## 目录介绍
* bin 专门用来存放 Tomcat 服务器的可执行程序 
* conf 专门用来存放 Tocmat 服务器的配置文件
* lib 专门用来存放 Tomcat 服务器的 jar 包 
* logs 专门用来存放 Tomcat 服务器运行时输出的日记信息 
* temp 专门用来存放 Tomcdat 运行时产生的临时数据 
* webapps专门用来存放部署的 Web 工程。 work 是 Tomcat 工作时的目录，用来存放 Tomcat 运行时
* jsp 翻译为 Servlet 的源码，和 Session 钝化的目录。
## 端口号
Tomcat 默认的端口号是：8080 
找到 Tomcat 目录下的 `conf` 目录，找到 `server.xml` 配置文件。
```xml
 <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```
## 部署
:::tip
第一种部署方法
:::
只需要把 web 工程的目录拷贝到 Tomcat 的 webapps 目录下 即可
:::tip
第2种部署方法
:::
找到 Tomcat 下的 conf 目录\Catalina\localhost\ 下,创建如下的配置文件
```xml
<!-- Context 表示一个工程上下文 path 表示工程的访问路径:/web 
docBase 表示你的工程目录在哪里 --> 
<Context path="/web" docBase="D:\web" />
```
## 页面显示
* 当我们在浏览器地址栏中输入访问地址如下： 
[http://ip:port/]{.red} ====>>>> 没有工程名的时候，默认访问的是 ROOT 工程。 
* 当我们在浏览器地址栏中输入的访问地址如下： 
[http://ip:port/工程名/]{.yellow} ====>>>> 没有资源名，默认访问 index.html 页面
## Tomcat项目在IDEA中的目录结构

	|-----src 存放编写的java文件
	|
	|-----web 存放web工程的资源文件
		   |
		   |----WEB-INF 服务器保护的目录,浏览器无法直接访问
		   		|-- lib 存放导入的第三方jar包
		   		|-- web.xml 整个web文件的配置部署文件
# HTTP
* 超文本传输协议 是浏览器和服务器端之间约定好了的一种规范；双方按照规范传递和接受数据；
* https: 加密的传输协议；更安全，在协议中增加了秘钥，不容易被拦截和篡改，大多数对安全
有要求的都会使用 https；

## GET和POST
* Get：一般用于获取数据用的
* POST：一般用于将数据发送给服务器用的
:::warning
get和post的区别
:::
1. get提交数据会放在URL中拼接，post放在HTTP的Body中；
2. get提交的数据大小有限制（因为浏览器和服务器对URL的长度有限制）
3. post方法提交的数据没有限制，起限制作用的是服务器的处理程序的处理能力；
4. get请求会把http header和data一起发送，服务器响应返回数据；

5. post请求则会先发送http header，服务器响应100后，再发送data,服务器响应200返回数据
6. get方式提交数据，会带来安全问题,因为提交的数据会被显示在URL中；
7. get方法需要使用request querystring来取得变量的值；
8. post方法通过request form来获取变量的值。
