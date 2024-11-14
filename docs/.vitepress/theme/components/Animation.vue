<template>
  <div class="page-container">
    <n-flex>
      <n-button type="info" @click="handleDealStatus(true)">全部开始</n-button>
      <n-button type="error" @click="handleDealStatus(true)">全部结束</n-button>
      <n-button @click="goToLink('/docs/categories/tools/2024/11/14/动画css')"
        >查看</n-button
      >
    </n-flex>
    <ul class="animation-box">
      <li class="animation-box" v-for="item in animation" :key="item.name">
        <div>
          <n-button
            :type="item.start ? 'error' : 'info'"
            @click="item.start = !item.start"
            >{{ item.start ? "停止" : "开始" }}</n-button
          >
        </div>
        <div class="box" :class="{ [item.className]: item.start }"></div>
        <div>{{ item.name }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { goToLink } from "../utils";

const animation = ref<any>([
  { className: "a-fadein", name: "淡入", start: false },
  { className: "a-fadeinT", name: "淡入-从上", start: false },
  { className: "a-fadeinR", name: "淡入-从右", start: false },
  { className: "a-fadeinB", name: "淡入-从下", start: false },
  { className: "a-fadeinL", name: "淡入-从左", start: false },
  { className: "a-fadeout", name: "淡出", start: false },
  { className: "a-fadeoutT", name: "淡出-向上", start: false },
  { className: "a-fadeoutR", name: "淡出-向右", start: false },
  { className: "a-fadeoutB", name: "淡出-向下", start: false },
  { className: "a-fadeoutL", name: "淡出-向左", start: false },
  { className: "a-bounce", name: "弹跳", start: false },
  { className: "a-bouncein", name: "弹入", start: false },
  { className: "a-bounceinT", name: "弹入-从上", start: false },
  { className: "a-bounceinR", name: "弹入-从右", start: false },
  { className: "a-bounceinB", name: "弹入-从下", start: false },
  { className: "a-bounceinL", name: "弹入-从左", start: false },
  { className: "a-bounceout", name: "弹出", start: false },
  { className: "a-bounceoutT", name: "弹出-向上", start: false },
  { className: "a-bounceoutR", name: "弹出-向右", start: false },
  { className: "a-bounceoutB", name: "弹出-向下", start: false },
  { className: "a-bounceoutL", name: "弹出-向左", start: false },
  { className: "a-rotatein", name: "转入", start: false },
  { className: "a-rotateinT", name: "转入-向上", start: false },
  { className: "a-rotateinR", name: "转入-向右", start: false },
  { className: "a-rotateinB", name: "转入-向下", start: false },
  { className: "a-rotateinL", name: "转入-向左", start: false },
  { className: "a-rotateout", name: "转出", start: false },
  { className: "a-rotateoutT", name: "转出-向上", start: false },
  { className: "a-rotateoutR", name: "转出-向右", start: false },
  { className: "a-rotateoutB", name: "转出-向下", start: false },
  { className: "a-rotateoutL", name: "转出-向左", start: false },
  { className: "a-flip", name: "翻转", start: false },
  { className: "a-flipinX", name: "翻入-X轴", start: false },
  { className: "a-flipin a-flipinY", name: "翻入-Y轴", start: false },
  { className: "a-flipoutX", name: "翻出-X轴", start: false },
  { className: "a-flipin a-flipoutY", name: "翻出-Y轴", start: false },
  { className: "a-flash", name: "闪烁", start: false },
  { className: "a-shake", name: "震颤", start: false },
  { className: "a-swing", name: "摇摆", start: false },
  { className: "a-wobble", name: "摇晃", start: false },
  { className: "a-ring", name: "震铃", start: false },
]);

const handleDealStatus = (status: boolean) => {
  animation.value.forEach((item) => {
    item.start = status;
  });
};

defineOptions({
  name: "Animation",
});
</script>

<style scoped lang="less">
.page-container {
  width: 100%;
  min-height: 100vh;
  padding: 0 180px;
  background-image: linear-gradient(135deg, #a7cee0 50%, #d0dea7);

  .animation-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    gap: 15px;
    padding: 10px 0;

    .animation-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-content: center;
      align-items: center;

      /* 实现一行放m个，并且列间距是n */
      /* 一行放5个，并且间距是20px */
      /* calc((100% - (m - 1) * npx) / m) */
      width: calc((100% - (5 - 1) * 15px) / 5);
      height: 258px;
      padding: 10px;
      box-sizing: border-box;
      cursor: pointer;

      backdrop-filter: blur(4.5px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(4.5px);
      border-radius: 10px;
      color: #fff;

      .box {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ffb566, #f67);

        animation-iteration-count: infinite;
        animation-duration: 3s;
        animation-play-state: running;

        &:hover {
          animation-play-state: paused;
        }
      }
    }
  }
}
</style>
