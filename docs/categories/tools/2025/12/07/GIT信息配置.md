---
title: GIT信息配置，多账号配置
description: 新电脑配置GIT，多账号配置问题记录
author: PandaJS
date: 2025/12/07 14:46
isTop: false
categories:
  - 工具四海谈
tags:
  - GIT
---

# GIT配置

- 需要区分不同的GIT账号，主要是工作和个人账号的区分。
- 配置不同的提交user.name和user.email，可以区分不同的提交者。
- 不同账号的SSH Key配置，可以实现免密提交。

## 信息配置
- 先配置全局信息，可以作为没有设置局部信息的兜底处理。
- 信息读取分为 仓库 -> 全局 -> 系统
- 信息读取级别也是从内到外，即 仓库 -> 全局 -> 系统

## 全局配置
// 作为保底信息推送到云端，如果没有配置局部信息
```bash
git config --global user.name "PandaJS"
git config --global user.email "123456@163.com"
```

信息查看
```bash
git config --global --list
```

## 仓库配置
// 作为局部信息，只对当前仓库有效
```bash
cd /path/to/your/repo

git config user.name "PandaJS"
git config user.email "123456@qq.com"

// 或者
git config --local user.name "PandaJS"
git config --local user.email "123456@qq.com"
```

信息查看
```bash
cd /path/to/your/repo

git config --local --list
```

## 配置多账号适应不同环境

这里配置三个代码仓库的地址 Gitee Gitlab GitHub 对应不同的信息推送

ssh-keygen -t ed25519 -C "123456@163.com" -f ~/.ssh/id_rsa_github


```bash
// 生成github 的提交ssh-key
ssh-keygen -t ed25519 -C "123456@gmail.com" -f ~/.ssh/id_rsa_github

// 生成gitlab 的提交ssh-key
ssh-keygen -t ed25519 -C "123456@163.com" -f ~/.ssh/id_rsa_gitlab

// 生成gitee 的提交ssh-key
ssh-keygen -t ed25519 -C "123@163.com" -f ~/.ssh/id_rsa_gitee

// 后续直接回车即可生成，生成文件路径在 ~/.ssh/id_rsa_github ~/.ssh/id_rsa_gitlab ~/.ssh/id_rsa_gitee
```
![image-2025-12-09](/img/2025/12/09/1765262895405.png)  


还需要设置 config 文件，将不同代码仓库的地址映射到对应的SSH Key
创建config文件，并编辑

```bash
# Host 项最好不要改变，可能会有些问题
Host github.com
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_github

# gitlab 可以设置ip地址 127.0.0.1 或者域名 gitlab.com
Host gitlab.com
    HostName gitlab.com
    User git
    IdentityFile ~/.ssh/id_rsa_gitlab

Host gitee.com
    HostName gitee.com
    User git
    IdentityFile ~/.ssh/id_rsa_gitee

Host *
    # 默认连接超时时间 (秒)
    # ConnectTimeout 10
    # 每隔60秒向服务器发送一个空包，以保持连接活跃
    # ServerAliveInterval 60
    # 如果 ServerAliveInterval 请求没有收到响应，则在断开连接前尝试3次
    # ServerAliveCountMax 3
    # 严格主机密钥检查 (yes/ask/no)，推荐 "ask" 或 "yes"
    StrictHostKeyChecking ask
    KexAlgorithms +diffie-hellman-group1-sha1

```

![image-2025-12-09](/img/2025/12/09/1765263421513.png)  


## SSH Key配置

- 复制SSH Key到GitHub：`cat ~/.ssh/id_rsa_github.pub`
- 验证SSH Key：`ssh -T git@github.com`
- 复制SSH Key到Gitee：`cat ~/.ssh/id_rsa_github.pub`
- 验证：`ssh -T git@gitee.com`
