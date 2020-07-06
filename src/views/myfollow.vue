<template>
  <div class="myfollow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" />
        </div>
        <div class="center">
          <p>{{ item.nickname }}</p>
          <p class="time">{{ item.create_date | time }}</p>
        </div>
        <div class="right">
          <van-button round type="warning" @click="unFollow(item.id)">
            取消关注</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    getList() {}
  }
}
</script>

<style lang="less" scoped>
.list {
  .item {
    border-bottom: 1px solid #ccc;
    height: 100px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    .left {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      font-size: 14px;
      .time {
        color: #999;
        margin-top: 5px;
      }
    }
    .van-button {
      width: 80px;
      height: 40px;
      font-size: 12px;
    }
  }
}
</style>
