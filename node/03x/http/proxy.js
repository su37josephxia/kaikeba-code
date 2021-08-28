const express = require('express')
const app = express()
app.use(express.static(__dirname + '/'))

// 前端服务 
// 代理的方法 反向代理
const proxy= require('http-proxy-middleware')

app.use('/api',proxy({target: 'http://localhost:4000'}))

app.listen(3000, () => {
    console.log('proxy at 3000')
})