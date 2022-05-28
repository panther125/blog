---
title: Linux防火墙
data: 2022-03-29
categories:
- linux
tags:
- Linux
---
# Linux博客访问的一些配置
## CentOS 7.0版本以上的服务器来设置简单的防火墙
### 简单介绍一下什么是IPTables:
iptables是Linux内核中内置的防火墙，可以允许管理员通过设置table, chain以及相关的规则来进行数据包过滤和NAT。 一般来讲，iptables防火墙已经内置于CentOS 6及其他Linux版本中，而且iptables服务默认都是启动的。  iptables应用于IPv4, 如果要用IPv6，需要使用ip6tables.
### iptables的命令格式：
```vim
 $ iptables [-t table] command [chain] [rules] [-j target] 
```
#### 具体的iptables的语法和概念就不再多说了，请参照 iptables man page 官方文档 .
一旦你的iptables的配置出了问题，极有可能把你自己挡在门外，你自己都无法连接到服务器了！！ 出现这种情况可是会欲哭无泪呀，除了重新做系统好像没有更好的办法了。
首先， SSH 的端口22自然是需要开放的，否则我们就无法登录服务器了。
一般来讲，CentOS的VPS经常作为用LAMP搭建的Web服务器，FTP服务器， Mail服务器等。
对于Web服务来说，需要开放80端口，如果是HTTPS/SSL协议的话，还需用开放443端口
对于Mail服务来说，由于涉及SMTP, POP3, IMAP协议，需要开放的端口如下：
SMTP : 25  Secure SMTP:465  POP3: 110   Secure POP3: 995   IMAP: 143   IMAP over SSL: 993 对于FTP服务来说，需要开放 20, 21两个端口
### 第一步： 屏蔽最常见的攻击
我们首先要清空iptables中的所有的规则：
```vim
 $ iptables -F
```
然后我们加上阻止简单扫描和攻击的规则
```vim
 $ iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP             
 
 $ iptables -A INPUT -p tcp ! --syn -m state --state NEW -j DROP     
 
 $ iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP              
```
具体请参照wikipedia 的解释。
### 第二步： 为相应的服务开放对应的端口
首先我们应该接受本机localhost的任何请求，否则，数据库连接等将无法工作
```vim
 $ iptables -A INPUT -i lo -j ACCEPT
```
对于不同的服务需要开放不同的端口
```vim
 $ iptables -A INPUT -p tcp --dport 80 -j ACCEPT      # HTTP
 $ iptables -A INPUT -p tcp --dport 22 -j ACCEPT      # SSH
 $ iptables -A INPUT -p tcp --dport 443 -j ACCEPT     #HTTPS
```
### 第三步： 加上通用的规则
首先要允许所有从服务器端发起的连接，由此返回的响应数据应该是允许的！比如VPS发起的yum update , 必须要允许外部的update数据进来
```vim
 $ iptables -I INPUT -m state  --state ESTABLISHED, RELATED -j ACCEPT
```
最后，设置缺省的策略：屏蔽任何进入的数据请求，允许所有从Server发出的请求
```vim
 $ iptables -P OUTPUT ACCEPT
 
 $ iptables -P INPUT DROP
```
### 最后一步： 保存设置
首先通过下面的命令查看一下我们的设置是否正确！
```vim
 $ iptable -L -n
```
确认没有问题后，执行下面的命令
```vim
 $ service iptables save
```
执行上述命令后，相应的规则会写入 /etc/sysconfig/iptables这个文件，你可以检查一下看看。

最后执行
```vim
 $ service iptables restart
```
重新启动iptables防火墙，以使上述设置生效。
#### 最佳的方法：为了更方便的修改和维护自己的iptables的设置，我一般是把所有的iptables的设置先写到一个单独文件中，测试没有问题后。然后再保存到iptable的配置文件中。

### 下面展示一位大佬的配置
```vim
</pre>
#!/bin/bash
# A simple iptables firewall configuration
 
PATH=/sbin:/bin:/usr/sbin:/usr/bin; export PATH
 
#flush/erase original rules
iptables -F #清除所有已制定的rule
iptables -X #清除用户自定义的chain/table
iptables -Z #将所有的chain的计数和流量统计归零
 
#Accept localhost connetting, no matter what it is
iptables -A INPUT -i lo -j ACCEPT
 
#Accept any response package which is initiated from inside
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
 
#block most common network attacks(recon packets and syn-flood attack)
iptables -A INPUT -p tcp --tcp-flags ALL NONE -j DROP
iptables -A INPUT -p tcp ! --syn -m state --state NEW -j DROP
iptables -A INPUT -p tcp --tcp-flags ALL ALL -j DROP
 
#open ports for different services
iptables -A INPUT -p tcp --dport 22 -j ACCEPT #SSH
iptables -A INPUT -p tcp --dport 80 -j ACCEPT #HTTP
#iptables -A INPUT -p tcp --dport 443 -j ACCEPT #HTTPS
#iptables -A INPUT -p tcp --dport 25 -j ACCEPT #SMTP
#iptables -A INPUT -p tcp --dport 465 -j ACCEPT #Secure SMTP
#iptables -A INPUT -p tcp --dport 110 -j ACCEPT #POP3
#iptables -A INPUT -p tcp --dport 995 -j ACCEPT #Secure POP
 
#ICMP configuration
#To prevent ICMP DDOS,we do not allow ICMP type 8(echo-request) or limit this request with 1/second
#some ICMP requests are allowed.
icmp_type="0 3 4 11 12 14 16 18"
for ticmp in $icmp_type
do
    iptables -A INPUT -p icmp --icmp-type $ticmp -j ACCEPT
done
#iptables -A INPUT -p icmp --icmp-type 8 -m limit --limit 1/second -j ACCEPT
 
#default policies
iptables -P OUTPUT ACCEPT
iptables -P INPUT DROP
 
#save to /etc/sysconfig/iptables
/etc/init.d/iptables save

```
### 最后想说的话，初学linux就把博客布置到虚拟机中最终导致，博客Dns解析不通，防火墙也配置的乱七八糟，这别建议没学通之前别把项目部署在Linux系统中，没有大佬指导你，在网上很难得到解决。