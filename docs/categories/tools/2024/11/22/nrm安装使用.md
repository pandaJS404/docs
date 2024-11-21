---
title: NRM安装使用
description: nrm(Npm Registry Manager)npm镜像管理工具、Win下载及安装nrm、nrm的使用
author: PandaJS
date: 2024/11/21 21:50
isTop: false
categories:
  - 工具四海谈
tags:
  - node
  - nvm
---

# NRM 安装使用 WIN 环境

## 下载安装

```
npm install -g nrm

nrm -V // 查看版本
```

## 查看镜像源

```
nrm ls // 查看所有镜像源
```

## 切换镜像源

```
nrm use cnpm // 切换到淘宝镜像源
```

## 添加镜像源

```
nrm add testName http://registry.npm.taobao.org // 添加一个名为testName的镜像源
```

## 删除镜像源

```
nrm del testName // 删除名为testName的镜像源
```

## 常用命令

```
nrm ls // 查看所有镜像源
nrm use <registry> // 切换镜像源
nrm add <registry-name> <registry-url> // 添加镜像源
nrm del <registry-name> // 删除镜像源
nrm test // 测试当前镜像源速度
```

![image-2024-11-21](/img/2024/11/21/1732182906309.png)

::: tip

- 切换镜像源后，需要重新安装依赖包，否则可能导致依赖包安装失败。
- 切换镜像源后，如果项目中使用了私有包，需要重新登录，否则可能导致安装失败。
  :::
