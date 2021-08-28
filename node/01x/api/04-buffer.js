
// c语言
const buf1 = Buffer.alloc(10)
console.log(buf1)

const buf2 = Buffer.from('a')
console.log(buf2)

const buf3 = Buffer.from('中') // utf-8
console.log(buf3)

// 两个二进制 合成  图片 分包 

const buf4 = Buffer.concat([buf2,buf3])
console.log(buf4, buf4.toString())