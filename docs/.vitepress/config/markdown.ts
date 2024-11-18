import type { MarkdownOptions } from "vitepress";
import mathjax3 from "markdown-it-mathjax3";
import footnote from "markdown-it-footnote";

// 图片放大预览
import mdItCustomAttrs from "markdown-it-custom-attrs";

export const markdown: MarkdownOptions = {
  // Shiki主题, 所有主题参见: https://github.com/shikijs/shiki/blob/main/docs/themes.md
  theme: {
    light: "github-light",
    dark: "github-dark-dimmed",
  },
  lineNumbers: true, // 启用行号
  // @ts-ignore
  lazyLoading: true, // 设置图片懒加载

  // 全局设置自定义标题 ::: details  ::: danger  ::: warning  ::: tip  ::: info
  container: {
    tipLabel: "提示",
    warningLabel: "警告",
    dangerLabel: "危险",
    infoLabel: "信息",
    detailsLabel: "详细信息",
  },

  config: (md) => {
    md.use(mathjax3);
    md.use(footnote);

    // use more markdown-it plugins!
    md.use(mdItCustomAttrs, "image", {
      lang: "zh-CN",
      "data-fancybox": "gallery",
    });

    // 在所有文档的<h1>标签后添加<ArticleMetadata/>组件
    // md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
    //   let htmlResult = slf.renderToken(tokens, idx, options);
    //   if (tokens[idx].tag === "h1")
    //     htmlResult += `\n<ClientOnly><ArticleMetadata v-if="($frontmatter?.aside ?? true) && ($frontmatter?.showArticleMetadata ?? true)" :article="$frontmatter" /></ClientOnly>`;
    //   return htmlResult;
    // };
  },
};
