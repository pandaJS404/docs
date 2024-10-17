<template>
  <!-- 版权组件 -->
  <div class="copyright">
    <div class="content">
      <div class="item">
        <span>版权属于：</span>
        <span>
          <a
            v-if="isOriginal"
            :href="authorLink"
            title="进入作者主页"
            target="_blank"
            >{{ author }}</a
          >
          <span v-else :title="author">{{ author }}</span>
        </span>
      </div>
      <div class="item">
        <span v-if="isOriginal">本文链接：</span>
        <span v-else>原文链接：</span>
        <span>
          <a v-if="isOriginal" :href="articleLink" target="_blank">{{
            articleLink
          }}</a>
          <a v-else :href="articleLink" target="_blank" :title="articleTitle">{{
            articleLink
          }}</a>
        </span>
      </div>
      <div v-if="isOriginal" class="item">
        <span>作品采用：</span>
        <span
          >《<a :href="theme.copyrightConfig.licenseLink" target="_blank">{{
            theme.copyrightConfig.license
          }}</a
          >》许可协议授权</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from "vue";
import { useData } from "vitepress";
const { theme, frontmatter } = useData();

const data = reactive({
  isOriginal: frontmatter.value?.isOriginal ?? true,
  author: frontmatter.value?.author ?? theme.value.articleMetadataConfig.author,
  authorLink:
    frontmatter.value?.authorLink ??
    theme.value.articleMetadataConfig.authorLink,
  articleTitle: frontmatter.value?.articleTitle ?? frontmatter.value.title,
  articleLink:
    frontmatter.value?.articleLink ?? decodeURI(window.location.href),
});
const { isOriginal, author, authorLink, articleTitle, articleLink } =
  toRefs(data);
</script>

<style scoped>
.copyright {
  border-color: var(--vp-custom-block-tip-border);
  background-color: var(--vp-custom-block-tip-bg);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 15px;
  margin-top: 50px;
}

.copyright .content {
  padding: 13px 16px;
}

.copyright .content .item {
  margin-bottom: 5px;
  word-break: break-word;
  line-height: 22px;
}

.copyright .content .item .icon {
  display: inline-block;
  height: 16px;
  width: 16px;
  margin-right: 0.375rem;
  vertical-align: -2.5px;
}

a {
  font-weight: 400;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

a:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}
</style>
