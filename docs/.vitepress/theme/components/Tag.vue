<template>
  <div class="main-container-tag">
    <!-- 头部 -->
    <div class="tag-header-wrapper">
      <i
        class="tag-breadcrumb-icon iconfont icon-daxiongmaoguojiagongyuan1"
      ></i>
      <span class="tag-breadcrumb-item">我的标签</span>
    </div>

    <!-- 内容 -->
    <div>
      <!-- 标签云 -->
      <WordCloud
        :dataList="dataList"
        :style="{ width: '100%', height: '180px' }"
        @click="handleWordCloudClick"
      />
      <a-row :gutter="24">
        <!-- 标签列表区域 -->
        <a-col :span="24">
          <a-card style="margin-bottom: 10px">
            <a-tag
              @click="toggleTag(tagTitle)"
              v-for="(tag, tagTitle) in articleTags"
              class="tag-item"
              :class="{
                'tag-checkable-checked': selectTag === tagTitle,
              }"
            >
              <template #icon>
                <icon-tags />
              </template>
              <span class="tag-title">{{ tagTitle }}</span>
              <span>{{ tag.length }}</span>
            </a-tag>
          </a-card>
        </a-col>

        <!-- 文章列表区域 -->
        <a-col :span="24">
          <a-list v-if="selectTag">
            <template #header>
              共 {{ articleTags[selectTag].length }} 篇文章
            </template>
            <a-list-item v-for="(article, index) in articleTags[selectTag]">
              <div class="result-item">
                <h3 class="result-item-title">
                  <i
                    class="iconfont iconfont16 icon-daxiongmaoguojiagongyuan1"
                  ></i>
                  <a :href="article.path" class="title" target="_blank">{{
                    article.title
                  }}</a>
                </h3>
                <p class="result-item-description"></p>
                <!-- 文章元数据信息 -->
                <ArticleMetadata :article="article" :key="md5(article.date)" />
              </div>
            </a-list-item>
          </a-list>
          <a-card class="no-result" v-if="!selectTag">
            <a-empty description="点击上方标签，查看标签下的所有文章" />
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import md5 from "blueimp-md5";
import { getQueryParam } from "../utils.ts";
// @ts-ignore
import { data as articleData } from "../../../../article.data.js";

const articleTags = computed(() => initTags(articleData));

// 点击指定Tag后进行选中
const selectTag = ref<any>("");
const toggleTag = (tagTitle: any) => {
  if (selectTag.value && selectTag.value == tagTitle) {
    selectTag.value = null;
  } else {
    selectTag.value = tagTitle;
  }
};

const dataList = computed(() => initWordCloud(articleTags));
/**
 * 初始化词云数据
 * [{"name": xx, "value": xx}]
 */
const initWordCloud = (tags) => {
  const dataList: any[] = [];
  for (let tag in tags.value) {
    dataList.push({ name: tag, value: tags.value[tag].length });
  }
  return dataList;
};

/**
 * 初始化标签数据
 * {tagTitle1: [article1, article2, ...}
 */
const initTags = (articleData) => {
  const tags: any = {};
  for (let i = 0; i < articleData.length; i++) {
    const article = articleData[i];
    const articleTags = article.tags;
    if (Array.isArray(articleTags)) {
      articleTags.forEach((articleTag) => {
        if (!tags[articleTag]) {
          tags[articleTag] = [];
        }
        tags[articleTag].push(article);
        // 文章按发布时间降序排序
        tags[articleTag].sort((a, b) => b.date.localeCompare(a.date));
      });
    }
  }
  return tags;
};

const handleWordCloudClick = (value) => {
  toggleTag(value.data.data.text);
};

onMounted(() => {
  // 如果URL路径有tag参数, 默认选中指定Tag, 例如: /tags?tag=JavaScript
  const urlTag = getQueryParam("tag");
  if (urlTag) {
    toggleTag(urlTag);
  } else {
    toggleTag(Object.keys(articleTags.value)[0]);
  }
});

defineOptions({
  name: "Tag",
});
</script>

<style scoped lang="less">
// /** ---------------Arco样式--------------- */
// /** 卡片样式 */
:deep(.arco-card) {
  background: var(--vp-c-bg);
}

:deep(.arco-card-bordered) {
  border: 1px solid var(--vp-c-gutter);
}

:deep(.arco-card-body) {
  color: var(--vp-c-text-1);
}

// /** 列表样式 */
:deep(.arco-list) {
  color: var(--vp-c-text-1);
}

:deep(.arco-list-bordered) {
  border: 1px solid var(--vp-c-gutter);
}

:deep(.arco-list-split .arco-list-header) {
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-gutter);
}

:deep(.arco-list-split .arco-list-item:not(:last-child)) {
  border-bottom: 1px solid var(--vp-c-gutter);
}

// /** 标签样式 */
:deep(.arco-tag) {
  background-color: var(--vp-c-bg);
}

// /** ---------------自定义样式--------------- */
// /** 头部样式 */
.main-container-tag {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  user-select: none;
  padding: 0 180px;

  .tag-header-wrapper {
    display: flex;
    align-items: center;
    padding: 24px 0;
    margin-bottom: 24px;
    box-shadow: 0 1px 0 0 var(--vp-c-gutter);

    .tag-breadcrumb-icon {
      width: 32px;
      height: 32px;
      font-size: 24px;
      text-align: center;
      line-height: 32px;
      border-radius: 50%;
      border: 1px solid var(--vp-c-divider);
    }

    .tag-breadcrumb-item {
      vertical-align: middle;
      display: inline-block;
      font-size: 16px;
      margin-left: 16px;
    }
  }

  .tag-item {
    color: var(--vp-c-text-1);
    border-radius: 50px;
    line-height: 24px;
    padding: 12px 12px;
    margin: 8px 8px 0 0;
    cursor: pointer;
    border: 1px solid var(--vp-c-gutter);
  }

  .tag-title {
    margin-right: 6px;
    word-break: normal;
    white-space: pre-wrap;
  }

  .tag-checkable-checked {
    border-color: #3384f5;
    color: #1672f3;
  }

  .card-header {
    color: var(--vp-c-text-1);
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

@media (min-width: 1440px) {
  :deep(.VPDoc:not(.has-sidebar) .content) {
    max-width: 1104px;
  }
}

@media (min-width: 960px) {
  :deep(.VPDoc:not(.has-sidebar) .content) {
    max-width: 1104px;
  }
}

:deep(.content-container) {
  max-width: 1104px;
}

// /** 文章列表样式 */
.main-container-tag .no-result {
  text-align: center;

  .icon-nothing {
    font-size: 128px;
  }
}

.result-item-title {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
}

.result-item-description {
  word-wrap: break-word;
  line-height: 22px;
  font-size: 14px;
  margin: 8px 0;
}

.meta-content a {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
</style>
