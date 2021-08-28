// const fs = require('fs')

// 同步读取 // 文本文件 图片 视频 二进制
// js中确实没有一个可以描述二进制的变脸类型
// node 自己封装Buffer  缓冲区
// const data = fs.readFileSync('./conf.json')  // 10ms
// console.log('data', data.toString())  // 编码类型 utf-8


// 异步读取
// 错误优先的回调
// 是promise风格的api async/await 
// const fsp = require('fs').promises
// fsp.readFile('./conf.json')
// .then(data => console.log('data',data.toString()))
// console.log('read end')


const {promisify} = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile)

readFile('./conf.json')
.then(data => console.log('data',data.toString()))


//  15k promise 
// 20k fs.readFile 封装成一个promise风格接口
// 25k promisify