# vue-sso-demo

#### 介绍

基于 Vue.js 2.x 的完全跨域单点登录 demo

#### 重点文件说明

1. /src/view/ssoLogin.vue 统一登录中心 所有的子系统都将通过 iframe 内嵌此页面实现登录
2. /src/view/subsys1.vue 子系统 1 登录页面
3. /src/view/subsys2.vue 子系统 2 登录页面
4. /server.js 模拟后端单点登录需要的一个 get 请求接口，此接口也是需要后端配合的地方，此接口部署的域名必须与统一登录中心的域名一致。

#### 使用说明

1. npm install 安装依赖
2. npm run all 启动三个服务，分别是前端页面、模拟的后端接口、接口 https 代理
3. 使用浏览器打开前端服务输出的 2 个子系统链接，这两个子系统 ip 一个是你的局域网 ip，一个是 127.0.0.1，这是完全跨域的
4. 在其中一个子系统输入任意账号密码登录，然后刷新另外一个子系统页面，你会发现另外一个子系统也变成登录状态了

#### 为什么必须使用 https

1. 谷歌浏览器在 84 版本之后将 cookie 的 SameSite 的默认值由 None 改为了 Lax，不发送第三方 cookie，其他浏览器目前默认值还是 None
2. 要将 SameSite 设置为 None，必须同时设置 Secure 属性，Secure 只能在 https 环境下使用，所以需要启动 https
3. SameSite 属性的详细介绍请参阅 [阮一峰的文章](http://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html)
4. 如果在本地调试过程中提示网站 ssl 证书无效，请在设置中将浏览器的保护临时关闭，谷歌浏览器-设置-安全和隐私设置-安全-不保护
5. 线上环境的统一登录中心必须使用 https 协议

#### 其他问题或者建议

联系 985313519，微信 QQ 同号
