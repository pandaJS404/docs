---
title: npm更新报错
description: npm更新报错
author: PandaJS
date: 2024/03/31 21:25
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - npm
---

# npm 更新版本报错 npm i -g npm 解决方法（npm 版本号为 6.14.4）

![image](/img/2024/03/31/20241026_001.png)

```
npm ERR! code EEXIST
npm ERR! path C:\Program Files\nodejs\npm.cmd
npm ERR! Refusing to delete C:\Program Files\nodejs\npm.cmd: is outside C:\Program Files\nodejs\node_modules\npm and not a link
npm ERR! File exists: C:\Program Files\nodejs\npm.cmd
npm ERR! Remove the existing file and try again, or run npm
npm ERR! with --force to overwrite files recklessly.

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\user\AppData\Roaming\npm-cache\_logs\2024-03-30T13_13_55_910Z-debug.log
```

## 解决方法

win 下可能有权限问题，做法是将 npm.cmd 文件改名，比如 npmx.cmd
改名后记得把 npx 和 npm npx.cmd 删掉，node_modules 中的不用动
然后执行 npmx i -g npm 即可。
