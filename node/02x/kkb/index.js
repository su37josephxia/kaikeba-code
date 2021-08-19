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
app.use((req, res) => {
  res.writeHead(200);
  res.end("Hi kaikeba");
});
app.listen(3000, () => {
  console.log("Server at 3000");
});
