// TODO: ctrl 科里化 
module.exports = app => ({
    index: async ctx => {
        // const name = await app.$service.user.getName()
        // app.ctx.body = 'ctrl usr ' + name
        app.ctx.body = await app.$model.user.findAll()
    },
    detail: async ctx => {
        app.ctx.body = '详细Ctrl'
    }
})