<template>
  <transition
    name="collapse-transition-app-add"
    v-on="on">
    <slot />
  </transition>
</template>

<script lang="ts" setup>
  import type { RendererElement } from 'vue';
  import { nextTick } from 'vue';

  defineOptions({
    name: 'CollapseTransition',
  });

  const reset = (el: RendererElement) => {
    el.style.maxHeight = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  };

  const on = {
    beforeEnter(el: RendererElement) {
      if (!el.dataset) el.dataset = {};

      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      // console.log('11🚀 ~ beforeEnter ~ el.style:', el);
      // console.log('11🚀 ~ beforeEnter ~ el.style:', el.style);
      // console.log('11🚀 ~ beforeEnter ~ el.style:', el.style.height);
      // console.log('11🚀 ~ beforeEnter ~ el.style:', el.scrollHeigh);
      if (el.style.height) {
        el.dataset.existsHeight = el.style.height;
      }

      // console.log('🚀 ~ beforeEnter ~ el.style.existsHeight:', el.style.existsHeight);
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    },

    enter(el: RendererElement) {
        // console.log('5555🚀 ~ requestAnimationFrame ~ el:', el);
        // console.log('5555🚀 ~ requestAnimationFrame ~ el.dataset:', el.style);
        // console.log('5555🚀 ~ requestAnimationFrame ~ el.dataset:', el.dataset);
        // console.log('5555🚀 ~ requestAnimationFrame ~ el.scrollHeight:', el.scrollHeight);
        requestAnimationFrame(() => {
          // console.log('🚀 ~ requestAnimationFrame ~ el:', el);
          // console.log('🚀 ~ requestAnimationFrame ~ el.dataset:', el.style);
          // console.log('🚀 ~ requestAnimationFrame ~ el.dataset:', el.dataset);
          // console.log('🚀 ~ requestAnimationFrame ~ el.scrollHeight:', el.scrollHeight);

          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.existsHeight) {
            el.style.maxHeight = el.dataset.existsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }

          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = 'hidden';
        });
    },

    afterEnter(el: RendererElement) {
      el.style.maxHeight = '';
      el.style.overflow = el.dataset.oldOverflow;
    },

    enterCancelled(el: RendererElement) {
      reset(el);
    },

    beforeLeave(el: RendererElement) {
      if (!el.dataset) el.dataset = {};
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      // console.log('🚀 ~ beforeLeave ~ el.scrollHeight:', el.scrollHeight);
      el.style.maxHeight = `${el.scrollHeight}px`;
      el.style.overflow = 'hidden';
    },

    leave(el: RendererElement) {
      if (el.scrollHeight !== 0) {
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
    },

    afterLeave(el: RendererElement) {
      reset(el);
    },

    leaveCancelled(el: RendererElement) {
      reset(el);
    },
  };
</script>

<style>
  .collapse-transition-app-add-enter-active {
    transition: all .35s ease-in-out;
  }
  .collapse-transition-app-add-leave-active {
    transition: all .35s ease-in-out;
  }
</style>
