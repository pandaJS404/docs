<template>
  <ul class="meta-list">
    <li class="meta-item original">
      <a-tag v-if="isOriginal" color="orangered" title="原创文章">
        <template #icon>
          <icon-trophy />
        </template>
        原创
      </a-tag>
      <a-tag v-else color="arcoblue" title="转载文章">
        <template #icon>
          <icon-share-alt />
        </template>
        转载
      </a-tag>
    </li>
    <li class="meta-item">
      <icon-user />
      <p class="meta-content">
        <a v-if="isOriginal" :href="authorLink" title="进入作者主页">{{
          author
        }}</a>
        <span v-else>{{ author }}</span>
      </p>
    </li>
    <li class="meta-item">
      <i class="iconfont icon-time"></i>
      <time
        class="meta-content"
        :datetime="date.toISOString()"
        :title="dayjs().to(dayjs(date))"
        >{{
          date.toLocaleString("zh", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        }}</time
      >
    </li>
    <li class="meta-item" v-if="showViewCount">
      <i class="iconfont icon-guileiyinqing"></i>
      <span class="meta-content" v-text="viewCount"></span>
    </li>
    <li class="meta-item" v-if="showCategory">
      <i class="iconfont icon-guileiyinqing"></i>
      <span class="meta-content">
        <span v-for="(category, index) in categories" :key="index">
          <a
            href="javascript:void(0);"
            @click="goToLink('/docs/tags', 'category', category)"
            target="_self"
            :title="category"
            >{{ category }}</a
          >
          <span v-if="index != categories.length - 1">, </span>
        </span>
      </span>
    </li>
    <li class="meta-item tag">
      <icon-tag />
      <span class="meta-content">
        <span v-for="(tag, index) in tags" :key="index">
          <a
            href="javascript:void(0);"
            @click="goToLink('/docs/tags', 'tag', tag)"
            target="_self"
            :title="tag"
            >{{ tag }}</a
          >
          <span v-if="index != tags.length - 1">, </span>
        </span>
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from "vue";
import { useData } from "vitepress";
import md5 from "blueimp-md5";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { goToLink } from "../utils.ts";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

// 定义文章属性
const props = defineProps({
  article: {
    type: Object,
    default: () => {},
  },
  showCategory: {
    type: Boolean,
    default: true,
  },
});

// 初始化文章元数据信息
const { theme, page } = useData();
const data = reactive({
  isOriginal: props.article?.isOriginal ?? true,
  author: props.article?.author ?? theme.value.articleMetadataConfig.author,
  authorLink:
    props.article?.authorLink ?? theme.value.articleMetadataConfig.authorLink,
  showViewCount: theme.value.articleMetadataConfig?.showViewCount ?? false,
  viewCount: 0,
  date: new Date(props.article.date),
  categories: props.article?.categories ?? [],
  tags: props.article?.tags ?? [],
  showCategory: props.showCategory,
});
const {
  isOriginal,
  author,
  authorLink,
  showViewCount,
  viewCount,
  date,
  categories,
  tags,
  showCategory,
} = toRefs(data);
// toDate,

if (data.showViewCount) {
  // 记录并获取文章阅读数（使用文章标题 + 发布时间生成 MD5 值，作为文章的唯一标识）
  onMounted(() => {
    //@ts-ignore
    window.$api.getArticleViewCount(
      md5(props.article.title + props.article.date),
      location.href,
      function (viewCountData) {
        data.viewCount = viewCountData;
      }
    );
  });
}
</script>

<style scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
}

.meta-list {
  display: flex;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0;
    color: var(--vp-c-text-2);
    font-size: 14px;

    &.original {
      margin-right: 10px;
    }
  }
}

.meta-content a {
  font-weight: 400;
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.meta-content a:hover {
  color: var(--vp-c-brand-1);
}
</style>
