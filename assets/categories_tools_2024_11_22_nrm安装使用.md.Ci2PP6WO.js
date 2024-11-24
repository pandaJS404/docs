import{_ as s,c as e,ao as n,o as i}from"./chunks/framework.CZtOA9_k.js";const t="/docs/img/2024/11/21/1732182906309.png",u=JSON.parse('{"title":"NRM安装使用","description":"nrm(Npm Registry Manager)npm镜像管理工具、Win下载及安装nrm、nrm的使用","frontmatter":{"title":"NRM安装使用","description":"nrm(Npm Registry Manager)npm镜像管理工具、Win下载及安装nrm、nrm的使用","author":"PandaJS","date":"2024/11/21 21:50","isTop":false,"categories":["工具四海谈"],"tags":["node","nvm"]},"headers":[],"relativePath":"categories/tools/2024/11/22/nrm安装使用.md","filePath":"categories/tools/2024/11/22/nrm安装使用.md","lastUpdated":1732184008000}'),l={name:"categories/tools/2024/11/22/nrm安装使用.md"};function r(p,a,d,o,c,m){return i(),e("div",null,a[0]||(a[0]=[n(`<h1 id="nrm-安装使用-win-环境" tabindex="-1">NRM 安装使用 WIN 环境 <a class="header-anchor" href="#nrm-安装使用-win-环境" aria-label="Permalink to &quot;NRM 安装使用 WIN 环境&quot;">​</a></h1><h2 id="下载安装" tabindex="-1">下载安装 <a class="header-anchor" href="#下载安装" aria-label="Permalink to &quot;下载安装&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>npm install -g nrm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nrm -V // 查看版本</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="查看镜像源" tabindex="-1">查看镜像源 <a class="header-anchor" href="#查看镜像源" aria-label="Permalink to &quot;查看镜像源&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>nrm ls // 查看所有镜像源</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="切换镜像源" tabindex="-1">切换镜像源 <a class="header-anchor" href="#切换镜像源" aria-label="Permalink to &quot;切换镜像源&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>nrm use cnpm // 切换到淘宝镜像源</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="添加镜像源" tabindex="-1">添加镜像源 <a class="header-anchor" href="#添加镜像源" aria-label="Permalink to &quot;添加镜像源&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>nrm add testName http://registry.npm.taobao.org // 添加一个名为testName的镜像源</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="删除镜像源" tabindex="-1">删除镜像源 <a class="header-anchor" href="#删除镜像源" aria-label="Permalink to &quot;删除镜像源&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>nrm del testName // 删除名为testName的镜像源</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code" tabindex="0"><code><span class="line"><span>nrm ls // 查看所有镜像源</span></span>
<span class="line"><span>nrm use &lt;registry&gt; // 切换镜像源</span></span>
<span class="line"><span>nrm add &lt;registry-name&gt; &lt;registry-url&gt; // 添加镜像源</span></span>
<span class="line"><span>nrm del &lt;registry-name&gt; // 删除镜像源</span></span>
<span class="line"><span>nrm test // 测试当前镜像源速度</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><img src="`+t+'" alt="image-2024-11-21" lang="zh-CN" data-fancybox="gallery"></p><div class="tip custom-block"><p class="custom-block-title">提示</p><ul><li>切换镜像源后，需要重新安装依赖包，否则可能导致依赖包安装失败。</li><li>切换镜像源后，如果项目中使用了私有包，需要重新登录，否则可能导致安装失败。</li></ul></div>',15)]))}const b=s(l,[["render",r]]);export{u as __pageData,b as default};
