module.exports = {
    // index: async ctx => {
    //     ctx.body = "首页service";
    // },

    index: async app => { // app已传递
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: ctx => {
        ctx.body = "详情页面";
    }
}