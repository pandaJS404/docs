---
title: VScode离线包
description: VScode 离线包制作，插件配置信息批量导入 断网安装插件
author: PandaJS
date: 2024/04/25 16:25
categories:
  - BUG 踩坑集
tags:
  - vscode
  - 离线包
---

# VScode 离线包制作，插件配置信息批量导入 断网安装插件

使用场景：在内网开发，导致不能在线安装插件使用十分不便，需要在内网安装常用插件。借鉴制作绿色版传输到内网使用。

## 一、下载安装 vscode 安装包

1、[vscode 安装包下载地址](https://code.visualstudio.com/download) win 下载 ZIP 包，下载完成之后解压文件
2、创建数据文件夹 data， 文件结构目录如下
![image](/img/2024/04/25/20241026_001.png)

## 二、导入已有 VSCode 配置 制作使用包

1、将已有的插件和配置导入

```
%APPDATA%\Code
// 查看win下vscode配置路径
```

用户数据默认路径(复制到建立的数据文件夹下 data 文件夹内 , 将复制的 Code 文件加 改名为 user-data )

![image](/img/2024/04/25/20241026_002.png)

回车进入文件夹，将文件夹内容拷贝到 data/user-data

2、导入插件

```
// 查看win下vscode 插件
%USERPROFILE%\.vscode\extensions
```

插件默认路径(直接复制到建立的数据文件夹下 先建立名为 data/extensions 的文件夹)
执行同配置相同，将文件夹里面所有拷贝至 data/extensions 文件夹内
完成后将整个文件夹打包压缩即可

解压 ZIP 之后即可运行 vscode， setting.json 文件可能需要手动拷贝至新环境的 setting.json 文件内

```
{
  "git.ignoreMissingGitWarning": true,
  "terminal.integrated.rendererType": "dom",
  "vetur.validation.template": false,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  // "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.trailingComma": "all",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      // force-aligned | force-expand-multiline
      "wrap_attributes": "force-aligned",
      "prettier": {
        "semi": false,
        "singleQuote": true
      }
    },
    "prettyhtml": {
      "printWidth": 100, //使用不同的最大行长度
      "singleQuote": false,
      "wrapAttributes": false, //强制换行属性（当它有多个时，默认值为false）
      "sortAttributes": true //按字母顺序排序属性（默认值：false）
    },
    "prettier": {
      "semi": false, //代码行后面需不需要生成分号
      "singleQuote": true, //需不需要把双引号格式化成单引号
      "trailingComma": "all" //在任何可能的多行中输入尾逗号。
    }
  },
  //文本自动换行
  "editor.wordWrap": "on",
  "editor.renderWhitespace": "all",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "search.followSymlinks": false,
  "window.zoomLevel": 0,
  "editor.detectIndentation": false,
  "editor.tabSize": 2,
  "window.newWindowDimensions": "inherit",
  "window.openFoldersInNewWindow": "on",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "explorer.confirmDelete": false,
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.fontSize": 16
  //代码格式化快捷键及保存时自动格式化
  // "editor.formatOnType": true,
  // "editor.formatOnSave": true,
}
```
