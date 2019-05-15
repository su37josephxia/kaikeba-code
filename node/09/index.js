const KKB = require('./kkb')
const app = new KKB()
// app.use((req,res) => {
//     res.writeHead(200)
//     res.end('hi kaikeba')
// })

// app.use(ctx => {
//     ctx.body = 'kaikeba'
// })

function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
            reslove();
        }, 2000);
    });
}
// logger部分
  app.use(require('./middlewares/logger'))
//   app.use(require('./middlewares/iptable'))

// 静态页面部分
//   const static = require('./middlewares/static')
//   app.use(static(__dirname + '/public'))

// 路由部分
const Router = require('./middlewares/router')
const router = new Router()
router.get('/index', async ctx => {
    console.log('index,xx')
    ctx.body = 'index page';
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });

// router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());


//   app.use(async (ctx, next) => {
//     ctx.body = "1";
//     setTimeout(() => {
//       ctx.body += "2";
//     }, 2000);
//     await next();
//     ctx.body += "3";
//   });

//   app.use(async (ctx, next) => {
//     ctx.body += "4";
//     await delay();
//     await next();
//     ctx.body += "5";
//   });

//   app.use(async (ctx, next) => {
//     ctx.body += "6";
//   });

app.listen(3000, () => {
    console.log('listen 3000')
})