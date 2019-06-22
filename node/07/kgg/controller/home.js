module.exports = {
    // index: async ctx => {
    //     ctx.body = '首页'
    // },
    index: async app => { // app已传递
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: app => {
        app.ctx.body = '详细页面'
    }
}