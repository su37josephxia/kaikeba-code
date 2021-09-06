module.exports = (option,app) => {
    return async function(ctx, next) {
        try {
            await next()
        }catch(err) {
            // 统一处理
            app.emit('error',err, this)

            // 异常应答
            // http status 200
            // code 
            const status = err.status || 500
            // 错误信息 生产不要返回详细信息
            const error = status === 500 && ctx.app.config.env === 'prod' ?
            'Internal Server Error' :
            err.message

            ctx.body = {
                code: status,
                error: error
            }

            // 422 接口参数校验
            if(status === 422) {
                ctx.body.detail = err.errors
            }
            ctx.status = 200
        }
    }
}