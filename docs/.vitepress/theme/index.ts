import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import "./styles/index.css";
import axios from "axios";

import { useData, useRoute } from "vitepress";
import codeblocksFold from "vitepress-plugin-codeblocks-fold"; // 导入方法
import "vitepress-plugin-codeblocks-fold/style/index.css"; // 导入样式

import naive from "naive-ui";
// 通用字体
import "vfonts/Lato.css";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp(ctx) {
    // extend default theme custom behaviour. 扩展默认主题自定义行为。
    DefaultTheme.enhanceApp(ctx);

    ctx.app.use(naive);

    // 全局挂载 API 接口
    ctx.app.config.globalProperties.$http = axios;

    // register your custom global components  注册自定义全局组件
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
  setup() {
    // 获取前言和路由
    const { frontmatter } = useData();
    const route = useRoute();
    codeblocksFold({ route, frontmatter }, true);
  },
};
