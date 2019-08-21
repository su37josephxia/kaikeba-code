const Koa = require('koa')
const app = new Koa()

// 初始化数据库
const config = require('./conf')
const {loadModel} = require('./framework/loader')
loadModel(config)(app)

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const rest = require('./framework/router')
app.use(rest)



const port = 3000
app.listen(port ,() => {
    console.log(`app start at port ${port} ...`)
})