module.exports = {
    // /user/
    'get /': async ctx => {
        ctx.body = '用户首页'
    },
    'get /info': ctx => {
        ctx.body = '用户详细页面'
    } 

}