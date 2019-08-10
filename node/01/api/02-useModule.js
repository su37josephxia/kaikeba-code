// 内置模块
// const os = require('os')
// const mem = os.freemem() / os.totalmem()
// console.log(`内存占用率${mem.toFixed(2)}%`)

// 第三方模块
const repo = 'github:su37josephxia/vue-template';
const desc = '../test';

const {clone} = require('./download')
clone(repo, desc);
