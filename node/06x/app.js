const koa = require('koa')
const app = new koa()
const redisStore = require('koa-redis')
const redis = require('redis')
const redisClient = redis.createClient(6379,'localhost')

const wrapper = require('co-redis')
const client = wrapper(redisClient)

const session = require('koa-session')

app.keys = ['some secret']

const SESS_CONFIG = {
    key: 'kkb:sess',
    maxAge: 86400000,
    signed: true,
    store: redisStore({client})
}

// _abc


app.use(session(SESS_CONFIG,app))

app.use(async (ctx, next) => {
    const keys = await client.keys('*')
    keys.forEach(async key => {
        console.log(await client.get(key))
    })
    await next()
})

// 测试
app.use(ctx => {
    if(ctx.path === '/favicon.ico') return
 
    // 获取
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = `第${n}次访问`
})

app.listen(3000)