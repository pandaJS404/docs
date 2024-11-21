---
title: NVM安装使用
description: nvm(Node Version Manager)Node版本管理切换工具、Win下载及安装nvm
author: PandaJS
date: 2024/11/21 21:50
isTop: false
categories:
  - 工具四海谈
tags:
  - node
  - nvm
---

# NVM 安装使用 WIN 环境

![image-2024-11-21](/img/2024/11/21/1732178061643.png)

## 下载安装

[下载地址](https://github.com/coreybutler/nvm-windows/releases)

![image-2024-11-21](/img/2024/11/21/1732178237875.png)

下载完成后，双击安装，默认安装路径为：`C:\Users\用户名\AppData\Roaming\nvm`

安装可参考链接 [NVM 安装](https://nvm.p6p.net/install/windows.html)

## 配置环境变量

打开环境变量编辑器，找到系统变量`Path`，编辑，添加以下内容：

1. `C:\Users\用户名\AppData\Roaming\nvm`
2. `C:\Users\用户名\AppData\Roaming\nvm\v20.15.1\node_modules\npm\bin`
3. `C:\Program Files\nodejs`

## 验证安装

打开命令行，输入`nvm`，出现以下内容即为安装成功：

> 通过【Win+R】打开运行窗口，输入 cmd，单击【确认】打开命令行

```
C:\Users\Panda>nvm -v
1.1.12
```

![image-2024-11-21](/img/2024/11/21/1732178534238.png)

## 切换镜像源

::: warning 提示

1. 如果下载 node 过慢或者安装失败，请更换国内镜像源。
2. 在 C:\Users\用户名\AppData\Roaming\nvm we 目录下，有个 `settings.txt` 文件，可以修改镜像源。
3. 修改 `node_mirror`和`npm_mirror`
   :::

```
// 阿里云镜像
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

```
// 腾讯云镜像
node_mirror: http://mirrors.cloud.tencent.com/npm/
npm_mirror: http://mirrors.cloud.tencent.com/nodejs-release/
```

```
// 淘宝镜像
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

1. `node_mirror`：指定 Node.js 镜像源
2. `npm_mirror`：指定 npm 镜像源

![image-2024-11-21](/img/2024/11/21/1732179602329.png)

## NVM 全部命令

1. `nvm version` / `nvm -v`：查看当前 NVM 版本
2. `nvm list` / `nvm ls`：列出已安装的 Node.js 版本
3. `nvm list available` / `nvm ls available`：列出全部 Node.js 版本
4. `nvm install [version]`：安装 Node.js 版本
   - [version]：Node.js 版本可以是特定版本号、"latest"（最新版本）或 "lts"（最近的长期支持版本）
   - 支持输入部分版本号，如 `nvm install 20` 安装最新 20 版本
   - 支持安装 LTS 版本，如 `nvm install lts` 安装最新 LTS 版本
5. `nvm uninstall [version]`：卸载 Node.js 版本
6. `nvm use [version]`：切换 Node.js 版本
7. `nvm on`：开启 NVM 功能
8. `nvm off`：关闭 NVM 功能
9. `nvm node_mirror [url]`：设置 Node.js 镜像源
10. `nvm npm_mirror [url]`：设置 npm 镜像源
11. `nvm cache clear`：清除缓存
12. `nvm root`：查看 NVM 安装目录

![image-2024-11-21](/img/2024/11/21/1732180748188.png)

![image-2024-11-21](/img/2024/11/21/1732180759681.png)
