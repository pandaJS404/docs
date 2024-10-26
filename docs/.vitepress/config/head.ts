import type { HeadConfig } from "vitepress";
import { metaData } from "./constants";

export const head: HeadConfig[] = [
  ["link", { rel: "icon", href: "/docs/favicon.ico" }],
  ["meta", { name: "author", content: "pandaJS" }],
  ["meta", { name: "keywords", content: "知识库, 博客, pandaJS" }],

  ["meta", { name: "HandheldFriendly", content: "True" }],
  ["meta", { name: "MobileOptimized", content: "320" }],
  ["meta", { name: "theme-color", content: "#3c8772" }],

  ["meta", { property: "og:type", content: "website" }],
  ["meta", { property: "og:locale", content: metaData.locale }],
  ["meta", { property: "og:title", content: metaData.title }],
  ["meta", { property: "og:description", content: metaData.description }],
  // ["meta", { property: "og:site", content: metaData.site }],
  ["meta", { property: "og:site_name", content: metaData.title }],
  // ["meta", { property: "og:image", content: metaData.image }],

  // 图片预览
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css",
    },
  ],
  [
    "script",
    {
      src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js",
    },
  ],

  // 百度统计代码：https://tongji.baidu.com
  [
    "script",
    {},
    `var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?fcbb67de424065b900b6abbb924c71d7";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
  })();`,
  ],
];
