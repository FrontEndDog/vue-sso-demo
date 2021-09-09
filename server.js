//单点登录后端需要实现的功能，这里只是使用node简单模拟了一下后端

//这个接口的功能是取出请求头中cookie里面的token,然后返回给前端

const http = require('http')
const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Credentials', 'true')

  //这里可以添加一个步骤,校验请求的域名是否在白名单中,在白名单中才返回token

  //将请求地址设置为允许跨域访问,这里不能用通配符*,不然在谷歌浏览器上的请求取不到cookie
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS,GET')
  response.setHeader('content-type', 'application/json;charset=UTF-8')

  //如果cookie中有token,取出token
  let token = ''
  if (request.headers.cookie) {
    token = request.headers.cookie.match(/token=([^;]*);?/)
    if (token) {
      token = token[1]
    }
  }
  console.log(token)

  //这里可以添加一个步骤,校验token的有效性。

  //如果token存在,则将token返回,否则返回code500错误
  if (token) {
    response.end(JSON.stringify({ code: 0, data: { token }, msg: '请求成功' }))
  } else {
    response.end(JSON.stringify({ code: 500, data: {}, msg: '请求失败' }))
  }
})
server.listen(3000)
