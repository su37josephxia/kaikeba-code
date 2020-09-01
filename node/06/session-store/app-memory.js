const koa = require('koa')
const app = new koa()
const session = require('koa-session')

app.keys = ['some secret']

class Memory {
    constructor () {
        this.sotry = {}
    }
    
    get(key) {
        console.log('get:',key)
        return this.sotry[key]
    }

    set(key,sess) {
        console.log('set:',key,sess)
        this.sotry[key] = sess
    }
    destroy (key) {
        console.log('destroy:',key)
        this.sotry = {}
    }
}


const SESS_CONFIG = {
    key: 'kkb:sess', 
    store: new Memory()
}

app.use(session(SESS_CONFIG, app))

app.use(ctx => {
    // 查看redis
    // redisClient.keys('*',(err,keys) => {
    //     console.log('keys:',keys)
    //     keys.forEach(key => {
    //         redisClient.get(key, (err,val) => {
    //             console.log(val)
    //         })
    //     })
    // })

    if (ctx.path === '/favicon.ico') return
    let n = ctx.session.count || 0
    ctx.session.count = ++n
    ctx.body = '第' + n + '次访问'
})
app.listen(3000)