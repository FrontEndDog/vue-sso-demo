<template>
  <div class="subsys" :style="style">
    <iframe ref="iframe" class="iframe" src="https://sso-demo.cn1.utools.club/#/ssoLogin" frameborder="0"></iframe>
    <el-card class="tips">
      <p>子系统2</p>
      <p v-show="token">已登录,token为：{{ token }}</p>
      <p v-show="!token">未登录</p>
      <el-button v-show="token" @click="logOut" type="danger">退出</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import jsCookie from 'js-cookie'

export default {
  data() {
    return {
      style: {
        background: `url('${require('@/assets/bg2.jpg')}') center center no-repeat`,
        backgroundSize: 'cover'
      },
      token: ''
    }
  },
  mounted() {
    //刚进入页面的时候,执行一次子系统登录的方法
    this.subLogin()

    // 监听统一登录中心的iframe传来的事件，在统一登录中心登录成功之后，执行子系统登录方法
    window.addEventListener('message', event => {
      const data = event.data
      console.log('收到子iframe的消息', data)
      if (data.type === 'loginSuccess') {
        this.subLogin()
      }
    })
  },
  methods: {
    //子系统登录
    async subLogin() {
      //跨域请求统一登录中心,将统一登录中心的cookie带给此接口,之后接口会将cookie返回
      const { data } = await axios.get('https://api-sso-demo.cn.utools.club', {
        withCredentials: true
      })

      if (data.code === 0) {
        console.log('单点登录成功，cookie为：', data.data.token)
        jsCookie.set('token', data.data.token)
        this.token = data.data.token
      } else {
        console.log('单点登录失败')
        this.removeToken()
      }
    },

    //退出按钮
    logOut() {
      this.removeToken()
      const iframe = this.$refs.iframe
      //向子iframe发送消息
      iframe.contentWindow.postMessage({ type: 'logOut' }, '*')
    },

    //移除token
    removeToken() {
      jsCookie.remove('token')
      this.token = ''
    }
  }
}
</script>

<style scoped>
.subsys {
  height: 100vh;
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.iframe {
  width: 300px;
  height: 328px;
}
.tips {
  width: 300px;
  margin-top: 20px;
}
</style>
