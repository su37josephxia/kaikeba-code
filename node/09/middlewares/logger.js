module.exports = async function (ctx, next) {
    // 拦截操作请求 request
    const start = new Date().getTime()
    console.log(`start: ${ctx.url}`);
    await next();
    const end = new Date().getTime()
    console.log(`请求${ctx.url}, 耗时${parseInt(end - start)}ms`)
};