import { middlewares } from "./../../../../09/ts-server/src/utils/decors";
import * as Koa from "koa";
import * as glob from "glob";

import * as KoaRouter from "koa-router";

const router = new KoaRouter();

type RouteOptions = {
  prefix?: string;
  middlewares?: Array<Koa.Middleware>;
};

// 引用透明
const createMethod =
  (router) =>
  (
    method: "get" | "post" | "delete" | "put"

    // options: RouteOptions = {}
  ) =>
  (path: string, options: RouteOptions = {}) => {
    return (target, property) => {
      const middlewares = [];
      if (options.middlewares) {
        middlewares.push(...options.middlewares);
      }
      middlewares.push(target[property]);

      // 注册路由
      router[method](path, middlewares);
    };
  };
const method = createMethod(router);

export const get = method("get");
export const post = method("post");

// 加载器
export const load = (folder: string): KoaRouter => {
  const extname = ".{js,ts}";

  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
};
