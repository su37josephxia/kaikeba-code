const Service = require('egg').Service
class UserService extends Service {
    async getAll() {
        // return [
        //     { name: 'service..' }
        // ]
        const User = this.ctx.model.User
        // await User.sync({ force: true })
        // await User.create({
        //     name: "laowang"
        // }
        // )

        return await this.ctx.model.User.findAll()
    }
}
module.exports = UserService