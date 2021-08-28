const Koa = require('koa')
const app = new Koa()

// crud 动态生成
// 加载模型
const config = require('./conf')
const {loadModel } = require('./framework/loader')
loadModel(config)(app)

// 生成路由
// /user/create /
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())
const restful = require('./framework/router')
app.use(restful)


app.listen(3000 , () => {
    console.log('app at 3000')
})