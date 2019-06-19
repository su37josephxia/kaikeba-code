'use strict';

const express = require('express');
const path = require('path');
const session = require('express-session');
const http = require('http');

const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/*
 * 这里设置 cookie 中 sessionID 的过期时间为默认，即浏览器关闭后失效，并且 session 直接保存在内存中。
 *
 * 通过 cookie.maxAge 设置 cookie 中 sessionID 的过期时间，可以使 sessionID 的保存时间更久，并且 session 持久化。
 */
app.use(session({
  secret: 'passport',
  resave: false,
  saveUninitialized: false,
}));

app.use('/', index);

let port = process.env.PORT || 8081;
app.set('port', port);

let server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server ${process.env.SERVER_NAME} listening on port: ${port}`);
});