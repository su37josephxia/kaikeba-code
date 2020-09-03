module.exports = app => ({
    // 'get /': async ctx => {
    //     ctx.body = '首页'
    // },
    'get /':  app.$ctrl.home.index,
    // 'get /detail': ctx => {
    //     ctx.body = 
    // }
    'get /detail': app.$ctrl.home.detail
})