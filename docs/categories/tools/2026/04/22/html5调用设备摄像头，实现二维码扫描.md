---
title: html5调用设备摄像头，实现二维码扫描
description: html5 调用设备摄像头，实现二维码扫描。
isOriginal: false
author: 前端成长营
articleLink: https://blog.csdn.net/weixin_43617604/article/details/107356468
date: 2026/04/22 09:31
isTop: false
categories:
  - 工具四海谈
tags:
  - HTML5
  - JavaScript
  - 摄像头
  - 二维码
---

# html5调用设备摄像头，实现二维码扫描

最近在做一个签到系统，由于我直接使用了纯网页，因此调用摄像头进行扫码成了大问题。经过几番费力的百度终于找到解决方法。

主要用到 `MediaDevices.getUserMedia()` 这个方法。（仅支持https）

### 创建一个QRScan对象

```javascript
function QRScan(div_id) {
  this.div_id = div_id; // 用来存放video的div id
  this.div_can = null;
  this.videos = []; // 保存设备上所有的摄像头id
  this.medioConfig = {}; // 配置
  this.can_open = false;
  this.init();
}
```

在web api上调用后置摄像头是这样配置 `video: { facingMode: { exact: “environment” } }`，但是我没有成功，我是通过获取所有设备id然后再指定使用id的方式实现（英语差的我费劲的看了半天文档才弄明白）。

### 初始化配置等

```javascript
init: function () {
    // 各种兼容
    win.URL = (win.URL || win.webkitURL || win.mozURL || win.msURL);
    var promisifiedOldGUM = function(constraints) {
        var getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia);
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    };
    if(navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    if(navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = promisifiedOldGUM;
    }

    var self = this;
    self.div_can = doc.getElementById(self.div_id);
    // 这里获取所有的摄像头设备id
    navigator.mediaDevices.enumerateDevices().then(function(devices) {
        devices.forEach(function (dv) {
            var kind = dv.kind;
            if (kind.match(/^video.*/)) {
                self.videos.push(dv.deviceId);
                console.log(dv);
            }
        });
        var len = self.videos.length;
        self.can_open = true;
        // 默认使用后置摄像头。根据测试，在手机上后置摄像头的id会在之后获取
        self.medioConfig = {
            audio: false,
            video: { deviceId: self.videos[len - 1] }
        }
    });
}
```

### 打开摄像头部分

```javascript
openScan: function () {
    var self = this;
    if (self.can_open) {
        var vd = doc.createElement('video');
        vd.setAttribute('id', 'video_id');
        navigator.mediaDevices.getUserMedia(self.medioConfig).then(function (stream) {
            vd.src = win.URL.createObjectURL(stream);
            self.div_can.appendChild(vd);
        }).catch(function (err) {
            var p = doc.createElement('p');
            p.innerHTML = 'ERROR: ' + err.name +
                          '<br>该浏览器不支持调用摄像头，请使用**浏览器';
            self.div_can.appendChild(p);
        });
        vd.play();
    }
}
```

到这里我们就能成功打开设备摄像头了，当然这是需要浏览器支持的

#### 在video中进行图像抓取

```javascript
getImgDecode: function (func) {
    var self = this;
    var video = doc.getElementById('video_id');
    var canvas = doc.createElement('canvas');
    canvas.width = 340;
    canvas.height = 305;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 340, 305);
    if (canvas.toBlob === undefined) {
        var base64 = canvas.toDataURL();
        var blob = self.Base64ToBlob(base64);
        self.sendBlob(blob, func);
    } else {
        canvas.toBlob(function (blob) {
            self.sendBlob(blob, func);
        });
    }
},

Base64ToBlob: function (base64) {
    var code = win.atob(base64.split(',')[1]);
    var len = code.length;
    var as = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        as[i] = code.charCodeAt(i);
    }
    return new Blob([as], {type: 'image/png'});
}
```

### 将获取的二进制文件上传

```javascript
sendBlob: function (blob, func) {
    var fd = new FormData();
    fd.append('file', blob);
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'http://ip/api/parse', true);
    xhr.onload = function () {
       func ? func(JSON.parse(xhr.responseText)) : null;
    };
    xhr.send(fd);
}
```

### 我这里自己实现了个二维码解码接口，直接使用就能实现二维码读取。返回解码结果，这样的接口百度一下就有很多。

## 总结

这套实现流程可以拆成四步：先通过 `enumerateDevices()` 获取可用摄像头列表，再通过 `getUserMedia()` 打开目标摄像头；随后把 `video` 当前帧绘制到 `canvas`，转换成 `Blob` 后上传到二维码解析接口；最后根据接口返回结果完成二维码内容读取。落地时需要同时满足 HTTPS、浏览器支持摄像头调用、设备选择正确以及服务端具备解码能力这几个前提条件。
