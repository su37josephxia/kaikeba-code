const koa = require('koa')
const { initRouter ,initController,initService,loadConfig,initSchedule} = require('./kkb-loader')
class kkb {
    constructor(conf) {
        this.$app = new koa(conf)
        // 初始化控制器
        loadConfig(this)
        initSchedule();
        this.$service = initService(this)
        this.$ctrl = initController()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log('服务器启动成功 端口:' + port)
        })
    }
}
module.exports = kkb