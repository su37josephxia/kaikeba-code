module.exports = {
    // index: async ctx => {
    //     // ctx.body = '首页Ctrl'
    // },
    // detail: async ctx => {
    //     ctx.body = '详情Ctrl'
    // }

    index: async app => { // app已传递
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: app => {
        app.ctx.body = '详细页面'
    }
}