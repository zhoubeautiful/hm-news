<template>
  <div class="hm-header">
    <div class="back">
      <span @click="$router.go(-1)" class="iconfont iconjiantou2"></span>
    </div>
    <div class="title"><slot></slot></div>
    <div class="extra"></div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hm-header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  line-height: 50px;
  .back,
  .extra {
    width: 40px;
    text-align: center;
  }
  .title {
    flex: 1;
    text-align: center;
    font-size: 15px;
    font-weight: 700;
  }
}
</style>
