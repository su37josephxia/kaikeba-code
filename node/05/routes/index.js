const Router = require("koa-router");
const static = require('koa-static')
const router = new Router();
router.get("/", async ctx => {
  // ctx.body = "index";
  const list = [...ctx.state.vipCourses];
  list.sort((a, b) => (a.sort - b.sort));

  let showVideo;
  if (ctx.cookies.get('isPlayed')) {
    showVideo = false;
  } else {
    showVideo = true;
    ctx.cookies.set('isPlayed', true, { maxAge: 7 * 24 * 3600000 });
  }

  await ctx.render('index', { list, showVideo })
});

router.get("/abc", ctx => {
  ctx.body = "abc";
});
module.exports = router;