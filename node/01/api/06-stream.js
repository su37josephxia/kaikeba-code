const fs = require('fs')
const rs = fs.createReadStream('./img.png')
const ws = fs.createWriteStream('./img2.png')
rs.pipe(ws)