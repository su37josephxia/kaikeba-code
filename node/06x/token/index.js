const Koa = require("koa");
const router = require("koa-router")();

const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const secret = "it's a secret";
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const app = new Koa();
app.keys = ["some secret"];

app.use(static(__dirname + "/"));
app.use(bodyParser());

router.post("/users/login-token", async (ctx) => {
  const { body } = ctx.request;

  // 颁发token
  const userinfo = body.username;

  ctx.body = {
    message: "login ok",
    token: jwt.sign(
      {
        data: userinfo,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      secret
    ),
  };
});

// 鉴权 获取用户信息
router.get(
  "/users/getUser-token",
  // 鉴权
  jwtAuth({ secret }),
  async (ctx) => {
    console.log("state", ctx.state.user);
    ctx.body = {
      message: "get user ok",
      userinfo: ctx.state.user.data,
    };
  }
);
app.use(router.routes());
app.listen(3000);
