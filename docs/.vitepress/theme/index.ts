import DefaultTheme from "vitepress/theme";
import MyLayout from "./MyLayout.vue";
import "./styles/vars.css";
import "./styles/custom.css";
import "./styles/iconfont.css";
import "./styles/components/normalize.css"
import axios from "axios";
import api from "./api/index";

export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp(ctx) {
    // extend default theme custom behaviour. 扩展默认主题自定义行为。
    DefaultTheme.enhanceApp(ctx);

    // 全局挂载 API 接口
    ctx.app.config.globalProperties.$http = axios;
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.$api = api;
    }

    // register your custom global components  注册自定义全局组件
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
};
