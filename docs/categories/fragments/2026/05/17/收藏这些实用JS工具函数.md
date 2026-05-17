---
title: 收藏这些实用JS工具函数
description: 6个超实用的JavaScript工具函数，涵盖UUID生成、同步等待、对象翻转、数字补零、剪贴板复制、Fisher-Yates洗牌算法
author: PandaJS
date: 2026/05/17
isTop: false
categories:
  - 随笔记录
tags:
  - JavaScript
  - 工具函数
  - 实用技巧
---

# 收藏这些实用JS工具函数

写前端久了，总会积累一些顺手的小工具函数。它们不复杂，但每次用到的时候如果现写或者现搜，多少有点浪费时间。这里整理了 6 个我日常用得最多的 JS 工具函数，直接收藏，用到的时候复制粘贴就行。

## UUID 生成

```js
const getUUID = () => crypto.randomUUID();
console.log(getUUID())
// 输出例子： df91af4f-0115-44ad-88b2-1279db811e62
```

这可不是随便拼几个随机数糊弄人���。`crypto.randomUUID()` 底层调用的是浏览器内置的加密模块，生成的 UUID 符合 RFC 4122 标准，安全性有保障。理论上来说，在我们有生之年都不会重复，放心用。

不过有个坑得提前说：`crypto` 不是 ES 标准接口，它是 Web API。这意味着如果你在写通用库，或者要兼容微信小程序这类非标准浏览器环境，`crypto` 可能直接报错。这种场景下还是老老实实用 `uuid` 这个 npm 包，虽然多一个依赖，但胜在哪儿都能跑。

## 同步等待函数 wait

```js
const wait = (ms = 0) => new Promise(res => setTimeout(res, ms));

// 使用例子
await wait(1000)
console.log('1秒后')
```

JS 的异步写起来烦，调试起来更烦。回调地狱就不说了，就算用 async/await，有时候逻辑一复杂还是绕得头晕。

这个 `wait` 函数是我从 Gemini 那儿学来的，写法极其优雅。把 `setTimeout` 包成 Promise，配合 `await` 使用，代码读起来就跟同步一样，线性往下走，不用跳来跳去。突然觉得 JS 也没那么烧脑了。

## 对象键值翻转 flipObject

```js
const flipObject = (obj = {}) => Object.fromEntries(Object.entries(obj).map(([a, b]) => [b, a]));

// 使用案例
const cityCode = { 北京: '010', 上海: '021' }
flipObject(cityCode)['021'] // 反向查询
```

这个函数在做枚举类反向查询的时候特别实用。比如你有一个区号到城市的映射，想通过区号反查城市名，一行代码搞定。

性能方面，`Object.entries` 加 `map` 再 `fromEntries`，确实比手写 for 循环慢那么一丢丢。但说实话，除非你的对象有几十万个键，否则这点差异根本感知不到。简单就是王道。

## 数字前置补零 fillZero

```js
const fillZero = (n = 0, fixLen = 2) => n.toString().padStart(fixLen, '0');
// 案例
const hour = 8;
const minute = 5;
console.log(fillZero(hour) + ':' + fillZero(minute)); // 08:05
```

使用频率极高的一个函数。时间格式化、订单号生成、文件名排序、工号显示、目录命名……几乎所有需要固定位数的场景都能用上。

`padStart` 是 ES2017 引入的，现在浏览器兼容性已经很好了，放心用。这个建议直接收藏，属于那种"平时想不起来，用的时候到处找"的类型。

## 一键复制到剪贴板

```js
const copyToClipboard = async (content = '') => {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch {
    return false;
  }
};

// 使用案例
copyToClipboard('这是要复制的内容')
  .then(success => {
    if (success) console.log('复制成功');
    else console.log('复制失败，浏览器未授权或环境不支持');
  });
```

以前做复制功能还得搞个隐藏的 `textarea`，选中再 `execCommand('copy')`，又丑又麻烦。现在 `navigator.clipboard.writeText()` 一行搞定，干净利落。

注意两点：一是必须在 HTTPS 或 localhost 下才能用，HTTP 页面会直接拒绝；二是需要用户交互触发，不能在页面加载时偷偷复制。返回 `true/false` 的设计让调用方可以优雅地处理失败情况，比直接抛异常友好多了。

## Fisher-Yates 洗牌算法

```js
const randomSortList = (sourceList) => {
  const tempArr = [...sourceList];
  for (let i = tempArr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [tempArr[i], tempArr[randomIndex]] = [tempArr[randomIndex], tempArr[i]];
  }
  return tempArr;
};

// 使用案例
const data = [1, 2, 3, 4, 5];
console.log(randomSortList(data));  // 打乱了

// 分布不均匀，不是真随机
const shuffleArray = (arr) => arr.sort(() => 0.5 - Math.random());
```
