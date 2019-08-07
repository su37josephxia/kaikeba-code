const os = require('os')
const mem = os.freemem() / os.totalmem() * 100
console.log(`内存占用率${mem.toFixed(2)}%`)




// inquirer = require('inquirer')
// inquirer.prompt([
//     {
//         type: 'input',
//         name: 'author',
//         message: '请输入你的名字',
//         default: 'josephxia'
//     }
// ]).then(answers => {
//     console.log('answers:', answers)
// })

// const {
//     promisify
// } = require('util')
// downGit()

// async function downGit() {
//     const download = promisify(require('download-git-repo'))
//     const ora = require('ora')
//     const process = ora(`下载.....项目`)
//     process.start()
//     await download('github:su37josephxia/vue-template', 'test')
//     process.succeed()
// }

const {downGit} = require('./down')
downGit()
