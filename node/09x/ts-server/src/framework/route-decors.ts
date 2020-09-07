import * as Koa from "koa";
import * as KoaRouter from "koa-router";
import * as glob from "glob";

const router = new KoaRouter();

export const decorate = (router: KoaRouter) => (
  method: "get" | "post" | "delete" | "put"
) => (path: string, options?: { middlewares: Koa.middlewares[] }) => {
  return (target, property) => {
    process.nextTick(() => {
      // 中间件数组
      const middlewares = [];
      if (target.middlewares) {
        middlewares.push(...target.middlewares);
      }

      if (options && options.middlewares) {
        middlewares.push(...options.middlewares);
      }
      middlewares.push(target[property]);
      // 重复
      // 引用透明
      router[method](path, ...middlewares);
    });
  };
};

const method = decorate(router);

export const get = method("get");
export const post = method("post");

export const load = (folder: string): KoaRouter => {
  const extname = ".{js,ts}";
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
};

export const middlewares = function middlewares(
  middlewares: Koa.middlewares[]
) {
  return function (target) {
    target.prototype.middlewares = middlewares;
  };
};
