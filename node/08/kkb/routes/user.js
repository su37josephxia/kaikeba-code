module.exports = app => ({
  "get /": async ctx => {
    ctx.body = await app.$service.user.getName()
    // ctx.body = await app.$model.user.findAll()
    
  },
  "get /info": ctx => {
    ctx.body = app.$service.user.getAge()
  }
})