---
title: mock.js 和easy-mock使用
description: mock.js 和 easy-mock 使用记录。
isOriginal: false
author: Samsara315
articleLink: https://www.cnblogs.com/samsara-yx/p/10882703.html
date: 2026/04/22 09:52
isTop: false
categories:
  - 工具四海谈
tags:
  - JavaScript
  - mock.js
  - easy-mock
  - Ajax
---

# mock.js 和easy-mock使用

**mock.js**

1.项目中引入mock.js

```html
<script src="../static/js/mock.js" type="text/javascript"></script>
```

2.引入拦截Ajax的js，自己命名，我的是myMock.js

```javascript
Mock.mock("/getLoginUserId", "get", {
    "code": 0, "data": 1, "dataDesc": null, "msg": "操作成功"
});
```

3.进行Ajax调用

```javascript
this.$http.get('/getLoginUser')
                .then(function (res) {
                    console.log(res)
　　　　　　　　　　//{"code": 0, "data": 1, "dataDesc": null, "msg": "操作成功"} 
                }, function (err) { 
                    console.log(err); 
                });
```

注意：带有参数的get请求使用正则匹配url(例如url="/getUserDetail?userId=123")

　　url这样写RegExp("/getUserDetail" + ".*")

**easy-mock**

1.打开easy-mock官网，[https://www.easy-mock.com/](https://www.easy-mock.com/)，点击加号

![image](/img/2026/04/22/mock/20260422_201.png)

2.进入创建页面，创建项目

![image](/img/2026/04/22/mock/20260422_202.png)

3.创建后会跳到首页，点击刚才创建的项目，进入后创建接口

![image](/img/2026/04/22/mock/20260422_203.png)

4.填写这些内容后创建

![image](/img/2026/04/22/mock/20260422_204.png)

5.然后就可以访问该接口地址了

![image](/img/2026/04/22/mock/20260422_205.png)

## 总结

这篇内容分别给出了两种接口模拟方式：`mock.js` 适合直接在项目中拦截 Ajax 请求并返回本地模拟数据，`easy-mock` 适合通过可视化界面创建接口并生成可访问的模拟地址。实际使用时，可以根据项目阶段、联调需求和团队协作方式选择更合适的方案。
