const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    // console.log('this is a request',getPrototypeChain(request))
    // response.end('Hello 666') // 1
    // response = '666' // Koa
    // 信达雅

    const { url, method, headers } = request
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                response.end('500 服气')
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)
        })
    }
    else if (url === '/users' && method === 'GET') {
        response.writeHead(200, {
            'Content-Type' : 'application/json'
        })
        response.end(JSON.stringify([{name : 'tom'}]))
    } else if (method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
        fs.createReadStream('.' + url).pipe(response) // ./1.png
    }
    else {
        response.statusCode = 404
        response.setHeader('Content-Type','text/plain;charset=utf-8')
        response.end('404 页面没有 。。。')
    }
})

function getPrototypeChain(obj) {
    const protoChain = []
    while (obj = Object.getPrototypeOf(obj)) {
        protoChain.push(obj)
    }
    return protoChain
}


server.listen(3000, () => {
    console.log('Server is start at 3000')
})
