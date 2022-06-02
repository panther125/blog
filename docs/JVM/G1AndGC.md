---
title: G1简介和GC调优
date: 2022-05-29
categories:
- 后端
tags:
- JVM
---
# G1(Garbage First)
G1将整个Java堆（包括新生代、老年代）划分为多个大小固定的独立区域(Region),
并且跟踪这些区域里面的垃圾堆积程度，在后台维护一个优先列表，每次根据允许的收集时间，优先回收垃圾最多的区域（这就是Garbage First名称的来由）。区域划分及有优先级的区域回收，保证了G1收集器在有限的时间内可以获得最高的收集效率。
**适用场景**
* 同时注重吞吐量(Throughput)和低延迟(Low latency),默认的暂停目标是200ms
* 超大堆内存，会将堆划分为多个大小相等的Region
* 整体上是标记+整理算法，两个区域之间是复制算法
**相关JVM参数**
```java
-XX:+UseG1GC
-XX:G1HeapRegionsize=size
-XX:MaxGCPauseMillis=time
```
# GC调优
:::tip
* 查看虚拟机参数
:::
```bash
"D:\program\JDK\bin\java" -XX:+PrintFlagsFinal -version | findstr "GC"
```
```java
 uintx AdaptiveSizeMajorGCDecayTimeScale        = 10                                        {product} {default}
     uint ConcGCThreads                            = 2                                         {product} {ergonomic}
     bool DisableExplicitGC                        = false                                     {product} {default}
     bool ExplicitGCInvokesConcurrent              = false                                     {product} {default}
    uintx G1MixedGCCountTarget                     = 8                                         {product} {default}
    uintx G1PeriodicGCInterval                     = 0                                      {manageable} {default}
     bool G1PeriodicGCInvokesConcurrent            = true                                      {product} {default}
   double G1PeriodicGCSystemLoadThreshold          = 0.000000                               {manageable} {default}
    uintx GCDrainStackTargetSize                   = 64                                        {product} {ergonomic}
    uintx GCHeapFreeLimit                          = 2                                         {product} {default}
    uintx GCLockerEdenExpansionPercent             = 5                                         {product} {default}
    uintx GCPauseIntervalMillis                    = 201                                       {product} {default}
    uintx GCTimeLimit                              = 98                                        {product} {default}
    uintx GCTimeRatio                              = 12                                        {product} {default}
     bool HeapDumpAfterFullGC                      = false                                  {manageable} {default}
     bool HeapDumpBeforeFullGC                     = false                                  {manageable} {default}
   size_t HeapSizePerGCThread                      = 43620760                                  {product} {default}
    uintx MaxGCMinorPauseMillis                    = 18446744073709551615                      {product} {default}
    uintx MaxGCPauseMillis                         = 200                                       {product} {default}
      int ParGCArrayScanChunk                      = 50                                        {product} {default}
    uintx ParallelGCBufferWastePct                 = 10                                        {product} {default}
     uint ParallelGCThreads                        = 8                                         {product} {default}
     bool PrintGC                                  = false                                     {product} {default}
     bool PrintGCDetails                           = false                                     {product} {default}
     bool ScavengeBeforeFullGC                     = false                                     {product} {default}
     bool UseAdaptiveSizeDecayMajorGCCost          = true                                      {product} {default}
     bool UseAdaptiveSizePolicyWithSystemGC        = false                                     {product} {default}
     bool UseDynamicNumberOfGCThreads              = true                                      {product} {default}
     bool UseG1GC                                  = true                                      {product} {ergonomic}
     bool UseGCOverheadLimit                       = true                                      {product} {default}
     bool UseMaximumCompactionOnSystemGC           = true                                      {product} {default}
     bool UseParallelGC                            = false                                     {product} {default}
     bool UseSerialGC                              = false                                     {product} {default}
     bool UseShenandoahGC                          = false                                     {product} {default}
java version "16.0.2" 2021-07-20
Java(TM) SE Runtime Environment (build 16.0.2+7-67)
Java HotSpot(TM) 64-Bit Server VM (build 16.0.2+7-67, mixed mode, sharing)
     bool UseZGC                                   = false                                     {product} {default}
```
## 调优对象
:::tip
* 内存
* 锁竞争
* cpu占用
* io
:::