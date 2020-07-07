<template>
  <!-- 个人中心页面 -->
  <div class="user">
    <div class="header" @click="$router.push('/userEdit')">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + info.head_img" />
      </div>
      <!-- 个人信息 -->
      <div class="info">
        <p class="name">
          <span class="iconfont iconxingbienv" v-if="info.gender === 0"></span>
          <span class="iconfont iconxingbienan" v-else></span>
          {{ info.nickname }}
        </p>
        <p class="time">{{ info.create_date | time }}</p>
      </div>
      <!-- 右侧返回的图标 -->
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 内容导航栏 -->
    <div class="nav">
      <hm-navbar @click="$router.push('/myfollow')">
        <template>我的关注</template>
        <template #content>关注的用户</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/mycomment')">
        <template>我的跟帖</template>
        <template #content>跟帖/回复</template>
      </hm-navbar>
      <hm-navbar>
        <template>我的收藏</template>
        <template #content>文章/视频</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/userEdit')">设置</hm-navbar>
      <hm-navbar @click="logout">退出</hm-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    // 拿到本地存储里的id
    const userId = localStorage.getItem('userId')
    // const token = localStorage.getItem('token')
    // // 发送请求
    // const res = await this.$axios.get(`/user/${userId}`, {
    //   // 配置请求头
    //   headers: {
    //     Authorization: token
    //   }
    // })
    const res = await this.$axios.get(`/user/${userId}`)
    console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '亲，你确定要退出这个系统吗？'
        })
        // 点击确定走的代码：
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    height: 120px;
    border-bottom: 3px solid #ccc;
    align-items: center;
    padding: 0 20px;
    .avatar {
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
      padding-left: 20px;
      font-size: 14px;
      color: #333;
      .name {
        margin-bottom: 10px;
        .iconxingbienv {
          color: #f23ebf;
        }
        .iconxingbienan {
          color: #80bbe4;
        }
      }
      .time {
        color: #999;
      }
    }
  }
  .nav {
    padding-left: 20px;
  }
}
</style>
