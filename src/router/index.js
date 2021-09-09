import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/vue-sso-demo',
  routes: [
    {
      path: '/',
      redirect: '/ssoLogin'
    },
    //统一登录中心
    {
      path: '/ssoLogin',
      name: 'SsoLogin',
      component: () => import('@/view/ssoLogin')
    },
    //子系统1
    {
      path: '/subsys1',
      name: 'Subsys1',
      component: () => import('@/view/subsys1')
    },
    //子系统2
    {
      path: '/subsys2',
      name: 'Subsys2',
      component: () => import('@/view/subsys2')
    }
  ]
})
