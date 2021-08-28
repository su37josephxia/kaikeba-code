const fs = require('fs')
// read write  整个图片读取到内存中 32g 
// 挪水桶
// 挪游泳池水 拿一个管子
const rs = fs.createReadStream('./1.png')
const ws = fs.createWriteStream('./2.png')
rs.pipe(ws)