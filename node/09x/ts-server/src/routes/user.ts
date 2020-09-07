import * as Koa from "koa";
import { get, post,middlewares } from "../framework/route-decors";

const users = [{ name: "tom" }];
import model from '../model/user'
@middlewares([
  async function guard(ctx, next) {
    if (ctx.header.token) {
      await next();
    } else {
      throw "请登录";
    }
  }
])
export default class User {
  @get("/users")
  public async list(ctx: Koa.Context) {
      const data = await model.findAll()
    ctx.body = {
      ok: 1,
      data: data,
    };
  }

  @post("/users", {
    middlewares: [
      async function validation(ctx, next) {
        // 有效性检查
        // 用户必须
        const name = ctx.request.body.name;
        if (!name) {
          throw "请输入用户名";
        }
        await next();
      },
    ],
  })
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
