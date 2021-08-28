const Koa = require('koa')
const app = new Koa()

app.use(async (ctx,next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`请求 ${ctx.url} 耗时${end - start}ms`)
})

app.use((ctx ,next) => {
    // 引入了一个
    ctx.body = {
        name : 'tom'
    }
})

app.listen(3000)