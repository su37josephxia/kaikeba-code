const fs = require('fs')
const http = require('http')

const server = http.createServer((request,response) => {
    // console.log('http request', getPrototypeChain(request))
    // 怪 1 不怪 0
    // response.end('hello 666')  // 1

    // response  = 'hello'  // 2
    // response.body = 'hello' // 3

    const {url , method, headers} = request
    if(url === '/' && method === 'GET') {
        fs.readFile('index.html' , (err, data) => {
            if(err) {
                response.writeHead(500, {
                    'Content-Type':'text/pain;charset=utf-8'
                })
                response.end('500 出错鸟！！！')
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)


        })
        // 所有图片请求
    } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(response) // ./1.png
    }
    
    else {
        response.statusCode = 404
        response.setHeader('Content-Type','text/pain;charset=utf-8')
        response.end('404 没有此页面')
    }


})

function getPrototypeChain(obj) {
    const protoChain = []
    while(obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj)
    } 
    return protoChain
}

server.listen(3000)