'use strict';

const express = require('express');
const service = require('../service');
const router = express.Router();

router.get('/', function (req, res, next) {
  let cookies = req.cookies;
  let token = cookies.token;
  /*
   * 如果 token 存在，说明登陆过，检查 token 是否合法。合法则重定向到原页面，并将 token 作为参数传递。
   * 原页面对应的系统在收到带有 token 的请求后，应该向 passport 发起请求检查 token 的合法性。
   *
   * 如果 cookie 中 token 不存在或者不合法，则返回登录页面。这里登录页面由 passport 提供，也可以重定向到原系统的登录页面。
   */
  if (token && service.isTokenValid(token)) {
    let redirectUrl = req.query.redirectUrl;
    if (redirectUrl) {
      res.redirect(`http://${redirectUrl}?token=${token}`);
    } else {
      // TODO 如果不含有重定向页面，可以返回系统首页。这里直接返回一个登录成功的信息。
      res.send('<h1>登录成功!</h1>');
    }
  } else {
    res.render('login');
  }
});

router.post('/', function (req, res, next) {
  let body = req.body;
  let name = body.name;
  let password = body.password;

  // FIXME 密码验证
  if (name === 'test' && password === '123456') {
    // TODO token 应该按照一定的规则生成，并持久化。
    let token = 'passport';
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });
    if (req.query.redirectUrl) {
      res.redirect('http://' + req.query.redirectUrl + '?token=' + token);
    } else {
      res.send('<h1>登录成功!</h1>');
    }
  } else {
    res.send({
      error: 1,
      msg: '用户名或密码错误'
    });
  }
});

module.exports = router;
