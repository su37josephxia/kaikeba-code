const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir, cb) {
    const url = path.resolve(__dirname, dir)
    console.log('url', url)
    // 读取路径下的文件
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        filename = filename.replace('.js', '')
        // 导入文件
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}
function initRouter(app) {
    const router = new Router()
    load('routes', (filename, routes) => {
        const prefix = filename === 'index' ? '' : `/${filename}`

        routes = typeof routes === 'function' ? routes(app) : routes

        // 遍历路由并添加
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(' ')
            console.log(`正在映射地址: ${method.toLocaleUpperCase()} ${prefix}${path}`)
            // 执行
            // app.get('/url',ctx)
            router[method](prefix + path, routes[key])
        })
    })
    return router
}

function initController(app) {
    const controllers = {};
    // 读取控制器目录
    load("controller", (filename, controller) => {
        // 添加路由
        controllers[filename] = controller(app);
    });

    return controllers;
}

function initService(app) {
    const services = {};
    // 读取控制器目录
    load("service", (filename, service) => {
        // 添加路由
        services[filename] = service(app);
    });
    return services;
}

const Sequelize = require("sequelize");
function loadConfig(app) {
    load("config", (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db);
            app.$model = {};
            load("model", (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options);
            });
            app.$db.sync();
        }


        // 如果有middleware选项，则按其规定循序应用中间件
        if (conf.middleware) {
            conf.middleware.forEach(mid => {
                const midPath = path.resolve(__dirname, "middleware", mid);
                app.$app.use(require(midPath));
            });
        }
    });
}

const schedule = require("node-schedule");
function initSchedule() {
    // 读取控制器目录
    load("schedule", (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
    });
}

module.exports = { initRouter, initController, initService, initSchedule, loadConfig };



// load('routes', filename => console.log(filename))
// initRouter()