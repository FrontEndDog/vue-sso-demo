//单点登录后端需要实现的功能，这里只是使用node简单模拟了一下后端

//这个接口的功能是接收一个

const http = require('http')
const server = http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Credentials', 'true')
  response.setHeader('Access-Control-Allow-Origin', request.headers.origin)
  response.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS,GET')
  response.setHeader('content-type', 'application/json;charset=UTF-8')

  let token = ''
  if (request.headers.cookie) {
    token = request.headers.cookie.match(/token=([^;]*);?/)[1]
  }
  console.log(token)
  if (token) {
    response.end(JSON.stringify({ code: 0, data: { token }, msg: '请求成功' }))
  } else {
    response.end(JSON.stringify({ code: 500, data: {}, msg: '请求失败' }))
  }
})
server.listen(3000)
