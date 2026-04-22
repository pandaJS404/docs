---
title: nginx跨域
description: nginx 跨域报错 The 'Access-Control-Allow-Origin' header contains multiple values '*, *' 的问题现象、原因与解决方法。
author: PandaJS
date: 2026/04/22 09:22
categories:
  - BUG 踩坑集
tags:
  - nginx
  - CORS
  - 跨域
---

# nginx跨域（The 'Access-Control-Allow-Origin' header contains multiple values '_, _'）

## 问题现象

:::tip
Access to XMLHttpRequest at 'https://api.gstianfu.com/public/fund/announce_detail?aid=654247428725' from origin 'https://mobile.igesafe.com' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header contains multiple values '_, _', but only one is allowed.

:::

![image](/img/2026/04/22/20260422_001.png)

![image](/img/2026/04/22/20260422_002.png)

原因：加跨域时，直接在server块中添加，

![image](/img/2026/04/22/20260422_003.png)

解决方法：哪个URL需要跨域，就在那个域名下添加

![image](/img/2026/04/22/20260422_004.png)

## 总结

同一响应中出现多个 `Access-Control-Allow-Origin` 值时，浏览器会按照 CORS 规则直接拦截请求。排查这类问题时，需要先确认响应头是否被重复添加，再将跨域配置放到实际需要放行的 `location` 或具体接口路径下，避免在 `server` 块和子路径配置中重复设置同一个响应头。
