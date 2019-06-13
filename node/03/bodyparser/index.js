const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
app.use(require('koa-static')(__dirname + '/'))
app.use(bodyParser())
const router = require('koa-router')()
// app.use((ctx, next) => {
//     const req = ctx.request.req
//     let reqData = [];
//     let size = 0;
//     req.on('data', data => {
//         console.log('>>>req on',data);
//         reqData.push(data);
//         size += data.length;
//     });
//     req.on('end', function () {
//         console.log('end')
//         const data = Buffer.concat(reqData, size);
//         console.log('data:', size, data.toString())
//     });
//     next();
// });
router.post('/add', async (ctx, next) => {

    console.log('body', ctx.request.body)
    ctx.body = ctx.request.body
})

app.use(router.routes())


app.listen(3000)