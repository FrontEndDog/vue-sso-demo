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
    // 此页面是作为iframe嵌入的,在加载时,监听父页面发来的信息
    window.addEventListener('message', function(event) {
      let data = event.data
      console.log('收到父级窗口消息', data)
      //父页面(也就是子系统),点击退出时,移除统一登录中心域名下的token
      if (data.type === 'logOut') {
        jsCookie.remove('token', {
          // Secure: true,
          // SameSite: 'None',
          Domain: 'localhost'
        })
      }
    })
  },
  methods: {
    async login() {
      //这里需要请求后端登录接口,将账号密码发送给后端,然后后端返回token,这里跳过请求后端的操作,直接将账号密码相加作为token
      const token = this.formModel.account + this.formModel.password

      //取得token后,在统一登录中心域名底下设置cookie
      jsCookie.set('token', token, {
        // Secure: true,
        // SameSite: 'None',
        Domain: 'localhost' //这个域名填写统一登录中心的一级域名
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
