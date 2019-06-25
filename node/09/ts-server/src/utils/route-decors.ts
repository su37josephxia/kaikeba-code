import * as glob from 'glob';
import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as PathToRegexp from 'path-to-regexp';

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch';
type LoadOptions = {
    /**
     * 路由文件扩展名，默认值是`.{js,ts}`
     */
    extname?: string;
};
type RouteOptions = {
    /**
     * 适用于某个请求比较特殊，需要单独制定前缀的情形
     */
    prefix?: string;
    /**
     * 给当前路由添加一个或多个中间件
     */
    middlewares?: Array<Koa.Middleware>;
};

export const get = (path: string, options?: RouteOptions) => route('get', path, options);
export const post = (path: string, options?: RouteOptions) => route('post', path, options);
export const put = (path: string, options?: RouteOptions) => route('put', path, options);
export const del = (path: string, options?: RouteOptions) => route('del', path, options);
export const patch = (path: string, options?: RouteOptions) => route('patch', path, options);
export const middlewares = function middlewares(middlewares: Koa.Middleware[]) {
    return function(target) {
        console.log('class....')
        target.prototype.middlewares = middlewares;
    };
};

let route = function (method: HTTPMethod, path: string, options: RouteOptions = {}) {
    return function (target, property: string, descriptor) { };
};

export const load = function (prefix: string, folder: string, options: LoadOptions = {}): KoaRouter {
    const extname = options.extname || '.{js,ts}';
    // 新建路由器，并且重新定义route函数
    const router = new KoaRouter();
    route = function (method: HTTPMethod, path: string, options: RouteOptions = {}) {
        return function (target, property: string, descriptor) {
            console.log('property....')
            process.nextTick(() => {
                console.log('nextTick...')
                let mws = [];
                // 将用户输入的路由部分添加到`ctx.params`中
                // mws.push(async function addPathToParams(ctx: Koa.Context, next) {
                //     ctx.params.route = path;
                //     await next();
                // });
                console.log(target);
                
                // if (target.middlewares) {
                //     mws = mws.concat(target.middlewares);
                // }
                if (options.middlewares) {
                    mws = mws.concat(options.middlewares);
                }
                mws.push(target[property]);
                const url = (options.prefix || prefix) + path;
                // router[method](url, target[property]);
                router[method](url, ...mws);
            });
        };
    };
    glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach((item) => require(item));

    return router;
};