const koa = require('koa')
const app = new koa()
const session = require('koa-session')
const redisStore = require('koa-redis');
const redis = require('redis')
const redisClient = redis.createClient(6379, "localhost");

var wrapper = require('co-redis');
var client = wrapper(redisClient);

// 签名key
app.keys = ['some secret'];

// 配置项
const SESS_CONFIG = {
    key: 'kkb:sess', // cookie键名
    // maxAge: 86400000, // 有效期，默认一天
    // httpOnly: true, // 仅服务器修改
    // signed: true, // 签名cookie
    store: redisStore({ client })
};

// 注册
app.use(session(SESS_CONFIG, app));

// 测试
app.use(async ctx => {

    if (ctx.path === '/favicon.ico') return;
    // 获取
    let n = ctx.session.count || 0;
    // 设置
    ctx.session.count = ++n;
    ctx.body = '第' + n + '次访问';
});

app.listen(3000)