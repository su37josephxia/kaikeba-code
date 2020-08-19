// (async () => {
//     const fs = require('fs')
//     const { promisify } = require('util')
//     const readFile = promisify(fs.readFile)
//     const data = await readFile('./conf.js')
//     console.log(data.toString())
// })()

// process.nextTick(async () => {
// })


// 同步读取
// const data = fs.readFileSync('./conf.js')
// console.log('data', data.toString())

// fs.readFile('./conf.js', (err, data) => {
//     if (err) throw err
//     console.log('data', data.toString())
// })



