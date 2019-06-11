const Koa = require('koa')
const app =new Koa()
const router = require('koa-router')()
router.get('/api/user',async ctx => {
    ctx.body = {
        name:'tom'
    }
})
app.use(router.routes())
module.exports = app