import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import "./styles/index.css";
import axios from "axios";


import naive from "naive-ui";
// 通用字体
import 'vfonts/Lato.css'

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
};
