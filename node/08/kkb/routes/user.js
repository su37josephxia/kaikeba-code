module.exports = {
    "get /":  async app => {
      console.log('AAAA',app)
      const name = await app.$service.user.getName();
      app.ctx.body = "用户:" +name;
    },
    "get /info": app => {
      app.ctx.body = "用户年龄：" + app.$service.user.getAge();
    }
  };
