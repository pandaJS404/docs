---
title: driver.js基本使用
description: Driver.js 是一个强大的，轻量级，使用原生 JavaScript 引擎开发的库，用于在页面聚焦用户的关注点。它支持所有主流浏览器，并且可高度自定义。
author: PandaJS
date: 2026/07/22 20:20
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - driver.js
---

# driver.js 基本使用，轻量引导库 版本 V 1.3.6

## 需求: 实现用户引导功能

1、现在主流引导库目前有三个，分析对比之后选择了 driver.js 使用，比较轻量(压缩后仅 4KB)
2、对比 vue-tour 和 shepherd.js 优缺点

## Driver.js

:::tip Driver.js 优缺点 [文档](https://driverjs.com/docs/configuration) [中文文档](https://driverjs.cn/)

- 优点：
- 无依赖，安装包很小，压缩完 4KB
- 文档简洁又不缺功能，实例化调用，不局限是 Vue 还是 React 框架
- 自定义：支持自定义扩展功能
- 缺点：
- driver.js 实现方式属于是，修改父级的 z-index 层级实现遮罩，这样会有一个致命问题：当作用的新手引导元素父级存在定位是 fixed 的情况时，目标元素的层级始终无法超过白色高亮遮罩层。

:::

![image-2025-07-23](/img/2025/07/23/1753267120618.png)

:::danger Driver.js 问题解决方案

> 页面中有一个 position: fixed 的 sidebar。

```css
div#driver-highlighted-element-stage,
div#driver-page-overlay {
  background: transparent !important;
  outline: 5000px solid rgba(0, 0, 0, 0.75);
}
```

:::

## Vue-tour

:::tip Vue-tour 优缺点

- 优点：
- vue： 支持 Vue.js 指令使用和实例化调用
- 轻量：比较轻巧，风格简洁
- 自定义：支持自定义扩展功能
- 缺点：
- 不支持黑色遮罩层，不支持高亮目标元素
- 还需要额外的在 template 里面引用标签
  :::
  ![image-2025-07-23](/img/2025/07/23/1753267028995.png)

## Shepherd.js

:::tip Shepherd.js 优缺点

- 优点：
- 功能强大：API 众多，功能强大，多种场景都可以通过提供的 API 配置出来
- 文档丰富：有详细的文档和示例
- 缺点：
- 依赖：依赖 popperjs 包比较大，体积也比较大
- 复杂度较高：API 自定义程度比较高，而且结构比较复杂，建议封装一层再使用。
  :::
  ![image-2025-07-23](/img/2025/07/23/1753267080716.png)

## Driver.js 基本使用

1、安装依赖

```bash
  # Using npm
  npm install driver.js --save

  # Using pnpm
  pnpm install driver.js --save

  # Using yarn
  yarn add driver.js --save

  # Using pnpm
  pnpm install driver.js --save
```

2、基本用法

```javascript
// 引入依赖
import { driver } from "driver.js";
// 引入样式
import "driver.js/dist/driver.css";

// 实例化
const driverObj = driver();
driverObj.highlight({
  element: "#some-element",
  popover: {
    title: "提示",
    description: "我是一个描述！就是测试描述！",
  },
});
```

![image-2025-07-24](/img/2025/07/24/1753354273507.png)

3、配置步骤

```javascript
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const driverObj = driver({
  showProgress: true,
  steps: [
    {
      element: ".page-header",
      popover: { title: "标题", description: "描述" },
    },
    { element: ".top-nav", popover: { title: "标题", description: "描述" } },
    { element: ".sidebar", popover: { title: "标题", description: "描述" } },
    { element: ".footer", popover: { title: "标题", description: "描述" } },
  ],
});

driverObj.drive();
```

![image-2025-07-24](/img/2025/07/24/1753355173335.png)  

4、添加一个自定义跳过按钮

```vue
<template>
  <button type="button" @click="handleOpenDriver">打开引导</button>

  <!-- 解决添加跳过按钮无法点击问题，从这里点击 -->
  <template v-if="showTelPort">
    <Teleport to="#driver-popover-skip-btns">
      <button type="button" @click="handleSkip" style="display: block">
        跳过
      </button>
    </Teleport>
  </template>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const handleOpenDriver = () => {
  setHelpStart();
};

const setHelpStart = () => {
  const driverObj = driver({
    showProgress: true,
    allowClose: true,
    smoothScroll: true,
    overlayOpacity: 0.6,
    overlayColor: "#333",
    stagePadding: 6,
    stageRadius: 6,
    nextBtnText: "下一步",
    prevBtnText: "上一步",
    doneBtnText: "完成",
    progressText: "{{current}} / {{total}}",
    popoverClass: "driver-class-name-only-once",
    onHighlighted: (el, step, config) => {},
    onNextClick: async (el, step, config) => {
      let hasNextStep = config.driver.hasNextStep();
      const getActiveStep = config.driver.getActiveStep();
      if (hasNextStep) {
        const getActiveIndex: number = config.driver.getActiveIndex() ?? -1;
        if (getActiveIndex > -1) {
          let nextIndex = getActiveIndex + 1;
          const nextDriverData = stepData.value[nextIndex];
          //@ts-ignore
          const renderFn = nextDriverData?.popover?.renderFn ?? null;

          if (renderFn && typeof renderFn === "function") {
            await renderFn(step, config);
          }

          //@ts-ignore
          const leaveFn = getActiveStep?.popover?.leaveFn ?? null;
          if (leaveFn && typeof leaveFn === "function") {
            await leaveFn(step, config);
          }
        }
        driverObj.moveNext();
      } else {
        driverObj.moveNext();
      }
    },
    onPrevClick: async (el, step, config) => {
      let hasPreviousStep = config.driver.hasPreviousStep();
      const getActiveStep = config.driver.getActiveStep();
      if (hasPreviousStep) {
        const getActiveIndex: number = config.driver.getActiveIndex() ?? -1;
        if (getActiveIndex > -1) {
          let nextIndex = getActiveIndex - 1;
          const nextDriverData = stepData.value[nextIndex];
          //@ts-ignore
          const renderFn = nextDriverData?.popover?.renderFn ?? null;
          if (renderFn && typeof renderFn === "function") {
            await renderFn(step, config);
          }

          //@ts-ignore
          const leaveFn = getActiveStep?.popover?.leaveFn ?? null;
          if (leaveFn && typeof leaveFn === "function") {
            await leaveFn(step, config);
          }
        }
        driverObj.movePrevious();
      } else {
        driverObj.movePrevious();
      }
    },
    onPopoverRender: async (popover, config) => {
      const hasNextStep = config.driver.hasNextStep();
      if (hasNextStep) {
        // 添加跳过按钮
        showTelPort.value = false;
        const skipButton = document.createElement("div");
        skipButton.style = "width: 60px; display: block;";
        skipButton.id = "driver-popover-skip-btns";
        skipButton.classList.add("driver-popover-skip-btns");
        skipButton.addEventListener("click", () => {
          driverObj.destroy();
        });
        popover.footerButtons.appendChild(skipButton);
        setTimeout(() => {
          showTelPort.value = true;
        }, 30);
      }
    },
    steps: [
      {
        element: ".page-header",
        popover: { title: "标题", description: "描述" },
      },
      {
        element: ".top-nav",
        popover: {
          title: "标题1",
          description: "描述1",
        },
      },
      {
        element: ".sidebar",
        popover: {
          title: "标题2",
          description: "描述2",
          renderFn: (popover, config) => {
            // 做些什么操作
            return Promise.resolve(true);
          },
          leaveFn: (popover, config) => {
            // 做些什么操作
            return Promise.resolve(true);
          },
        },
      },
      {
        element: ".footer",
        popover: {
          title: "标题3",
          description: "描述3",
          renderFn: (popover, config) => {
            // 做些什么操作
            return Promise.resolve(true);
          },
          leaveFn: (popover, config) => {
            // 做些什么操作
            return Promise.resolve(true);
          },
        },
      },
    ],
  });

  driverObj.drive();
};
</script>
```

5、自定义样式 在 vue3 项目

:::tip
自定义类名为 driver-class-name-only-once 可以自己修改，最好是做一个不会重复的类名，防止冲突。
:::

```css
<style>
  /* 修复 driver.js fixed 样式透传问题 */
  div#driver-highlighted-element-stage,
  div#driver-page-overlay {
    background: transparent !important;
    outline: 5000px solid rgba(0, 0, 0, 0.75);
  }
</style>

<style>
  .driver-popover.driver-class-name-only-once {
    background: url('xxxx.png') no-repeat;
    border: 1px solid #13edfddd;
    background-color: rgba(0, 0, 0, 0);
    box-shadow: inset 0px 0px 30px #13edfddd;
    background-size: 100% 100%;
    border-radius: 0;
    background-color: rgba(255, 255, 255, 0.05);
    color: #fff;
    position: fixed !important;
  }

  .driver-popover {
    min-width: 320px;
    max-width: 400px;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-title {
    font-size: 15px;
    font-weight: normal;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-title,
  .driver-popover.driver-class-name-only-once .driver-popover-description,
  .driver-popover.driver-class-name-only-once .driver-popover-progress-text {
    color: #fff;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-description {
    color: #13edfddd;
    font-size: 18px;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-close-btn {
    font-size: 20px;
    font-weight: normal;
    color: #fff;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-navigation-btns {
    justify-content: flex-end;
    gap: 3px;
  }
  .driver-popover.driver-class-name-only-once .driver-popover-navigation-btns button {
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
    color: #fff;
    font-size: 14px;
    border: none;
    background: url('xxxxx.png') no-repeat;
    background-size: 100% 100%;
    border-radius: 4px;
    cursor: pointer;
    text-shadow: none;
  }
  .driver-popover.driver-class-name-only-once .driver-popover-skip-btns {
    margin-left: 4px;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-arrow-side-left.driver-popover-arrow {
    border-left-color: #13edfddd;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-arrow-side-right.driver-popover-arrow {
    border-right-color: #13edfddd;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-arrow-side-top.driver-popover-arrow {
    border-top-color: #13edfddd;
  }

  .driver-popover.driver-class-name-only-once .driver-popover-arrow-side-bottom.driver-popover-arrow {
    border-bottom-color: #13edfddd;
  }

  #driver-dummy-element {
    display: none;
  }
</style>

```
