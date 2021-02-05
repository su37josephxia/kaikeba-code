module.exports = (app) => ({
  index: async () => {
    // ctx.body = '首页Ctrl'
    const name = await app.$service.user.getName();
    // app.ctx.body = "ctrl user " + name;
    console.log('user,',app.$model.user)
    // app.ctx.body = await app.$model.user.findAll()
    app.ctx.body = name 
  },

  detail: () => {
    app.ctx.body = "详细页面Ctrl";
  },
});
