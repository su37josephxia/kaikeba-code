module.exports = app => ({
    // "get /": async ctx => {
    //     ctx.body = "用户首页";
    // },
    // "get /info": ctx => {
    //     ctx.body = "用户详情页面";
    // }
    'get /':async ctx => {
        const user = await app.$service.user.getName()
        app.ctx.body = user
    },
    'get /info': ctx => {
        app.ctx.body = '用户年龄:' + app.$service.user.getAge()
    }
})