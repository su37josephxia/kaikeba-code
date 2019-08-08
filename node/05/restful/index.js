const Koa = require('koa')
const app = new Koa()
const restful = require('./framework/router')
const bodyParser = require('koa-bodyparser')
const { loadModel } = require('./framework/loader')

// 初始化数据库
loadModel(app)

app.use(bodyParser())
app.use(require('koa-static')(__dirname + '/'))
app.use(restful)

const port = 3000
app.listen(port,() => {
    console.log(`app started at port ${port}...`)
})
