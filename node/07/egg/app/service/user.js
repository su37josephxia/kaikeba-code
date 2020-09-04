const {Service} = require('egg')

class UserService extends Service {
    async getAll() {
        // return [
        //     {
        //         name: 'UserService'
        //     }
        // ]
        return await this.ctx.model.User.findAll()
    }
}

module.exports = UserService