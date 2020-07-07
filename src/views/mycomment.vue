<template>
  <div class="mycomment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <!--
        上拉加载更多的列表组件
        finished-text: 没有更多数据的提示
        finished： 是一个布尔值，指定是否还有更多数据  默认为false
        loading: 是一个布尔值， 指定当前list是否在加载数据  false
        load事件： 当滚动条滚动到底部，触发load事件
        :immediate-check="false": 页面一加载，不触发load事件
      -->
      <van-list
        :finished="finished"
        v-model="loading"
        @load="onLoad"
        finished-text="没有更多了"
        :immediate-check="false"
        offset="10"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <p class="time">{{ item.create_date | time('YYYY-MM-DD HH:mm') }}</p>
          <!-- 父评论 -->
          <div class="parent" v-if="item.parent">
            <p>回复：{{ item.parent.user.nickname }}</p>
            <p>{{ item.parent.content }}</p>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="link">
            <span class="one-txt-cut">原文：{{ item.post.title }}</span>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      // 是否全部数据都加载完了
      finished: false,
      // 指定list是否在加载数据
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      // get请求要携带参数，需要使用params内
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        /** 在load事件触发时，因为下面将 this.list = data，
        第二次触发load事件时data覆盖了第一次的list，所以每一次都只显示五条数据，
        两个数组之间的追加用  展开符 */
        this.list = [...this.list, ...data]
        // 下一次加载再执行
        this.loading = false
        /** 请求完所有的数据后，结束load事件，判断条件：因为data中设置的每次请求一页，一页五条数据，
         * 所以如果当前页获取到的数据小于五条，那么就说明没有数据了 */
        if (data.length < this.pageSize) {
          this.finished = true
        }

        // // 存起来，此处的list是指没刷新前显示的五条数据，data指的是刷新后显示的五条数据，将他们拼在一起
        // this.list = data
      }
      console.log(this.list)
    },
    onLoad() {
      // 在页面中让页码值自动+1
      setTimeout(() => {
        this.pageIndex++
        // 发送请求
        this.getList()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.mycomment {
  font-size: 14px;
  .item {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    .time {
      color: #999;
      line-height: 40px;
    }
    .parent {
      background-color: #ddd;
      padding: 10px;
      color: #999;
      line-height: 30px;
    }
    .content {
      margin: 20px 0;
    }
    .link {
      color: #999;
      display: flex;
      justify-content: space-between;
      span:first-child {
        width: 60%;
      }
    }
  }
}
</style>
