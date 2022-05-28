---
title: 多线程	
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 线程
线程：是进程是单个顺序控制流，是一条执行路径
* 单线程：一个进程如果只有一条执行路径，则称为单线程
* 多线程：一个进程如果只有一条执行路径，则称为单线程
## 线程调度
* 分时调度模型：所有线程轮流使用cpu的使用权，平均分配每个cpu占用的时间片
* 抢占式调度模型：优先让优先级高的使用cpu，如果优先级相同，那么会随机选择一个，优先级高的线程占用cpu的时间片会多一些。
## 线程控制
| 方法名 | 说明 |
|--|--|
| static void sleep(long millis) | 使当前线程暂停执行指定的毫秒数 |
| void join() | 等待线程死亡 |
| void setDaemon(Boolean on) | 将此线程标记为守护线程当运行的都是守护线程时，JVM退出 |
## 线程生命周期
```mermaid
graph LR
    A [创建线程对象] -- start() --> B [有执行资格没有执行权]
    B -- 抢到cpu执行权 --> C[有执行资格有执行权]
    C -- 结束 --> D[线程死亡，变成垃圾]
    C -- sleep堵塞方法 --> E[没有执行资格没有执行权]
    E -- 堵塞方法结束 --> B [有执行资格没有执行权]
    C -- 其他线程抢走cpu执行权 --> B[有执行资格没有执行权]
```	
![](https://pic.imgdb.cn/item/626e5b9b239250f7c57919b9.png)
## 实现线程的两种办法
* 继承Thread类
* 实现Runnable接口
**Runnable的好处**
* 避免单继承的局限性
* 适合多个相同程序的代码去处理同一资源的情况，把线程和程序的代码、数据有效的分离
**案例**
```java
sellpiao se = new sellpiao();

        //创建线程
        Thread t1 = new Thread(se,"老王");
        Thread t2 = new Thread(se,"黄牛");
        Thread t3 = new Thread(se,"小飞侠");
        t1.start();
        t2.start();
        t3.start();
```
线程的随机性导致两个问题
* 相的票出现多次
* 出现负数
**如何判断一个程序是否会有线程安全问题？**
 * 是否是多线程环境
 * 是否有共享数据
 * 是否有多条语句操作共享数据
 * 是否逃离了方法
**如何解决多线程安全问题**
多线程环境和共享数据改变不了只能操作多条语句操作共享数据
```java
synchronized(对象){
		//synchronized相当于给代码上锁
		操作共享数据的代码
	}
```
**同步的好处和弊端**
* 好处：解决了多线程数据安全的问题
* 弊端：耗费资源，降低了程序运行效率
## 同步方法
* 将synchronized加到方法中
```java
//格式
修饰符 synchronied 返回值类型 方法名（）{
	}
```
* [同步方法锁的对象为this]{.red}
**同步静态方法**
```java
//格式
修饰符 static synchronied 返回值类型 方法名（）{
	}
```
* [同步方法锁的对象为类名.class]{.red}
# 线程安全的类
## StringBuffer
* 线程安全，可变的字符序列。
* 从版本JDK 5开始,这个类被StringBuilder替代 因为它支持所有相同的操作，但它更快，因为它不执行同步。
## vector
* Vector类实现了可扩展的对象数组
* 从Java 2平台v1.2，这个类被改造为实现List接口，使其成为成员Java Collections Framework 。 与新集合实现不同， Vector是同步的。 如果不需要线程安全的实现，建议使用ArrayList代替Vector 。 
## HashTable
* 该类实现了一个哈希表，它将键映射到值。 任何非null对象都可以用作键值或值。 
* Java 2平台v1.2，这个类被改造为实现Map接口，使其成为成员Java Collections Framework 。 与新的集合实现不同， Hashtable是同步的。 如果不需要线程安全的实现，建议使用HashMap代替Hashtable 。 如果需要线程安全的并发实现，那么建议使用ConcurrentHashMap代替Hashtable 。 
# 多线程通信
* 控制多个线程按照一定顺序进行执行
```java
 //生产者
        List<Object> goods = new ArrayList<>();
        //记录统一执行时间
        long start = System.currentTimeMillis();
        Thread t1 = new Thread(()->{
            int num = 0;
            while(System.currentTimeMillis()-start <= 100){
                synchronized(goods){
                    if(goods.size() > 0){
                        try {
                            goods.wait();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }else{
                        goods.add("商品" + ++num);
                        System.out.println("生产商品"+num);
                    }

                }
            }
        },"生成者");
        Thread t2 = new Thread(()->{
            int num=0;
            while(System.currentTimeMillis() - start <= 100){
                synchronized(goods){
                    if(goods.size() <=0){
                        goods.notify(); //唤醒生产者
                    }else{
                        goods.remove("商品"+ ++num);
                        System.out.println("消费商品"+num);
                    }
                }
            }
        },"消费者");

        t1.start();
        t2.start();
```
# 线程池
:::info
* 创建线程池的主要步骤
1. 创建一个实现Runnable或Callable接口的实现类，重现run或者call方法
2. 创建Runnable或Callable接口的实现类
3. 使用EXecutors线程执行器创建线程池
4. 使用ExecutorsService执行器进行管理
5. 使用shutdown关闭线程池
:::
```java

class myThread3 implements Callable {
    @Override
    public Object call() throws Exception {
        int i=0;
        while(i++ < 5){
            System.out.println(Thread.currentThread().getName()+"的call正在运行");
        }
        return i;
    }
}

public class ExecutorsDemo {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //创建Callable实例化对象
        myThread3 call = new myThread3();
        //创建一个可扩展的线程池
        ExecutorService es = Executors.newCachedThreadPool();
        //将callable的实现类放入线程池中
        Future result1 = es.submit(call);
        Future result2 = es.submit(call);
        //关闭线程池
        es.shutdown();
        //获取返回结果
        System.out.println("thread-1:"+result1.get());
        System.out.println("thread-1:"+result2.get());
    }
```
* 创建线程池的方法
| 方法声明 | 功能描述 |
|-|-|
| ExecutorService newCachedThreadPool() | 创建一个可扩展线程池的执行器，适用于启动短期任务 |
| ExecutoService newFixedThreadPool(int nThread) | 创建一个固定线程数量的执行器，它能很好的控制多线程任务，也不会由于响应过多而导致程序崩溃 |
| ExecutorService newSingleThreadExecutor() | 在特殊需求下创建一个只执行一个任务的线程 |
| scheduledExecutorService newScheduledThreadPool(int corePoolSize) | 创建一个定长的线程池，支持定时及周期性任务执行 |
## CompletableFuture线程池管理
**四个静态方法为一段异步代码创建CompletableFuture对象**
```java
- static CompletableFuture<Void> runAsync(Runnable runnable) | 以Runnable函数接口作为参数，使用ForkJoinPool.commonPool()作为它的线程池执行异步代码获取CompletableFuture计算结果为空的对象 |
- static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor) | 以Runnable函数接口作为参数，使用线程池执行器来获取CompletableFuture计算结果为空的对象 |
- static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier) | 返回一个新的CompletableFuture，它通过在 ForkJoinPool.commonPool()中运行的任务与通过调用给定的供应商获得的值 异步完成 |
- static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor) 返回一个新的CompletableFuture，由给定执行器中运行的任务异步完成，并通过调用给定的供应商获得的值 
```
```java
 //创建CompletableFuture对象
        CompletableFuture<Integer> ctf = CompletableFuture.supplyAsync(()->{
            int sum =0,i=0;
            while(i++ < 5){
                sum+=i;
                System.out.println(Thread.currentThread().getName()+"is running"+ i);
            }
            return sum;
        });
        CompletableFuture<Integer> ctf2 = CompletableFuture.supplyAsync(()->{
            int sum =0,i=5;
            while(i++ < 10){
                sum+=i;
                System.out.println(Thread.currentThread().getName()+"is running"+ i);
            }
            return sum;
        });
        //将两个线程执行结果整合
        CompletableFuture<Integer> result = ctf.thenCombine(ctf2,(x,y)->x+y);
        System.out.println("1到10相加的结果: "+result.get());
    }
```
