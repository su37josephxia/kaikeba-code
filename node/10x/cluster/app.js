// 存在异常的server
const http = require('http')
const server = http.createServer((request, response) => {
    Math.random() > 0.8 ? ac() : 'ok'
    response.end('Hello')
})
// 如果主模块 node app.js 
// 导出模块
if(!module.parent) {

    server.listen(3000)
}else {
    module.exports = server
}
