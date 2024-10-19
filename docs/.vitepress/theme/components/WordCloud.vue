<template>
  <div id="wordCloud-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeUnmount, PropType } from "vue";
import { WordCloud } from "@antv/g2plot";

// 定义属性
const props = defineProps({
  dataList: {
    type: Array as any,
    default: () => [],
  },
});

const emitClick = defineEmits(["click"]);

// 渲染 WordCloud
let wordCloud;
onMounted(() => {
  wordCloud = new WordCloud("wordCloud-container", {
    data: props.dataList,
    wordField: "name",
    weightField: "value",
    colorField: "name",
    wordStyle: {
      fontFamily: "Verdana",
      fontSize: [14, 35],
      rotation: 0,
    },
    // 返回值设置成一个 [0, 1) 区间内的值，
    // 可以让每次渲染的位置相同（前提是每次的宽高一致）。
    random: () => 0.5,
  });
  wordCloud.on("element:click", (...args) => {
    emitClick("click", ...args);
  });
  wordCloud.render();
});

onBeforeUnmount(() => {
  wordCloud.destroy();
});
</script>
