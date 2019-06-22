const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const Sequelize = require('sequelize')

function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        // 去掉后缀名
        filename = filename.replace('.js', '')
        // 导入文件
        const file = require(url + '/' + filename)
        // 处理逻辑
        cb(filename, file)
    })
}

function initRouter(app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        // 若是index无前缀，别的文件前缀就是文件名
        const prefix = filename === 'index' ? '' : `/${filename}`

        // 判断路由类型
        routes = typeof routes === 'function' ? routes(app) : routes

        // 遍历路由并添加到路由器
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射地址: ${method.toLocaleUpperCase()} ${prefix}${path}`)
            // 执行router.method
            // router[method](prefix + path, routes[key])
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            })
        })
    })
    return router
}

function initController() {
    const controllers = {}
    load('controller', (filename, controller) => {
        // 添加路由
        controllers[filename] = controller
    })
    return controllers
}

function initService(app) {
    const services = {}
    load('service', (filename, service) => {
        services[filename] = service(app)
    })
    console.log('service', services)
    return services
}

function loadConfig(app) {
    load('config', (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db)
            // 加载模型
            app.$model = {}
            load('model', (filename, { schema, options }) => {
                console.log('model', filename)
                app.$model[filename] = app.$db.define(filename, schema, options)
            })
            app.$db.sync()
        }

        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware', mid)
                app.$app.use(require(midPath))
            })
        }
    })
}

const schedule = require('node-schedule')
function initSchedule() {
    load('schedule', (filename, { interval, handler }) => {
        schedule.scheduleJob(interval, handler)
    })
}


module.exports = { initRouter, initController, initService, loadConfig,initSchedule }