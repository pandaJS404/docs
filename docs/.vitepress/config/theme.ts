import type { DefaultTheme } from "vitepress";
import { nav } from "./nav";
import { sidebar } from "./sidebar";
import { algoliaSearchOptions } from "./search/algolia-search";
import { localSearchOptions } from "./search/local-search";

export const themeConfig: DefaultTheme.Config = {
  nav, // 导航栏配置
  sidebar, // 侧边栏配置

  logo: "/logo.png",

  outline: {
    level: "deep", // 右侧大纲标题层级
    label: "目录", // 右侧大纲标题文本配置
  },

  darkModeSwitchLabel: "切换日光/暗黑模式",
  lightModeSwitchTitle: "切换到亮色模式",
  darkModeSwitchTitle: "切换到暗黑模式",
  sidebarMenuLabel: "文章",
  returnToTopLabel: "返回顶部",
  lastUpdatedText: "最后更新时间", // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 文档页脚文本配置
  docFooter: {
    prev: "上一篇",
    next: "下一篇",
  },
  // 编辑链接配置
  editLink: {
    pattern: "",
    text: "在 Github 编辑此页面",
  },
  // 搜索配置（二选一）
  search: {
    provider: "algolia",
    options: algoliaSearchOptions,
    // 本地离线搜索
    // provider: 'local',
    // options: localSearchOptions
  },
  // 导航栏右侧社交链接配置
  socialLinks: [{ icon: "github", link: "https://github.com/pandaJS404/docs" }],

  // 自定义扩展: 文章元数据配置
  // @ts-ignore
  articleMetadataConfig: {
    author: "PandaJS", // 文章全局默认作者名称
    authorLink: "/about/me", // 点击作者名时默认跳转的链接
    showViewCount: false, // 是否显示文章阅读数, 需要在 docs/.vitepress/theme/api/config.js 及 interface.js 配置好相应 API 接口
  },
  // 自定义扩展: 文章版权配置
  copyrightConfig: {
    license: "署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)",
    licenseLink: "http://creativecommons.org/licenses/by-sa/4.0/",
  },
  // 自定义扩展: 评论配置
  commentConfig: {
    type: "gitalk",
    showComment: true, // 是否显示评论
  },
  // 自定义扩展: 页脚配置
  footerConfig: {
    showFooter: false, // 是否显示页脚
    icpRecordCode: "", // ICP备案号
    publicSecurityRecordCode: "", // 联网备案号
    copyright: ``, // 版权信息
  },

  footer: {
    message: "Released under the MIT License.",
    copyright: "Copyright ©2024-present PandaJS",
  },
};
