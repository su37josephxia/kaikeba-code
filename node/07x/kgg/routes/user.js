module.exports = {
    // /user
    // TODO: ctx => {}  => app=> {}
    'get /': async app => {
        const name = await app.$service.user.getName()
        app.ctx.body = name
    },
    'get /info': async app => {
        app.ctx.body = '用户年龄' + app.$service.user.getAge()
    }
}