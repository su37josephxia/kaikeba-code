module.exports = app => ({
    index: async ctx => {
        // ctx.body = '首页CTRL'
        // const name = await app.$service.user.getName()
        // app.ctx.body = 'ctrl user ' + name 
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: ctx => {
        app.ctx.body = '详细CTRL'
    }
})
