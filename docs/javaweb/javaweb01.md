---
title: JAVAWeb预备知识
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVAWEB
---
# javaScript
* javaScript是一门弱语言，变量类型由赋的值决定
```javascript
//定义变量
var str = "hello world"

alert(typeof str)
//定义类
  var person = new Object();
        person.pid = "001";
        person.name = "jmz"
        obj.function(){
        	alert("id: "+this.pid+" name: "+this.name)
        }
        alert(person.pid)
//定义函数
function shout(name){
	alert(name +"say ")
	return name;
}
//函数调用
var val = function(num1,num2){
	return num1 + num2
}
```
## js的事件
**常用的事件**：
`onload`加载完成事件：
`onclick`单击事件：
`onblur`失去焦点事件：
`onchange`内容发生改变事件：
`onsubmit`表单提交事件：
:::info
onload
:::
```javascript
 //静态注册 在boby标签中调用函数
        function loadfun() {
            alert('欢迎')
        }
        //动态注册
        window.onload = function() {
            alert('动态注册')
        }
```
:::info
onClick
:::
```javascript
  //静态注册
        function onclickfun() {
            alert('欢迎')
        }
        //动态注册
        window.onload = function() {
            /* 获取标签对象*/
            var butobject = document.getElementById("btu2");
            /* 通过对象操作*/
            butobject.onclick = function() {
                alert("dontt");
            }

        }
```
:::info
onblur
:::
```javascript
 //静态
        function blurfunc() {
            console.log("静态失去焦点")
        }
        //动态
        window.onload = function() {
            var putobject = document.getElementById("inp2");
            putobject.onblur = function() {
                console.log("动态失去焦点");
            }
        }
```
:::info
onchange
:::
```javascript
  //静态
        function changefun() {
            alert("静态内容改变")
        }
        //动态
        window.onload = function() {
            //获取对象
            var changeobj = document.getElementById("che2");
            //动态方法
            changeobj.onchange = function() {
                alert("动态内容改变")
            }
        }
```
## DOM模型
```javascript
<script>
        window.onload = function() {
            // childNodes
            // 属性， 获取当前节点的所有子节点
            var ulobj = document.getElementById("u1");
            // alert(ulobj);
            alert(ulobj.childNodes); //[object NodeList]
            // firstChild
            // 属性， 获取当前节点的第一个子节点
            alert(ulobj.firstChild.innerText); //[object Text]
            // lastChild
            // 属性， 获取当前节点的最后一个子节点
            alert(ulobj.lastChild.innerHTML); //[object Text]
            // parentNode
            // 属性， 获取当前节点的父节点
            alert(ulobj.parentNode.innerText); //[object HTMLBodyElement]
            // nextSibling
            // 属性， 获取当前节点的下一个节点
            alert(ulobj.nextSibling.innerHTML); //[object Text]
            // className
            // 用于获取或设置标签的class属性值
            alert(ulobj.className.innerHTML);
            // innerHTML
            // 属性， 表示获取 / 设置起始标签和结束标签中的内容
            var divobj = document.getElementById("d1");
            alert(divobj.innerHTML);
            alert(ulobj.innerText);
            // innerText
            // 属性， 表示获取 / 设置起始标签和结束标签中的文本
            alert(divobj.innerHTML);
            alert(ulobj.innerText);

            //添加标签
            var newdiv = document.createElement("div");
            newdiv.innerHTML = "panther";
            document.boby.appendChild(newdiv);
        }
    </script>
</head>

<body>
    <div id="d1">panther</div>
    <ul id="u1">
        <li id="l1">1</li>
        <li id="l2">2</li>
        <li id="l3">3</li>
        <li id="l4">4</li>
        <li id="l5">5</li>
        <li di="l6">6</li>
    </ul>
</body>
```
# jQuery介绍
:::info
1. 什么是jQuery?
:::
jQuery,顾名思义，也就是`JavaScript`和查询`Query`,它就是辅助javaScript开发的js类库。
:::info
2. jQuery核心思想！！！
:::
它的核心思想是`write 1ess,do more`(写得更少，做得更多)，所以它实现了很多浏览器的兼容问题。
:::info
3. jQuery流行程度
:::
jQuery现在已经成为最流行的JavaScript库，在世界前10000个访问最多的网站中，有超过55%在使用
jQuery.
```javascript
 <script type="text/javascript">
        //使用$()代替window.onload
        $(function() {
            //使用选择器获取按钮对象，随后绑定单击响应函数
            $("#btnId").click(function() {
                //弹出Hello
                alert('Hello');
            });
        });
    </script>

     <button id="btnId">SayHello</button>
```
## $的本质
```javascript
ƒ ( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	}
```
**核心函数的4个作用**
1. 传入参数为[函数]时：在文档加载完成后执行这个函数
2. 传入参数为[HTML字符串]时：根据这个字符串创建元素节点对象
```javascript
$("<div>"+
	"<span>span1</span>"+"</div>").appendTo("boby");
````
3. 传入参数为[选择器字符串]时：根据这个字符串查找元素节点对象
```javascript
$("#id属性值")     id选择器，根据id查询标签对象
$("标签名")        标签名选择器，根据指定的标签名查询标签对象
$(".class属性值")  类型选择器，可以根据class属性查询标签对象

 $(function() {
            $("#btu1").click(function() {
                alert("panther1");
            });
            $(".but2").click(function() {
                alert("panther2");
            });
            $("button").click(function() {
                alert("panther3");
            });
        });

    <button id="btu1">hello</button>
    <button class="but2">hello</button>
    <button id="btu3">hello</button>
````
4. 传入参数为[DOM对象]时：将DOM对象包装为jQuery对象返回
## 选择器
:::info
基本选择器
:::
```javascript
  //1.选择 id 为 one 的元素 "background-color","#bbffaa"
            $("#btn1").click(function() {
                $("#one").css("background-color", "#bfa");
            });

            //2.选择 class 为 mini 的所有元素
            $("#btn2").click(function() {
                $(".mini").css("background-color", "#bfa");
            })

            //3.选择 元素名是 div 的所有元素 
            $("#btn3").click(function() {
                $("div").css("background-color", "#bfa");
            });

            //4.选择所有的元素 
            $("#btn4").click(function() {
                $("*").css("background-color", "#bfa");
            });
            //5.选择所有的 span 元素和id为two的元素
            $("#btn5").click(function() {
                $("span,#two").css("background-color", "#bfa");
            });
```
:::warning
层级选择器
:::
```javascript
 $(function() {
            //1.选择 body 内的所有 div 元素 
            $("#btn1").click(function() {
                $("body > div").css("background", "#bbffaa");
            });

            //2.在 body 内, 选择div子元素  
            $("#btn2").click(function() {
                $("body > div").css("background", "#bbffaa");
            });

            //3.选择 id 为 one 的下一个 div 元素 
            $("#btn3").click(function() {
                $("#one+div").css("background", "#bbffaa");
            });

            //4.选择 id 为 two 的元素后面的所有 div 兄弟元素
            $("#btn4").click(function() {
                $("#two ~ div").css("background", "#bbffaa");
            });

        });
```
## 基本过滤器
```javascript
   $(function() {
            function anmateIt() {
                $("#mover").slideToggle("slow", anmateIt);
            }
            anmateIt();

            //1.选择第一个 div 元素  
            $("#btn1").click(function() {
                $("div:first").css("background", "#bbffaa");
            });
            //2.选择最后一个 div 元素
            $("#btn2").click(function() {
                $("div:last").css("background", "#bbffaa");
            });
            //3.选择id不为 one 的所有 div 元素
            $("#btn3").click(function() {
                $("div:not('#one')").css("background", "#bbffaa");
            });
            //4.选择索引值为偶数的 div 元素
            //even默认零开始
            $("#btn4").click(function() {
                $("div:even").css("background", "#bbffaa");
            });
            //5.选择索引值为奇数的 div 元素
            $("#btn5").click(function() {
                $("div:odd").css("background", "#bbffaa");
            });
            //6.选择索引值为大于 3 的 div 元素
            $("#btn6").click(function() {
                $("div:gt(3)").css("background", "#bbffaa");
            });
            //7.选择索引值为等于 3 的 div 元素
            $("#btn7").click(function() {
                $("div:eq(3)").css("background", "#bbffaa");
            });
            //8.选择索引值为小于 3 的 div 元素
            $("#btn8").click(function() {
                $("div:lt(3)").css("background", "#bbffaa");
            });
            //9.选择所有的标题元素
            $("#btn9").click(function() {
                $(":header").css("background", "#bbffaa");
            });
            //10.选择当前正在执行动画的所有元素
            $("#btn10").click(function() {
                $("div:animated").css("background", "#bbffaa");
            });
            //10.选择没有执行动画的最后一个元素
            $("#btn11").click(function() {
                $("div:not(:animated):last").css("background", "#bbffaa");
            });
        });

```
## 内容过滤器
```javascript
 $(document).ready(function() {
            //1.选择 含有文本 'di' 的 div 元素
            $("#btn1").click(function() {
                $("div:contains('di')").css("background", "#bbffaa");
            });

            //2.选择不包含子元素(或者文本元素) 的 div 空元素
            $("#btn2").click(function() {
                $("div:empty").css("background", "#bbffaa");
            });

            //3.选择含有 class 为 mini 元素的 div 元素
            $("#btn3").click(function() {
                $("div:has('.mini') > div").css("background", "#bbffaa");
            });

            //4.选择含有子元素(或者文本元素)的div元素
            $("#btn4").click(function() {
                $("div:parent").css("background", "#bbffaa");
            });
        });
```
## 可见型属性过滤
```javascript
 $(function(){
            //1.选取所有可见的  div 元素
            $("#btn1").click(function() {
                $("div:visible").css("background", "#bbffaa");
            });

            //2.选择所有不可见的 div 元素
            //不可见：display属性设置为none，或visible设置为hidden
            $("#btn2").click(function() {
                $("dic:hidden").show("slow").css("background", "#bbffaa");
            });

            //3.选择所有不可见的 input 元素
            $("#btn3").click(function() {
                alert($("input:hidden").attr("value"));
            });
        });
```
## 属性选择器过滤
```javascript
     $(function() {
            //1.选取含有 属性title 的div元素
            $("#btn1").click(function() {
                $("div[title]").css("background", "#bbffaa");
            });
            //2.选取 属性title值等于'test'的div元素
            $("#btn2").click(function() {
                $("div[title=test]").css("background", "#bbffaa");
            });
            //3.选取 属性title值不等于'test'的div元素(*没有属性title的也将被选中)
            $("#btn3").click(function() {
                $("div[title!=test]").css("background", "#bbffaa");
            });
            //4.选取 属性title值 以'te'开始 的div元素
            $("#btn4").click(function() {
                $("div[title^='te']").css("background", "#bbffaa");
            });
            //5.选取 属性title值 以'est'结束 的div元素
            $("#btn5").click(function() {
                $("div[title$='est']").css("background", "#bbffaa");
            });
            //6.选取 属性title值 含有'es'的div元素
            $("#btn6").click(function() {
                $("div[title*='es']").css("background", "#bbffaa");
            });

            //7.首先选取有属性id的div元素，然后在结果中 选取属性title值 含有'es'的 div 元素
            $("#btn7").click(function() {
                $("div[id][title*='es']").css("background", "#bbffaa");
            });
        });
```
## 表单过滤器
```javascript
       //1.对表单内 可用input 赋值操作
            $("#btn1").click(function() {
                $("input:enabled").val("New Value");
            });
            //2.对表单内 不可用input 赋值操作
            $("#btn2").click(function() {
                $("input:disabled").val("New Value Too");
            });
            //3.获取多选框选中的个数  使用size()方法获取选取到的元素集合的元素个数
            $("#btn3").click(function() {
                alert($("input:checkbox:checked").size())
            });
            //4.获取多选框，每个选中的value值
            $("#btn4").click(function() {
                var str = "";
                var eles = $("input:checkbox:checked");
                console.log(eles);
                for (var i = 0; i < eles.size(); i++) {
                    str += "【" + $(eles[i]).val() + "】";
                }
                alert(str)
            });
            //5.获取下拉框选中的内容  
            $("#btn5").click(function() {
                var str = "";
                //注意这个选择器的特殊，因为select里面的option是真正的被选择项，
                //所以 :selected 选择器和 select[name='test']选择器的关系是子父关系
                //必须按照基本选择器选择后代的方法选
                var els = $("select option:selected");
                console.log(els);
                for (var i = 0; i < els.size(); i++) {
                    str += "【" + $(els[i]).val() + "】";
                }
                alert(str)
            });
        })
```
## html()|text()|val()方法
```javascript
 $(function() {
            //不传参数是获取 传参是赋值
             alert($("div").html());
            $("div").html("<p>锻炼</p>");

            //不传参数是获取 传参是赋值
            alert($("div").text());
            $("div").html("<p>段落</p>");

			 //不传参数是获取 传参是赋值
            $("#btn1").click(function() {
                // alert($("#i1").val());
                $("#i1").val("panther")
            });

        });

```
## 文档处理
```javascript
        // appendTo(content) 	   a.appendTo(b);  把a加到b里面		添加到最后面
        // prependTo(content)	   a.prependTo(b); 把a添加到b里面   添加到最前面
        // 删除
        // empty() 				a.empty()   把a掏空，把a里面的所有元素都删除
        // remove([expr]) 			a.remove(b)  所有的a，是b的话就会删除	a.remove()删除a	

         $(function() {

            $("#btn01").click(function() {
                //创建一个"广州"节点,添加到#city下[appendTo()]
                $("<li>广州</li>").appendTo("#city");
            });
            $("#btn02").click(function() {
                //创建一个"广州"节点,添加到#city下[prependTo()]
                $("<li>广州</li>").prependTo("#city");
            });

            $("#btn03").click(function() {
                //将"广州"节点插入到#bj前面[insertBefore()]
                //前边.insertBefore(后边的)
                $("<li>广州</li>").insertBefore("#bj");
            });

        // insertAfter(content) 	a.insertAfter(b);  把a插入到b的后面
        // insertBefore(content) 	a.insertBefore(b); 把a插入到b的前面

            $("#btn04").click(function() {
                //将"广州"节点插入到#bj后面[insertAfter()]
                //后边.insertAfter(前边的)
                $("<li>广州</li>").insertAfter("#bj");
            });
        // replaceWith(content|fn) a.replaceWith(b)  把a用b替换
        // replaceAll(selector) 	a.replaceAll(b)	  用a替换所有的b
            $("#btn05").click(function() {
                //使用"广州"节点替换#bj节点[replaceWith()]
                //被替换的.replaceWith()
                $("<li>广州</li>").replaceWith("#bj")

            });
            $("#btn06").click(function() {
                //使用"广州"节点替换#bj节点[replaceAll()]
                //新的节点.replaceAll(旧的节点)
                $("<li>广州</li>").replaceAll("#bj")
            });

        // empty() 				a.empty()   把a掏空，把a里面的所有元素都删除
        // remove([expr]) 		a.remove(b)  所有的a是b的话就会删除a.remove()删除a	
            $("#btn07").click(function() {
                //删除#rl节点[remove()]
                $("#rl").remove();
            });

            $("#btn08").click(function() {
                //掏空#city节点[empty()]
                $("#city").empty();
            });

            $("#btn09").click(function() {
                //读取#city内的HTML代码
                alert($("#city").html());
            });

            $("#btn10").click(function() {
                //设置#bj内的HTML代码
                $("#bj").html("123");
            });	
```
## css样式操作
```javascript
   var $divEle = $('div:first');

            $('#btn01').click(function() {
                //addClass() - 向被选元素添加一个或多个类
                $divEle.addClass("redDiv");
                $divEle.addClass("blueBorder");
                $divEle.addClass("whiteborder");
                $("input:first").addClass("ll")
            });

            $('#btn02').click(function() {
                //removeClass() - 从被选元素删除一个或多个类 
                $divEle.removeClass("blueBorder");
            });


            $('#btn03').click(function() {
                //toggleClass() - 对被选元素进行添加/删除类的切换操作 
                $divEle.toggleClass("redDiv");
            });


            $('#btn04').click(function() {
                //offset() - 返回第一个匹配元素相对于文档的位置。
                console.log($divEle.offset());
            });

```
## 动画
```javascript
 //显示   show()
            $("#btn1").click(function() {
                $("#div1").show();
            });
            //隐藏  hide()
            $("#btn2").click(function() {
                $("#div1").hide();
            });
            //切换   toggle()
            $("#btn3").click(function() {
                $("#div1").toggle();
            });

            //淡入   fadeIn()
            $("#btn4").click(function() {
                $("#div1").fadeIn(1000);
            });
            //淡出  fadeOut()
            $("#btn5").click(function() {
                $("#div1").fadeOut(2000);
            });

            //淡化到  fadeTo()
            $("#btn6").click(function() {
                $("#div1").fadeTo(1500, 0.5);
            });
            //淡化切换  fadeToggle()
            $("#btn7").click(function() {
                $("#div1").fadeToggle(1000);
            });
        })
```
## 常用事件
```javascript
  $(function() {
                $("h5").click(function() {
                    $("h5").css("background-color", "#fba")

                });
                //鼠标移入
                $("h5").mouseover(function() {
                    $("h5").css("background-color", "#fac");
                });
                //鼠标移出
                $("h5").mouseout(function() {
                    $("h5").css("background-color", "#96E555");
                });
                //绑定多个事件
 				$("#areaDiv").bind("mouseover mouseout", function(even) {

                if (even.type == "mouseover") {
                    $("#areaDiv").css("background-color", "skyblue")
                } else if (even.type == "mouseout") {
                    $("#areaDiv").css("background-color", "#fca")
                }

            })
```