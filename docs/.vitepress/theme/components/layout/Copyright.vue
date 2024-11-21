<template>
  <!-- 版权组件 -->
  <div class="copyright">
    <div class="content">
      <div class="item">
        <span><i class="iconfont16 iconfont icon-auther"></i>版权属于：</span>
        <span>
          <a v-if="isOriginal" :href="authorLink" target="_blank">{{
            author
          }}</a>
          <span v-else>{{ author }}</span>
        </span>
      </div>
      <div class="item">
        <i class="iconfont16 iconfont icon-lianjie"></i>
        <span v-if="isOriginal">本文链接：</span>
        <span v-else>原文链接：</span>
        <span>
          <a v-if="isOriginal" :href="articleLink">{{ articleLink }}</a>
          <a v-else :href="articleLink">{{ articleLink }}</a>
        </span>
      </div>
      <div v-if="isOriginal" class="item">
        <span><i class="iconfont16 iconfont icon-shouquan"></i>作品采用：</span>
        <span
          >《<a :href="copyrightConfig.licenseLink" target="_blank">{{
            copyrightConfig.license
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
const { copyrightConfig, articleMetadataConfig } = toRefs(theme.value);

const infoData = reactive({
  isOriginal: frontmatter.value?.isOriginal ?? true,
  author: frontmatter.value?.author ?? articleMetadataConfig.value.author,
  authorLink:
    frontmatter.value?.authorLink ?? articleMetadataConfig.value.authorLink,
  articleTitle: frontmatter.value?.articleTitle ?? frontmatter.value.title,
  articleLink:
    frontmatter.value?.articleLink ?? decodeURI(window.location.href),
});
const { isOriginal, author, authorLink, articleTitle, articleLink } =
  toRefs(infoData);
</script>

<style scoped lang="less">
.copyright {
  margin: 40px 0 20px;
  background-image: linear-gradient(to left, #a8edea 0%, #fed6e3 100%);
  border-radius: 6px;
  color: var(--vp-c-text-2);
  font-size: 15px;

  .content {
    padding: 13px 16px;

    .item {
      margin-bottom: 5px;
      word-break: break-word;
      line-height: 22px;

      .icon {
        display: inline-block;
        height: 16px;
        width: 16px;
        margin-right: 0.375rem;
        vertical-align: -2.5px;
      }
    }
  }
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
