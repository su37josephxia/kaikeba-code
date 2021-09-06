const koa = require("koa");
const { initRouter, initController, initService ,initSchecule, loadConfig} = require("./kkb-loader");

class kkb {
  constructor(conf) {
    this.$app = new koa(conf);
    loadConfig(this)

    this.$service = initService(this);

    this.$ctrl = initController(this);
    this.$router = initRouter(this);
    this.$app.use(this.$router.routes());
    // 前 1 后 2
    initSchecule()
  }

  start(port) {
    this.$app.listen(port, () => {
      console.log("KKB server at " + port);
    });
  }
}

module.exports = kkb;
