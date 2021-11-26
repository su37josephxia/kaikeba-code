const Koa = require('koa')
const router = require('koa-router')()

const jwt = require("jsonwebtoken")
const jwtAuth = require("koa-jwt")
const secret = "it's a secret"
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const app = new Koa();
app.keys = ['some secret'];

app.use(static(__dirname + '/'));
app.use(bodyParser())

router.post('/users/login-token', async ctx => {
    const { body } = ctx.request
    // 数据库匹配
    const userinfo = body.username

    ctx.body = {
        message: '登陆成功',
        user: userinfo,
        token: jwt.sign({
            data: userinfo,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        },
            secret
        )
    }
})


router.get('/users/getUser-token',
    jwtAuth({
        secret
    }),
    async ctx => {
        // 登录态
        console.log(ctx.state.user)

        // 获取session
        ctx.body = {
            message: '获取数据成功',
            userinfo: ctx.state.user.data
        }
    }

)

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3000);
