const fs = require('fs')
// const data = fs.readFileSync('./app.js')
// console.log(Buffer.from(data).toString())
const path = require('path')
fs.readFile(path.resolve(path.resolve(__dirname, './app.js')), (err, data) => {
    if (err) throw err
    console.log(data)
})
