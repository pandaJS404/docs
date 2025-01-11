---
title: uni-app组件 select 多选
description: uni-app组件 select 多选
author: PandaJS
date: 2025/01/03 22:25
categories:
  - BUG 踩坑集
tags:
  - JavaScript
  - uni-app
  - uni-data-select
---

# uni-app 组件 uni-data-select 多选扩展

## 问题描述

![image-2025-01-03](/img/2025/01/03/1735896966332.png)

:::tip

- @property {String} value 默认值
- @property {Array} localdata 本地数据 ，格式 [{text:'',value:''}]
- @property {Boolean} clear 是否可以清空已选项
- @property {Boolean} emptyText 没有数据时显示的文字 ，本地数据无效
- @property {String} label 左侧标题
- @property {String} placeholder 输入框的提示文字
- @property {Boolean} disabled 是否禁用
- @event {Function} change 选中发生变化触发

:::

1. uni-data-select 组件在 uni-app 中无法实现多选，只能单选。

```vue
<template>
  <view class="uni-stat__select">
    <text v-if="label" class="uni-label-text">{{ label + "：" }}</text>
    <view class="uni-stat-box" :class="{ 'uni-stat__actived': current }">
      <view
        class="uni-select"
        :style="{ height: multiple ? '100%' : ' 35px;' }"
        :class="{ 'uni-select--disabled': disabled }"
      >
        <view
          class="uni-select__input-box"
          :style="{ height: multiple ? '100%' : '35px;' }"
          @click="toggleSelector"
        >
          <view
            class=""
            style="display: flex;flex-wrap: wrap;width: 100%;"
            v-if="multiple && current.length > 0"
          >
            <view
              class="tag-calss"
              v-for="(item, index) in collapseTags
                ? current.slice(0, collapseTagsNum)
                : current"
              :key="item[dataValue]"
            >
              <text class="text">{{ item[dataKey] }}</text>
              <view class="" @click.stop="delItem(item)">
                <uni-icons
                  type="clear"
                  style="margin-left: 4px;"
                  color="#c0c4cc"
                />
              </view>
            </view>
            <view
              v-if="current.length > collapseTagsNum && collapseTags"
              class="tag-calss"
            >
              <text class="text">+{{ current.length - collapseTagsNum }}</text>
            </view>
          </view>
          <view
            v-else-if="current && current.length > 0 && !filterable"
            class="uni-select__input-text"
            >{{ current }}
          </view>
          <input
            v-else-if="filterable"
            class="uni-select__input-text"
            type="text"
            style="font-size: 12px;"
            :placeholder="placeholderOld"
            v-model="current"
          />
          <view
            v-else
            class="uni-select__input-text uni-select__input-placeholder"
            >{{ typePlaceholder }}</view
          >
          <uni-icons
            v-if="current && clear"
            type="clear"
            color="#c0c4cc"
            size="24"
            @click="clearVal"
          />
          <uni-icons
            v-else
            :type="showSelector ? 'top' : 'bottom'"
            size="14"
            color="#999"
          />
        </view>
        <view
          class="uni-select--mask"
          v-if="showSelector"
          @click="toggleSelector"
        />
        <view class="uni-select__selector" v-if="showSelector">
          <view class="uni-popper__arrow"></view>
          <scroll-view scroll-y="true" class="uni-select__selector-scroll">
            <view
              class="uni-select__selector-empty"
              v-if="filterMixinDatacomResData.length === 0"
            >
              <text>{{ emptyTips }}</text>
            </view>
            <view
              v-else
              class="uni-select__selector-item"
              style="display: flex;justify-content: space-between;align-items: center;"
              v-for="(item, index) in filterMixinDatacomResData"
              :key="index"
              @click="change(item)"
            >
              <text
                :class="{ 'uni-select__selector__disabled': item.disable }"
                >{{ formatItemName(item) }}</text
              >
              <uni-icons
                v-if="multiple && currentArr.includes(item[dataValue])"
                type="checkmarkempty"
                color="#007aff"
              />
            </view>
          </scroll-view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
/**
 * DataChecklist 数据选择器
 * @description 通过数据渲染的下拉框组件
 * @tutorial https://uniapp.dcloud.io/component/uniui/uni-data-select
 * @property {String} value 默认值
 * @property {Array} localdata 本地数据 ，格式 [{text:'',value:''}]
 * @property {Boolean} clear 是否可以清空已选项
 * @property {Boolean} emptyText 没有数据时显示的文字 ，本地数据无效
 * @property {String} label 左侧标题
 * @property {String} placeholder 输入框的提示文字
 * @property {Boolean} disabled 是否禁用
 * @event {Function} change  选中发生变化触发
 */

export default {
  name: "my-selectCheckbox",
  mixins: [uniCloud.mixinDatacom || {}],
  props: {
    collapseTagsNum: {
      type: Number,
      default: 1,
    },
    collapseTags: {
      type: Boolean,
      default: false,
    },
    dataKey: {
      type: [String],
      default: "text",
    },
    dataValue: {
      type: [String],
      default: "value",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    localdata: {
      type: Array,
      default() {
        return [];
      },
    },
    // #ifndef VUE3
    value: {
      type: [String, Number, Array],
      default: "",
    },
    // #endif
    // #ifdef VUE3
    modelValue: {
      type: [String, Number, Array],
      default: "",
    },
    // #endif
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    emptyTips: {
      type: String,
      default: "无选项",
    },
    clear: {
      type: Boolean,
      default: true,
    },
    defItem: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 格式化输出 用法 field="_id as value, version as text, uni_platform as label" format="{label} - {text}"
    format: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showSelector: false,
      current: [],
      mixinDatacomResData: [],
      apps: [],
      channels: [],
      cacheKey: "uni-data-select-lastSelectedValue",
      placeholderOld: "",
      currentArr: [],
    };
  },
  created() {
    if (this.multiple) {
      // #ifndef VUE3
      this.currentArr = this.value || [];
      // #endif
      // #ifdef VUE3
      this.currentArr = this.modelValue || [];
      // #endif
      if (!this.current) {
        this.current = [];
      }
      // #ifndef VUE3
      if (
        this.value &&
        this.value.length > 0 &&
        this.filterMixinDatacomResData.length > 0
      ) {
        this.value.forEach((item) => {
          let current = this.filterMixinDatacomResData.find(
            (e) => e[this.dataValue] == item
          );
          this.current.push(current);
        });
      }
      // #endif
      // #ifdef VUE3
      if (
        this.modelValue &&
        this.modelValue.length > 0 &&
        this.filterMixinDatacomResData.length > 0
      ) {
        this.modelValue.forEach((item) => {
          let current = this.filterMixinDatacomResData.find(
            (e) => e[this.dataValue] == item
          );
          this.current.push(current);
        });
      }
      // #endif
    } else {
      // #ifndef VUE3
      if (this.value) {
        this.current = this.formatItemName(
          this.filterMixinDatacomResData.find(
            (e) => e[this.dataValue] == this.value
          )
        );
      }
      // #endif
      // #ifdef VUE3
      if (this.modelValue) {
        this.current = this.formatItemName(
          this.filterMixinDatacomResData.find(
            (e) => e[this.dataValue] == this.modelValue
          )
        );
      }
      // #endif
    }
    this.placeholderOld = this.placeholder;
    this.debounceGet = this.debounce(() => {
      this.query();
    }, 300);
    if (this.collection && !this.localdata.length) {
      this.debounceGet();
    }
  },
  computed: {
    filterMixinDatacomResData() {
      if (this.filterable && this.current) {
        return this.mixinDatacomResData.filter((e) =>
          e[this.dataKey].includes(this.current)
        );
      } else {
        return this.mixinDatacomResData;
      }
    },
    typePlaceholder() {
      const text = {
        "opendb-stat-app-versions": "版本",
        "opendb-app-channels": "渠道",
        "opendb-app-list": "应用",
      };
      const common = this.placeholder;
      const placeholder = text[this.collection];
      return placeholder ? common + placeholder : common;
    },
    valueCom() {
      // #ifdef VUE3
      return this.modelValue;
      // #endif
      // #ifndef VUE3
      return this.value;
      // #endif
    },
  },
  watch: {
    localdata: {
      immediate: true,
      handler(val, old) {
        if (Array.isArray(val) && old !== val) {
          this.mixinDatacomResData = val;
        }
      },
    },
    valueCom(val, old) {
      this.initDefVal();
    },
    mixinDatacomResData: {
      immediate: true,
      handler(val) {
        if (val.length) {
          this.initDefVal();
        }
      },
    },
    modelValue(val) {
      if (this.multiple) {
        this.currentArr = val;
      }
      // if (this.multiple && val && val.length > 0) {
      //   this.currentArr = val;
      //   if (!this.current) {
      //     this.current = [];
      //   }
      //   val.forEach((item) => {
      //     let current = this.filterMixinDatacomResData.find(
      //       (e) => e[this.dataValue] == item
      //     );
      //     this.current.push(current);
      //   });
      // } else {
      //   if (val) {
      //     this.current = this.formatItemName(
      //       this.filterMixinDatacomResData.find((e) => e[this.dataValue] == val)
      //     );
      //   }
      // }
    },
    // value(val) {
    //  if (this.multiple && val && val.length > 0) {
    //   this.currentArr = val
    //   if (!this.current) {
    //    this.current = []
    //   }
    //   val.forEach(item => {
    //    let current = this.filterMixinDatacomResData.find(e =>
    //     e[this.dataValue] == item
    //    )
    //    this.current.push(current)
    //   })
    //  } else {
    //   if (val) {
    //    this.current = this.formatItemName(this.filterMixinDatacomResData.find(e =>
    //     e[this.dataValue] == val
    //    ))
    //   }
    //  }

    // }
  },
  methods: {
    debounce(fn, time = 100) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, time);
      };
    },
    // 执行数据库查询
    query() {
      this.mixinDatacomEasyGet();
    },
    // 监听查询条件变更事件
    onMixinDatacomPropsChange() {
      if (this.collection) {
        this.debounceGet();
      }
    },
    initDefVal() {
      let defValue = "";
      if (
        (this.valueCom || this.valueCom === 0) &&
        !this.isDisabled(this.valueCom)
      ) {
        defValue = this.valueCom;
      } else {
        let strogeValue;
        if (this.collection) {
          strogeValue = this.getCache();
        }
        if (strogeValue || strogeValue === 0) {
          defValue = strogeValue;
        } else {
          let defItem = "";
          if (
            this.defItem > 0 &&
            this.defItem <= this.mixinDatacomResData.length
          ) {
            defItem =
              this.mixinDatacomResData[this.defItem - 1][this.dataValue];
          }
          defValue = defItem;
        }
        if (defValue || defValue === 0) {
          this.emit(defValue);
        }
      }
      if (this.multiple) {
        this.current = [];
        defValue.forEach((item) => {
          let current = this.filterMixinDatacomResData.find(
            (e) => e[this.dataValue] == item
          );
          this.current.push(current);
        });
      } else {
        const def = this.mixinDatacomResData.find(
          (item) => item[this.dataValue] === defValue
        );
        this.current = def ? this.formatItemName(def) : "";
      }
    },

    /**
     * @param {[String, Number]} value
     * 判断用户给的 value 是否同时为禁用状态
     */
    isDisabled(value) {
      let isDisabled = false;

      this.mixinDatacomResData.forEach((item) => {
        if (item[this.dataValue] === value) {
          isDisabled = item.disable;
        }
      });

      return isDisabled;
    },

    clearVal() {
      if (this.multiple) {
        this.current = [];
        this.currentArr = [];
        this.emit([]);
      } else {
        this.current = "";
        this.currentArr = [];
        this.emit("");
      }
      if (this.collection) {
        this.removeCache();
      }
      this.placeholderOld = this.placeholder;
    },
    change(item) {
      if (!item.disable) {
        if (!this.multiple) {
          this.showSelector = false;
        }
        if (this.multiple) {
          if (!this.current) {
            this.current = [];
          }
          if (!this.currentArr) {
            this.currentArr = [];
          }
          if (this.currentArr.includes(item[this.dataValue])) {
            let index = this.current.findIndex((e) => {
              return e[this.dataValue] == item[this.dataValue];
            });
            this.current.splice(index, 1);
            this.currentArr.splice(index, 1);
            this.emit(this.current);
          } else {
            this.current.push(item);
            this.currentArr.push(item[this.dataValue]);
            this.emit(this.current);
          }
        } else {
          this.current = this.formatItemName(item);
          this.emit(item[this.dataValue]);
        }
      }
    },
    delItem(item) {
      if (this.currentArr.includes(item[this.dataValue])) {
        let index = this.current.findIndex((e) => {
          return e[this.dataValue] == item[this.dataValue];
        });
        this.current.splice(index, 1);
        this.currentArr.splice(index, 1);
        this.emit(this.current);
      }
    },
    emit(val) {
      this.$emit("change", val);
      if (this.multiple) {
        this.$emit("input", this.currentArr);
        this.$emit("update:modelValue", this.currentArr);
      } else {
        this.$emit("input", val);
        this.$emit("update:modelValue", val);
      }
      if (this.collection) {
        this.setCache(val);
      }
    },
    toggleSelector() {
      if (this.disabled) {
        return;
      }
      if (
        this.filterable &&
        this.current &&
        this.mixinDatacomResData.findIndex((e) => {
          return e[this.dataKey] == this.current;
        }) < 0
      ) {
        this.current = "";
      }
      this.showSelector = !this.showSelector;
      if (this.filterable && this.current && this.showSelector) {
        this.placeholderOld = this.current;
        this.current = "";
      } else if (this.filterable && !this.current && !this.showSelector) {
        if (this.placeholderOld != this.placeholder) {
          this.current = this.placeholderOld;
        }
      }
    },
    formatItemName(item) {
      if (!item) {
        return "";
      }
      let text = item[this.dataKey];
      let value = item[this.dataValue];
      let { channel_code } = item;
      channel_code = channel_code ? `(${channel_code})` : "";
      if (this.format) {
        // 格式化输出
        let str = "";
        str = this.format;
        for (let key in item) {
          str = str.replace(new RegExp(`{${key}}`, "g"), item[key]);
        }
        return str;
      } else {
        return this.collection.indexOf("app-list") > 0
          ? `${text}(${value})`
          : text
          ? text
          : `未命名${channel_code}`;
      }
    },
    // 获取当前加载的数据
    getLoadData() {
      return this.mixinDatacomResData;
    },
    // 获取当前缓存key
    getCurrentCacheKey() {
      return this.collection;
    },
    // 获取缓存
    getCache(name = this.getCurrentCacheKey()) {
      let cacheData = uni.getStorageSync(this.cacheKey) || {};
      return cacheData[name];
    },
    // 设置缓存
    setCache(value, name = this.getCurrentCacheKey()) {
      let cacheData = uni.getStorageSync(this.cacheKey) || {};
      cacheData[name] = value;
      uni.setStorageSync(this.cacheKey, cacheData);
    },
    // 删除缓存
    removeCache(name = this.getCurrentCacheKey()) {
      let cacheData = uni.getStorageSync(this.cacheKey) || {};
      delete cacheData[name];
      uni.setStorageSync(this.cacheKey, cacheData);
    },
  },
};
</script>

<style lang="scss">
$uni-base-color: #6a6a6a !default;
$uni-main-color: #333 !default;
$uni-secondary-color: #909399 !default;
$uni-border-3: #e5e5e5;

/* #ifndef APP-NVUE */
@media screen and (max-width: 500px) {
  .hide-on-phone {
    display: none;
  }
}

/* #endif */
.uni-stat__select {
  display: flex;
  align-items: center;
  // padding: 15px;
  cursor: pointer;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
}

.uni-stat-box {
  width: 100%;
  flex: 1;
}

.uni-stat__actived {
  width: 100%;
  flex: 1;
  // outline: 1px solid #2979ff;
}

.uni-label-text {
  font-size: 14px;
  font-weight: bold;
  color: $uni-base-color;
  margin: auto 0;
  margin-right: 5px;
}

.uni-select {
  font-size: 14px;
  border: 1px solid $uni-border-3;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 5px;
  padding-left: 10px;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  user-select: none;
  /* #endif */
  flex-direction: row;
  align-items: center;
  border-bottom: solid 1px $uni-border-3;
  width: 100%;
  flex: 1;
  height: 35px;
  min-height: 35px;

  &--disabled {
    background-color: #f5f7fa;
    cursor: not-allowed;
  }
}

.uni-select__label {
  font-size: 16px;
  // line-height: 22px;
  min-height: 35px;
  height: 35px;
  padding-right: 10px;
  color: $uni-secondary-color;
}

.uni-select__input-box {
  height: 35px;
  position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex: 1;
  flex-direction: row;
  align-items: center;

  .tag-calss {
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft
        YaHei, SimSun, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    font-size: 12px;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    white-space: nowrap;
    height: 24px;
    padding: 0 4px 0px 8px;
    line-height: 22px;
    box-sizing: border-box;
    margin: 2px 0 2px 6px;
    display: flex;
    max-width: 100%;
    align-items: center;
    background-color: #f4f4f5;
    border-color: #e9e9eb;
    color: #909399;

    .text {
      font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft
          YaHei, SimSun, sans-serif;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      -webkit-tap-highlight-color: transparent;
      font-size: 12px;
      white-space: nowrap;
      line-height: 22px;
      color: #909399;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.uni-select__input {
  flex: 1;
  font-size: 14px;
  height: 22px;
  line-height: 22px;
}

.uni-select__input-plac {
  font-size: 14px;
  color: $uni-secondary-color;
}

.uni-select__selector {
  /* #ifndef APP-NVUE */
  box-sizing: border-box;
  /* #endif */
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 3;
  padding: 4px 0;
}

.uni-select__selector-scroll {
  /* #ifndef APP-NVUE */
  max-height: 200px;
  box-sizing: border-box;
  /* #endif */
}

.uni-select__selector-empty,
.uni-select__selector-item {
  /* #ifndef APP-NVUE */
  display: flex;
  cursor: pointer;
  /* #endif */
  line-height: 35px;
  font-size: 14px;
  text-align: center;
  /* border-bottom: solid 1px $uni-border-3; */
  padding: 0px 10px;
}

.uni-select__selector-item:hover {
  background-color: #f9f9f9;
}

.uni-select__selector-empty:last-child,
.uni-select__selector-item:last-child {
  /* #ifndef APP-NVUE */
  border-bottom: none;
  /* #endif */
}

.uni-select__selector__disabled {
  opacity: 0.4;
  cursor: default;
}

/* picker 弹出层通用的指示小三角 */
.uni-popper__arrow,
.uni-popper__arrow::after {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 6px;
}

.uni-popper__arrow {
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  top: -6px;
  left: 10%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #ebeef5;
}

.uni-popper__arrow::after {
  content: " ";
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: #fff;
}

.uni-select__input-text {
  // width: 280px;
  width: 100%;
  color: $uni-main-color;
  white-space: nowrap;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  overflow: hidden;
}

.uni-select__input-placeholder {
  color: $uni-base-color;
  font-size: 12px;
}

.uni-select--mask {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
</style>
```

![image-2025-01-03](/img/2025/01/03/1735896711691.png)

2. 使用方法

```html
<template>
  <view>
    <uni-section title="基础多选" type="line">
      <view class="uni-px-5 uni-pb-5">
        <mySelectCheckbox
          v-model="value1"
          multiple
          dataKey="label"
          dataValue="value"
          :localdata="data"
          @change="change"
        ></mySelectCheckbox>
      </view>
    </uni-section>
    <uni-section title="基础多选(合并)" type="line">
      <view class="uni-px-5 uni-pb-5">
        <mySelectCheckbox
          v-model="value1"
          collapse-tags
          multiple
          dataKey="label"
          dataValue="value"
          :localdata="data"
          @change="change"
        ></mySelectCheckbox>
      </view>
    </uni-section>
    <uni-section
      title="基础多选(可通过collapse-tags-num设置超过数量省略)"
      type="line"
    >
      <view class="uni-px-5 uni-pb-5">
        <mySelectCheckbox
          v-model="value1"
          collapse-tags
          :collapse-tags-num="3"
          multiple
          dataKey="label"
          dataValue="value"
          :localdata="data"
          @change="change"
        ></mySelectCheckbox>
      </view>
    </uni-section>
  </view>
</template>
<script>
  import mySelectCheckbox from "../../components/my-selectCheckbox.vue";
  export default {
    components: { mySelectCheckbox },
    data() {
      return {
        value1: ["选项1"],
        data: [],
      };
    },
    watch: {
      value1(newval) {
        console.log("newval", newval);
      },
    },
    created() {
      setTimeout(() => {
        this.data = [
          {
            value: "1",
            label: "测试1",
          },
          {
            value: "2",
            label: "测试2",
          },
          {
            value: "3",
            label: "测试3",
          },
          {
            value: "4",
            label: "测试4",
          },
          {
            value: "5",
            label: "测试5",
          },
          {
            value: "6",
            label: "测试6",
          },
          {
            value: "7",
            label: "测试7",
          },
        ];
      }, 1000);
    },
    methods: {
      change(e) {
        console.log("e:", e);
      },
    },
  };
</script>

<style></style>
```

## 注意事项

![image-2025-01-03](/img/2025/01/03/1735896739170.png)
组件默认开启 cursor: pointer; 样式，会出现点击效果 蓝色背景覆盖
取消 cursor: pointer; 样式，可取消蓝色背景覆盖
