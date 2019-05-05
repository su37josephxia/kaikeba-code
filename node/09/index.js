// const http = require('http')
// const server = http.createServer((req,res) => {
//     res.writeHead(200)
//     res.end('hi kaikeba')
// })

// server.listen(3000 , () => {
//     console.log('listen 3000')
// })
const KKB = require('./kkb')
const app = new KKB();

// app.use((req, res) => {
//   res.writeHead(200)
//   res.end("hi kaikeba")
// });
function delay() {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove();
      }, 2000);
    });
  }
  
  app.use(async (ctx, next) => {
    ctx.body = "1";
    setTimeout(() => {
      ctx.body += "2";
    }, 2000);
    await next();
    ctx.body += "3";
  });
  
  app.use(async (ctx, next) => {
    ctx.body += "4";
    await delay();
    await next();
    ctx.body += "5";
  });
  
  app.use(async (ctx, next) => {
    ctx.body += "6";
  });

app.listen(3000, () => {
  console.log("监听端口3000")
})