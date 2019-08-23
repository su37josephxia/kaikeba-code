const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir)
    // 读取文件
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        // 去掉扩展名
        filename = filename.replace('.js', '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

function initRouter(app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        // 前缀
        const prefix = filename === 'index' ? '' : `/${filename}`

        // 判断路由类型
        routes = typeof routes === 'function' ? routes(app) : routes

        // 遍历路由
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射地址: ${method.toLocaleLowerCase()} ${prefix}${path}`)

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
        controllers[filename] = controller
    })
    return controllers
}

function initService() {
    const services = {}
    load('service', (filename, service) => {
        services[filename] = service
    })
    return services
}
const Sequelize = require('sequelize')
function loadConfig(app) {
    load('config', (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db)
            // 加载模型
            app.$model = {}
            load('model', (filename, { schema, options }) => {
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
    // 读取控制器目录
    load("schedule", (filename, scheduleConfig) => {
      schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
    });
  }


module.exports = { initRouter, initController, initService, loadConfig,initSchedule }