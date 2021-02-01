const Koa = require('koa')

const app = new Koa()

const port = 3000

const config = require('./conf')
const {loadModel} = require('./framework/loader')
loadModel(config)(app)

// 自动注册路由

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const restful = require('./framework/router')
app.use(restful)

app.listen(port , () => {
    console.log(`server start at ${port}`)
})