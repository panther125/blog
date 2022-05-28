---
title: java I/O
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 创建文件操作
## 创建文件的抽象路径
* File(File parent, String child)
    从父抽象路径名和子路径名字符串创建新的 File实例。
* File(String pathname)
    通过将给定的路径名字符串转换为抽象路径名来创建新的 File实例。
* File(String parent, String child)
    从父路径名字符串和子路径名字符串创建新的 File实例。
* File(URI uri)
    通过将给定的 file: URI转换为抽象路径名来创建新的 File实例。
```java
//三种file的构造方法
        //File(String pathname)
        File f1 = new File("D:\\download\\java\\file");
        System.out.println(f1);
        //File(String parent, String child)
        File f2 = new File("D:\\download\\java","file");
        System.out.println(f2);
        //File(File parent, String child)
        File f3 = new File("D:\\download\\java");
        File f4 = new File(f3,"file");
        System.out.println(f4);
```
## 创建文件或目录
* public boolean CreateNewFile()新建文件在抽象目录中
    如果文件不存在就创建文件，并返回true
        如果文件存在就不创建文件，并返回false
* public boolean mkdir()新建目录在抽象目录中
    如果目录不存在就不创建目录，并返回true
        如果目录存在就创建目录，并返回false
* public boolean mkdirs()新建多级目录在抽象目录中
    如果多级目录不存在就创建多级目录，并返回true
        如果多级目录存在就不创建多级目录，并返回false
```java
//public boolean CreateNewFile()新建文件在抽象路径中
        File f1 = new File("D:\\download\\java\\file\\java.txt");
        System.out.println(f1.createNewFile());
        //public boolean mkdir()新建目录在抽象路径中
        File f2 = new File("D:\\download\\java\\file\\javac");
        System.out.println(f2.mkdir());
        //public boolean mkdirs()新建目录在抽象路径中
        File f3 = new File("D:\\download\\java\\file\\javaweb\\html");
        System.out.println(f3.mkdirs());
        //public boolean delete()删除文件或目录
        System.out.println(f2.delete());
```
## 文件的常用方法
```java
 //public boolean isDirector()判断路径名的file是否为目录
        File f1 = new File("myFile\\file");
        System.out.println(f1.isDirectory());
        //public boolean isFile()判断路径名的file是否为文件
        System.out.println(f1.isFile());
        //public boolean exists()判断路径名的file是否存在
        System.out.println(f1.exists());
        //public boolean getAbsoluteFile()路径名的绝对路径
        System.out.println(f1.getAbsoluteFile());
        //public boolean getPath()路径名转换成字符串
        System.out.println(f1.getPath());
        //public boolean getName()路径名的文件和目录
        System.out.println(f1.getName());
        //public String[] list()路径名的文件和目录的名称
        File f2 = new File("myFile\\file");
        String[] strArr = f2.list();
        for(String i : strArr){
            System.out.println(i);
        }
        //public File[] listFiles()返回文件和目录的路径
        File[] f = f2.listFiles();
        for(File farr : f){
            System.out.println(farr);
        }
```
## 输出目录中的文件
```java
 public static void main(String[] args) {
        File file = new File("D:\\download");
        Allfiles(file);
    }

    public static void Allfiles(File fe){
        File[] fileArr = fe.listFiles();
        if(fileArr != null){
            for(File file : fileArr){
                if(file.isDirectory()){
                    Allfiles(file);
                }else{
                    System.out.println(file.getName());
                }
            }
        }
    }
```
# 字节流输入输出操作
## FileOutPutStream
```java
 try {
            //创建字节流输出对象（文件不存在会创建文件）
            FileOutputStream fos = new FileOutputStream("fos.txt");
            //void write将指定字节写入文件的三种方法
            //void write（int b)
            fos.write(108);
            fos.write(111);
            fos.write(118);
            fos.write(101);
            fos.write(10);
            //void write(byte[] b)
            //byte也可通过getByte（）获得
            //byte[] bs = {108,111,118,101};
            byte[] bs = "love".getBytes();
            fos.write(bs);
            fos.write(10);
            //void write(byre[] b,int off, int length)
            byte[] bs2 = {99, 108, 111, 118, 101};
            fos.write(bs2, 1, 4);

            //追加数据
        /*
        public FileOutputStream(String name,boolean append)
                 throws FileNotFoundException创建文件输出流以指定的名称写入文件。
                 如果第二个参数是true ，则字节将写入文件的末尾而不是开头。
                 程序运行一次就会在文件末尾添加数据
         */
        } catch(IOException e){
            e.printStackTrace();
        }
```
## 字节流写数据标准代码
```java
FileOutputStream fos = null;
        try{
            fos = new FileOutputStream("fos.txt");
            fos.write("hello world!".getBytes());
        }catch(IOException e){
            e.printStackTrace();
        }finally{
            if(fos != null){
                try {
                    fos.close();
                }catch(IOException e){
                    e.printStackTrace();
                }
            }
        }
```
## 字节流读数据
```java
try {
            FileInputStream fis = new FileInputStream("fos.txt");
            int ch2;
            //结尾为-1
            while((ch2=fis.read())!= -1){
                System.out.print((char)ch2);
            }
        }catch(IOException e){
            e.printStackTrace();
        }
```
# 字节缓存流
读取数据量大的文件时，读取的速度会很慢，很影响我们程序的效率java中提出了一套缓冲流，它的存在，可提高IO流的读写速度
## BufferedOutputSttream
```java
//创建字节缓存流对象
        BufferedOutputStream bos = new BufferedOutputStream(new
                FileOutputStream("fos.txt"));
        //写入数据
        bos.write("hello ".getBytes());
        bos.write("world !".getBytes());

        //释放资源
        bos.close();
```
## BufferedInputStream
```java
//创建字节缓存流
        BufferedInputStream bis = new BufferedInputStream(new
                FileInputStream("fos.txt"));
        //输出数据
        byte[] by = new byte[1024];
        int len;
        while((len=bis.read(by)) != -1){
            System.out.println(new String(by,0,len));
        }

        //释放资源
        bis.close();
```
## 案列：复制视频
```java
        //创建输出流
        FileOutputStream fos = new FileOutputStream("D:\\download\\java\\file\\havep.mp4");
        //创建输入流
        FileInputStream fis = new FileInputStream("D:\\download\\java\\havep.mp4");
        //复制文件
        int len;
        byte[] by = new byte[1024];
        while((len=fis.read(by)) != -1){
            fos.write(by,0,len);
        }
        //释放资源
        fis.close();
        fos.close(); 
```
# 字符流
## 字符流写入和读取
```java
OutputStreamWriter osw = new OutputStreamWriter(new
                FileOutputStream("osw.txt"));
        osw.write("南昌大学");
        osw.close();
        InputStreamReader isr = new InputStreamReader(new
                FileInputStream("osw.txt"));
        int ch;
        char[] chs = new char[16];
        while((ch = isr.read(chs))!=-1){
            System.out.print(new String(chs,0,ch));
        }
        isr.close();
```
* 由于OutPutStream太java提出了优化，OutPutStream有个子类FileWriter，可以代替OutPutStrea.
```java
FileReader fr = new FileReader("D:\\美化\\20211012-视频屏保\\1.wmv");
        //创建输出流对象
        FileWriter fw = new FileWriter("D:\\download\\java\\file\\1.wmv");
        //复制文件
        int len;
        char[] chs = new char[1024];
        while((len=fr.read(chs))!= -1){
            fw.write(chs,0,len);
        }
        //释放资源
        fw.close();
        fr.close();
```
# 字符缓存流
```java
 long startTime = System.currentTimeMillis();

        BufferedReader br = new BufferedReader(new
                FileReader("D:\\download\\java\\file\\java.txt"));
        BufferedWriter bw = new BufferedWriter(new
                FileWriter("D:\\download\\java\\about.txt"));
        int len;
        char[] ch = new char[1024];
        while((len=br.read(ch)) != -1){
            bw.write(ch,0,len);
        }
        bw.close();
        br.close();
        long endTime = System.currentTimeMillis();
        System.out.println((endTime-startTime));
```
* 缓存流还提供了两种特殊方法
1. readLine()读取一行数据
2. newLine()换行
# 案列
[目前最常用的文件复制代码]{.red}
* 复制文件
```java
 public static void main(String[] args) throws IOException {
        long startTime = System.currentTimeMillis();

        BufferedReader br = new BufferedReader(new
                FileReader("D:\\download\\java\\file\\java.txt"));
        BufferedWriter bw = new BufferedWriter(new
                FileWriter("D:\\download\\java\\about.txt"));
        String s;
        while((s=br.readLine()) != null){
            bw.write(s);
            bw.newLine();
            bw.flush();
        }
        bw.close();
        br.close();
        long endTime = System.currentTimeMillis();
        System.out.println((endTime-startTime));
    }
```
# I/O流总结
## 字节流
![](https://pic.imgdb.cn/item/626e5c13239250f7c57a55ea.png)
## 字符流
![](https://pic.imgdb.cn/item/626e5bf6239250f7c57a07d9.png)
## 所有接口和类
![](https://pic.imgdb.cn/item/627137dd094754312903cfaf.png)