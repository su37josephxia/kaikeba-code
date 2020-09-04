module.exports = {
    // /user/
    // 'get /': async ctx => {
    //     ctx.body = '用户首页'
        
    // },
    'get /': async app => {

        const name = await app.$service.user.getName()
        app.ctx.body =  name
    },

    // 'get /info': ctx => {
    //     ctx.body = '用户详细页面'
    // } 
    'get /info': app => {
        app.ctx.body = '用户年龄' + app.$service.user.getAge()
    }

}