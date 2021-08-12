const http = require('http')
const server = http.createServer((req,res) => {
    // 模拟一个可能存在bug的程序
    Math.random() > 0.8 ? aa() : 'ok'

    res.end('Hello')

})

if(!module.parent) {
    // 主模块 node app.js
    server.listen(3000 ,() => {
        console.log('server at 3000')
    })
}else {
    module.exports = server
}