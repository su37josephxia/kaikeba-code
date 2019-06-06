const http = require('http')
const url = require('url')
const { EventEmitter } = require('events')

let routers = []
class Application extends EventEmitter {
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
            process.on('uncaughtException', e=> {
                console.log('Server Exception:',e)
            })
        })
        server.listen(...arguments)
    }
}
module.exports = function createApplication() {
    return new Application()
}