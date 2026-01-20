---
title: 引入iconfont SVG图标
description: 引入iconfont SVG图标，可以支持多色彩，可以自定义大小，可以随意旋转。
author: PandaJS
date: 2026/01/26 20:46
isTop: false
categories:
  - 工具四海谈
tags:
  - iconfont
  - SVG
---

# Vue3 + Vite + TS项目引入iconfont SVG图标

vue项目引入Iconfont(阿里巴巴图标库)-svg图标样式使用

![image-2026-01-20](/img/2026/01/20/1768893561592.png)  
![image-2026-01-20](/img/2026/01/20/1768893480349.png)

## unicode 格式

- 兼容性最好，支持 ie6+，及所有现代浏览器。
- 支持按字体的方式去动态调整图标大小，颜色等等。
- 缺点是不支持多色，可以自行设置颜色
- `<i class="iconfont">&#x33;</i>`

## font-class 方式

- 兼容性良好，支持 ie8+，及所有现代浏览器。
- 相比于 unicode 语意明确，书写更直观。
- 修改class方便，改class即可改变图标。
- 不支持多色图标，可以自己改变设置颜色。
- `<i class="iconfont icon-xxx"></i>`

## symbol 方式 SVG 格式

- 兼容性较差，支持 ie9+,及现代浏览器。
- 支持多色图标，但是<b>多色图标不能再改颜色</b>。
- 浏览器渲染svg性能一半，但是支持多色图标，自定义调整字体大小。

## 封装 iconfont SVG图标组件 vue版

```javascript
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  defineOptions({ name: 'IconfontIcon', inheritAttrs: false })

  const props = defineProps({
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#409EFF'
    }
  })
  // 图标在 iconfont 中的名字
  const iconClassName = computed(() => {
    return `#${props.icon}`
  })
  // 给图标添加上类名
  const svgClass = computed(() => {
    if (props.className) {
      return `svg-icon ${props.className}`
    }
    return 'svg-icon'
  })
</script>

<style scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    position: relative;
    fill: currentColor;
    vertical-align: -2px;
  }
</style>

```

::: tip 提示
全局注册组件即可使用。
:::

## 在iconfont官网选择图标加入项目

1、设置图标使用svg ，可以在下载里面找到 iconfont.js 的文件使用svg格式。
2、将下载的 iconfont.js 文件放到项目的 assets/iconfont/iconfont.js 文件夹下。
3、在项目的 main.js 文件中引入 iconfont.js 文件。

![image-2026-01-20](/img/2026/01/20/1768893792354.png)  
![image-2026-01-20](/img/2026/01/20/1768893814552.png)
![image-2026-01-20](/img/2026/01/20/1768893960288.png)  
:::tip 提示

也可以在更新的连接中直接复制代码到项目中使用。

```javascript
<link rel="stylesheet" href="//at.alicdn.com/t/font_1479482_y1y1479482.css">
```

:::

## 使用iconfont SVG图标组件

```javascript
<iconfont-icon
  icon="icon-map-service"
  color="rgb(160, 207, 255)"
  className="text-2xl"
></iconfont-icon>
```

## 图标改色问题

- 多色svg无法改色，如果要使用自定义颜色 需要在iconfont中将颜色去掉
- [issue](https://developer.aliyun.com/article/1607080)
- 选择图标去色即可自己改色
  ![image-2026-01-20](/img/2026/01/20/1768894335920.png)
