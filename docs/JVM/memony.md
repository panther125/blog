---
title: 内存垃圾回收
date: 2022-05-29
categories:
- 后端
tags:
- JVM
---
# 直接内存(direct memory)
**定义**
* 常见于NIO操作，用于数据缓冲区
* 分配回收成本较高，但读写性能高
* 不受JVM内存回收管理
```java
List<ByteBuffer> list = new ArrayList<>();
int i = 0;
try{
	while(true){
		ByteBuffer bb = new ByteBuffer(_100Mb);
		list.add(bb);
		i++;
	}finally{
		System.out.print(i);
	}
	//java.lang.OutOfMemoryError: Direct buffer memory
	System.gc();//回收，调用不会进行垃圾回收
}
```
**垃圾释放原理**
不是不受JVM内存回收管理吗？怎么还可以回收内存
其实真正释放垃圾的是unsafe.FreeMemory();
# 堆参数配置
```java
	-XX:+PrintGC        	每次触发GC时打印相关日志
	-XX:+UseSerialGC    	串行回收
	-XX:+PrintGCDetails 	更详细的GC日志 
	-Xms					堆的初始值
	-Xmx               		堆最大可用值
　　-Xmn               		新生代堆最大可用值
　  -XX:SurvivorRatio       用来设置新生代中eden空间和from/to空间的比例
	-verbose:gc             在控制台输出GC情况
	-Xloggc: filepath       将GC日志输出到指定文件中
	-XX：initialSurvivorRatio=ratio 幸存区比列动态
	-XX:SurvivorRatio=ratio          幸村区比列
	-XX:MaxTenuringThreshold = threshold 晋升阈值
```
# 垃圾回收
1. 如何判断对象可回收
* 引用计数法
* 可达性分析算法
2. 垃圾回收算法
3. 分代垃圾回收
4. 垃圾回收器
5. 垃圾回收调优
:::warning
* 新生代：内存分为三部分伊甸园、幸存区from、幸村区to，经常发生垃圾回收，主要存放一些临时变量
* 老年代: 只有当内存快不足时发生垃圾回收
* 伊甸园： 存放对象，伊甸园内存空间不足时发生minor GC，复制算法回收垃圾，幸存的对象会放入to区，然后与from区交换，幸存下来的对象会使寿命加一，当寿命超过15时将晋升为老年代
* minor GC会触发STW(stop the world)使线程暂停
* full GC：当老年代的内存快满时，会现触发minor GC，再触发Full GC，STW的时间较长
:::
## 例子分析
```java
	List<String> list = new ArrayList<>();
	list.add("1");List.add("2");
	System.out.println(1);
	System.in.read();//让程序运行停在这里，按enter后继续运行

	list = null;//将list复制为NULL，通过内存分析list被置为null时根对象被回收了
	System.out.println(2);
	System.in.read();
```
# 五种引用
## 强引用
:::info
* 强引用
强引用，意味着，一个对象被某个属性/字段引用着，JVM不会对这个对象进行回收，当内存空间不足时，JVM宁可抛出OutOfM moryError（内存溢出错误），也不会回收这个对象
强引用就是最普通的引用，一般是用在对象不可随意被删除的情况下
:::
```java
private static final int _4MB = 4*1024*1024;

List<byte[]> list = new ArrayList<>();
for(int i = 0; i < 5; i++){
	list.add(new byte[_4MB]);
}

```
## 软引用和弱引用
:::info
* 软引用
软引用，就是对一个对象进行关联，可以通过这个关联找到对象，只有在内存不足时，JVM才会回收该对象
软引用需使用java.lang.ref.SoftReference类来实现，一般情况下是对有用但不是必要或者短期使用的对象使用，例如缓存，将数据存在内存中可以加快相应速度，当内存不够时，删除了缓存也不会有影响
:::
```java
// 堆最大内存，打印GC详细日志，输出GC内存情况
// -Xmx20m -XX:printGCDetails -verbose:GC
List<SoftReference<byte[]>> list = new ArrayList<>();
//引用队列
ReferenceQueue<byte[]> queue = new ReferenceQueue<>();

	for(int i = 0; i < 5; i++){
		//关联引用队列，当软引用数组被回收时，软引用对象会加入到引用队列中
		SoftReference<byte[]> ref = new SoftReference<>(new byte[_4MB],queue);
		System.out.println(ref.get());
		list.add(ref);
		System.out.println(list.size())
	}

//删除为null的软引用对象
Reference<? extends byte[]> reference = queue.poll();
while(reference != null){
	list.remove(reference);
	reference = queue.poll();
}
```
:::info
* 弱引用
弱引用也是对一个对象进行关联，但是，当JVM进行定期gc或者内存不足时，就会将该对象回收，无论内存是否足够弱引用需要使用java.lang.ref.WeakReference类来实现，一般情况下，是对那些不重要的或者只当前使用一次的对象使用，例如，if中的判断条件，如果只想进行一次判断，就可以使用弱引用
:::
```java
public static void main(String[] args) throws Exception{
  		System.out.println("start");
		Object object=new Object(); 
		System.gc();Thread.sleep(500); 
		WeakReference weakReference=new WeakReference(new Object()); 
		System.out.println(weakReference.get()); 
		System.gc();Thread.sleep(500); 
		System.out.println(weakReference.get());
		System.out.println("end");
 }
 结果
 start
 java.lang.Object@14ae5a5
 null
 end

```
:::info
* 虚引用
虚引用，则是一个虚构的引用，不会对对象的生存周期造成影响，只是一个检测对象是否存在的工具
虚引用需要使用ReferenceQueue类和PhantomReference类来实现
:::
```java
public static void main(String[] args) throws Exception{
  System.out.println("start"); 
  Object object=new Object();
  ReferenceQueue q=new ReferenceQueue(); 
  PhantomReference<Object> phantomReference=new PhantomReference<Object>(object,q); 
  System.gc(); 
  Thread.sleep(500);
  //get()方法永远返回null 
  System.out.println(phantomReference.isEnqueued());    
  object=null; System.gc(); 
  Thread.sleep(500);
  System.out.println(phantomReference.isEnqueued());
  System.out.println("end");
  }
  结果
  start
  false
  true
  end
```
# 垃圾回收算法
**标记清除(mark sweep)**
:::info no-icon
* 将没有被GC roots引用的对象进行清除，清除不意味着完全清除，会保存在一个比较空闲的位置
:::
* 优点： 速度快
* 缺点： 内存不连续
**标记整理(mark compact)**
:::info no-icon
* 将剩下被引用的对象整理成内存连续
:::
* 优点： 没有内存碎片
* 缺点： 速度较慢
**复制(copy)**
:::info no-icon
* 两个内存存放对象from和to，将from中的被引用的对象复制到to内存中，释放from中没被引用的对象，最后交换from内存和to内存
:::
* 优点： 没有内存碎片
* 缺点： 占用双倍内存
# GC分析
```java
public static void main(String[] args){

}

//-Xms20M -Xmx20M -Xmn10M -XX:+UseSerialGC -XX:+PrintGCDeatails -verbose:GC
//堆的初始值和最大值为20M,新生代为10M，防止幸存区动态调整，打印GC详细信息
[0.003s][warning][gc] -XX:+PrintGCDetails is deprecated. Will use -Xlog:gc* instead.
[0.012s][info   ][gc] Using Serial
//堆初始地址和大小
[0.012s][info   ][gc,heap,coops] Heap address: 0x00000000fec00000, size: 20 MB, Compressed Oops mode: 32-bit
[0.115s][info   ][gc,heap,exit ] Heap
//new generation新生代， total 9216K总大小9M,剩下1M被分配给了TO幸存区不能使用
//used 2515K使用了2.5M,[...]存放地址
[0.115s][info   ][gc,heap,exit ]  def new generation   total 9216K, used 2515K [0x00000000fec00000, 0x00000000ff600000, 0x00000000ff600000)
//伊甸园内存8M，使用了30%，系统自带的一些类
[0.115s][info   ][gc,heap,exit ]   eden space 8192K,  30% used [0x00000000fec00000, 0x00000000fee74c38, 0x00000000ff400000)
//幸存区from
[0.115s][info   ][gc,heap,exit ]   from space 1024K,   0% used [0x00000000ff400000, 0x00000000ff400000, 0x00000000ff500000)
//幸存区to
[0.115s][info   ][gc,heap,exit ]   to   space 1024K,   0% used [0x00000000ff500000, 0x00000000ff500000, 0x00000000ff600000)
//老年代 总大小10M，未被使用
[0.115s][info   ][gc,heap,exit ]  tenured generation   total 10240K, used 0K [0x00000000ff600000, 0x0000000100000000, 0x0000000100000000)
//元空间内存
[0.115s][info   ][gc,heap,exit ]    the space 10240K,   0% used [0x00000000ff600000, 0x00000000ff600000, 0x00000000ff600200, 0x0000000100000000)
[0.115s][info   ][gc,heap,exit ]  Metaspace       used 699K, capacity 4531K, committed 4864K, reserved 1056768K
[0.115s][info   ][gc,heap,exit ]   class space    used 58K, capacity 402K, committed 512K, reserved 1048576K
```
## 测试新生代回收
```java
private static final int _7MB = 7*1024*1024;

    public static void main(String[] args) {
        List<byte[]> list = new ArrayList<>();
        list.add(new byte[_7MB]);
    }
//暂停新生代触发GC
GC(0) Pause Young (Allocation Failure)
//GC发生后内存由2351变成1007，9216是新生代的总大小
GC(0) DefNew: 2351K->1007K(9216K)
GC(0) Tenured: 0K->0K(10240K)
GC(0) Metaspace: 701K->701K(1056768K)
GC(0) Pause Young (Allocation Failure) 2M->0M(19M) 2.997ms
GC(0) User=0.00s Sys=0.00s Real=0.00s

Heap
def new generation   total 9216K, used 8558K 
eden space 8192K,  92% used 
from space 1024K,  98% used 
to   space 1024K,   0% used 
```
**超出新生代内存**
```java
private static final int _8MB = 8*1024*1024;

    public static void main(String[] args) {
        List<byte[]> list = new ArrayList<>();
        list.add(new byte[_8MB]);
    }

Heap
  def new generation   total 9216K, used 2514K 
   eden space 8192K,  30% used                 
   from space 1024K,   0% used 
   to   space 1024K,   0% used 
  tenured generation   total 10240K, used 8192K
  //大对象晋升至老年代
    the space 10240K,  80% used 
  Metaspace       used 783K, capacity 4531K, committed 4864K, reserved 1056768K
   class space    used 69K, capacity 402K, committed 512K, reserved 1048576K
```
**超出总内存**
```java
[0.010s][info   ][gc,heap,coops] Heap address: 0x00000000fec00000, size: 20 MB, Compressed Oops mode: 32-bit
//触发回收
[0.107s][gc,start     ] GC(0) Pause Young (Allocation Failure)
[0.109s][gc,start     ] GC(1) Pause Full (Allocation Failure)
[0.109s][gc,phases,start] GC(1) Phase 1: Mark live objects
[0.111s][gc,phases      ] GC(1) Phase 1: Mark live objects 1.478ms
[0.111s][gc,phases,start] GC(1) Phase 2: Compute new object addresses
[0.111s][gc,phases      ] GC(1) Phase 2: Compute new object addresses 0.305ms
[0.111s][gc,phases,start] GC(1) Phase 3: Adjust pointers
[0.112s][gc,phases      ] GC(1) Phase 3: Adjust pointers 0.700ms
[0.112s][gc,phases,start] GC(1) Phase 4: Move objects
[0.113s][gc,phases      ] GC(1) Phase 4: Move objects 0.633ms
[0.113s][gc             ] GC(1) Pause Full (Allocation Failure) 8M->8M(19M) 3.364ms
[0.113s][gc,heap        ] GC(0) DefNew: 2351K->0K(9216K)
[0.113s][gc,heap        ] GC(0) Tenured: 8192K->9208K(10240K)
[0.113s][gc,metaspace   ] GC(0) Metaspace: 802K->802K(1056768K)
[0.113s][gc             ] GC(0) Pause Young (Allocation Failure) 10M->8M(19M) 5.499ms
[0.113s][gc,cpu         ] GC(0) User=0.00s Sys=0.00s Real=0.01s
[0.113s][gc,start       ] GC(2) Pause Full (Allocation Failure)
[0.113s][gc,phases,start] GC(2) Phase 1: Mark live objects
[0.114s][gc,phases      ] GC(2) Phase 1: Mark live objects 1.182ms
[0.114s][gc,phases,start] GC(2) Phase 2: Compute new object addresses
[0.114s][gc,phases      ] GC(2) Phase 2: Compute new object addresses 0.237ms
[0.114s][gc,phases,start] GC(2) Phase 3: Adjust pointers
[0.115s][gc,phases      ] GC(2) Phase 3: Adjust pointers 0.659ms
[0.115s][gc,phases,start] GC(2) Phase 4: Move objects
[0.115s][gc,phases      ] GC(2) Phase 4: Move objects 0.293ms
[0.115s][gc,heap        ] GC(2) DefNew: 0K->0K(9216K)
[0.115s][gc,heap        ] GC(2) Tenured: 9208K->9194K(10240K)
[0.115s][gc,metaspace   ] GC(2) Metaspace: 802K->802K(1056768K)
[0.115s][gc             ] GC(2) Pause Full (Allocation Failure) 8M->8M(19M) 2.555ms
[0.115s][gc,cpu         ] GC(2) User=0.00s Sys=0.00s Real=0.00s
//堆内存溢出报错
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
	at JVMText.GCdemo.main(GCdemo.java:18)
//内存使用情况
[0.116s][gc,heap,exit   ] Heap
[0.117s][gc,heap,exit   ]  def new generation   total 9216K, used 382K 
[0.117s][gc,heap,exit   ]   eden space 8192K,   4% used 
[0.117s][gc,heap,exit   ]   from space 1024K,   0% used 
[0.117s][gc,heap,exit   ]   to   space 1024K,   0% used 
[0.117s][gc,heap,exit   ]  tenured generation   total 10240K, used 9194K 
[0.117s][gc,heap,exit   ]    the space 10240K,  89% used 
[0.117s][gc,heap,exit   ]  Metaspace       used 844K, capacity 4531K, committed 4864K, reserved 1056768K
[0.117s][gc,heap,exit   ]   class space    used 75K, capacity 402K, committed 512K, reserved 1048576K
```
# 垃圾回收器
:::info
* 串行
:::
* 单线程
* 适合堆内存较小的垃圾回收
```java
-XX:+UseSerialGC=Serial+SerialOld
```
:::info
* 吞吐量优先
:::
* 多线程
* 适合堆内存较大的垃圾回收
* 让单位时间内STW时间最短
```java
-XX:+UseParallelGC
//动态调整伊甸园和survivor的比例
-XX:+UseParallelOldGC
-XX:+UseAdaptiveSizePolicy
-XX:GCTimeRatio=ratio
-XX:MaxGCPauseMillis=ms
//线程数
-XX:ParallelGThreads=n
```
:::info
* 相应时间优先
:::
* 多线程
* 适合堆内存较大的垃圾回收
* 尽可能让单位时间内STW时间最短
```java
-XX:UseParNewGC
-XX:UseConcMarkSweepGC
//并发线程数量
-XX:ParallelGCThreads=n
//并行线程数量
-XX:ConcGCThreads=n
-XX:CMSInitiatingOccupancyFraction=percent
-XX:CMSScavengeBeforRemark
```