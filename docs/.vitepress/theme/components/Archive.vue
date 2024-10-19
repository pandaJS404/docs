<template>
  <div class="timeline-wrap">
    <!-- 时间轴头部 -->
    <h2 class="timeline-header" @click="goToLink('/docs/docs/archives')">
      <i class="iconfont iconfont22 icon-guidang"></i>
      <span v-if="queryParams.queryCategory"
        >{{ queryParams.queryCategory }}
      </span>
      <span v-else-if="queryParams.queryTag">{{ queryParams.queryTag }} </span>
      <span v-else-if="queryParams.queryYear"
        >{{ queryParams.queryYear }}
      </span>
      共 {{ articleCopyData.length }} 篇，未完待续······
    </h2>

    <a-timeline labelPosition="relative">
      <template v-for="(item, index) in articleCopyData" :key="index">
        <a-timeline-item lineColor="#0eb0c9">
          <template #label>
            <h4 class="time">{{ dayjs(item.date).format("YYYY-MM-DD") }}</h4>
          </template>
          <template #dot>
            <i
              v-if="item.categories.includes('BUG踩坑集')"
              class="timeline-icon iconfont icon-bug"
            ></i>
            <i
              v-else-if="item.categories.includes('随笔记录')"
              class="timeline-icon iconfont icon-auther"
            ></i>
            <i
              v-else-if="item.categories.includes('方案春秋志')"
              class="timeline-icon iconfont icon-daima"
            ></i>
            <IconClockCircle v-else class="timeline-icon" />
          </template>

          <main class="timeline-content">
            <a :href="item.path" class="title" target="_blank">{{
              item.title
            }}</a>
            <ArticleMetadata :article="item" />
          </main>
        </a-timeline-item>
      </template>

      <a-timeline-item dotColor="#0eb0c9" lineColor="#0eb0c9"></a-timeline-item>
    </a-timeline>
  </div>
</template>

<script lang="ts" setup>
import { getQueryParam, goToLink } from "../utils.ts";
//@ts-ignore
import { data as articleData } from "../../../../article.data.js";
import { onMounted, reactive, ref } from "vue";
import dayjs from "dayjs";

// 文章原始数据和归档数据
let articleCopyData;
const archiveData = ref<any>({});

// 要筛选的分类、标签、年份
const queryParams = reactive<any>({
  queryCategory: "",
  queryTag: "",
  queryYear: "",
});

/**
 * 初始化时间轴
 */
const initTimeline = () => {
  articleCopyData = [];

  // 如果URL路径有category或tag或year参数,
  // 默认筛选出指定category或tag或year的文章数据

  // 例如: /docs/archives?category=BUG踩坑集
  // 例如: /docs/archives?tag=JVM
  // 例如: /docs/archives?year=2020
  queryParams.queryCategory = getQueryParam("category") ?? "";
  queryParams.queryTag = getQueryParam("tag") ?? "";
  queryParams.queryYear = getQueryParam("year") ?? "";

  articleCopyData = articleData.filter((item) => {
    return (
      item.categories.includes(queryParams.queryCategory) ||
      item.tags.includes(queryParams.queryTag) ||
      new Date(item.date).getFullYear() == queryParams.queryYear
    );
  });

  if (
    !queryParams.queryCategory &&
    !queryParams.queryTag &&
    !queryParams.queryYear
  ) {
    articleCopyData = [...articleData];
  }

  // 文章数据归档处理
  // 1.对文章数据进行降序排序
  articleCopyData.sort((a, b) => b.date.localeCompare(a.date));
  // 2.按年、月进行归档 暂时不处理
  // for (let i = 0; i < articleCopyData.length; i++) {
  //   const article = articleCopyData[i];
  //   let year = new Date(article.date).getFullYear() + "年";
  //   let month = new Date(article.date).getMonth() + 1 + "月";

  //   if (!archiveData.value[year]) {
  //     archiveData.value[year] = {};
  //   }
  //   if (!archiveData.value[year][month]) {
  //     archiveData.value[year][month] = [];
  //   }

  //   archiveData.value[year][month].push(article);
  // }
};

initTimeline();
onMounted(() => {});
</script>

<style scoped lang="less">
h4 {
  margin: 0;
  color: #333;
}

p {
  margin: 0;
}

h5 {
  margin: 0;
  color: #363636;
}

.time {
  font-size: 18px;
}

:deep(.arco-timeline-item-label) {
  max-width: 130px;
}

:deep(.arco-timeline-item-vertical-left) {
  margin-left: 130px;
}

.timeline-wrap {
  .iconfont22 {
    font-size: 28px;
  }

  .title {
    font-size: 15px;
    color: #363636;
    margin-bottom: 15px;
  }

  .timeline-icon {
    font-size: 24px;
    color: #0eb0c9;
  }

  .timeline-header {
    padding-bottom: 20px;

    .content {
      position: relative;
      left: -17px;
      font-size: 16px;
      font-weight: bold;
    }
  }

  .timeline-content {
    padding-bottom: 20px;
  }

  .timeline-second {
    padding-top: 24px;
    margin-top: 12px;
    border-top: 1px solid #0eb0c9;
  }

  .timeline-item {
    padding: 0 0 0 20px;
    border-left: 1px solid #5d9df0;
    line-height: 1;
    position: relative;

    &:not(:last-child) {
      padding-bottom: 20px;
    }

    .year {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 0.6em;
    }

    .timeline-item-time {
      margin-bottom: 12px;
      width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .month {
      padding: 8px 0 8px 0;
      display: block;
      color: var(--vp-c-text-1);
      font-size: 16px;
      font-weight: bold;
      position: relative;
    }

    .timeline-item-content {
      font-size: 14px;
    }

    .articles {
      line-height: 1;
      padding-top: 7px;
    }
    .articles .article {
      display: block;
      position: relative;
      margin-bottom: 20px;
      line-height: 1.5;
    }

    .articles svg {
      position: absolute;
      left: -27.5px;
      top: 3.5px;
      background: #fff;
      border: 1px solid #84b9e5;
      border-radius: 50%;
      cursor: pointer;
    }

    .articles .article span {
      color: var(--vp-c-text-2);
    }
  }
}
</style>
