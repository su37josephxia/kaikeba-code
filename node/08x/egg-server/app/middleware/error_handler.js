module.exports = (option, app) => {
  return async function (ctx, next) {
    try {
      await next();
    } catch (err) {
      // 异常处理
      app.emit("error", err, this);

      const status = err.status || 500;

      const error =
        status === 500 && app.config.env === "prod"
          ? "Interal Server Error"
          : err.message;

      ctx.body = {
        code: status,
        error: error,
      };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = 200;
    }
  };
};
