const Koa = require('koa')
const { initRouter,initController ,initService,loadConfig,initSchedule} = require('./kkb-loader')
class kkb {
    constructor(conf) {
        // B

        this.$app = new Koa(conf)
        // A
        loadConfig(this)
        this.$service = initService()
        this.$ctrl = initController()
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
        
        // C
        initSchedule()
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log(`服务器器启动成功 端口${port}`
            )
        }
        )
    }
}
module.exports = kkb