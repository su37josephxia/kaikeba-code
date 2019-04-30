const fs = require("fs");
const path = require("path");
const Router = require("koa-router");

// 读取指定目录下文件
function load(dir, cb) {
    // 获取绝对路径
    const url = path.resolve(__dirname, dir);
    // 读取路径下的文件
    const files = fs.readdirSync(url);
    // 遍历路由文件，将路由配置解析到路由器中
    files.forEach(filename => {
        // 去掉后缀名
        filename = filename.replace(".js", "");
        // 导入文件
        const file = require(url + "/" + filename);
        // 处理逻辑
        cb(filename, file);
    });
}

function initRouter(app) {
    const router = new Router();
    load("routes", (filename, routes) => {
        // 若是index无前缀，别的文件前缀就是文件名
        const prefix = filename === "index" ? "" : `/${filename}`;
        routes = typeof routes === 'function' ? routes(app) : routes
        // 遍历路由并添加到路由器
        Object.keys(routes).forEach(key => {
            const [method, path] = key.split(" ");
            console.log(
                `正在映射地址：${method.toLocaleUpperCase()} ${prefix}${path}`
            );
            // 执行router.method(path, handler)注册路由
            // router[method](prefix + path, routes[key]);
            router[method](prefix + path, async ctx => { // 传入ctx
                app.ctx = ctx; // 挂载至app
                await routes[key](app); // 路由处理器现在接收到的是app
            });
        });
    });
    return router;
}


function initController() {
    const controllers = {};
    // 读取控制器目录
    load("controller", (filename, controller) => {
        // 添加路由
        controllers[filename] = controller;
    });

    return controllers;
}

function initService(app) {
    const services = {};
    // 读取控制器目录
    load("service", (filename, service) => {
        // 添加路由
        // services[filename] = service;
        services[filename] = service(app);
    });

    return services;
}


const schedule = require("node-schedule");
function initSchedule() {
    // 读取控制器目录
    load("schedule", (filename, scheduleConfig) => {
        schedule.scheduleJob(scheduleConfig.interval, scheduleConfig.handler);
    });
}

const Sequelize = require("sequelize");
// function loadConfig(app) {
//     load("config", (filename, conf) => {
//         if (conf.db) {
//             app.$db = new Sequelize(conf.db);
//         }
//     });
// }

function loadConfig(app) {
    load("config", (filename, conf) => {
        if (conf.db) {
            app.$db = new Sequelize(conf.db);

            // 加载模型
            app.$model = {};
            load("model", (filename, { schema, options }) => {
                app.$model[filename] = app.$db.define(filename, schema, options);
            });
            app.$db.sync();
        }
    });
}

module.exports = { initRouter, initController, initService, initSchedule, loadConfig };
