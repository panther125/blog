---
title: 汇编概述
data: 2021-05-29
categories:
- 汇编语言
tags:
- 汇编
---
# 汇编概述
* 8086cpu有14个寄存器：
`AX` `BX` `CX` `DX` `SI` `DI` `SP` `BP` `IP` `CS` `SS` `DS` `ES` `PSW`
* 8086所有的寄存器都是16位的，可以存储2个字节
* `AX` `BX` `CX` `DX`通常用来存放一般性数据，称为通用寄存器
## 不同的寻址方式
(1) [idata]用一个常量来表示地址，可用于直接定位一个内存单元；
(2) [bx]用一个变量来表示内存地址，可用于间接定位一个内存单元；
(3) [bx+idata]用一个变量和常量表示地址，可在一个起始地址的基础上用变量间接定位一个内存单元；
(4) [bx+si]用两个变量表示地址；
(5) [bx+si+idata]用两个变量和一个常量表示地址。
可以看到，从[idata]一直到[bx+si+idata]，我们可以用更加灵活的方式来定位一个内存
单元的地址。这使我们可以从更加结构化的角度来看待所要处理的数据。下面我们通过
个问题的系列来体会CPU提供多种寻址方式的用意，并学习一些相关的编程技巧。
## 通用寄存器
| 名称 | 中英文含义 | 作用 |
|-|-|-|
| AX | 累加器 | 使用频率最高，用于算术、逻辑运算以及与外设传送信息等 |
| BX | 基址寄存器 | 用来存放存储器地址，以方便指向变量或数组的元素 |
| CX | 计数器 | 作为循环操作等指令的计数器 |
| DX | 数据寄存器 | 存放数据，在输入、输出指令中存放外设端口地址 |
| SI | 源变址寄存器 | 指向字符串或数组的源操作数 |
| DI | 目的变址寄存器 | 指向字符串或数组的目的操作数 |
| BP | 基址指针寄存器 | 指向程序堆栈区的数据，主用于子程序中访问通过堆栈传输的参数和局部变量 |
| SP | 堆栈指针寄存器 | 专用于指向程序堆栈区顶部的数据，在涉及堆栈操作的指令中会自动增加或减少，以使其总是指向顶部 |
* 8086cpu有4个段寄存器：`CS` `DS` `SS` `ES`
## 段寄存器
| 名称 | 中文含义 | 描述 |
|-|-|-|
| CS | 代码段寄存器 | 存放程序指令序列 |
| DS | 数据段寄存器 | 存放当前运行程序所用的数据 |
| SS | 堆栈段寄存器 | 确定堆栈所在的主存区域 |
| ES | 附加段寄存器 | 附加的数据段 |
## 段寄存器的使用规定
| 访问存储器的方式 | 默认段寄存器 | 可超越的段寄存器 | 偏移地址 |
|-|-|-|-|
| 取指令 | CS | 无 | IP |
| 堆栈操作 | SS | 无 | SP |
| 一般数据访问 | DS | CS,ED,SS | EA |
| 串操作的源操作数 | DS | CS,ED,SS | SI |
| 串操作的目的操作数 | ES | 无 | DI |
| BP作为基址的寻址方式 | SS | CS,DS,ES | EA |
* **数据** --> **通用寄存器** --> **段寄存器**
## CS:IP
CS和IP是8086CPU中两个最关键的寄存器，它们指示了CPU当前要读取指令的地
址。**CS为代码段寄存器**，**IP 为指令指针寄存器**，从名称上我们可以看出它们和指令的关系。
在8086PC 机中，任意时刻，设 CS 中的内容为M，IP 中的内容为N，8086CPU将从
内存 Mx16+N 单元开始，读取一条指令并执行。
# 基本汇编指令
**汇编指令举例**
| 汇编指令 | 控制cpu完成的操作 | 描述 |
|-|-|-|
| mov ax,18 | 将18送给入寄存器ax | ax = 18 |
| mov ah,78 | 将78送给入寄存器ah | ah = 78 |
| add ax,8 | 将寄存器ax数据加上8 | ax = ax+8 |
| mov ax,bx | 将寄存器bx的数据送入ax | ax = bx |
| add ax,bx | 将寄存器bx和ax的数据相加送入ax | ax = ax+bx |
**练习**
| 汇编指令 | ax数据 | bx数据 |
|-|-|-|
| mov ax,001AH | 001AH | 0000H |
| mov bx,0026H | 001AH | 0026H |
| add al,bl | 0040H | 0026H |
| add ah,bl | 2640H | 0026H |
| add bh,al | 2640H | 4026H |
| mov ah,0 | 0040H | 4026H |
| add al,85H | 00C5H | 4026H |
| add al,93H | 0058H | 4026H |
## 指令执行与寄存器的内容
| 指令 | 寄存器的内容 | 说明 |
|-|-|-|
| mov ax,1000H | ax=1000H | 将1000H送入ax寄存器中 |
| mov ds,ax | ds=ax | 将ds设位1000H |
| mov ax,[0] | ax=1123H | 1000:0处存放的字型数据送入ax 1000:1单元存放字型数据的高8位：11H, 1000:0单元存放字型数据的低8位：23H， 所以1000:0处存放的字型数据为1123H。 指令执行时，字型数据的高 8 位送入 ah，字型数据的低 8 位送入 al，则 ax中的数据为1123H |
# 栈(SS:SP)
8086CPU提供入栈和出栈指令，最基本的两个是**PUSH(入栈)**和**POP(出栈)**。
比如，
```bash
push ax   表示将寄存器ax中的数据送入栈中，
pop ax    表示从栈顶取出数据送入ax
```
8086CPU的入栈和出栈操作都是以字为单位进行的。
## 入栈和出栈执行过程
```bash
mov ax,0123H
push ax
mov bx,2266H
push bx
mov cx,1122H
push cx
pop ax
pop bx
pop cx
```
![](https://pic.imgdb.cn/item/626e6237239250f7c58a72ed.png)
这不禁让我们想起一个问题，就是，CPU 如何知道当前要执行的指令所在的位置？
我们现在知道答案，那就是 CS、IP 中存放着当前指令的段地址和偏移地址。
现在的问题是：CPU 如何知道栈顶的位置？显然，也应该有相应的寄存器来存放栈顶的地址，
8086CPU 中，有两个寄存器，**段寄存器 SS 和寄存器 SP**，栈顶的段地址存放
在 `SS` 中，偏移地址存放在 `SP` 中。任意时刻，SS:SP 指向栈顶元素。push 指令和 pop 指
令执行时，CPU从SS和SP中得到栈顶的地址。
# BX、SI、DI、BP
* 在8086中，只有这4个寄存器可以在[...]中进行内存单元的寻址
```bash
mov ax,[bx]
mov ax,[si]
mov ax,[bx+si]
mov ax,[bx+di]
mov ax,[bx]
mov ax,[di]
mov ax,[bx+si]
mov ax,[bx+di]
```
:::warning
* bx不能与bp在一起，他们都是指向基址
* si和di不能在一起，他们都是变址
:::
* 只要使用寄存器bp，没有显性给出段地址，默认段地址在SS
# 源程序
```bash
assume cs:codesg

codesg segment

start:	mov ax,0123H
		mov bx,0456H
		add ax,bx
		add ax,ax
		mov ax,4c00H
		int 21H

codesg ends

end start
```
1. 伪指令
:::info no-icon
在汇编语言源程序中，包含两种指令，一种是汇编指令，一种是伪指令。
汇编指令是有对应的机器码的指令，可以被编译为机器指令，最终为 
CPU 所执行。而伪指令没有对应的机器指令，最终不被 CPU 所执行。那么
谁来执行伪指令呢？伪指令是由编译器来执行的指令，编译器根据伪指令来
进行相关的编译工作。
segment和ends是一对成对使用的伪指令，这是在写可被编译器编译的汇编程序时，
必须要用到的一对伪指令。segment 和 ends 的功能是定义一个段，segment说明一个段开
始，ends说明一个段结束。一个段必须有一个名称来标识，
:::
2. end
:::info no-icon
end 是一个汇编程序的结束标记，编译器在编译汇编程序的过程中，如果碰到了伪指
令 end，就结束对源程序的编译。所以，在我们写程序的时候，如果程序写完了，要在结
尾处加上伪指令 end。否则，编译器在编译程序时，无法知道程序在何处结束。
注意，不要搞混了 end 和 ends，ends是和segment成对使用的，标记一个段的结束，
ends的含义可理解为“end segment”。我们这里讲的 end 的作用是标记整个程序的结束。
:::
3. assume
:::info no-icon
这条伪指令的含义为“假设”。它假设某一段寄存器和程序中的某一个用
segment...ends 定义的段相关联。通过 assume 说明这种关联，在需要的情况下，
编译程序可以将段寄存器和某一个具体的段相联系。
assume 并不是一条非要深入理解不可的伪指令，以后我们编程时，
记着用 assume 将有特定用途的段和相关的段寄存器关联起来即可。
:::
4. 标号
:::info no-icon
在汇编源程序中，除了汇编指令和伪指令外，还有一些标号，比如“codese”这个标号
标号指代了一个地址。比如 codesg 在 segment 的前面，作为一个段的名称，这个段的名称最
终将被编译、连接程序处理为一个段的段地址。
:::
# debug常用命令解释
* `R`: 命令可以查看/修改CPU中各个寄存器中的内容. -r 查看所有寄存器内容,-r ax 按回车 出现":" 输入新内容 .
* `D`: 命令查看内存中的内容,例如: -d 1000:0 就是查看内存1000:0处的内容.
* `E`: 命令修改内存中的内容.
* `U`: 命令将内存单元总的内容翻译为汇编指令显示.
* `T`: 命令执行CS:IP指向的指令.
* `A`: 以汇编指令形式向内存中写入指令.
* `t`: 单步执行.
* `g`: [0000] 直接跳转到指定的地址.
* `p`: 自动重复执行循环中的指令.知道(cx)=0为止.
## debug使用提示
```bash
mov ax,2000H
mov ds,ax
mov al,[0]
```
**这其实就是吧0送入ax的低位字节，如果要实现偏移的传输，要加上段地址**
```bash
mov ax,2000H
mov ds,ax
mov al,ds:[0]
```
:::warning
下列指令分辨
:::
```bash
mov al,[0]      //将0赋值给ax的地位字节
mov al,ds:[0]   //将数据段偏移地址为0的数据赋给al
mov al,[bx]     //将数据段偏移地址为bx的数据赋给al
mov al,ds:[bx]     //将数据段偏移地址为bx的数据赋给al
```
:::warning
* 在进行指令操作时指明是字和字节很有必要
* push至进行字操作
例如：
2000：1000 FF FF FF FF FF FF FF 。。。。。
```bash
mov ax,2000H
mov ds,ax
mov byte ptr [1000H],1
内存变化为 01 FF FF FF FF .......
----------------------------------------
mov ax,2000H
mov ds,ax
mov word ptr [1000H],1
内存变化为 01 00 FF FF FF .......
```
:::
# 汇编语言中数据位置的表达
1. **立即数**
对于直接包含在机器指令的数据(执行前在cpu的指令缓冲区中)：在汇编指令中直接给出
```bash
例如：
		mov ax,1
		add ax,4c00H
		or ax,11000111B
		mov ax,'a'
```
2. **寄存器**
指令要处理的数据在寄存器中，在汇编指令中给出相应的寄存器名
```bash
例如：
		mov ax,bx
		mov ds,ax
		puush bx
		mov ds:[0],bx
		push ds
```
3. **段地址(SA)和偏移地址(EA)**
指令要处理的数据在内存中，汇编指令可以给出[X]的格式在某个段寄存器中
```bash
mov ax,[0]
mov ax,[bx+8]
mov ax,[bx+si]
mov ax,[bx+si+8]
默认段寄存器为数据段寄存器(DS)
mov ax,[bp+si]
默认段寄存器为堆栈段寄存器(SS)

```
## 寄存器寻址
* idata表示常数
{% raw %}
<table>
	<tr>
		<td>寻址方式</td>
		<td>名称</td>
		<td>含义</td>
		<td>举例</td>
	</tr>
	<tr>
		<td>[idata]</td>
		<td>EA=idata、SA=(ds)</td>
		<td >直接寻址</td>
		<td>[idata]</td>
	</tr>
	<tr>
		<td>[bx]</td>
		<td>EA=bx、SA=(ds)</td>
		<td rowspan = "4" style="text-align: center;">寄存器间接寻址</td>
		<td>[bx]</td>
	</tr>
	<tr>
		<td>[si]</td>
		<td>EA=si、SA=(ds)</td>
		<td>[si]</td>
	</tr>
	<tr>
		<td>[di]</td>
		<td>EA=di、SA=(ds)</td>
		<td>[di]</td>
	</tr>
	<tr>
		<td>[bp]</td>
		<td>EA=idata、SA=(ss)</td>
		<td>[bp]</td>
	</tr>
	<tr>
		<td>[bx+idata]</td>
		<td>EA=bx+idata、SA=(ds)</td>
		<td rowspan = "4" style="text-align: center;">寄存器相对寻址</td>
		<td rowspan = "4" style="text-align: center;">[bx][idata]</td>
	</tr>
	<tr>
		<td>[si+idata]</td>
		<td>EA=si+idata、SA=(ds)</td>
	</tr>
	<tr>
		<td>[di+idata]</td>
		<td>EA=di+idata、SA=(ds)</td>
	</tr>
	<tr>
		<td>[bp+idata]</td>
		<td>EA=bp+idata、SA=(ss)</td>
	</tr>
	<tr>
		<td>[bx+si]</td>
		<td>EA=bx+si、SA=(ds)</td>
		<td rowspan = "4" style="text-align: center;">基址变址寻址</td>
		<td rowspan = "4" style="text-align: center;">[bx][si]</td>
	</tr>
	<tr>
		<td>[bx+di]</td>
		<td>EA=bx+di、SA=(ds)</td>
	</tr>
	<tr>
		<td>[bp+si]</td>
		<td>EA=bp+si、SA=(ss)</td>
	</tr>
	<tr>
		<td>[bp+di]</td>
		<td>EA=bp+di、SA=(ss)</td>
	</tr>
	<tr>
		<td>[bx+si+idata]</td>
		<td>EA=bx+si+idata、SA=(ds)</td>
		<td rowspan = "4" style="text-align: center;">相对基址变址寻址</td>
		<td rowspan = "4" style="text-align: center;">idata[bx][si]</td>
	</tr>
	<tr>
		<td>[bx+di]</td>
		<td>EA=bx+di+idata、SA=(ds)</td>
	</tr>
	<tr>
		<td>[bp+si]</td>
		<td>EA=bp+si+idata、SA=(ss)</td>
	</tr>
	<tr>
		<td>[bp+di]</td>
		<td>EA=bp+di+idata、SA=(ss)</td>
	</tr>
</table>
{% endraw %}
