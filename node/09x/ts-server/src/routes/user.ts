import * as Koa from "koa";
import { get, post, middleware } from "../utils/route-decors";
import model from "../model/user";
const users = [{ name: "tom" }];

// 鉴权
@middleware([
  async function guard(ctx, next) {
    if (ctx.header.token) {
      await next();
    } else {
      throw "请登录";
    }
  },
])
export default class User {
  @get("/users")
  public async list(ctx) {
    const users = await model.findAll();
    ctx.body = { ok: 1, data: users };
  }

  @post("/users", {
    middlewares: [
      async function validation(ctx, next) {
        // 用户必须
        const name = ctx.request.body.name;
        if (!name) {
          throw "请插入用户名";
        }
        await next();
      },
    ],
  })
  public add(ctx) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
