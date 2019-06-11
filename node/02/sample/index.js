const Koa = require('koa')
const app = new Koa()
// app.use((ctx, next) => {
//     ctx.body = [
//         {
//             name: 'tom'
//         }
//     ]
//     next()
// })

// const router = {}
// router['/html'] = ctx => {
//     ctx.type = 'text/html;charset=utf-8'
//     ctx.body = `<b>我的名字是:${ctx.body[0].name}</b>`
// }


// app.use((ctx, next) => {
//     // ctx.body && ctx.body.push(
//     //     {
//     //         name:'jerry'
//     //     }
//     // )
//     console.log('url' + ctx.url)
//     router[ctx.url](ctx)
// })
app.use(async (ctx,next) => {
    const start = new Date().getTime()
    console.log(`start: ${ctx.url}`);
    await next();s
    const end = new Date().getTime()
    console.log(`请求${ctx.url}, 耗时${parseInt(end-start)}ms`)
})

app.use(require('koa-static')(__dirname + '/'))
const router = require('koa-router')()
router.get('/string',async (ctx,next) => {
    ctx.body = 'koa2 string'
})
router.get('/json',async (ctx,next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})
app.use(router.routes())


app.listen(3000)