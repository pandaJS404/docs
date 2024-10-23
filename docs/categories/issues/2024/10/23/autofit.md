---
title: autofit.js缩放问题
description: 解决autofit.js缩放问题
author: PandaJS
date: 2024/10/23 19:25
categories:
  - 随笔记录
tags:
  - JavaScript
  - autofit
---

# 前端可视化大屏自适应终极解决方案 autofit.js 及 踩坑记录

## 解决组件库中下拉框和其他元素位置偏移的问题

- 问题描述：在项目中使用 autofit 适配页面时，下拉框和其他元素的位置会出现偏移，导致页面布局混乱。

![image](/img/2024/10/23/C47648AF-F232-4981-B1B6-F2A94FD77A1F.png)

- 期望页面同正常页面一样一致，下拉框的位置出现在输入框的下方
  ![image](/img/2024/10/23/8665E661-E1C4-4ecd-9077-A197CD629F53.png)

  ### 1.初步解决偏移问题

  1、autofit 在默认挂载节点为 body，即所有节点都进行缩放，导致下拉框位置偏移。

  2、将 autofit.js 的挂载节点设置为页面的根元素，即 body，这样下拉框的位置就不会偏移了。

  3、使用 vue3 + native UI 演示

```JavaScript
import autofit from 'autofit.js'

autofit.init({
  // dh: 929,
  dh: 1080, // 设计稿的高度，默认值 1080 设置929 即是减去浏览器地址栏的高度
  dw: 1920, // 设计稿的宽度，默认是 1920
  el: '#app', // 渲染的dom，默认是 "body"，必须使用id选择器 #app
  resize: true, // 是否监听resize事件，默认是 true
})
```

### 2、modal/dialog 组件的偏移问题

1、发现在 modal 中组件依然会发生偏移的问题。
2、尝试将 modal 移入#app 元素中偏移依旧存在。（modal 默认存在 body 中）
3、阅读文档发现，还可以设置 ignore 来忽略缩放的元素。
4、找到下拉框弹出部分的类名 进行排除，问题解决

```JavaScript
import autofit from 'autofit.js'

autofit.init({
  dh: 929,
  dw: 1920,
  el: 'body',
  resize: true,
  ignore: ['.v-binder-follower-container']
})
```

## 大屏适配/页面自适应

1. 一般使用 postcss + rem 方案来进行适配，切换不同分辨率的屏幕，页面的元素大小会自动调整，达到自适应的效果。

2. vw/vh 方案，通过设置元素的 width/height 为 100vw/100vh，然后设置根元素 font-size 为 1vw/vh，这样元素的大小会根据屏幕大小自适应。

3. 新特性 scale 方案，通过设置元素的 transform: scale(0.5) 缩放 50%，然后设置根元素 font-size 为 16px，这样元素的大小会根据屏幕大小自适应。

4. autofit.js 方案，通过设置元素的 width/height 为 auto，然后设置根元素 font-size 为 16px，这样元素的大小会根据屏幕大小自适应。

## autofit.js 介绍

- [autofit.js](https://www.npmjs.com/package/autofit.js/v/3.0.6) 是一款轻量级的 JavaScript 库，可以自动调整元素的大小，使其适应不同分辨率的屏幕。
- autofit.js 是一个可以让你的 PC 项目自适应屏幕的工具，其原理非常简单，即在 scale 等比缩放的基础上，向右或向下增加了宽度或高度，以达到充满全屏的效果，使用 autofit.js 不会挤压、拉伸元素，它只是单纯的设置了容器的宽高。

## 使用方法

### 1. 引入文件

```html
<script src="https://cdn.jsdelivr.net/npm/autofit.js@latest/dist/autofit.min.js"></script>
```

```JavaScript
import autofit from 'autofit.js'

autofit.init({
  // dh: 929,
  dh: 1080, // 设计稿的高度，默认值 1080 设置929 即是减去浏览器地址栏的高度
  dw: 1920, // 设计稿的宽度，默认是 1920
  el: 'body', // 渲染的dom，默认是 "body"，必须使用id选择器 #app
  resize: true, // 是否监听resize事件，默认是 true
  transition: 0, // 过渡时间，默认是 0
  delay: 0 , // 延迟时间，默认是 0,
  ignore: [], // 忽略缩放的元素（该元素将反向缩放）
})
```

## tip

1、找到下拉框类型的方法

按图示选中 模拟已聚焦的网页 即可查看
![image](/img/2024/10/23/4BD74A8D-F691-422c-890E-07EA089E173B.png)
