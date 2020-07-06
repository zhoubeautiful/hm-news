<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" />
      <van-uploader :after-read="afterRead" />
    </div>
    <div class="nav">
      <hm-navbar @click="showNickName">
        <template>昵称</template>
        <template #content>{{ info.nickname }}</template>
      </hm-navbar>
      <hm-navbar @click="showPassword">
        <template>密码</template>
        <template #content>***</template>
      </hm-navbar>
      <hm-navbar @click="showGenderFn">
        <template>性别</template>
        <template #content>{{ info.gender == 0 ? '女' : '男' }}</template>
      </hm-navbar>
    </div>
    <!-- 模态框，show是控制模态框显示与隐藏的,confirm是确认按钮的点击事件 -->
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="editNickName"
    >
      <van-field v-model="nickname" placeholder="请输入用户新昵称" />
    </van-dialog>
    <!-- 修改密码 -->
    <van-dialog
      v-model="showPwd"
      title="修改密码"
      show-cancel-button
      @confirm="editPassword"
    >
      <van-field v-model="password" placeholder="请输入用户新密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog
      v-model="showGender"
      title="修改性别"
      show-cancel-button
      @confirm="editGender"
    >
      <van-radio-group v-model="gender" direction="horizontal">
        <van-radio :name="1">男</van-radio>
        <van-radio :name="0">女</van-radio>
      </van-radio-group>
    </van-dialog>
    <!-- 显示裁剪框 -->
    <div class="mask" v-show="isShowMask">
      <van-button type="primary" @click="crop">裁剪</van-button>
      <van-button type="danger" @click="cancel">取消</van-button>
      <VueCropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        autoCropWidth="150"
        autoCropHeight="150"
        :fixed="true"
        :fixedNumber="[1, 1]"
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      // 接收浏览器内的信息
      info: {},
      show: false,
      nickname: '',
      showPwd: false,
      password: '',
      showGender: false,
      gender: 1,
      isShowMask: false,
      img: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    showNickName() {
      this.show = true
      this.nickname = this.info.nickname
    },
    // 封装
    async editUser(data) {
      // 修改信息需要拿到用户的id
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      console.log(res)
      // 成功后的代码
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        //  重新渲染getinfo内的数据
        this.getInfo()
      } else {
        this.$toast.fail(message)
      }
    },
    async editNickName() {
      this.editUser({ nickname: this.nickname })
    },
    showPassword() {
      this.showPwd = true
      this.password = this.info.password
    },
    async editPassword() {
      this.editUser({ password: this.password })
    },
    showGenderFn() {
      this.showGender = true
      this.gender = this.info.gender
    },
    async editGender() {
      this.editUser({ gender: this.gender })
    },
    async afterRead(file) {
      console.log(file)
      this.isShowMask = true
      this.img = file.content
      // const isLomit = file.file.size / 1024 >= 20
      // if (isLomit) {
      //   this.$toast.fail('上传的图片大小不能超过20kb')
      //   return
      // }
      // 原生ajax发送请求：
      // const xhr = new XMLHttpRequest()
      // 发送请求
      // xhr.open('post', 'http://localhost:3000/upload')
      // // 需要上传的文件数据放入foremdata中，允许上传二进制的数据
      // const fd = new FormData()
      // 文件名，第一个file是组件提供的，要得到的是file里的file文件
      // fd.append('file', file.file)
      // xhr.setRequestHeader('Authorization', localStorage.getItem('token'))
      // xhr.send(fd)
      // ajax为4的时候才触发
      // xhr.onload = function() {
      //   if (xhr.status === 200) {
      //     console.log(xhr.responseText)
      //   }
      // }

      // // 用axios发请求：
      // const fd = new FormData()
      // fd.append('file', file.file)
      // // console.log(file, '13')
      // // console.log(file.file, '24')
      // const res = await this.$axios.post('/upload', fd)
      // console.log(res)
      // const { statusCode, data } = res.data
      // if (statusCode === 200) {
      //   console.log(data.url)
      //   this.editUser({ head_img: data.url })
      // }
    },
    crop() {
      this.$refs.cropper.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        // console.log(file, '13')
        // console.log(file.file, '24')
        const res = await this.$axios.post('/upload', fd)
        console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.editUser({ head_img: data.url })
          this.isShowMask = false
        }
      })
    },
    cancel() {
      this.isShowMask = false
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  padding: 30px 0;
  text-align: center;
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
}
.nav {
  padding-left: 20px;
}
.van-field {
  border: 1px solid #ccc;
}
/deep/ .van-dialog__content {
  padding: 10px;
}
.van-uploader {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  .van-button {
    position: absolute;
    top: 0;
    z-index: 999;
  }
  .van-button:nth-child(1) {
    left: 0;
  }

  .van-button:nth-child(2) {
    right: 0;
  }
}
</style>
