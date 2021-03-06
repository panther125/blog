---
title: 操作系统并发三剑客
date: 2020-04-12
categories:
- 操作系统
tags:
- 操作系统
---
# 进程和线程
![](https://pic.imgdb.cn/item/626e5a46239250f7c574f8e5.png)
1. 一个分配资源的基本单位，一个是程序执行的基本单元。
2. 进程，平时我们打开一个播放器，开一个记事本，这些都是应用程序，一个软件的执行副本，这就是进程。从操作系统层面而言，进程是分配资源的基本单位，线程在很长时间被称为轻量级的进程，是程序执行的基本单位。
## 一个小故事了解线程和进程
:::info
计算机的核心是CPU，它承担了所有的计算任务。它就像一座工厂，时刻在运行。假定工厂的电力有限，一次只能供给一个车间使用。也就是说，一个车间开工的时候，其他车间都必须停工。背后的含义就是，单个CPU一次只能运行一个任务。进程就好比工厂的车间，它代表CPU所能处理的单个任务。任一时刻，CPU总是运行一个进程，其他进程处于非运行状态。一个车间里，可以有很多工人。他们协同完成一个任务。线程就好比车间里的工人。一个进程可以包括多个线程。车间的空间是工人们共享的，比如许多房间是每个工人都可以进出的。这象征一个进程的内存空间是共享的，每个线程都可以使用这些共享内存。可是，每间房间的大小不同，有些房间最多只能容纳一个人，比如厕所。里面有人的时候，其他人就不能进去了。这代表一个线程使用某些共享内存时，其他线程必须等它结束，才能使用这一块内存。一个防止他人进入的简单方法，就是门口加一把锁。先到的人锁上门，后到的人看到上锁，就在门口排队，等锁打开再进去。这就叫“互斥锁”（Mutual exclusion，缩写 Mutex），防止多个线程同时读写某一块内存区域。还有些房间，可以同时容纳n个人，比如厨房。也就是说，如果人数大于n，多出来的人只能在外面等着。这好比某些内存区域，只能供给固定数目的线程使用。这时的解决方法，就是在门口挂n把钥匙。进去的人就取一把钥匙，出来时再把钥匙挂回原处。后到的人发现钥匙架空了，就知道必须在门口排队等着了。这种做法叫做“信号量”（Semaphore），用来保证多个线程不会互相冲突。
:::
# 用户态线程
## ==优势==
* [切换成本低]{.red}：用户空间自己维护，不用走操作系统的调度。
* [管理开销小]{.red}：创建和销毁不用系统调用，系统调用所造成的上下文切换下文会讲解。
## ==缺点==
* [与内核沟通成本大]{.red}：因为这种线程大部分时间在用户空间，如果进行 IO 操作，很难利用内核的优势，且需要频繁的用户态和内核态的切换。
* [线程之间的协作麻烦]{.red}：想象两个线程 A 和 B需要通信，通信通常会涉及到 IO 操作，IO 操作涉及到系统调用，系统调用又要发生用户态和内核套的切换成本。
* [操作系统无法针对线程的调度进行优化]{.red}：如果一个进程的用户态线程阻塞了操作系统无法及时的发现和处理阻塞问题，它不会切换其他线程从而造成浪费。
# 内核态线程
## ==优势==
* [操作系统级优化]{.red}：用户空间自己维护，不用走操作系统的调度。
* [充分利用多核优势]{.red}：创建和销毁不用系统调用，
系统调用所造成的上下文切换下文会讲解。
## ==缺点==
* [创建成本比较高]{.red}：创建的时候需要使用系统调用即切换到内核态。
* [切换成本高]{.red}：切换的时候需要进行内核操作。
* [扩展性差]{.red}：因为一个内核管理，坑位有限，不可能数量太多。
# 用户态线程和内核态线程的映射关系是怎样的呢
上面谈到用户态线程和内核态线程都有缺点，用户态线程创建成本低，不可以利用多核，而内核态线程创建成本高，虽可以利用多核，但是切换速度慢。所以，通常都会在内核中预留一些线程并反复使用这些线程，至此出现了以下几种映射关系。
## 多对一
* 内核线程的创建成本既然高，那么我们就是多个用户态进程的多线程复用一个内核态线程，可是这样线程不能并发，所以此模型用户很少。
## 一对一
* 让每个用户态线程分配一个单独的内核态线程，每个用户态线程通过系统调用创建一个绑定的内核线程，这种模型能够并发执行，充分利用多核的优势，出名的 Windows NT即采用这种模型，
但是如果线程比较多，对内核的压力就太大。
## 多对多
* 这种多对多的关系减少了内核线程且完成了并发，Linux即采用的这种模型
# 进程与线程的底层原理
## ==进程和线程在内存中如何表示==
在整个设计过程中，涉及了两张表，分别是[进程表]{.red}和[线程表]{.red}。其中进程表会记录进程在内存的位置，PID是多少，以及当前什么状态，内存给它分配了多大使用空间以及属于哪个用户，假设没有这张表，操作系统就不知道有哪些进程，也就更不清楚怎么去调度，就仿佛失去XXX，不知道了方向。
* [资源信息]{.blue}
资源信息会记录这个进程有哪些资源，比如进程和虚拟内存怎么映射，拥有哪些文件等.
* [内存布局]{.blue}
操作系统会告诉进程如何使用内存，大概分为哪些区域以及每个区域做什么。简单描述下下图各个段的作用。
    * 栈：系统自动分配释放，平时经常使用的函数参数值，局部变量，返回地址等就在此

    * 堆：存放动态分配的数据，通常由开发人员自行管理，如果开发人员使用后不释放，那么程序结束后可能会被操作系统收回

    * 数据段：存放的是全局变量和静态变量。其中初始化数据段（.data）存放显示初始化的全局变量和静态变量，未初始化数据段，此段通常也被称为BSS段（.bss），存放未进行显示初始化的全局变量和静态变量。