---
title: echarts折线图超限变色
description: echarts折线图超限变色 折线图超过上限下限变色 正常值正常颜色，需要一条线段根据某个条件用两种或以上颜色显示，分段显示不同的颜色
author: PandaJS
date: 2026/06/15 20:18
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - echarts
---

# echarts 折线图超限变色，分段显示不同的颜色

实现效果：
![image-2025-06-20](/img/2025/06/20/1750391291950.png)

## 解决方案

echarts 4.0 版本中，新增了 visualMap 组件，可以实现对数据的分段显示，并可以设置颜色。

```javascript
var upLimit = 600; // 上限
var lowlimit = 180; // 下限

// 定义线的颜色
let lineColor = ["#388e3c", "#00e676"];
// 生成 visualMap
let visualMap = [];
lineColor.map((item, index) => {
  visualMap.push({
    type: "piecewise",
    show: false,
    dimension: 1,
    // seriesIndex: [0, 1], // 虽然可以指定多个series，但是线的颜色只能设置一条
    seriesIndex: index,
    pieces: [
      {
        // 不指定 max，表示 max 为无限大（Infinity）。
        min: upLimit, // 没有设置最大值，表明当前范围 [min, Infinity] 变色
        color: "#d32f2f",
      },
      {
        // 不指定 min，表示 min 为无限大（-Infinity）。
        max: lowlimit, // 300 没有设置最小值，表明当前范围 [-Infinity, max] 变色
        color: "#d32f2f",
      },
    ],
    outOfRange: {
      // 在选中范围外 的视觉元素，这里设置在正常范围内的图形颜色
      color: lineColor[index],
    },
  });
});
```

## 完整代码 可直接在 echarts 运行

::: warning 提示
option -> tooltip -> hideDelay 时长为方便调试 tooltip 自定义时长，需要去除
:::

```javascript
var upLimit = 600; // 上限
var lowlimit = 180; // 下限

// 定义线的颜色
let lineColor = ["#388e3c", "#00e676"];
// 生成 visualMap
let visualMap = [];
lineColor.map((item, index) => {
  visualMap.push({
    type: "piecewise",
    show: false,
    dimension: 1,
    // seriesIndex: [0, 1], // 虽然可以指定多个series，但是线的颜色只能设置一条
    seriesIndex: index,
    pieces: [
      {
        // 不指定 max，表示 max 为无限大（Infinity）。
        min: upLimit, // 没有设置最大值，表明当前范围 [min, Infinity] 变色
        color: "#d32f2f",
      },
      {
        // 不指定 min，表示 min 为无限大（-Infinity）。
        max: lowlimit, // 300 没有设置最小值，表明当前范围 [-Infinity, max] 变色
        color: "#d32f2f",
      },
    ],
    outOfRange: {
      // 在选中范围外 的视觉元素，这里设置在正常范围内的图形颜色
      color: lineColor[index],
    },
  });
});

option = {
  tooltip: {
    trigger: "axis",
    confine: true,
    boundaryGap: false,
    appendToBody: true,
    hideDelay: 60 * 1000, // 方便调试tooltip设置长时间，正常会去除
    formatter: (params) => {
      let reText = "";
      params.forEach((item) => {
        const { color, value, seriesName, name } = item;
        const re = `
        <p>${name}</p>
        <div style="color: #d32f2f; display: flex;
        gap: 10px;
        justify-content: space-between;">
        <p style="
            width: 0;
            height: 0;
            border: 8px solid;
            border-color: transparent transparent #f40 transparent;
           margin-botton: 6px;
            
        ">
            </p>
        <span>上限值： 600</span>
        </div>
        <div style="display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;">
        <p style="background-color:${color};
              width: 12px;
              height: 12px;
              display: inline-block;
              margin-left: 2px;
              border-radius: 50%;">
            </p>
            <p>
            ${seriesName}：
            <span style="
              color: #d32f2f;
            ">${value}</span>
            </p>
             
        </div>
            
          
            <div style="color: #d32f2f; display: flex;
        gap: 10px;
        justify-content: space-between;">
        <p style="
            width: 0;
            height: 0;
            border: 8px solid;
            border-color:  #f40 transparent transparent transparent;
            margin-top: 6px;
        ">
            </p>
        <span>下限值： 180</span>
        </div>
          `;
        if (value !== "") {
          reText += re;
        }
      });
      return reText;
    },
  },
  legend: {
    // top: '3%'
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "sub", "sun"],
    // boundaryGap: false
  },
  yAxis: {
    type: "value",
  },
  visualMap: visualMap,
  color: lineColor,
  series: [
    {
      name: "数据",
      type: "line",
      label: {
        show: true,
      },
      markPoint: {
        itemStyle: {
          color: "#d32f2f",
        },
        data: [
          { name: "预警", value: 690, xAxis: 2, yAxis: 690 },
          { name: "预警", value: 100, xAxis: 6, yAxis: 100 },
        ],
      },
      markLine: {
        symbol: "none",
        lineStyle: {
          color: "#d32f2f",
        },
        data: [
          {
            yAxis: upLimit,
            name: "上限", // 这里是标签上显示的文字内容
            label: {
              // 配置标签样式
              show: true, // 显示标签
              position: "insideEndTop", // 标签位置，可选值有：'start', 'end', 'middle', 'inside', 'insideStart', 'insideEnd', 'outside'
              formatter: "{b}", // 格式化标签内容，这里使用默认的名称（即name属性的值）
              distance: 10, // 距离线的距离
              textStyle: {
                color: "#d32f2f", // 文本颜色
                fontSize: 12, // 文本大小
              },
            },
          },
          {
            yAxis: lowlimit,
            name: "下限", // 这里是标签上显示的文字内容
            label: {
              // 配置标签样式
              show: true, // 显示标签
              position: "insideEndTop", // 标签位置，可选值有：'start', 'end', 'middle', 'inside', 'insideStart', 'insideEnd', 'outside'
              formatter: "{b}", // 格式化标签内容，这里使用默认的名称（即name属性的值）
              distance: 10, // 距离线的距离
              textStyle: {
                color: "#d32f2f", // 文本颜色
                fontSize: 12, // 文本大小
              },
            },
          },
        ],
      },
      data: [
        { value: 200 },
        560,
        { value: 690, label: { show: false } },
        580,
        250,
        200,
        { value: 100, label: { show: false } },
        300,
        300,
      ],
    },
  ],
};
```
