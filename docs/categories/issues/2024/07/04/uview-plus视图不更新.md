---
title: uview-plus视图不更新
description: vue3 中 uview / uview-plus - DatetimePicker 时间选择器 页面视图不更新， hasInput 属性不更新
author: PandaJS
date: 2024/03/31 21:25
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - npm
---

# vue3 中 uview / uview-plus - DatetimePicker 时间选择器 页面视图不更新， hasInput 属性不更新

## 组件

> 使用 DatetimePicker 组件时，这个官方插件用 v-model 不生效，实际上值已经更新了，内部 u-input 值不更新，页面也不刷新

![image](/img/2024/07/04/20241026_001.png)

查看源码得知，并没有使用 ref 在 vue3 setup 中无法直接操作 改元素。
![image](/img/2024/07/04/20241026_002.png)

## 解决方法

使用 选项式 api 来使用$children 来操作子组件进行值更新

```javascript
    <up-datetime-picker
      ref="upDateTimePicker"
      hasInput
      format="YYYY-MM-DD HH:mm"
      :show="showTime"
      v-model="time"
      mode="datetime"
      @close="showTime = false"
      @confirm="confirmTime($event); confirmTimeSetUp($event)"
    ></up-datetime-picker>
   // confirmTimeSetUp 是在 setup 中更新值的方法
   // confirmTime则是更新页面
```

```javascript
import { broadcast } from "@/utils/common";
export default {
  name: "addFeedback",
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(_this, componentName, eventName, params) {
      broadcast.call(_this, componentName, eventName, params);
    },
    confirmTime(e) {
      // 调用 up-datetime-picker 中 u-input 的值来进行更新
      this.broadcast(this.$refs.upDateTimePicker, "u-input", "onInput", {
        detail: {
          value: moment(e.value).format("YYYY-MM-DD HH:mm"),
        },
      });
    },
  },
};
```

### common.js 内容

```javascript
export function broadcast(componentName, eventName, params) {
  this.$children.forEach((child) => {
    const name = child.$options.name;

    if (name === componentName) {
      this.$nextTick(() => {
        // 不具有普适性  只 适用于  up-datetime-picker 组件 调用里面 u-input的事件
        child.$options.methods[eventName].apply(child, [params]);
      });
      this.$forceUpdate();
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
```
