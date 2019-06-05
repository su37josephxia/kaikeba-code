// const str = 'haha'
console.log('hello world..')
// console.log('abc ..'+ str)

const os = require('os')
const util = require('util')
const mem = os.freemem() / os.totalmem() * 100
console.log(`内存占用率${mem}%`)

const cpuStat = require('cpu-stat')
const getCpu = util.promisify(cpuStat.usagePercent)
// getCpu().then(
//     percent => {
//         console.log(`CPU占用：${percent.toFixed(2)}%`)
//     }
// )
const showState1 = async () => {
    const mem = (os.freemem() / os.totalmem()) * 100
    const percent = await getCpu()
    console.log(`CPU占用:${percent.toFixed(2)}% 内存: ${percent}`)
}

// module.exports = { showState }
module.exports.showState = showState1