const Controller = require('egg').Controller
class UserController extends Controller {
    async index() {
        const {ctx} = this
        
        // this.ctx.body = [
        //     { name: 'tom' },
        //     { name: 'jerry' }
        // ]
        // ctx.body = await ctx.service.user.getAll()

        ctx.body = await this.ctx.model.User.findAll()
    }
}
module.exports = UserController