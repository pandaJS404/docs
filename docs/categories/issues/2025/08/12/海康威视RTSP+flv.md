---
title: 海康威视RTSP->FLV视频流
description: 使用 videojs 做海康摄像头接入遇到的问题及解决方案总结（video使用 + http-flv 低延时优化方向。
author: PandaJS
date: 2026/08/16 16:20
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - VideoJS
  - flv.js
  - 海康摄像头
  - 接入RTSP视频流
---

# 接入海康威视 RTSP 视频流、监控摄像头画面接入显示

使用 VideoJS+flv.js+websocket 实现海康摄像头接入、视频流后端推送或者可以 node 启动一个服务，然后通过 websocket 连接到前端，实现视频流的实时显示。

## 安装依赖

```bash
npm install video.js --save

//flv格式
npm install flv.js --save
npm install videojs-flvjs-es6 --save

//hls格式
npm install videojs-contrib-hls --save
```

:::tip
video.js 7.0 以后版本默认支持 hls（m3u8）格式,可以不用装 videojs-contrib-hls 依赖，装了也不影响。
:::

## 使用 video.js FLV

引入相关依赖，在 vue3 环境中

```html
<div :key="configId" class="video-box" ref="videoBox"></div>
```

```html
<video
  id="videoBox"
  class="video-js vjs-fluid"
  muted
  preload="auto"
  width="100%"
  height="100%"
>
</video>
```

## 播放视频 FLV

```javascript
import Videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-flvjs-es6";
```

```javascript
const playVideo = async (streamUrl) => {
  let id = `video${configId.value}`;

  const player = Videojs(id, {
    autoplay: "muted", //自动播放
    controls: false, //用户可以与之交互的控件
    loop: false, //视频一结束就重新开始
    muted: true, //默认情况下将使所有音频静音
    aspectRatio: "16:9", //显示比率
    fullscreen: {
      options: { navigationUI: "hide" },
    },
    techOrder: ["html5", "flvjs"], // 兼容顺序
    flvjs: {
      mediaDataSource: {
        isLive: false,
        cors: true,
        withCredentials: false,
      },
    },
    sources: [
      {
        src: `//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv`,
        type: "video/x-flv",
      },
    ],
  });

  videoExample.value = player;
};
```

:::tip
每次使用切换 video 实例，否则直接更新 src 会出现视频无法播放的问题
:::

```javascript
const switchVideo = async () => {
  videoBox.value.innerHTML = "";
  videoExample.value?.dispose();

  let id = `video${configId.value}`;

  videoBox.value.innerHTML = `<video
    id="${id}"
    class="video-js vjs-fluid"
    muted
    preload="auto"
    width="100%" 
    height="100%">
  </video>`;

  playVideo();
};
```

## 播放视频 HLS·m3u8

```javascript
const playVideo = async (streamUrl) => {
  let id = `video${configId.value}`;

  const player = Videojs(id, {
    autoplay: "muted", //自动播放
    controls: false, //用户可以与之交互的控件
    loop: false, //视频一结束就重新开始
    muted: true, //默认情况下将使所有音频静音
    aspectRatio: "16:9", //显示比率
    fullscreen: {
      options: { navigationUI: "hide" },
    },
    techOrder: ["html5", "hls"], // 兼容顺序
    html5: {
      hls: {
        withCredentials: true,
      },
    },
    sources: [
      {
        src: `https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  });

  videoExample.value = player;
};
```

## 更新样式

```css
.vjs-control-bar {
  font-size: 2em !important; // 控制面板整体大小调整
}
video {
  object-fit: fill !important; // 解决视频内容未铺满容器的问题
}
```

## 测试视频地址

里面使用的地址在： [rtmp、rtsp、flv、mp4、hls视频流测试地址](https://juejin.cn/post/6855577308271476743)

#### 1、rtsp 测试流地址

- <p>rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov</p>

#### 2、flv 测试流地址

- <p>//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-720p.flv</p>
- <p>//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-480p.flv</p>
- <p>//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv</p>

#### 3、hls 测试流地址

- <p>https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/hls/xgplayer-demo.m3u8</p>

#### 4、mp4 测试流地址

- <p>//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4</p>
- <p>//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-480p.mp4</p>
- <p>//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4</p>

## 开发时遇到的问题

### 1、flvjs 加载推送 websocket 视频 出现报错

<p style="color:red">出现 The element or ID supplied is not valid(videojs)</p>

![image-2025-08-16](/img/2025/08/16/1755343458089.png)

出现这个错误一般是 id 写错了，不需要包含 # 号 直接写id即可
或者是元素还没有加载完成，导致获取不到元素。

### 2、重新加载视频的时候出现报错，无法加载视频

使用 this.src(url); this.play(); 可能出现加载失败的情况。这种就直接重新创建一个video元素重新加载。

### 3、flvjs 加载推送 websocket 视频 出现报错

![image-2025-08-12](/img/2025/08/12/1754984729187.png)

出现这个错误一般是推送的视频流有问题，需要更新推送的视频流。或者是推送的视频流没有首帧信息，导致视频无法加载，无法读取显示。

### 4、flvjs 加载推送 websocket 视频，并且首次可以正常加载，但是后续无法播放

![image-2025-08-12](/img/2025/08/12/1754984729187.png)

后续的推送里面没有首帧信息
[相关 issue](https://github.com/bilibili/flv.js/issues/603)

导致没有解析成功，无法播放。
[参考 issue](https://github.com/bilibili/flv.js/issues/757)
、
[其他参考1](https://blog.csdn.net/woshicaoxiaojia/article/details/147926978)
、
[其他参考2](https://github.com/bilibili/flv.js/issues/337)
