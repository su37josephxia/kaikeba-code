module.exports = app => ({
    index: async ctx => {
        // ctx.body = await app.$service.user.getName()
        ctx.body = await app.$model.user.findAll()
        
    },

    // index: async app => { // app已传递
    //     app.ctx.body = await app.$model.user.findAll()
    //     app.ctx.b
    // },
    detail: ctx => {
        ctx.body = "详情页面 Ctrl";
    }
})