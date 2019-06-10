const Koa = require('koa')
const app =new Koa()
// const mid1 = async (ctx,next) => {
//     ctx.body = 'Hello'
//     await next()
//     ctx.body = ctx.body + '!!!'
// }

// const mid2 = async (ctx,next) => {
//     ctx.type = 'text/html;charset=utf-8'
//     await next()
// }

// const mid3 = async (ctx,next) => {
//     ctx.body = ctx.body + 'Kaikeba'
//     await next()
// }

// app.use(mid1)
// app.use(mid2)
// app.use(mid3)
app.use(async (ctx,next) => {
    await next()
    const rt = ctx.response.get('X-Response-Time')
    console.log(`输入计时：${ctx.method} ${ctx.url}  - ${rt}`)
})

app.use(async (ctx,next) => {
    const start = Date.now()
    console.log(`开始计时`)
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time',`${ms}ms`)
    console.log('计时结束')
})

const static = require('koa-static')
app.use(static(__dirname + '/public'))

const router = require('koa-router')()
router.get('/string',async ctx => {
    ctx.body = 'abc'
})
router.get('/json',async ctx => {
    ctx.body = {
        hello:'json'
    }
})
app.use(router.routes())
app.listen(3000)