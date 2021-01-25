const { fstat } = require("fs");
const http = require("http");
const fs = require('fs')
const server = http.createServer((request, response) => {
  //   console.log("response...",getPrototypeChain(request));
  //   response.end("kkb 666");
  const { url, method,headers } = request;
  if (url === "/" && method === "GET") {
      fs.readFile('index.html', (err, data) => {
          if(err) {
            response.writeHead(500,{
                'Content-Type': 'text/plain;charset=utf-8'
            })
            response.end('500, 服务器挂了')
          }
          response.statusCode = 200
          response.setHeader('Content-Type','text/html')
          response.end(data)

          // 100ms 1k *100
      })
  }else if (url === '/users'&& method === 'GET') {
      response.writeHead(200, {
          'Content-Type': 'application/json'
      })
      response.end(JSON.stringify({
          name: 'tom'
      }))
  } else if ( method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
      // 覆盖所有的image请求 1k => 1m *1000
      fs.createReadStream('.' + url).pipe(response)
  }

  else {

  }
});
server.listen(3000);

function getPrototypeChain(obj) {
  const prototypeChain = [];
  while ((obj = Object.getPrototypeOf(obj))) {
    prototypeChain.push(obj);
  }
  return prototypeChain;
}
