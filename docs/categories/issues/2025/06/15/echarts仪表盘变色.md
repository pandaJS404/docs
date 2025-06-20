---
title: echarts仪表盘变色
description: echarts仪表盘变色 仪表盘设置不同值变色
author: PandaJS
date: 2026/06/15 20:18
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - echarts
---

# echarts 仪表盘变色 仪表盘设置不同值变色

目前已实现三段效果，可以自己调整

<div style="display: flex; justify-content: space-between;gap: 20px">

![image-2025-06-20](/img/2025/06/20/1750389417366.png)

![image-2025-06-20](/img/2025/06/20/1750389008102.png)

![image-2025-06-20](/img/2025/06/20/1750388939848.png)

</div>

<div style="display: flex; justify-content: space-between;gap: 20px">

![image-2025-06-20](/img/2025/06/20/1750388953038.png)

![image-2025-06-20](/img/2025/06/20/1750388879504.png)

![image-2025-06-20](/img/2025/06/20/1750389050894.png)

</div>

## 相关逻辑

::: danger 注意
其中颜色值如果设置 roundCap: true 设置为圆角，则颜色不能使用 RGBA 设置透明色，否则会有颜色显示重叠，不设置圆角就不会有这个问题。
:::

```javascript
    // 主要区分段，以[0, 100]分段
    color: [
      [colorValue < 34 ? colorValue / 100 : 0.33, '#43a047'],
      [
        colorValue > 34 && colorValue < 67 ? colorValue / 100 : 0.67,
        colorValue > 34 ? '#ffb300' : '#e0e0e0'
      ],
      [
        colorValue > 67 ? colorValue / 100 : 0.99,
        colorValue > 67 ? '#f4511e' : '#e0e0e0'
      ],
      [1, '#e0e0e0']
    ],
```

## 完整代码

::: tip 问题
可以直接在 echarts 官网中运行查看效果 [查看](https://echarts.apache.org/examples/zh/editor.html?c=line-smooth&code=G4QwTgBAxg9gNjMA1EcCuBTCBeCBGABgIG4AoUSAWwEsA7HCE88CSkADwcKdJgAcALtRj1cAb1IQIAmPCF8AXBAlSpAM0RsBAjGCUByMSAC-EADwAjMAHoAfGIumlYqMYCk-yRGMAaLwGddagx_JQBtLykVVSlaEEoMA0Bt-MAyvUBDc30_GKkBAE8-RIh9AHMQNGKMTMjVKAxaHT0IMP0AVgIPHyK2jwBdLOywEAATajRQooBOdqrs1jp-mLZ2BdU-GDoG52qY6h1KAGU8uELo2alYBEb9MplPM-9t7xWpDmp_ABk6E8epMBg0WhDADCIEU0jAmGeqn8AAsYAB3JQCCEYKFSOBfQ65Y5be7neCIcI_bJhC6IFDoLBmCAAZgALBAAPzQAnIVCYCDWfBECBKAgAOhpNM6-gAxHSaSACHSAOz6PrEmIRPHZMlsykQWy0hkAMh1LMuFI51IAbDKmQbyeysFzuLzGPyzWizmqjVgtfSLWK1GoLDSiPp7WKMAQQyG7iqIArI01FarWW7NRAzRbXdbOdyCPaBRMJs7ZmmNVqU8zvXSWng8JUg6Kw6GCBGVdHI2E8CLa_Xwz04837vDqEMBDClHgAEzE4yPXyPIQCHHKYmwhFIlHOmA-wICIF1TZNfQNkXcXrO0CUgCCtGoWmEtBXkOJGnq-2oAC9CjTR861QZRUKaYHrC5QBwC0ADIzAByMwAnIKnKEhgwAQQGoOBcTOdc1E3bd6l0cJ9w6IoTWmXtskfARnzfJQ6QADmdDFaAwAAJDBqGKGEBCUFoTWddgDFqTCwBmM5cm4nddEbVRp1mV4PhACwMCQhd7iXREIDUVBAmgx5JIAFWoKAAGtkNmRS7wwdTDL4DEBE-WiDOyIzwUwUzsjgaTZJsmI7ORBzZmnR4hhAeCiXuU4zlPTAlELe8VTiBIDH2IEAHkACUAFFRJiSdZm7dKvG7YxiCAA)
:::

```javascript
var colorValue = 100;
var min = 0;
var max = 100;

option = {
  tooltip: {
    formatter: "{a} <br/>{b} : {c}%",
  },
  series: [
    {
      name: "进度条",
      type: "gauge",
      center: ["50%", "50%"],
      radius: "40%",
      min,
      max,
      pointer: {
        itemStyle: {
          color: "auto",
        },
      },
      axisLine: {
        roundCap: true,
        show: true,
        lineStyle: {
          color: [
            [colorValue < 34 ? colorValue / 100 : 0.33, "#43a047"],
            [
              colorValue > 34 && colorValue < 67 ? colorValue / 100 : 0.67,
              colorValue > 34 ? "#ffb300" : "#e0e0e0",
            ],
            [
              colorValue > 67 ? colorValue / 100 : 0.99,
              colorValue > 67 ? "#f4511e" : "#e0e0e0",
            ],
            [1, "#e0e0e0"],
          ],
          width: 12,
        },
      },
      title: {
        show: true,
        offsetCenter: ["0", "100%"],
        valueAnimation: true,
        fontSize: 18,
        color: "#333", // 标题颜色
      },
      detail: {
        offsetCenter: ["0%", "60%"],
        fontSize: 24,
        lineHeight: 56,
        x: "center",
        y: "center",
      },
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: true,
      },
      splitLine: {
        show: true,
      },
      label: {
        show: true,
      },

      data: [
        {
          value: colorValue,
          name: "SCORE",
        },
      ],
    },
  ],
};
```
