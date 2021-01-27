const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const { method, url } = req;
    console.log("cookie", req.headers.cookie);
    console.log("url", url, method);
    if (method === "GET" && url === "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (method === "GET" && url === "/api/users") {
      res.setHeader("Content-Type", "application/json");
    //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    //   res.setHeader("Set-Cookie", "cookie123=123;");
    //   res.setHeader("Access-Control-Allow-Credentials", "true");

      res.end(
        JSON.stringify({
          name: "tom",
        })
      );
    } else if (method === "OPTIONS" && url === "/api/users") {
      // res.setHeader("Set-Cookie", "cooke=123;");
      // res.setHeader('Access-Control-Allow-Credentials','true')
      //   res.setHeader("Access-Control-Allow-Credentials", "true");
      //   res.writeHead(200, {
      //     "Access-Control-Allow-Origin": "http://localhost:3000",
      //     "Access-Control-Allow-Headers": "X-Token,Content-Type",
      //     "Access-Control-Allow-Methods": "PUT",
      //   });

    //   res.setHeader("Access-Control-Allow-Credentials", "true");
    //   res.writeHead(200, {
    //     "Access-Control-Allow-Origin": "http://localhost:3000",
    //     "Access-Control-Allow-Headers": "X-Token,Content-Type",
    //     "Access-Control-Allow-Methods": "PUT",
    //   });
      res.end();
    }else if(method === 'POST' && url === '/api/save') {
      let reqData = []
      req.on('data' , data => {
        reqData.push(data)
      })

      req.on('end', () => {
        const data = Buffer.concat(reqData)
        res.end(`formdata :${data.toString()}`)
      })
    }
  })
  .listen(4000, () => {
    console.log("api listen at 4000");
  });
