const http = require('http')
const url = require('url')

let routers = []
class Application {
    get(path, handler) {
        console.log('get...', path)
        if (typeof path === 'string') {
            routers.push({
                path,
                method: 'get',
                handler
            })
        } else {
            routers.push({
                path: '*',
                method: 'get',
                handler: path
            })
        }
    }
    listen() {
        const server = http.createServer((req, res) => {
            let { pathname } = url.parse(req.url, true)
            for (let router of routers) {
                const { path, method, handler } = router
                if (pathname === path && req.method.toLowerCase() == method) {
                    return handler(req, res)
                }
                if (path === '*') {
                    return handler(req, res)
                }
            }
        })
        server.listen(...arguments)
    }
}
module.exports = function createApplication() {
    return new Application()
}