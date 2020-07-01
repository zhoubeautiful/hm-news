<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <!-- 表单 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        placeholder="请输入用户名/手机号"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名只能是5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\d{3,6}$/,
            message: '密码必须是3-6位',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      console.log(123)

      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$router.push('/')
        this.$toast.success(message)
        // 保存token
        localStorage.setItem('token', data.token)
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style></style>
