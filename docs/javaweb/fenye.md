---
title: javaweb实现分页
date: 2022-05-29
categories:
 - 后端
tags:
 - JAVAWEB
sticky: 
   true
---
# 前端
:::tip
遍历从数据库提取的数据
:::
```html
<table id="tbl_boys">
      <tr>
        <th class="w20">编号</th>
        <th class="w20">姓名</th>
        <th class="w20">CP值</th>
        <th>操作</th>
      </tr>
      <tr th:if="${#lists.isEmpty(session.boysList)}">
        <td colspan="4">对不起，库存为空！</td>
      </tr>
      <!-- thymeleaf表达式 -->
      <tr th:unless="${#lists.isEmpty(session.boysList)}" th:each="boys : ${session.boysList}">
        <td th:text="${boys.id}">2</td>
        <td><a th:text="${boys.boyName}" th:href="@{/edit.do(id=${boys.id})}">俄洛依</a></td>
        <td th:text="${boys.userCP}">200</td>
        <td><img src="imgs/del.jpg" class="delImg" th:onclick="|delboy(${boys.id})|"/></td>
      </tr>
    </table>
```
:::tip
实现上一页和下一页按钮
:::
```html
  <div style="width: 60%; margin-left: 20%; padding-top: 4px" class="center">
      <!--disabled 实现按钮不可用 如果在第一页首页和上一页的按钮不可用-->
      <input type="button" value="首  页" class="btn" th:onclick="page(1)" th:disabled="${session.pageNo==1}">
      <input type="button" value="上一页" class="btn" th:onclick="|page(${session.pageNo-1})|" th:disabled="${session.pageNo==1}">
      <!--pageCount统计数据总页数 当数据是最后一页时下一页和尾页不可以用-->
      <input type="button" value="下一页" class="btn" th:onclick="|page(${session.pageNo+1})|" th:disabled="${session.pageNo==session.pageCount}">
      <input type="button" value="尾  页" class="btn" th:onclick="|page(${session.pageCount})|" th:disabled="${session.pageNo==session.pageCount}">
    </div>
```
```javascript
 function page(pageNo) {
   // 按钮跳转网页
    window.location.href="index?pageNo="+pageNo;
  }
```
# 后端
:::tip
使用JDBC获取数据
:::
```java
public List<boy> getboysList(Integer pageNum) {
     // 一页存放5个数据
     String sql = "select * from boys limit ? , 5";
        return super.executeQuery(sql,(pageNum-1)*5);
    }
    
    // 通用JDBC查询数据返回List集合
    //执行查询，返回List
    protected List<T> executeQuery(String sql , Object... params){
        List<T> list = new ArrayList<>();
        try {
            conn = getConn() ;
            psmt = conn.prepareStatement(sql);
            setParams(psmt,params);// 实现填充参数
            rs = psmt.executeQuery();

            //通过rs可以获取结果集的元数据
            //元数据：描述结果集数据的数据 , 简单讲，就是这个结果集有哪些列，什么类型等等

            ResultSetMetaData rsmd = rs.getMetaData();
            //获取结果集的列数
            int columnCount = rsmd.getColumnCount();
            //6.解析rs
            while(rs.next()){
                T entity = (T)entityClass.newInstance();

                for(int i = 0 ; i<columnCount;i++){
                    String columnName = rsmd.getColumnName(i+1);
                    Object columnValue = rs.getObject(i+1);
                    setValue(entity,columnName,columnValue);//封装对象赋值
                }
                list.add(entity);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            close(rs,psmt,conn);
        }
        return list ;
    }
```
:::tip
setValue
:::
```java
//通过反射技术给obj对象的property属性赋propertyValue值
    private void setValue(Object obj ,  String property , Object propertyValue){
        Class clazz = obj.getClass();
        try {
            //获取property这个字符串对应的属性名 ， 比如 "bid"  去找 obj对象中的 bid 属性
            Field field = clazz.getDeclaredField(property);
            if(field!=null){
                field.setAccessible(true);
                field.set(obj,propertyValue);
            }
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }
```
# Servlet处理页面请求
```java
 @Override
    public void doGet(HttpServletRequest request , HttpServletResponse response)throws IOException, ServletException {

        request.setCharacterEncoding("UTF-8");
        Integer pageNo = 1;
        HttpSession session = request.getSession();

        String pagenumStr = request.getParameter("pageNo");
        if(pagenumStr != null){
            pageNo = Integer.parseInt(pagenumStr);
        }
        //数据保存到Session域中
        session.setAttribute("pageNo",pageNo);

        BoysDAO boysDAO = new BoysDAOImpl();
        List<boy> boysList = boysDAO.getboysList(pageNo);
        //记录条数计算尾页
        //select COUNT(*) from boys;
        int count = boysDAO.getCount();
        int pageCount = (count+4)/5;

        //保存到session作用域
        session.setAttribute("boysList",fruitList);
        session.setAttribute("pageCount",pageCount);
        //此处的视图名称是 index
        //那么thymeleaf会将这个 逻辑视图名称 对应到 物理视图 名称上去
        //逻辑视图名称 ：   index
        //物理视图名称 ：   view-prefix + 逻辑视图名称 + view-suffix
        //所以真实的视图名称是：      /       index       .html
        super.processTemplate("index",request,response);
    }
```