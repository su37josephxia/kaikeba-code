// const http = require('http')
// const server = http.createServer((req,res) => {
//     res.writeHead(200)
//     res.end('Hi kaikeba')
// })
// server.listen(3000, () => {
//     console.log('Server at 3000')
// })

const KKB = require("./kkb");
const app = new KKB();


const Router = require('./router') 
const router = new Router();

// 设置策略
router.get('/index', async ctx => { 
  console.log('index,xx')
  ctx.body = 'index page'; 
});
router.get('/post', async ctx => { ctx.body = 'post page'; });
router.get('/list', async ctx => { ctx.body = 'list page'; });
router.post('/index', async ctx => { ctx.body = 'post page'; });

// 路由实例输出父中间件 router.routes()
app.use(router.routes());


// app.use((req, res) => {
//   res.writeHead(200);
//   res.end("Hi kaikeba");
// });
// const delay = () => new Promise(resolve => setTimeout(() => resolve() ,2000));

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });

app.listen(3000, () => {
  console.log("Server at 3000");
});
