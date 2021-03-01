const { rename } = require('fs')
const http = require('http')

const server = http.createServer((request,response) => {
    // 随机错误
    Math.random() > 0.6 ? aa() : '2'
    response.end('hello')
})

if(!module.parent) {
    server.listen(3000 , () => {
        console.log('app start at 3000 ....')
    })
}else {
    module.exports = server
}