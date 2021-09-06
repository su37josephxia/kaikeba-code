
const delay = (data, tick) => new Promise(resolve => {
    setTimeout(() => {
        resolve(data)
    },tick)
})

// TODO 科里化
module.exports = app => ({
    getName() {
        // model
        // return delay('jeery', 1000)
        return app.$model.user.findAll()

    },
    getAge() {
        return 20
    }
})