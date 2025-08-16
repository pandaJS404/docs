---
title: vite打包去除console
description: 关于vite打包去除console和debugger的方式记录，vite 版本4.2.3
author: PandaJS
date: 2026/07/20 16:20
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - vue
  - vite
---

# vite 4.2.3 打包去除console和debugger

## 需求: 清除log和debugger，保留info和warn、error 信息

## vite版本4.2.3

网上搜了很多更改打包方式为minify以此去除 console 信息，根据配置无法达到想要的效果

```javascript
import {defineConfig} from "vite";
export default defineConfig({
    build: {
        minify: 'terser', // 启用 terser 压缩
        terserOptions: {
            compress: {
                pure_funcs: ['console.log'], // 只删除 console.log
                drop_debugger: true, // 删除 debugger
                
            }
        }
    }
})
```

```javascript
import {defineConfig} from "vite";
export default defineConfig({
    build: {
        minify: 'terser', // 启用 terser 压缩
        terserOptions: {
            compress: {
                drop_console: true, // 删除所有 console
                drop_debugger: true,
                
            }
        }
    }
})
```

测试后发现没有效果，还是用回 esbuild 的方式，也是文档中推荐方式打包。

## 配置 esbuild 打包,生产环境去除console和debugger

```javascript
const viteConfig = defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd(), '');
  return {
    esbuild: {
      drop: ['debugger'],
      pure: env.VITE_NODE_ENV === 'production' ? ['console.log', 'console.warn'] : [],
    }
});
export default viteConfig;

```
