const {EventEmitter} = require('events')


const event = new EventEmitter()

event.on('connect', num => {
    // insert
    console.log('insert 123' , num)
})

let num = 0
// 连接的过程
setTimeout(() => {
    event.emit('connect', num ++)
})