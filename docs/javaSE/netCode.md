---
title: 网络编程	
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 网络编程
* 在通信协议下，实现网络互联的不同计算机上运行的程序可以进行数据交换
**网络编程三要素**
* Ip地址：要想让网络上的计算机能够相互通信，必须为每台计算机指定一个标识符来指定要接受的数据的计算机和识别发送的计算机，而ip地址就是这个标识号，也是设备的标识
* 端口：如果说ip地址唯一标识了计算机设备，那么端口就可以唯一标识设备中的应用程序，也就时应用程序的唯一标识
* 协议：通过计算机网络可以时多台计算机实现连接，位于同一网络的计算机在进行连接和通信时需要遵守一定的规则，常见的协议UDP和TCP协议
## InetAddress
| 方法名 | 说明 |
|-|-|
| static InetAddress getByName(String) | 确定主机名ip |
| String getHostName | 返回此ip地址主机名 |
| String getAddressName | 返回文本显示的ip地址字符串 |

```java
 public static void main(String[] args) throws Exception {
        //获取本机InetAddress对象
        InetAddress address = InetAddress.getLocalHost();
        //获取本地主机IP
        System.out.println(address);
        //获取panther9985.icu的主机对象
        InetAddress address1 = InetAddress.getByName("www.panther9985.icu");
        System.out.println(address1);
        //获取原始IP
        System.out.println(address.getHostAddress());
        //获取本地主机名
        System.out.println(address.getHostName());
        //判断0.5秒内是否可访问
        System.out.println(address.isReachable(500));
    }
``` 
## 协议
**UDP协议**
* 用户数据报协议(User Datagram Protocol)
* UDP是无连接通信协议，即在数据传输时，数据的发送端和接收端不建立逻辑连接。简单来说，当一台计算机向另外一台计算机发送数据时，发送端不会确认接收端是否存在，就会发出数据，同样接收端在收到数据时，也不会向发送端反馈是否收到数据。由于使用
[UDP协议消耗资源小，通信效率高，所以通常都会用于音频、视频和普通数据的传输]{.label .info}。
**TCP协议**
* 传输控制协议（Transmission Control Protocol）
* TCP协议是面向连接的通信协议，即传输数据之前，在发送端和接收端建立逻辑连接，然后再传输数据，它提供了两台计算机之间可靠无差错的数据传输。在TCP连接中必须要明确客户端与服务器端，由客户端向服务端发出连接请求，每次连接的创建都需要经过“三次握手”
三次握手：TCP协议中，在发送数据的准备阶段，客户端与服务器之间的三次交互，以保证连接的可靠
:::info no-icon
* 第一次握手，客户端向服务器端发出连接请求，等待服务器确认
* 第二次握手，服务器端向客户端回送一个响应，通知客户端收到了连接请求
* 第三次握手，客户端再次向服务器端发送确认信息，确认连接
:::
## UDP发送数据
**发送端**
```java
//此类表示用于发送和接收数据报数据包的套接字。
        //DatagramSocket()构造数据报套接字并将其绑定到本地主机上的任何可用端口。
        DatagramSocket ds = new DatagramSocket();

        //创建数据将数据打包
        //DatagramPacket(byte[] buf, int length, InetAddress address, int port)
        //构造用于发送长度的分组的数据报包 length指定主机上到指定的端口号。
        byte[] buf = "hello world".getBytes();
        int length = buf.length;
        InetAddress address = InetAddress.getByName("192.168.22.1");
        int port = 10024;
        DatagramPacket dp = new DatagramPacket(buf,length,address,port);
        //send(DatagramPacket p)从此套接字发送数据报包。
        ds.send(dp);
        //关闭
        ds.close();
```
**接受端**
```java
  DatagramSocket ds = new DatagramSocket(10024);

        //创建数据包用来接受数据
        //DatagramPacket(byte[] buf, int length) 
        //构造一个 DatagramPacket用于接收长度的数据包 length 
        byte[] bys = new byte[1024];
        DatagramPacket dp = new DatagramPacket(bys,bys.length);

        //接受数据
        ds.receive(dp);

        //显示数据解析数据包返回数据缓存区
        byte[] dates = dp.getData();
        int len = dp.getLength();
        String datastr = new String(dates,0,len);
        System.out.println("老王的数据："+datastr);
        ds.close();
```
**接受数据步骤**
1. 创建Socket对象（Datagram）
DatagramSocket（int port）
2. 创建一个数据包接受数据
DatagramPacket(byte[] buf,int length)
3. 接受数据
void receive(DatagramPacket pack)
4. 解析数据
byte[] getData(),int getlength
String(dp.getData(),0,dp.getlength)
5. 关闭终端
dp.close();
## TCP协议
* TCP通信原理： tcp通信协议是一种安全的网络通信协议，他在通信的两端各建立一个Socket对象从而在通信的两端形成网络虚拟链路，一旦建立了网络的虚拟链路两端程序就可以通过链路通信
**发送端**
```java
    //创建Socket对象
        //Socket(InetAddress address, int port)创建流套接字并将其连接到指定IP地址的指定端口号。
        Socket client = new Socket(InetAddress.getByName("192.168.22.1"),9985);
        //Socket(String host, int port)创建流套接字并将其连接到指定主机上的指定端口号。
        Socket client2 = new Socket("192.168.22.1",9985);

        //字节流输出数据
        OutputStream os = client.getOutputStream();
        os.write("hello world".getBytes());
        
        //释放资源
        client.close();
        client2.close();
```
**接受端**
```java
//创建ServerSocket对象
        ServerSocket ss = new ServerSocket(9985);
        //accept()侦听要连接到此套接字并接受它。
        Socket s = ss.accept();
        //创建字节输入流接受数据
        InputStream is = s.getInputStream();
        byte[] bys = new byte[1024];
        int len = is.read(bys);
        System.out.println("接收到："+new String(bys, 0, len));

        //释放资源
        ss.close();
        s.close();
```