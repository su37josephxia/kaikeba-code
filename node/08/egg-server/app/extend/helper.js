const moment = require('moment')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '处理成功' }) => {
    ctx.body = {
        code: 0,
        data: res,
        msg
    }
    ctx.status = 200
}

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss')