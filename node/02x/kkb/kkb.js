const http = require('http')
class KKB {
    listen(...args) {
        // 启动http服务
        const server = http.createServer((req,res) => {
            this.callback(req,res)
        })
        server.listen(...args)
    }
    use(callback) {
        this.callback = callback
    }
}
module.exports = KKB