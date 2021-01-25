const {promisify} = require('util')
const figlet = promisify(require('figlet'))

const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const {clone} =require('./download')

const spawn = async (...args) => {
    const { spawn } = require('child_process');
    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        proc.stderr.pipe(process.stderr)
        proc.on('close', () => {
            resolve()
        })
    })
}
module.exports = async name => {
    // 打印欢迎界面
    clear()
    const data = await figlet('KKB Welcome')
    log(data)

    // 克隆
    log(`🚀创建项目 ${name}`)
    // await clone('github:su37josephxia/vue-template',name)

    // npm i

    // start server

    // 自动重启

    log('安装依赖')
    await spawn('cnpm', ['install'], { cwd: `./${name}` })
    log(chalk.green(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `))
}