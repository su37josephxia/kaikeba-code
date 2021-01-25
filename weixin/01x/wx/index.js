const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const app = new Koa();
app.use(bodyParser());
const router = new Router();
app.use(static(__dirname + "/"));
const axios = require("axios");
const conf = require("./conf");
const wechat = require("co-wechat");

router.all(
  "/wechat",
  wechat(conf).middleware(async (message) => {
    // 收到消息
    console.log("wechat", message);
    return "Hello world 666 ! " + message.Content;
  })
);

const tokenCache = {
  access_token: "",
  updateTime: Date.now(),
  expires_in: 7200,
};

// AOP 
// 判断 token “”
// 比对是否超时


// router.get('/getToken',async ctx => {
//     const url = ` https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
//     const res = await axios.get(url)
//     Object.assign(tokenCache, res.data, {
//         updateTime: Date.now()
//     })
//     ctx.body = res.data
// })
const { ServerToken } = require("./mongoose");
const WechatAPI = require("co-wechat-api");
const api = new WechatAPI(
  conf.appid,
  conf.appsecret,
  async function () {
    // get
    return await ServerToken.findOne();
  },
  async function (token) {
    // set
    const res = await ServerToken.updateOne({}, token, { upsert: true });
  }
);

router.get("/getFollowers", async (ctx) => {
  let res = await api.getFollowers();
  res = await api.batchGetUsers(
    [res.data.openid[0], res.data.openid[1]],
    "zh_CN"
  );

  ctx.body = res;
});

// router.get('/getFollowers',async ctx => {
//     const res = await axios.get(`https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`)
//     ctx.body = res.data
// })

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);
