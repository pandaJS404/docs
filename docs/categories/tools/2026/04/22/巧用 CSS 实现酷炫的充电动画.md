---
title: 巧用 CSS 实现酷炫的充电动画
description: 循序渐进，看看只使用 CSS，可以鼓捣出什么样的充电动画效果。
isOriginal: false
author: Chokcoco
articleLink: https://juejin.cn/post/6844904029336649741
date: 2026/04/22 09:59
isTop: false
categories:
  - 工具四海谈
tags:
  - CSS
  - 动画
  - 滤镜
---

# 巧用 CSS 实现酷炫的充电动画

循序渐进，看看只使用 CSS ，可以鼓捣出什么样的充电动画效果。

## 画个电池

当然，电池充电，首先得用 CSS 画一个电池，这个不难，随便整一个：

![image](/img/2026/04/22/charging/20260422_301.png)

欧了，勉强就是它了。有了电池，那接下来直接充电吧。最最简单的动画，那应该是用色彩把整个电池灌满即可。

方法很多，代码也很简单，直接看效果：

![image](/img/2026/04/22/charging/20260422_302.png)

有内味了，如果要求不高，这个勉强也就能够交差了。通过蓝色渐变表示电量，通过色块的位移动画实现充电的动画。但是总感觉少了点什么。

### 增加阴影及颜色的变化

如果要继续优化的话，需要添加点细节。

我们知道，低电量时，电量通常表示为红色，高电量时表示为绿色。再给整个色块添加点阴影的变化，呼吸的感觉，让充电的效果看起来确实是在动。

![image](/img/2026/04/22/charging/20260422_303.png)

### 知识点

到这里，其实只有一个知识点：

- 使用 `filter: hue-rotate()` 对渐变色彩进行色彩过渡变换动画

我们无法对一个渐变色直接进行 `animation` ，这里通过滤镜对色相进行调整，从而实现了渐变色的变换动画。

上述例子完整的 Demo： [CodePen Demo -- Battery Animation One](https://codepen.io/Chokcoco/pen/bGNqyra?editors=1100)

## 添加波浪

ok，刚刚算一个小里程碑，接下来再进一步。电量的顶部为一条直线有点呆呆的感觉，这里我们进行改造一下，如果能将顶部直线，改为波浪滚动，效果会更为逼真一点。

改造之后的效果：

![image](/img/2026/04/22/charging/20260422_304.png)

使用 CSS 实现这种波浪滚动效果，其实只是用了一种障眼法，具体的可以我早期写的这篇文章：

[纯 CSS 实现波浪效果！](https://www.cnblogs.com/coco1s/p/7197662.html)

### 知识点

这里的一个知识点就是上述说的使用 CSS 实现简易的波浪效果，通过障眼法实现，看看图就明白了：

![image](/img/2026/04/22/charging/20260422_305.png)

上述例子完整的 Demo： [CodePen Demo -- Battery Animation Two](https://codepen.io/Chokcoco/pen/qBErGoO)

OK，到这，上述效果加上数字变化已经算是一个比较不错的效果了。当然上面的效果看上去还是很 CSS 的，就是一眼看到就觉得用 CSS 是可以做到的。

## 使用强大的 CSS 滤镜实现安卓充电动画效果

那下面这个呢？

![image](/img/2026/04/22/charging/20260422_306.png)

用安卓手机的同学肯定不陌生，这个是安卓手机在充电的时候的效果。看到这个我就很好奇，使用 CSS 能做到吗？

经过一番尝试，发现使用 CSS 也是可以很好的模拟这种动画效果：

![image](/img/2026/04/22/charging/20260422_307.png)

上述 Gif 录制的效果图是完全使用 CSS 模拟的效果。

上述例子完整的 Demo： [HuaWei Battery Charging Animation](https://codepen.io/Chokcoco/pen/vYExwvm)

### 知识点

拆解一下知识点，最主要的其实是用到了 `filter: contrast()` 以及 `filter: blur()` 这两个滤镜，可以很好的实现这种融合效果。

单独将两个滤镜拿出来，它们的作用分别是：

1. `filter: blur()`： 给图像设置高斯模糊效果。
2. `filter: contrast()`： 调整图像的对比度。

但是，当他们“合体”的时候，产生了奇妙的融合现象。

先来看一个简单的例子：

![image](/img/2026/04/22/charging/20260422_308.png)

仔细看两圆相交的过程，在边与边接触的时候，会产生一种边界融合的效果，通过对比度滤镜把高斯模糊的模糊边缘给干掉，利用高斯模糊实现融合效果。

当然，这种效果在之前的文章也多次提及过，更具体的，可以看看：

- [CSS 火焰？不在话下](https://github.com/chokcoco/iCSS/issues/62)
- [你所不知道的 CSS 滤镜技巧与细节](https://github.com/chokcoco/iCSS/issues/30)

### 颜色的变换

当然，这里也是可以加上颜色的变换，效果也很不错：

![image](/img/2026/04/22/charging/20260422_309.png)

上述例子完整的 Demo： [HuaWei Battery Charging Animation](https://codepen.io/Chokcoco/pen/vYExwvm)

### 容易忽视的点

通过调节 `filter: blur()` 及 `filter: contrast()` 属性的值，动画效果其实会有很大程度的变化，好的效果需要不断的调试。当然，经验在其中也是发挥了很重要的作用，说到底还是要多尝试。

## 总结

这篇内容按效果递进的方式展示了几种充电动画实现思路：先从基础电池与渐变充电效果入手，再通过 `hue-rotate()` 完成颜色过渡，通过波浪障眼法增强液面动态表现，最后结合 `blur()` 与 `contrast()` 两个滤镜实现更接近安卓充电动画的融合效果。整体重点落在 CSS 滤镜、渐变动画和视觉细节调节几个方面。
