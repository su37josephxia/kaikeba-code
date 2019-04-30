const delay = (data, tick)=> new Promise(resolve=>{
    setTimeout(()=>{
        resolve(data)
    },tick)
})

// 可复用的服务 一个同步，一个异步
module.exports = app => ({
    async getName() {
        // return delay('jerry', 1000)

        app.ctx.body = await app.$model.user.findAll()

    },
    getAge(){
        return 20
    }
});