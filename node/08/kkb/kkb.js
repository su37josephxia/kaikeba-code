const Koa = require('koa')
const { initRouter,initController ,initService,initSchedule,loadConfig} = require('./kkb-loader')
class kkb {
    constructor(conf) {
        this.$app = new Koa(conf)
        loadConfig(this)
        this.$service = initService(this)
        this.$ctrl = initController(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())

        // 初始化定时任务
        // initSchedule();
    }
    start(port){
        this.$app.listen(port, () => {
            console.log('服务器启动成功 ,端口:' + port)
        })
    }
}
module.exports = kkb