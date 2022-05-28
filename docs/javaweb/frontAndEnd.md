---
title: 前后端相连
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVAWEB
sticky: 
   true
---
# 资源分类
* 静态资源： 所有用户访问后，得到的结果都是一样的，称为静态资源。静态资源可以直接被浏览器解析。如图片、视频等。

* 动态资源: 每个用户访问相同资源后，得到的结果可能不一样 , 
称为动态资源。动态资源被访问后，需要先转换为静态资源，再返回给浏览器，通过浏览器进行解析。
常见服务器软件

## 动态服务器

    webLogic：oracle公司，大型的JavaEE服务器，支持JavaEE规范，收费的。
    webSphere：IBM公司，大型的JavaEE服务器，支持JavaEE规范，收费的。
    JBOSS：JBOSS公司的，大型的JavaEE服务器，支持JavaEE规范，收费的。
    Tomcat：Apache基金组织，中小型的JavaEE服务器，仅仅支持少量的JavaEE规范servlet/jsp。开源的，免费的。（300左右的并发）

## 静态的服务器
`Nginx`：（代理，反向代理等）极高的并发 
Nginx处理静态文件、索引文件，自动索引的效率非常高。当然除了当做高性能的静态服务器.
# 连接Hello world
## 后端获取前端
```java
public static void main(String[] args) {
        /**
         * @Author panther
         * @return 初次尝试javaweb编程
         **/
        ServerSocket ss = null;
        InputStream is= null;
        //创建一个服务器
        try{
            ss = new ServerSocket(9985);
            Socket accept = ss.accept();
            //获得输入流
            is = accept.getInputStream();
            int len;
            byte[] bys = new byte[1024];
            while((len = is.read(bys)) != -1){
                System.out.println(new String(bys,0,len));
            }
        }catch(IOException e){
            e.printStackTrace();
        }finally{
            try{
                assert is != null;
                is.close();
                ss.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }
```
:::info no-icon
在浏览器输入127.0.0.1:9985
:::
* 在我们的服务端就会接受到一段头部报文段
```java
GET / HTTP/1.1
Host: 127.0.0.1:9985
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
```
## 前端获取后端
```java
 /**
     * @Author panther
     * @return 前端获取后端
     **/
    public static void main(String[] args) {
        ServerSocket ss =null;
        OutputStream out = null;
        try{
            ss = new ServerSocket(9985);
            Socket s = ss.accept();

            out =s.getOutputStream();
            String url = "HTTP/1.1 200 OK \r\n" +
                    "Content-Length: 39 \r\n "  +
                    "Content-Type: text/html;charset=UTF-8\r\n\r\n " +
                    "<h1 style=\"color:red\">hello world!<h1>\";";

            out.write(url.getBytes());
            out.flush();
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            try{
                assert out != null;
                out.close();
                ss.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }

    }
```
:::info no-icon
在浏览器输入127.0.0.1:9985
:::
![](https://pic.imgdb.cn/item/627696f509475431291c20a5.png)
[hello world]{.red}出现在浏览器中
# HTTP的工作原理
1. 客户端连接到Web服务器。

浏览器向 DNS 服务器请求解析该 URL 中的域名所对应的 IP 地址，一个HTTP客户端，
通常是浏览器，与 Web服务器的HTTP端口（默认为80）建立一个TCP套接字连接。

2. 发送HTTP请求。

通过【TCP套接字】，客户端向Web服务器发送一个文本的请求报文，一个请求报文由【请求行、请求头部、空行和请求数据】4部分组成。

3. 服务器接受请求并返回HTTP响应

Web服务器【解析请求，定位请求资源】，然后将资源的复本写到TCP套接字，由客户端读取。一个响应由【状态行、响应头部、空行和响应数据】4部分组成。

4. 服务器释放连接TCP连接。

若connection 模式为close，则服务器主动关闭TCP连接，客户端被动关闭连接，释放TCP连接。
若connection 模式为keepalive，
则该连接会保持一段时间，在该时间内可以继续接收请求。无论如何都会释放。

5. 客户端浏览器解析HTML内容

客户端浏览器首先解析状态行，查看表明请求是否成功的状态代码。然后解析每一个响应头，响应头告
知以下为若干字节的HTML文档和文档的字符集。客户端浏览器读取响应数据HTML，根据HTML的语法对其
进行格式化，并在浏览器窗口中显示。
# http请求方法
:::info no-icon
GET
:::
向指定的资源发出“显示”请求。使用`GET`方法应该只用在读取数据，而不应当被用于产生“副作用”的操作中，常用语查询数据的请求。
:::info no-icon
POST
:::
向指定资源提交数据，请求服务器进行处理（例如提交表单或者上传文件）。数据被包含在请求本文中。这个请求可能会创建新的资源或修改现有资源，或二者皆有。常用于对数据的增删改操作。

# 包装请求和响应
## Request
```java
 /**
     * @Author panther
     * @return 将接受的报文转换成对象
     **/
    private String protocol;
    //请求方式
    private String type;
    //uri
    private String uri;
    //请求头
    private Map<String,String> header = new HashMap<>();
    //请求体
    private String body;

    //get\set
    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri;
    }

    public Map<String, String> getHeader() {
        return header;
    }

    public void setHeader(Map<String, String> header) {
        this.header = header;
    }
    public String getHeader(String key){
        return header.get(key);
    }

    public void addHeader(String key,String value){
        header.put(key,value);
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

```
## RequestHandler
```java
 /**
     * @Author panther
     * @return 将获取的请求报文封装成一个请求对象
     **/
    public static Request hand(String requestMessage){
        Request request = new Request();
        //根据换行截获对应信息
        String[] handerandbody = requestMessage.split("/r/n/r/n");
        if(handerandbody.length > 1){
            request.setBody(handerandbody[1]);
        }
        String[] lineAndHeander = handerandbody[0].split("/r/n");
        String line = lineAndHeander[0];
        //获取请求行信息
        String[] lines = line.split(" ");
        request.setType(lines[0]);
        request.setUri(lines[1]);
        request.setProtocol(lines[2]);
        // 遍历请求头
        for (int i = 1; i < lineAndHeander.length; i++) {
            String[] split = lineAndHeander[i].split(" ");
            request.addHeader(split[0],split[1]);
        }
        return request;
```
## Response
```java
 //协议
    private String protocol = "http/1.1";
    //响应状态
    private String statment = "200";
    //信息
    private String message = "OK";
    //响应头
    private Map<String,String> header = new HashMap<>();
    //响应体
    private String body;

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getStatment() {
        return statment;
    }

    public void setStatment(String statment) {
        this.statment = statment;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getHeader() {
        return header;
    }
    public String getHeader(String key){
        return header.get(key);
    }

    public void setHeader(Map<String, String> header) {
        this.header = header;
    }
    public void addHeader(String key,String val){
        this.header.put(key,val);
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
```
## ResponseHandler
```java
 	/**
     * @Author panther
     * @return 处理响应
     **/
    public static final String BASE_PATH = "D:\\download\\java\\javaweb\\www\\";

    public static String build(String path){
        String htmlpath = BASE_PATH + path;
        //输入流读取文件内容
        FileInputStream fis = null;
        Response response = null;
        try{
            fis = new FileInputStream(htmlpath);
            response = new Response();

            int len;
            byte[] bys = new byte[1024];
            StringBuilder sb = new StringBuilder();

            while((len = fis.read(bys)) != -1){
                sb.append(new String(bys,0,len));
            }
            String body = sb.toString();

            response.setBody(body);
            response.addHeader("Content-Type","text/html;charset=UTF-8");
            response.addHeader("Content-Length",Integer.toString(body.length()));

            return build(response);
        }catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }

    // 将响应对象序列化成字符串报文
    public static String build(Response response){
        StringBuilder sb = new StringBuilder();
        sb.append(response.getProtocol()).append(" ").append(response.getStatment())
                .append(" ").append(response.getMessage()).append("\r\n");

        for(Map.Entry<String,String> entry : response.getHeader().entrySet()){
            sb.append(entry.getKey()).append(": ").append(entry.getValue()).append("\r\n");
        }

        if(response.getBody() != null){
            sb.append("\r\n").append(response.getBody());
        }
        return sb.toString();
    }
```
## 请求转发
```xml
 <servlet>
        <servlet-name>forward1</servlet-name>
        <servlet-class>Servlet1.ForwardAB</servlet-class>
    </servlet>

    <servlet-mapping>
        <servlet-name>forward1</servlet-name>
        <url-pattern>/forward</url-pattern>
    </servlet-mapping>
```
```java
public class ForwardAB extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //请求转发
        System.out.println("请求转发");
        req.getRequestDispatcher("/b.html").forward(req,resp);
        //当浏览器访问/forward时会跳转到/b.html页面
    }
}
```
## 回传字符串
```java
 @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        resp.getWriter();
//        resp.getOutputStream(); 自能定义一个流
        // 解决中文编码乱码
        //方式一
        resp.setCharacterEncoding("GBK");
        PrintWriter writer = resp.getWriter();

        //方式二
        resp.getContentType("text/html;charset=UTF-8");

        writer.println("panther 园");

    }
```
## 请求重定向
:::info
response1
:::
```java
public class Response1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置重定向
        //方式一
        System.out.println("到此一游 你看不见我！");
        resp.setStatus(302);
        resp.setHeader("location","http://localhost:8088/ServletTest1/response2");
        
        //方式二
        resp.sendRedirect("http://localhost:8088/ServletTest1/response2");
    }
}

```
:::info
response2
:::
```java
public class Response2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        resp.setCharacterEncoding("GBK");

        resp.getWriter().write("你的地址变了");
        resp.getWriter().println("想知道为什么吗？");
    }
}

```
:::warning
1. 两次请求
2. 不共享Response的资源
3. 可以访问到项目外的资源
4. 访问不到其他文件夹下的资源
:::