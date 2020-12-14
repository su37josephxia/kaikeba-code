const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir, cb) {
    const url = path.resolve(__dirname, dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        // 去掉后缀
        filename = filename.replace('.js', '')

        // 加载文件
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

function initRouter(app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        // 前缀计算
        // index /
        // user user
        const prefix = filename === 'index' ? '' : `/${filename}`

        routes = typeof routes === 'function' ? routes(app) : routes

        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射地址 ${method.toLocaleUpperCase()} ${prefix + path}`)
            router[method](prefix + path, routes[key])
        })
    })
    return router

}

function initController() {
    const controllers = {}
    load('controller', (filename,controller) => {
        controllers[filename] = controller
    })
    return controllers
}


module.exports = { initRouter ,initController}