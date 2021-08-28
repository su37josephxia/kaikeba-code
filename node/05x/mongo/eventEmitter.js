const {EventEmitter} = require('events')
const event = new EventEmitter()

// 异步处理串行
event.on('conn', num => {
    console.log('insert:' + num)
})

// 连接
let num = 0
setInterval(() => {
    // 插入 
    event.emit('conn', num++)
},1000)