const koa = require('koa')
const app = new koa()
const session = require('koa-session')
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379, 'localhost')
const wrapper = require('co-redis')
const client = wrapper(redisClient)

app.keys = ['adfadfsdaf']

const SESS_CONFIG = {
    key: 'kkb:sess',
    signed: true, // 签名
    store: redisStore({client})
}

app.use(session(SESS_CONFIG,app))

app.use(async (ctx,next) => {
    // 遍历redis
    const keys =await client.keys('*')
    keys.forEach(async key => console.log(key,await client.get(key)))
    await next()
})


app.use(ctx => {
    if (ctx.path === '/favicon.ico') return 
    // 计数器
    let  n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第${n}访问`
})

app.listen(3000)