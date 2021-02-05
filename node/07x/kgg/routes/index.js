module.exports = app => ({
    // 'get /': async ctx => {
    //     ctx.body = '首页'
    // },
    // 'get /info' : async ctx => {
    //     ctx.body = '详细页面'
    // }

    'get /': app.$ctrl.home.index,
    'get /detail': app.$ctrl.home.detail 
})