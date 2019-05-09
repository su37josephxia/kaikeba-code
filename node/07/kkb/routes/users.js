const Router = require("koa-router");
const router = new Router({ prefix: '/users' });

const users = [{ id: 1, name: "tom" }, { id: 2, name: "jerry" }];
router.get("/", ctx => {
  console.log("GET /users");
  const { name } = ctx.query; // ?name=tom
  let data = users;
  if (name) {
    data = users.filter(u => u.name === name);
  }
  ctx.body = { ok: 1, data };
});
router.get("/:id", ctx => {
  console.log("GET /users/:id");
  const { id } = ctx.params; // /users/1
  const data = users.find(u => u.id == id);
  ctx.body = { ok: 1, data };
});
const bouncer = require('koa-bouncer')
const val = async (ctx, next) => {
  const isUser = name => Promise.resolve(name === 'abc')

  try {
    ctx.validateBody('name')
      .required("要求提供用户名")
      .isString()
      .trim()
      // .isLength(6, 16, "用户名长度为6~16位")
      .check(await isUser(ctx.vals.name) , 'Check OK')

    console.log('ctx.vals', ctx.vals)
    next()


  } catch (error) {
    if (error instanceof bouncer.ValidationError) {
      ctx.body = '校验错误:' + error.message
      return
    }
    throw error
  }

}

router.post("/", val, ctx => {
  console.log("POST /users");
  const { body: user } = ctx.request; // 请求body
  user.id = users.length + 1; // 自增
  users.push(user);
  ctx.body = { ok: 1 };
});


router.put("/", ctx => {
  console.log("PUT /users");
  const { body: user } = ctx.request; // 请求body
  const idx = users.findIndex(u => u.id == user.id);
  if (idx > -1) {
    users[idx] = user;
  }
  ctx.body = { ok: 1 };
});
router.delete("/:id", ctx => {
  console.log("DELETE /users/:id");
  const { id } = ctx.params; // /users/1
  const idx = users.findIndex(u => u.id == id);
  if (idx > -1) {
    users.splice(idx, 1);
  }
  ctx.body = { ok: 1 };
});

const upload = require('koa-multer')({ dest: './public/images' })
router.post('/upload', upload.single('file'), ctx => {
  console.log('file', ctx.req.file)
  console.log('body', ctx.req.body)

  // 写入数据

  ctx.body = '上传成功'
})






router.get("/web", async ctx => {
  console.log('user')
  // ctx.body = "users list";
  await ctx.render("users", {
    title: "用户列表",
    subTitle: "handlebars语法",
    isShow: true,
    username: "jerry",
    htmlStr: `<h3>abc</h3>`,
    users: [
      { username: "tom", age: 20, birth: new Date(1999, 2, 2) },
      { username: "jerry", age: 20, birth: new Date(1999, 3, 2) }
    ]
  });
});

router.post('/login', async ctx => {
  const { body } = ctx.request
  console.log('body', body)
  // 登录逻辑

  ctx.session.userinfo = body.username

  ctx.body = {
    ok: 1,
    message: '登录成功'
  }
})

router.post('/logout', async ctx => {
  delete ctx.session.userinfo
  ctx.body = {
    ok: 1,
    message: '退出系统'
  }
})

router.get('/getUser', require('../middleware/auth'), async ctx => {
  ctx.body = {
    ok: 1,
    message: '获取成功',
    userinfo: ctx.session.userinfo
  }
})

const jwt = require('jsonwebtoken')
const jwtAuth = require('koa-jwt')
const secret = 'it is a'

router.post('/login-token', async ctx => {
  const { body } = ctx.request
  console.log('body:', body)

  //  数据库验证
  const userinfo = body.username
  ctx.body = {
    message: '登陆成功',
    user: userinfo,
    token: jwt.sign({
      data: userinfo,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    }, secret)
  }
})

router.get('/getUser-token', jwtAuth({ secret }), async ctx => {
  console.log('state: ', ctx.state.user)
  ctx.body = {
    message: '获取数据成功',
    userinfo: ctx.state.user.data
  }
})



module.exports = router;