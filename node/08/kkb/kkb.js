const koa = require("koa");
const { initRouter, initController, initService, initSchedule,loadConfig } = require("./kkb-loader");

class kkb {
    constructor(conf) {
        this.$app = new koa(conf);
        this.$db = loadConfig(this)
        this.$service = initService(this);
        this.$ctrl = initController(this); // 先初始化控制器，路由对它有依赖
        this.$router = initRouter(this); // 将kkb实例传进去
        this.$app.use(this.$router.routes());

        initSchedule();
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log("服务器启动成功，端口" + port);
        });
    }
}

module.exports = kkb;