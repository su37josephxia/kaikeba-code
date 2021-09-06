const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const schedule = require('node-schedule')

// 加载器
function load(dir, cb) {
    const url = path.resolve(__dirname,dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        filename = filename.replace('.js','')
        const file = require(url + '/' + filename)
        cb(filename , file)
    })
}

function initRouter(app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        // index => / user => /user
        const prefix = filename === 'index' ? '' : `/${filename}`
        // 科里化变换 对象 =》 对象工厂
        routes = typeof routes === 'function' ? routes(app) : routes

        // 路由遍历
        Object.keys(routes).forEach(key => {
            // 'get /'
            const [method, path] = key.split(' ')
            console.log(`正在映射地址 ${method.toUpperCase()} ${prefix + path}`)
            // TODO: ctx => {}  => app=> {}
            router[method](prefix + path, async ctx => {
                app.ctx = ctx
                await routes[key](app)
            })
        })
    })
    return router
}

function initController(app) {
    const controllers = {}
    load('controller', (filename, controller) => {
        controllers[filename] = controller(app)
    })
    return controllers
}

function initService(app) {
    const services = {}
    load('service', (filename ,service) => {
        services[filename] = service(app)
    })
    return services
}

const Sequelize = require('sequelize')
function loadConfig(app) {
    load('config', (filename,conf) => {
        if(conf.db) {
            app.$db = new Sequelize(conf.db)
            app.$model = {}
            load('model' , (filename, {schema,options} ) => {
                app.$model[filename] = app.$db.define(filename, schema, options)

            })
            app.$db.sync()
        }

        if(conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, 'middleware',mid)
                app.$app.use(require(midPath))
            })
        }
    })
}


function initSchecule() {
    load('schedule', (filename, config) => {
        schedule.scheduleJob(config.interval, config.handler)
    })
}


module.exports = {initRouter,initController,initService,loadConfig,initSchecule}