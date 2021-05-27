<template>
  <div class="login-wrap">
    <img class="logo" src="@/assets/logo.png" />
    <el-form label-width="60px">
      <el-form-item label="账号：">
        <el-input v-model="formModel.account"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input show-password v-model="formModel.password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import jsCookie from 'js-cookie'
export default {
  data() {
    return {
      formModel: {
        account: '',
        password: ''
      }
    }
  },
  mounted() {
    // 接受父页面发来的信息
    window.addEventListener('message', function(event) {
      let data = event.data
      console.log('收到父级窗口消息', data)
      if ((data.type = 'logOut')) {
        jsCookie.remove('token', { Secure: true, SameSite: 'None', Domain: 'utools.club' })
      }
    })
  },
  methods: {
    async login() {
      //这里模拟将账号密码发送给统一登录中心后端，然后后端返回token，这里将账号密码相加作为token
      const token = this.formModel.account + this.formModel.password

      //取得cookie后,在统一登录中心域名底下设置cookie
      jsCookie.set('token', token, {
        Secure: true,
        SameSite: 'None',
        Domain: 'utools.club' //这个域名填写统一登录中心的一级域名
      })

      if (token) {
        //向父窗口发送登录成功的消息
        window.parent.postMessage({ type: 'loginSuccess' }, '*')
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  width: 300px;
  padding: 20px;
  box-sizing: border-box;
}
.login-wrap .logo {
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
}
</style>
