import{_ as e,c as o,ao as i,o as t}from"./chunks/framework.CZtOA9_k.js";const l="/docs/img/2024/10/31/1730355634984.png",r="/docs/img/2024/10/31/1730356274168.png",d="/docs/img/2024/10/31/1730356592340.png",c="/docs/img/2024/10/31/1730356473738.png",n="/docs/img/2024/10/31/1730356669959.png",b=JSON.parse('{"title":"自动引入图片","description":"Markdown-Image 插件自动引入图片 VS Code插件配置","frontmatter":{"title":"自动引入图片","description":"Markdown-Image 插件自动引入图片 VS Code插件配置","author":"PandaJS","date":"2024/10/31 20:50","isTop":true,"categories":["工具四海谈"],"tags":["VSCode","Markdown-Image","自动引入图片"]},"headers":[],"relativePath":"categories/tools/2024/10/31/自动引入图片.md","filePath":"categories/tools/2024/10/31/自动引入图片.md","lastUpdated":1730358439000}'),m={name:"categories/tools/2024/10/31/自动引入图片.md"};function s(g,a,p,h,k,_){return t(),o("div",null,a[0]||(a[0]=[i('<h1 id="markdown-image-插件自动引入图片配置" tabindex="-1">Markdown-Image 插件自动引入图片配置 <a class="header-anchor" href="#markdown-image-插件自动引入图片配置" aria-label="Permalink to &quot;Markdown-Image 插件自动引入图片配置&quot;">​</a></h1><p>vitepress 文档项目，配合 VSCode 插件 Markdown-Image 使用，可以自动引入图片。 简化图片引入流程，提升写作效率。</p><h2 id="安装插件" tabindex="-1">安装插件 <a class="header-anchor" href="#安装插件" aria-label="Permalink to &quot;安装插件&quot;">​</a></h2><p>首先，你需要安装 VSCode 插件 <a href="https://github.com/imlinhanchao/vsc-markdown-image/blob/HEAD/README.zh-cn.md" target="_blank" rel="noreferrer">Markdown-Image</a>。</p><p><img src="'+l+'" alt="Markdown-Image 插件安装" lang="zh-CN" data-fancybox="gallery"></p><h2 id="功能" tabindex="-1">功能 <a class="header-anchor" href="#功能" aria-label="Permalink to &quot;功能&quot;">​</a></h2><ul><li>可复制图片文件或截图粘贴，快捷键 <code>Alt + Shift + V</code>，或右键菜单 <code>粘贴图片</code>。</li><li>自动生成 Markdown 代码插入。</li><li>可配置支持 Imgur，七牛，SM.MS，Coding 等图床。</li><li>默认为本地，需打开 Markdown 文件所在文件夹。</li><li>也可以自定义代码实现图片上传。</li></ul><h2 id="配置本地引入方法-以本项目示例" tabindex="-1">配置本地引入方法 以本项目示例 <a class="header-anchor" href="#配置本地引入方法-以本项目示例" aria-label="Permalink to &quot;配置本地引入方法 以本项目示例&quot;">​</a></h2><ul><li><p>找到 markdown-image 插件，右键选择 <code>Markdown-Image</code>，选择 <code>配置</code>。</p></li><li><p>或者打开设置 搜索 <code>@ext:hancel.markdown-image</code> 查看配置。 <img src="'+r+'" alt="image-2024-10-31" lang="zh-CN" data-fancybox="gallery"></p></li><li><p>配置 markdown-image.local.path: <code>/docs/public/img/</code></p></li><li><p>配置 markdown-image.local.referencePath: <code>/img/${YY}/${MM}/${DD}/</code><img src="'+d+'" alt="image-2024-10-31" lang="zh-CN" data-fancybox="gallery"></p></li><li><p>配置 #markdown-image.base.fileNameFormat# 为 <code>${YY}/${MM}/${DD}/${timestamp}</code><img src="'+c+'" alt="image-2024-10-31" lang="zh-CN" data-fancybox="gallery"></p><p><img src="'+n+'" alt="image-2024-10-31" lang="zh-CN" data-fancybox="gallery"></p></li><li><p>保存配置，即可使用。</p></li></ul><div class="tip custom-block"><p class="custom-block-title">提示</p><p>markdown-image.local.path + markdown-image.base.fileNameFormat 拼接路径即为最终路径</p><p><code>/docs/public/img/${YY}/${MM}/${DD}/${timestamp}</code></p></div>',10)]))}const f=e(m,[["render",s]]);export{b as __pageData,f as default};
