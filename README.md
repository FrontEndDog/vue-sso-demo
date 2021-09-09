# vue-sso-demo

#### 介绍

基于 Vue.js 的完全跨域单点登录 demo

#### 重点文件说明

/src/view/ssoLogin.vue 统一登录中心 所有的子系统都将通过 iframe 内嵌此页面实现登录
/src/view/subsys1.vue 子系统 1 登录页面
/src/view/subsys2.vue 子系统 2 登录页面
/server.js 模拟后端单点登录需要的一个 get 请求接口，此接口域名必须与统一登录中心的域名一致。

#### 使用说明

1.  npm install
2.  npm run dev
3.  新开一个终端 node server
4.  打开前一个终端输出的 2 个子系统链接，这两个子系统 ip 一个是你的局域网 ip，一个是 127.0.0.1，这是完全跨域的

#### 特技

1.  使用 Readme_XXX.md 来支持不同的语言，例如 Readme_en.md, Readme_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
