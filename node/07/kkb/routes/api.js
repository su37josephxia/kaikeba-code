const Router = require("koa-router");
const router = new Router({ prefix: '/api' });
const captcha = require("trek-captcha");
router.get("/captcha", async ctx => {
    console.log('ctx.session.captcha',ctx.session.captcha)
    const { token, buffer } = await captcha({ size: 4 });
    console.log('token:',token)
    ctx.session.captcha = token
    ctx.body = buffer;
});

const moment = require('moment')
const md5 = require('md5')
const axios = require('axios')
const qs = require('querystring')
router.get("/sms", async function (ctx) {
    // 生成6位随机数字验证码
    let code = (Math.random() * 999999).toFixed();

    // 构造参数
    const to = ctx.query.to; // 目标手机号码
    const accountSid = "3324eab4c1cd456e8cc7246176def24f"; // 账号id
    const authToken = "b1c4983e2d8e45b9806aeb0a634d79b1"; // 令牌
    const templateid = "613227680"; // 短信内容模板id
    const param = `${code},1`; // 短信参数
    const timestamp = moment().format("YYYYMMDDHHmmss");
    const sig = md5(accountSid + authToken + timestamp); // 签名

    try {
        // 发送post请求
        const resp = await axios.post(
            "https://api.miaodiyun.com/20150822/industrySMS/sendSMS",
            qs.stringify({ to, accountSid, timestamp, sig, templateid, param }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        if (resp.data.respCode === "00000") {
            // 短信发送成功，存储验证码到session，过期时间1分钟
            const expires = moment()
                .add(1, "minutes")
                .toDate();
            ctx.session.smsCode = { to, code, expires };

            ctx.body = { ok: 1 }
        } else {
            ctx.body = { ok: 0, message: resp.data.respDesc }
        }
    } catch (e) {
        ctx.body = { ok: 0, message: e.message }
    }
});

module.exports = router;