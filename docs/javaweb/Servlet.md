---
title: Servlet
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVAWEB
sticky: 
   true
---
# Servlet
## 什么是Servlet
1. Servlet是JavaEE规范之一。规范就是接口
2. Servlet就JavaWeb三大组件之一。三大组件分别是：`Servlet`程序、`Filter`过滤器、`Listener`监听器。
3. Servlet:是运行在服务器上的一个java小程序，
[它可以接收客户端发送过来的请求，并响应数据给客户端]{.red}。
## 实现一个Servlet程序
:::tip
web.xml配置
:::
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!--context-param是上下文参数(它属于整个web工程)-->
    <context-param>
        <param-name>username</param-name>
        <param-value>context</param-value>
    </context-param>
      <!--context-param是上下文参数(它属于整个web工程)-->
    <context-param>
        <param-name>password</param-name>
        <param-value>root</param-value>
    </context-param>


    <!-- servlet标签给Tomcat配置Servlet程序 -->
    <servlet>
        <!--servlet-name标签 Servlet程序起一个别名（一般是类名） -->
        <servlet-name>HelloServlet</servlet-name>
        <!--servlet-class是Servlet程序的全类名-->
        <servlet-class>servlet.HelloServlet</servlet-class>
        <!--init-param是初始化参数-->
        <init-param>
            <!--是参数名-->
            <param-name>username</param-name>
            <!--是参数值-->
            <param-value>root</param-value>
        </init-param>
        <!--init-param是初始化参数-->
        <init-param>
            <!--是参数名-->
            <param-name>url</param-name>
            <!--是参数值-->
            <param-value>jdbc:mysql://localhost:3306/test</param-value>
        </init-param>
    </servlet>
    <!--servlet-mapping标签给servlet程序配置访问地址-->
    <servlet-mapping>
        <!--servlet-name标签的作用是告诉服务器，我当前配置的地址给哪个Servlet程序使用-->
        <servlet-name>HelloServlet</servlet-name>
        <!--
            url-pattern标签配置访问地址                                     <br/>
               / 斜杠在服务器解析的时候，表示地址为：http://ip:port/工程路径          <br/>
               /hello 表示地址为：http://ip:port/工程路径/hello              <br/>
        -->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>
```
![](https://pic.imgdb.cn/item/6283255f0947543129028cfa.png)

## Servlet生命周期
:::tip
1、执行Servlet构造器方法
2、执行init初始化方法
:::
* 第一、二步，是在第一次访问的时候创建Servlet程序会调用。
:::tip
3、执行service方法
:::
* 第三步，每次访问都会调用service方法
:::tip
4、执行destroy销毁方法
:::
第四步，在web工程停止的时候调用。
**自写doGet和doPost方法**
```java
@Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
       //区分GET和POST方法的请求
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        //获取请求方法
        String method = httpServletRequest.getMethod();
//        System.out.println(method);

        if(method.equals("GET")){
            doget();
        } else if(method.equals("POST")){
            dopost();
        }

        System.out.println("service 方法");
    }
    /**
     * get请求的方法,浏览器默认访问Get
     * @Author panther
     * @return void
     **/
    public static void doget(){
        System.out.println("使用get请求");
    }
    /**
     * post请求的方法
     * @Author panther
     * @return void
     **/
    public static void dopost(){
        System.out.println("使用post请求");
    }
```
**重写doGet和doPost方法**
```java

public class ServletHttp extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("ServletHttp doGet method");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Servlet doPost method");
    }
}
```
**原生doGet和doPost**
```java
 protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String protocol = req.getProtocol();
        String msg = lStrings.getString("http.method_get_not_supported");
        if (protocol.endsWith("1.1")) {
            resp.sendError(405, msg);
        } else {
            resp.sendError(400, msg);
        }

    }

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String protocol = req.getProtocol();
        String msg = lStrings.getString("http.method_post_not_supported");
        if (protocol.endsWith("1.1")) {
            resp.sendError(405, msg);
        } else {
            resp.sendError(400, msg);
        }

    }
```
## servletConfig类
```xml
<servlet>
        <servlet-name>demo</servlet-name>
        <servlet-class>Servlet1.demo1</servlet-class>

        <!--    初始化参数-->
        <init-param>
            <param-name>username</param-name>
            <param-value>panther</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>demo</servlet-name>
        <url-pattern>/demo1</url-pattern>
    </servlet-mapping>
```

```java
  @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        //获取初始化参数值  panther
        System.out.println(servletConfig.getInitParameter("username"));

        //org.apache.catalina.core.ApplicationContextFacade@2051c288
        System.out.println(servletConfig.getServletContext());

        //java.util.Collections$3@2e9628f2
        System.out.println(servletConfig.getInitParameterNames());

        //class org.apache.catalina.core.StandardWrapperFacade
        System.out.println(servletConfig.getClass());
    }
```
**操作内容**
```java
 public void ManageVal(){
        ServletContext servletContext = getServletContext();
        //添加内容
        servletContext.setAttribute("key1","pantehr");
        //取出内容
        Object key1 = servletContext.getAttribute("key1");
        System.out.println(key1);
        //删除内容
        servletContext.removeAttribute("key1");
    }
```
## HttpServletReQuest
```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //HttpServletRequest常用方法

        System.out.println("uri = "+req.getRequestURI());
        //uri = /ServletTest1/Http1

        System.out.println("URL = "+req.getRequestURL());
        //URL = http://localhost:8088/ServletTest1/Http1

        System.out.println("ip = "+ req.getRemoteHost());
        //ip = 0:0:0:0:0:0:0:1

        System.out.println("port = "+ req.getRemotePort());
        //port = 14258

        System.out.println("header = "+ req.getHeader("User-Agent"));
        //header = Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 
        //(KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36

        System.out.println("method = " + req.getMethod());
        //method = GET
    }
```
# 为什么Http是无状态的
:::tip
无状态
:::
1. 服务器无法判断客户端的多起请求是否是同一个客户端发过来的。
:::warning
导致的问题
:::
* 例如
1. 第一次请求是将商品加入购物车
2. 第二次请求是结账
* 如果服务器不能判断同一个客户端，结账就会出错导致混乱
:::tip
解决
:::
通过会话跟踪技术解决无状态问题
```java
public class demo2Session extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        System.out.println("session id = "+session.getId());
    }
}
```
1. 如果是第一次请求，服务器会给客户端分配一个Session然后响应给客户段
2. 第二次请求时，客户端会将SessionID带给服务器，服务器判断是否是同一个客户端
:::tip
常用API
:::
```java
request.getSession();       -- 获取当前会话，没有则创建一个
request.getSession(true);   -- 效果与不带参数相同
request.getSession(false);  -- 获取当前会话没有则返回null不会创建新的会话

request.getSession.getId();  -- 获取当前SessionId
request.getSession.isNew();  -- 判断当前session是否是新创建的
request.getSession.getMaxInactiveInterval();  --session的非激活间接时间默认半个小时
request.getSession.setMaxInactiveInterval();  -- 设置时间
request.getSession.invalidate();  -- 强制让会话立即失效
.........学会查文档不要背，谁背谁傻X
```
# 通过反射省略冗余的else if
```java
    public void login(){
        System.out.println("login method");
    }
    public void register(){
        System.out.println("register method");
    }
    public void updatePassword(){
        System.out.println("updatePAssword method");
    }
    public void updateEmail(){
        System.out.println("updateEmail method");
    }

    public static void main(String[] args) {
        String action = "register";

        try {
            //反射获取成员方法
             Method declaredMethod = reflexServletTest.class.getDeclaredMethod(action);

            //调用成员方法
            declaredMethod.invoke(new reflexServletTest());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
```