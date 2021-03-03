const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
app.use(bodyParser());
const router = new Router();
app.use(static(__dirname + "/"));
const conf = require("./conf");
const axios = require("axios");
const wechat = require("co-wechat");
const { default: Axios } = require("axios");
router.all(
  "/wechat",
  wechat(conf).middleware(async (message) => {
    console.log("wechat", message);
    return "Hello world! " + message.Content;
  })
);

// const tokenCache = {
//   access_token: '',
//   updateTime: Date.now(),
//   expires_in: 7200
// }

// router.get('/getTokens', async ctx => {
//   const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`

//   const res = await axios.get(url)
//   Object.assign(tokenCache, res.data, {
//     updateTime: Date.now()
//   })
//   ctx.body = res.data
// })

// router.get('/getFollower', async ctx => {
//   const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
//   const res = await axios.get(url)
//   ctx.body = res.data
// })

const WechatAPI = require("co-wechat-api");
const { ServerToken } = require("./mongoose");
const api = new WechatAPI(
  conf.appid,
  conf.appsecret,
  async function () {
    return await ServerToken.findOne();
  },
  async function (token) {
    const res = await ServerToken.updateOne({}, token, { upsert: true });
  }
);

router.get("/getFollower", async (ctx) => {
  let res = await api.getFollowers();
  res = await api.batchGetUsers([res.data.openid[0]], "zh_CN");
  console.log("res", res);
  ctx.body = res;
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);
