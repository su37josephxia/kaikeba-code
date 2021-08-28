// tcp通信 聊天室
const net = require('net')
// 聊天室 一人发信息到server server 广播到所有人
const chatServer = net.createServer()
const clientList = []
chatServer.on('connection', client => {
    // 流
    client.write('Hi!\n')
    clientList.push(client)
    client.on('data', data => {
        console.log('receive: ', data.toString())
        clientList.forEach(v => {
            v.write(data)
        })
    })
})
chatServer.listen(9000)