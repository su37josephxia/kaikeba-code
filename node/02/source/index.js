const KKB = require('./kkb')
const app = new KKB()
// app.use((req,res) => {
//     res.writeHead(200)
//     res.end('Hi kaikeba')
// })

// const log = require('./middlewares/log')
// app.use(log)

// const iptable = require('./middlewares/iptable')
// app.use(iptable)

const Router = require('./middlewares/router')
const router = new Router();

router.get('/index', async ctx => { ctx.body = 'index page'; });
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());



// const static = require('./middlewares/static')
// app.use(static(__dirname + '/public'))


// app.use((ctx, next) => {
//     ctx.body = 'Hello '
//     next()
//     ctx.body = ctx.body + ' !!!'
// })

// app.use(ctx => {
//     ctx.body = ctx.body + ' kaikeba'
// })

// function delay() {
//     return new Promise((reslove, reject) => {
//         setTimeout(() => {
//             reslove();
//         }, 2000);
//     });
// }

// app.use(async (ctx, next) => {
//     ctx.body = "1";
//     setTimeout(() => {
//         ctx.body += "2";
//     }, 2000);
//     await next();
//     ctx.body += "3";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "4";
//     await delay();
//     await next();
//     ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//     ctx.body += "6";
// });


app.listen(3000, '0.0.0.0',() => {
    console.log('listen 3000')
})