import { middlewares } from "./../../../../09/ts-server/src/utils/decors";
import * as Koa from "koa";
const users = [{ name: "tom" }];
import { get, post } from "../utils/route-decors";

export default class User {
  @get("/users")
  public list(ctx) {
    ctx.body = { ok: 1, users };
  }

  // TODO: 在业务之前 完成数据校验
  // 1. 拦截器 AOP 中间件
  // 2. 装饰器
  @post(
    "/users", 
  
    { middlewares: [
      async function validation(ctx,next) {
          // 用户必须
          const name = ctx.request.body.name
          if(!name) {
              throw '请输入用户名'
          }
          await next()
      }
  ] }
  
  )
  public add(ctx) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
