<template>
  <div class="subsys" :style="style">
    <iframe ref="iframe" class="iframe" src="http://localhost:8080/#/ssoLogin" frameborder="0"></iframe>
    <el-card class="tips">
      <p>子系统1</p>
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
        background: `url('${require('@/assets/bg1.jpg')}') center center no-repeat`,
        backgroundSize: 'cover'
      },
      token: ''
    }
  },
  mounted() {
    //刚进入页面的时候,执行一次子系统登录的方法
    this.subLogin()

    // 监听统一登录中心的iframe传来的事件，在统一登录中心登录成功之后，执行子系统登录
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
      //跨域请求统一登录中心
      //注意：这里的接口域名必须和内嵌的统一登录中心iframe是同一个域名，才会带上统一登录中心cookie。
      //之后接口会返回统一登录中心cookie中的token,这就相当于在子系统中取到了统一登录中心的cookie
      const { data } = await axios.get('http://localhost:3000', {
        withCredentials: true
      })

      if (data.code === 0) {
        console.log('单点登录成功，cookie为：', data.data.token)
        //设置token
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
      //向统一登录中心iframe发送消息,告知统一登录中心,我在子系统中退出了
      const iframe = this.$refs.iframe
      iframe.contentWindow.postMessage({ type: 'logOut' }, '*')
      //这里还需要向后端接口发送请求,调用退出接口,使token失效
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
