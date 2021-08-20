const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class KKB {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    // 启动http服务
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);

      //   this.callback(ctx);
      // 中间件合成
      const fn = this.compose(this.middlewares);
      await fn(ctx);
      // ctx.body

      // 响应
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  //   use(callback) {
  //     this.callback = callback;
  //   }
  use(middleware) {
    this.middlewares.push(middleware);
  }

  /**
   * 创建上下文
   * @param {*} req
   * @param {*} res
   */
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }
  /**
   * 合成函数
   * @param {*} middlewares
   * @returns
   */
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        const fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }
    };
  }
}
module.exports = KKB;
