const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    // console.log('recevie http')
    // response.end('a response from server')
    
    const { url, method ,headers} = request
    if (url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                return
            }
            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })

    } else if (url === '/user' && method === 'GET') {
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/html')
        response.end(JSON.stringify([
            {
                name: 'laoxia',
                age: 342
            }
        ]))
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1 ){
        fs.createReadStream('.'+url).pipe(response)
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
        response.end('404 页面没找到。。。。')
    }
})
server.listen(3000)