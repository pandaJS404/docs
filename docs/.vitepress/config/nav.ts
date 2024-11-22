import type { DefaultTheme } from "vitepress";

// activeMatch 当前页面处于匹配路径下时, 对应导航菜单将突出显示
export const nav: DefaultTheme.Config["nav"] = [
  {
    text: "分类",
    items: [
      {
        text: "BUG 踩坑集",
        link: "/categories/issues/index",
        activeMatch: "/categories/issues/",
      },
      {
        text: "随笔记录",
        link: "/categories/fragments/index",
        activeMatch: "/categories/fragments/",
      },
      {
        text: "工具四海谈",
        link: "/categories/tools/index",
        activeMatch: "/categories/tools/",
      },
      {
        text: "其他集合",
        link: "/categories/others/index",
        activeMatch: "/categories/others/",
      },
    ],
    activeMatch: "/categories/",
  },
  {
    text: "标签",
    link: "/tags",
    activeMatch: "/tags",
  },
  {
    text: "归档",
    link: "/archives",
    activeMatch: "/archives",
  },
  {
    text: "其他",
    items: [{ text: "动画", link: "/animations", activeMatch: "/animations" }],
    activeMatch: "/categories/",
  },
  // {
  //   text: "关于",
  //   link: "/about/index",
  //   activeMatch: "/about/index",
  // },
];
