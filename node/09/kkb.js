const http = require('http')
const context = require("./context");
const request = require("./request");
const response = require("./response");


module.exports = class KKB {
    // 初始化中间件数组
    constructor() {
        this.middlewares = []
    }

    listen(...args) {
        const server = http.createServer(async (req, res) => {

            const ctx = this.createContext(req, res)
            // this.callback(req,res)
            // this.callback(ctx)

            // 中间件合成
            const fn = this.compose(this.middlewares);
            // 执行合成函数并传入上下文
            await fn(ctx);

            // 渲染结果
            res.end(ctx.body)

        })
        server.listen(...args)
    }

    // 合成函数
    compose(middlewares) {
        return function (ctx) { // 传入上下文
            return dispatch(0);
            function dispatch(i) {
                let fn = middlewares[i];
                if (!fn) {
                    return Promise.resolve();
                }
                return Promise.resolve(
                    fn(ctx, function next() {// 将上下文传入中间件，mid(ctx,next)
                        return dispatch(i + 1);
                    })
                );
            }
        };
    }

    // 构建上下文, 把res和req都挂载到ctx之上，并且在ctx.req和ctx.request.req同时保存
    createContext(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;
        return ctx;
    }
    use(callback) {
        // this.callback = callback
        this.middlewares.push(callback)
    }
}