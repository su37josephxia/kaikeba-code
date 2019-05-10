module.exports = app => ({
  "get /": async ctx => {
    // ctx.body = await app.$service.user.getName()
  },
  "get /info": ctx => {
    ctx.body = app.$service.user.getAge()
  }
})