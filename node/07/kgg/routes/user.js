
module.exports = {
  // /user/
  // "get /": async ctx => {
  //   ctx.body = "用户首页";
  // },
  // // /user/info
  // "get /info": ctx => {
  //   ctx.body = "用户详情页面";
  // }
  "get /": async app => {
    const name = await app.$service.user.getName()
    app.ctx.body = "用户" + name;
  },
  // /user/info
  "get /info": app => {
    app.ctx.body = "用户年龄" + app.$service.user.getAge();
  }
};