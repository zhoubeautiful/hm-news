<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box" @click="$router.push('/search')">
          <span class="iconfont iconsearch">搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key="item.id">
        <hmpost v-for="post in postList" :key="post.id" :post="post"></hmpost>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      // 存放到栏目列表
      tabList: [],
      pageIndex: 1,
      pageSize: 10,
      postList: []
    }
  },
  created() {
    this.getTabList()
  },
  methods: {
    async getTabList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // 所有栏目
        this.tabList = data
        console.log(this.tabList)
        // 获取到栏目数据之后，获取第一个栏目的文章
        this.getPostList(this.tabList[0].id)
      }
    },
    // 封装一个方法，获取对应栏目下的文章数据
    // 获取文章列表   id:栏目的id
    async getPostList(id) {
      console.log('我需要获取栏目', id, '的文章')
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = data
        console.log(this.postList)
      }
      // console.log(res)
    }
  },
  watch: {
    active(value) {
      console.log(value)
      // 栏目发生改变，重新发送请求加载文章数据,所有栏目下的value的下标的id
      this.getPostList(this.tabList[value].id)
    }
  }
}
</script>

<style lang='less' scoped>
.home {
  .header {
    height: 54px;
    line-height: 54px;
    background-color: #ff0000;
    display: flex;
    padding: 0 10px;
    text-align: center;
    color: #fff;
    .search {
      padding: 0 10px;
      flex: 1;
      .search-box {
        background-color: rgba(255, 255, 255, 0.5);
        height: 34px;
        line-height: 34px;
        margin-top: 10px;
        border-radius: 17px;
        font-size: 14px;
        span {
          margin-right: 5px;
        }
      }
    }
    .logo,
    .user {
      width: 50px;
    }
    .logo {
      span {
        font-size: 50px;
      }
    }
    .user {
      span {
        font-size: 24px;
      }
    }
  }
  /deep/ .van-tabs__line {
    background-color: lightgreen;
  }
}
</style>
