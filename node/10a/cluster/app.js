const Koa = require('koa')
const app = new Koa()
app.use(async (ctx,next) => {
    Math.random() > 0.9 ? aaa() : ''
    await next()
    ctx.body = 'Hi KKb'
})
if(!module.parent){
    app.listen(3000,() => {
        console.log('app start at 3000')
    })
}else{
    module.exports = app
}
