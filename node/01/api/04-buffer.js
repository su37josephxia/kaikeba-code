const buf1 = Buffer.alloc(10)
console.log(buf1)

// 创建一个Buffer
const buf2 = Buffer.from('创')
const buf3 = Buffer.from('造')
console.log(buf2, Buffer.concat([buf2, buf3]).toString('utf8'))