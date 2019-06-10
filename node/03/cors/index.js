const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

// 静态文件
const static = require('koa-static')
app.use(static(__dirname + '/front-end/dist'))
router.get('/api/user', ctx => {
    ctx.body = {
        message : 'abc'
    }
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);