<template>
  <div class="hm-navbar" @click="clickFn">
    <div class="title">
      <slot></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 只是触发，具体操作未知
    clickFn() {
      console.log('123')
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  padding-right: 20px;
  line-height: 50px;
  font-size: 16px;
  .content {
    flex: 1;
    text-align: right;
    color: #999;
  }
  .arrow {
    padding-left: 10px;
    font-size: 16px;
  }
}
</style>
