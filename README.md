# vue-sso-demo

#### 介绍

基于 Vue.js 的完全跨域单点登录 demo

#### 重点文件说明

/src/view/ssoLogin.vue 统一登录中心 所有的子系统都将通过 iframe 内嵌此页面实现登录
/src/view/subsys1.vue 子系统 1 登录页面
/src/view/subsys2.vue 子系统 2 登录页面
/server.js 模拟后端单点登录需要的一个 get 请求接口，此接口也是需要后端配合的地方，此接口部署的域名必须与统一登录中心的域名一致。

#### 使用说明

1. npm install 安装依赖
2. node server 启动后端服务
3. 新开一个终端 npm run dev 启动前端服务
4. 使用非谷歌浏览器打开前端服务输出的 2 个子系统链接，这两个子系统 ip 一个是你的局域网 ip，一个是 127.0.0.1，这是完全跨域的
5. 在其中一个子系统输入任意账号密码登录，然后刷新另外一个子系统页面，你会发现另外一个子系统也变成登录状态了

#### 为什么不能用谷歌浏览器测试

谷歌浏览器在 84 版本之后将 cookie 的 SameSite 的默认值由 None 改为了 Lax，不发送第三方 cookie，其他浏览器目前默认值还是 None
SameSite 属性的详细介绍请参阅 [http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html](阮一峰的文章)
要将 SameSite 设置为 None，必须同时设置 Secure 属性，Secure 只能在 https 环境下失效，本地模拟的时候没有 https 环境，所以只能用其他浏览器测试。

#### 生产环境谷歌浏览器如何解决

1. 线上环境的统一登录中心必须使用 https 协议
2. 将/src/view/ssoLogin.vue 统一登录中心页面的 35 36 49 50 行解除注释，谷歌浏览器生产环境就能正常的跨域登录

#### 其他问题或者建议

联系 985313519，微信 QQ 同号
