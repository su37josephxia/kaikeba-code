// const express = require('express')
const express = require('./kpress')
const app = express()
app.get('/',(req,res) => {
    AbortController()
    res.end('Hello World')
})
app.get('/user',(req,res) => {
    res.end(JSON.stringify([{name:'tom',age:20}]))
})
app.listen(3000,() => {
    console.log('Example app listen at 3000')
})
process.on('uncaughtException',err => {
    console.log('22222',err)
})