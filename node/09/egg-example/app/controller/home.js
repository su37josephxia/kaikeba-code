'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = [{name:'tom'},{name:'jerry'}];
    ctx.body = await ctx.service.user.getAll()
  }
}

module.exports = HomeController;
