const http = require('http')
const fs = require('fs')
const path = require('path')
const chunk = []
let size = 0
const server = http.createServer((request, response) => {
    const { pathname } = require('url').parse(request.url)

    if (pathname === '/upload') {
        console.log('upload....')
        const fileName = request.headers['file-name'] ? request.headers['file-name'] : 'abc.png'
        const outputFile = path.resolve(__dirname, fileName)
        const fis = fs.createWriteStream(outputFile)

        // Buffer connect
        // request.on('data',data => {
        //     chunk.push(data)
        //     size += data.length
        //     console.log('data:',data ,size)
        // })
        // request.on('end',() => {
        //     console.log('end...')
        //     const buffer = Buffer.concat(chunk,size)
        //     size = 0
        //     fs.writeFileSync(outputFile,buffer)
        //     response.end()
        // })

        // 流事件写入
        // request.on('data', data => {
        //     console.log('data:',data)
        //     fis.write(data)
        // })
        // request.on('end', () => {
        //     fis.end()
        //     response.end()
        // })


        request.pipe(fis)
        response.end()

    } else {
        const filename = pathname === '/' ? 'index.html' : pathname.substring(1)
        var type = (function (_type) {
            switch (_type) { // 扩展名
                case 'html':
                case 'htm': return 'text/html charset=UTF-8'
                case 'js': return 'application/javascript charset=UTF-8'
                case 'css': return 'text/css charset=UTF-8'
                case 'txt': return 'text/plain charset=UTF-8'
                case 'manifest': return 'text/cache-manifest charset=UTF-8'
                default: return 'application/octet-stream'
            }
        }(filename.substring(filename.lastIndexOf('.') + 1)))
        // 异步读取文件,并将内容作为单独的数据块传回给回调函数
        // 对于确实很大的文件,使用API fs.createReadStream()更好
        fs.readFile(filename, function (err, content) {
            if (err) { // 如果由于某些原因无法读取文件
                response.writeHead(404, { 'Content-type': 'text/plain charset=UTF-8' })
                response.write(err.message)
            } else { // 否则读取文件成功
                response.writeHead(200, { 'Content-type': type })
                response.write(content) // 把文件内容作为响应主体
            }
            response.end()
        })
    }
})
server.listen(3000)