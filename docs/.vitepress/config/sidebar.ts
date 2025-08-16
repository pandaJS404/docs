import type { DefaultTheme } from "vitepress";
import fg from "fast-glob";
console.log("🚀 ~ fg:", fg)
import matter from "gray-matter";
const sync = fg.sync;

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/categories/issues/": getItemsByDate("categories/issues"),
  "/categories/fragments/": getItemsByDate("categories/fragments"),
  "/categories/others/": getItemsByDate("categories/others"),
  "/categories/tools/": getItemsByDate("categories/tools"),
};

/**
 * 根据 某分类/YYYY/MM/dd/xxx.md 的目录格式, 获取侧边栏分组及分组下标题
 *
 * /categories/issues/2022/07/20/xxx.md
 *
 * @param path 扫描基础路径
 * @returns {DefaultTheme.SidebarItem[]}
 */
function getItemsByDate(path: string) {
  // 侧边栏年份分组数组
  let yearGroups: DefaultTheme.SidebarItem[] = [];
  // 置顶数组
  let topArticleItems: DefaultTheme.SidebarItem[] = [];

  // sync(`docs/${path}/*`, {
  //   onlyDirectories: true,
  //   objectMode: true,
  // }).forEach((item) => {
  //   console.log("🚀 ~ getItemsByDate ~ item:", item)
    
  // });

  // 1.获取所有年份目录
  sync(`docs/${path}/*`, {
    onlyDirectories: true,
    objectMode: true,
  }).forEach(({ name }) => {
    let year = name;
    // 年份数组
    let articleItems: DefaultTheme.SidebarItem[] = [];

    // 2.获取所有月份目录
    sync(`docs/${path}/${year}/*`, {
      onlyDirectories: true,
      objectMode: true,
    }).forEach(({ name }) => {
      let month = name;

      // 3.获取所有日期目录
      sync(`docs/${path}/${year}/${month}/*`, {
        onlyDirectories: true,
        objectMode: true,
      }).forEach(({ name }) => {
        let day = name;
        // 4.获取日期目录下的所有文章
        sync(`docs/${path}/${year}/${month}/${day}/*`, {
          onlyFiles: true,
          objectMode: true,
        }).forEach((article) => {
          const articleFile = matter.read(`${article.path}`);
          const { data } = articleFile;
          if (data.isTop) {
            // 向置顶分组前追加标题
            topArticleItems.unshift({
              text: data.title,
              link: `/${path}/${year}/${month}/${day}/${article.name.replace(
                ".md",
                ""
              )}`,
            });
          }

          // 向年份分组前追加标题
          articleItems.unshift({
            text: data.title,
            link: `/${path}/${year}/${month}/${day}/${article.name.replace(
              ".md",
              ""
            )}`,
          });
        });
      });
    });

    // 添加年份分组
    yearGroups.unshift({
      // icon-rendingnianfen  年份图标、备选
      text: `<i class="iconfont iconfont14 icon-rendingnianfen"></i>${year}年 (${articleItems.length}篇)`,
      items: articleItems,
      collapsed: true,
    });
  });

  if (topArticleItems.length > 0) {
    // 添加置顶分组
    yearGroups.unshift({
      text: `<i class="iconfont iconfont14 icon-zhiding" style="color: #ee3f4d"></i>
            我的置顶 (${topArticleItems.length}篇)`,
      items: topArticleItems,
      collapsed: false,
    });

    // 将最近年份分组展开
    yearGroups[1].collapsed = false;
  } else {
    // 将最近年份分组展开
    yearGroups[0].collapsed = false;
  }

  // 添加序号
  addOrderNumber(yearGroups);
  return yearGroups;
}

/**
 * 添加序号 + 颜色
 *
 * @param groups 分组数据
 */
function addOrderNumber(groups) {
  const textColor = [
    "#c23531",
    "#61a0a8",
    "#d48265",
    "#91c7ae",
    "#749f83",
    "#ca8622",
    "#bda29a",
    "#c4ccd3",
    "#dd6b66",
    "#759aa0",
    "#e69d87",
    "#8dc1a9",
    "#ea7e53",
    "#eedd78",
    "#73a373",
    "#73b9bc",
    "#7289ab",
    "#91ca8c",
    "#f49f42",
    "#37A2DA",
    "#32C5E9",
    "#67E0E3",
    "#9FE6B8",
    "#FFDB5C",
    "#ff9f7f",
    "#fb7293",
    "#E062AE",
    "#E690D1",
    "#e7bcf3",
    "#9d96f5",
    "#8378EA",
    "#96BFFF",
  ];

  groups.forEach((group) => {
    group.items.forEach((item, index) => {
      const color = textColor[index % textColor.length];
      let serialNum = `<span class="mr-[6px]" style="color: ${color}">${
        index + 1
      }</span>`;
      item.text = `${serialNum}${item.text}`;
    });
  });
}
