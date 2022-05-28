---
title: Swing
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVA
---
# 概述
* Swing轻量级组件
* AWT重量级组件
Swing是由100%java实现的，不依赖本地平台的GUI，Swing的显示速度要比AWT慢
**Swing的特征**
1. Swing组件采用了MVC(Model,view,controller)模型视图控制器设计模式
2. Swing在不同平台表现一致，有能力提供本平台不支持的显示外观
**Swing组件按照功能来分类**
1. J顶层容器：JFrame、JApplet、.JDialog和JWindow。
2. 中间容器：JPanel、JScrollPane、JSplitPane、JToolBar等。
3. 特殊容器：在用户界面上具有特殊作用的中间容器，如lIntemalFrame、JRootPane、JLayeredPane和
JDestopPane等。
4. 基本组件：实现人机交互的组件，如JButton、JComboBox、JList、JMenu、JSlider等。
5. 不可编辑信息的显示组件：向用户显示不可编辑信息的组件，如Label、JProgressBar和JToolTip等。
6. 可编辑信息的显示组件：向用户显示能被编辑的格式化信息的组件，如Table、JTextArea和TextField等
7. 特殊对话框组件：可以直接产生特殊对话框的组件，如JColorChooser和JFileChooser等。
## 创建一个窗口
:::top
* JFrame
:::
```java
import javax.swing.*;
public class HelloWorldSwing {
    /**
     * 创建并显示GUI。出于线程安全的考虑，
     * 这个方法在事件调用线程中调用。
     */
    private static void createAndShowGUI() {
        // 确保一个漂亮的外观风格
        JFrame.setDefaultLookAndFeelDecorated(true);

        // 创建及设置窗口
        JFrame frame = new JFrame("HelloWorldSwing");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // 添加 "Hello World" 标签
        JLabel label = new JLabel("Hello World");
        frame.getContentPane().add(label);

        // 显示窗口
        frame.pack();
        frame.setVisible(true);
    }

    public static void main(String[] args) {
        // 显示应用 GUI
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }
}
```
:::top
* JDialog
:::
```java
private static void CreateUI() {
        //设置JFrame窗口
        JFrame jf = new JFrame();
        //关闭窗口
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        //设置尺寸
        jf.setSize(250,150);
        //展示
        jf.setVisible(true);
        //在JFrame基础上创建JDialog
        JDialog jd = new JDialog(jf,"JDialog对话框",true);
        jd.setDefaultCloseOperation(JDialog.HIDE_ON_CLOSE);
         //设置尺寸
        jd.setSize(200,100);
        //展示
        jd.setVisible(true);
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(JFramedemo::CreateUI);
    }
```
## 布局管理器
| 管理器 | 描述 |
|-|-|
| BorderLayout | 边界布局管理器 |
| BoxLayout | 箱式布局管理器 |
| CardLayout | 卡片式布局管理器 |
| FlowLayout | 流式布局管理器 |
| GridBagLayout | 网格包布局管理器 |
| GridLayout | 网格布局管理器 |
| GroupLayout | 分组布局管理器 |
| SpringLayout | 弹性布局管理器 |

**BorderLayout**
BorderLayout： 只管里容器中的5个组件的排列方式，这五个组件的位置分别位于 东、南、西、北、中 方向分别对应 North, South, West, East 和 Center 
```java
JFrame jf = new JFrame("BorderLayout");
        //设置布局为BorderLayout
        jf.setLayout(new BorderLayout());
        jf.setSize(300,300);
        //窗口的显示位置
        jf.setLocation(300,200);
        //创建5个按钮
        JButton but1 = new JButton("East");//东
        JButton but2 = new JButton("North");//北
        JButton but3 = new JButton("South");//南
        JButton but4 = new JButton("West");//西
        JButton but5 = new JButton("Center");//中

        //添加按钮
        jf.add(but1,BorderLayout.EAST);
        jf.add(but2,BorderLayout.NORTH);
        jf.add(but3,BorderLayout.SOUTH);
        jf.add(but4,BorderLayout.WEST);
        jf.add(but5,BorderLayout.CENTER);

        //显示窗口
        jf.setVisible(true);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
```
**流式布局**
FlowLayout 是一种比较简单的布局方式，它会将所有组件排列成一行，以组件的preferredSize显示，一般情况下，如果一行显示不了所有的组件，会自动换到下一行显示。 
```java
JFrame jf = new JFrame("FlowLayout");
        //设置布局为FlowLayout设置为左对齐,水平间距20，垂直间距30
		// FlowLayout.【LEFT|RIGHT|CENTER】
        jf.setLayout(new FlowLayout.LEFT,20,30);
        jf.setSize(300,300);
        //窗口的显示位置
        jf.setLocation(300,200);

        //添加按钮
        jf.add(new JButton("one"));
        jf.add(new JButton("two"));
        jf.add(new JButton("three"));
        jf.add(new JButton("four"));
        jf.add(new JButton("five"));

        //显示窗口
        jf.setVisible(true);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
```
**网格布局**
```java
JFrame jf = new JFrame("GridLayout");
        //设置布局为GridLayout规格为3*3的网格
        jf.setLayout(new GridLayout(3,3));
        jf.setSize(300,300);
        //窗口的显示位置
        jf.setLocation(300,200);

        //添加按钮9个按钮刚好填满网格
        for(int i = 0 ; i <= 9; i++){
        	JButton but = new JButton("but"+i);
        	jf.add(but);
        }

        //显示窗口
        jf.setVisible(true);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
```
# 事件处理
事件处理是控制事件并决定事件发生时应该发生什么的机制。此机制具有处理的代码，称为事件处理程序，它在事件发生时执行。Java使用委派事件模型来处理事件。该模型定义了生成和处理事件的标准机制。
授权事件模型具有以下主要参与者。

1. [事件源(Event Source)]{.label .top} 源是事件发生的对象。源负责向其处理程序提供已发生事件的信息。通常是指产生事件的组件例如按钮、窗口、菜单等。
2. [事件对象(Event)]{.label .top} 
封装了GUI组件上发生的特定事件，通常式一次操作
3. [监听器(Listener)]{.label .top} 
它也称为事件处理程序。监听器负责生成对事件的响应。从Java实现的角度来看，监听器也是一个对象。监听等待直到收到事件。收到事件后，监听器处理事件然后返回。
:::top
* 监听·
:::
```java

class MyListeren implements ActionListener{
    public void actionPerformed(ActionEvent e){
        System.out.println("你点击了一下按钮^-^");
    }
}

public class ListenerDemo {
    private static void CreateGUI(){
        JFrame jf = new JFrame("Layout");
        //设置布局为BorderLayout
        jf.setLayout(new FlowLayout());
        jf.setSize(300,300);
        //窗口的显示位置
        jf.setLocation(300,200);
        JButton but = new JButton("but");
        //添加按钮
        jf.add(but);
        //为按钮创建一个监听器
        but.addActionListener((ActionListener) new MyListeren());

        //显示窗口
        jf.setVisible(true);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(ListenerDemo::CreateGUI);
    }
```
:::top
* 监听设备
:::
```java
JFrame jf = new JFrame("demoListener");
//监听窗口
jf.addWindowListener(new WindowListener(){
	public void windowOpened(WindowEvent e){
		System.out.println("窗口打开");
	}
	public void windowIconified(WindowEvent e){
		System.out.println("窗口图标化");
	}
	public void windowDeiconified(WindowEvent e){
		System.out.println("窗口取消图标化");
	}
	public void windowDeactivated(WindowEvent e){
		System.out.println("窗口停用");
	}
	public void windowClosing(WindowEvent e){
		System.out.println("窗口正在关闭");
	}
	public void windowClosed(WindowEvent e){
		System.out.println("窗口关闭");
	}
	public void windowActivated(WindowEvent e){
		System.out.println("窗口激活");
	}
})
//监听窗口鼠标
JButton but = new JButton("but");
but.addMouseListener(new MouseListener(){
	public void mouseReleased(MouseEvent e){
		System.out.println("鼠标放开");
	}
	public void mousePressed(MouseEvent e){
		System.out.println("鼠标按下");
	}
	public void mouseExited(MouseEvent e){
		System.out.println("移出按钮区域");
	}
	public void mouseEntered(MouseEvent e){
		System.out.println("进入按钮区域");
	}
	public void mouseClicked(MouseEvent e){
		if(e.getButton()==MouseEvent.BUTTON1){
			System.out.println("鼠标左击");
		}
		if(e.getButton()==MouseEvent.BUTTON3){
			System.out.println("鼠标右击");
		}
		if(e.getButton()==MouseEvent.BUTTON2){
			System.out.println("鼠标中击");
		}
	}
})
//监听键盘
JTextField tf = new JTextField(30);
tf.addKeyListener(new KeyAdapter(){
	public void keyPressed(KeyEvent e){
		char keychar = e.getKeyChar();
		System.out.println("用户按下"+keychar);
	}
})
```
# 文本布局
```java
private static void CreateGUI(){
        //设置窗口
        JFrame  jf = new JFrame("聊天框");
        jf.setLayout(new BorderLayout());
        jf.setSize(400,300);
        jf.setLocation(300,200);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.setVisible(true);
        //创建组件
        //文本域
        JTextArea ta = new JTextArea(12,34);
        ta.setEditable(false);
        //给TextArea添加滚动条
        JScrollPane sp = new JScrollPane(ta);
        //文本输入框
        JTextField tf = new JTextField(20);
        JButton but = new JButton("发送");
        //监听
        but.addActionListener(e->{
            String content = tf.getText();
            if(content !=null && !content.trim().equals("")){
                ta.append("发送："+content+"\n");
            }else{
                ta.append("不能为空"+"\n");
            }
            tf.setText("");
        });
        //常见Panel
        JPanel jp = new JPanel();
        //标签
        JLabel jl = new JLabel("聊天信息");
        jp.add(jl);jp.add(tf);jp.add(but);
        //组装
        jf.add(sp,BorderLayout.NORTH);
        jf.add(jp,BorderLayout.SOUTH);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(JTextfieldDemo::CreateGUI);
    }
```
# 单选框
```java
private static void CreateGUI(){
        //创建窗口
        JFrame jf = new JFrame();
        jf.setLayout(new BorderLayout());
        jf.setSize(300,300);
        jf.setLocation(300,200);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.setVisible(true);
        //创建标签
        JLabel jl = new JLabel("Hello World",JLabel.CENTER);
        //Font.【plain|bold|italtc】直线，粗体，斜体
        jl.setFont(new Font("华文仿宋",Font.PLAIN,20));
        JPanel jp = new JPanel();
        //创建按钮组件
        ButtonGroup bg = new ButtonGroup();
        //创建两个单选件
        JRadioButton jrb1 = new JRadioButton("ITALTC");
        JRadioButton jrb2 = new JRadioButton("BOLD");
        //创建两个复选框
        JCheckBox jcb1 = new JCheckBox("斜体");
        JCheckBox jcb2 = new JCheckBox("粗体");
        bg.add(jrb1);bg.add(jrb2);
        //监听
        ActionListener listener = new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                int mode = 0;
                if(jrb2.isSelected()){
                    mode+=Font.BOLD;
                }
                if(jrb1.isSelected()){
                    mode+=Font.ITALIC;
                }
                jl.setFont(new Font("华文仿宋",mode,20));
            }
        };
        jrb1.addActionListener(listener);
        jrb2.addActionListener(listener);
        //组装
        jp.add(jrb1);jp.add(jrb2);
        jf.add(jp,BorderLayout.SOUTH);
        jf.add(jl);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(JRadionButtondemo::CreateGUI);
    }
```
# 下拉框
```java
 private static void CreateGUI(){
        //创建面板
        JFrame jf = new JFrame("Swing");
        jf.setLayout(new BorderLayout());
        jf.setSize(350,200);
        jf.setLocation(300,200);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.setVisible(true);
        //创建JPanel装JComboBox
        JPanel jp = new JPanel();
        JComboBox<String> jcb = new JComboBox<>();
        jcb.addItem("请选择人物");
        jcb.addItem("鸣人");
        jcb.addItem("小樱");
        jcb.addItem("佐助");
        //创建Label放图片
        ImageIcon icon1 = new ImageIcon("1.jpg");
        Image img1 = icon1.getImage();
        ImageIcon icon2 = new ImageIcon("2.jpg");
        Image img2 = icon2.getImage();
        ImageIcon icon3 = new ImageIcon("3.jpg");
        Image img3 = icon3.getImage();
        //设置图片大小
        img1 = img1.getScaledInstance(300,150,Image.SCALE_DEFAULT);
        JLabel jlb = new JLabel();
        //监听
       jcb.addActionListener(e ->{
           String choic = (String) jcb.getSelectedItem();
               if("鸣人".equals(choic)){
                   jlb.setIcon(icon1);
               }
               if("小樱".equals(choic)){
                   jlb.setIcon(icon2);
               }
               if("佐助".equals(choic)){
                   jlb.setIcon(icon3);
               }
       });
        jp.add(jcb);
        jf.add(jp,BorderLayout.NORTH);
        jf.add(jlb,BorderLayout.CENTER);

    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(ComboBoxDemo::CreateGUI);
    }
```
# 菜单栏
```java
private static void CreateGUI(){
        //创建界面
        JFrame jf = new JFrame();
        jf.setLayout(new BorderLayout());
        jf.setSize(300,250);
        jf.setLocation(300,200);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.setVisible(true);
        //创建菜单栏
        JMenuBar mb = new JMenuBar();
        //菜单组件
        JMenu menu1 = new JMenu("文件(F)");
        JMenu menu2 = new JMenu("帮助(H)");
        mb.add(menu1);mb.add(menu2);
        //菜单下拉项
        JMenuItem item1 = new JMenuItem("新建(N)");
        JMenuItem item2 = new JMenuItem("退出(X)");
        menu1.add(item1);
        menu1.addSeparator();//分割线
        menu1.add(item2);
        //监听
        item1.addActionListener(e->{
            //设置弹窗
            JDialog jd = new JDialog(jf,"新建",true);
            jd.setSize(200,100);
            jd.setLocation(300,200);
            jd.setDefaultCloseOperation(JDialog.HIDE_ON_CLOSE);
            jd.setVisible(true);
        });
        item2.addActionListener(e->System.exit(0));
        //组装
        jf.setJMenuBar(mb);
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(MenuDemo::CreateGUI);
    }
```
# 弹出式菜单
```java
 private static void CreateGUI(){
        //创建一个窗口
        JFrame jf = new JFrame();
        jf.setLayout(new BorderLayout());
        jf.setSize(300,250);
        jf.setLocation(300,200);
        jf.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        jf.setVisible(true);
        //创建弹出式菜单
        JPopupMenu jpm = new JPopupMenu();
        JMenuItem item1 = new JMenuItem("查看");
        JMenuItem item2 = new JMenuItem("刷新");
        jpm.add(item1);
        jpm.addSeparator();
        jpm.add(item2);
        //事件
        jf.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if(e.getButton() == MouseEvent.BUTTON3){
                    jpm.show(e.getComponent(),e.getX(),e.getY());
                }
            }
        });

    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(springMenudemo::CreateGUI);
    }
```