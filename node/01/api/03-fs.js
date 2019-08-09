const fs = require('fs')

// 同步
// const data = fs.readFileSync('./download.js')
// console.log(data,data.toString())

// 异步方式
fs.readFile('./download.js',(err,data) => {
    if(err) throw err
    console.log(data)
})