---
title: echarts偏移
description: echarts偏移 折线图偏移 折线图柱状图中心对齐
author: PandaJS
date: 2024/04/13 18:18
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - echarts
---

# echarts 偏移 折线图偏移 折线图柱状图中心对齐

![image](/img/2024/04/13/20241026_001.png)

折线图柱状图堆叠默认对齐是在柱状图中心，但是多个柱状图就会导致不在对应柱状图的中心
官方也没有提供折线图偏移 API，只有 symbolOffset 属性来偏移自定义的矢量路径或者图片，线无法偏移

![image](/img/2024/04/13/20241026_005.png)

## 解决方案：解决思路是动态增加一个隐藏 x 轴，设置 show，false

```
  xAxis: [
    ...
    {
      type: 'value',
      show: false
    }
  ],
```

但是增加了 legend 显示隐藏图表之后，柱状图消失会影响展示效果，所以对 legend 事件监听，重新设置偏移量

![image](/img/2024/04/13/20241026_002.png)
![image](/img/2024/04/13/20241026_003.png)
![image](/img/2024/04/13/20241026_004.png)

## 完整代码

```
option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: ['柱1', '柱2', '线1', '线2']
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ],
      axisPointer: {
        type: 'shadow'
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '水量',
      min: 0,
      max: 250,
      interval: 50,
      axisLabel: {
        formatter: '{value} ml'
      }
    }
  ],
  series: [
    {
      name: '柱1',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ],
      z: 1
    },
    {
      name: '柱2',
      type: 'bar',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ],
      z: 1
    },
    {
      xAxisIndex: 1,
      name: '线1',
      type: 'line',
      itemStyle: {
        normal: {
          lineStyle: {
            type: 'solid' //'dotted'虚线 'solid'实线
          }
        }
      },
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
    },
    {
      xAxisIndex: 1,
      name: '线2',
      type: 'line',
      itemStyle: {
        normal: {
          lineStyle: {
            type: 'solid'
          }
        }
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
    }
  ]
};

// 增加了一个隐藏的x轴，用来控制线图的点的位置
option.xAxis[1] = {
  type: 'value',
  max: option.xAxis[0].data.length * 100,
  show: false
};
option.series[2].data = option.series[2].data.map((x, i) => [30 + i * 100, x]);
option.series[3].data = option.series[3].data.map((x, i) => [70 + i * 100, x]);

myChart.on('legendselectchanged', function (params) {
  const option = this.getOption();

  const show = Object.entries(params.selected)
    .filter((i) => i[0].indexOf('柱') > -1)
    .filter((i) => i[1]);

  const len = show.length;

  if (len > 0 && len < 3) {
    option.series[2].data = option.series[2].data.map((x, i) => [
      (len == 1 ? 50 : 30) + i * 100,
      x[1]
    ]);
    option.series[3].data = option.series[3].data.map((x, i) => [
      (len == 1 ? 50 : 70) + i * 100,
      x[1]
    ]);
    this.setOption({
      series: option.series
    });
  }
});

```
