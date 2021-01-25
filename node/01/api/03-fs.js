
(async  () => {
    const fs = require("fs");
    const { promisify } = require("util");
    const readFile = promisify(fs.readFile)
    const data = await readFile('./conf.js')
    console.log('data',data.toString())
})()
// 业务需要 =》 技术实现 翻译
//  翻译的三个境界  信 达 雅


// 同步
// const data = fs.readFileSync('./conf.js')
// console.log(data.toString()) // utf-8

// fs.readFile("./conf.js", (err, data) => {
//   if (err) throw err;
//   console.log("data", data.toString());
// });

// console.log("read ....");

