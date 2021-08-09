import * as Koa from "koa";
import * as glob from "glob";
import * as KoaRouter from "koa-router";

const router = new KoaRouter();
type RouteOptions = {
  prefix?: string;
  middlewares?: Array<Koa.Middleware>;
};
const dec =
  (router) =>
  (method: "get" | "post" | "delete" | "put") =>
  (path: string, options: RouteOptions = {}) => {
    return (target, property) => {
      process.nextTick(() => {
        const middlewares = [];

        if (options.middlewares) {
          middlewares.push(...options.middlewares);
        }
        if (target.middlewares) {
          middlewares.push(...target.middlewares);
        }

        middlewares.push(target[property]);

        router[method](path, ...middlewares);
      });
    };
  };

const createMethod = dec(router);
export const get = createMethod("get");
export const post = createMethod("post");
export const middlewares = function middlewares(middlewares: []) {
  return function (target) {
    target.prototype.middlewares = middlewares;
  };
};

export const load = (folder: string): KoaRouter => {
  const extname = ".{js,ts}";
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
};
