
const { clone } = require('./download')
const fs = require('fs')
const handlebars = require('handlebars')
const symbols = require('log-symbols')

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

const install = async cwd => spawn('npm', ['install'], { cwd })
const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const open = require("open");
module.exports.init = async name => {
    clear()
    // 打印欢迎画面
    const data = await figlet('KKB CLI')
    console.log(chalk.green(data))
    console.log('🚀创建项目:' + name)
    // 从github克隆项目到指定文件夹
    await clone('github:su37josephxia/vue-template', name)
    console.log('安装依赖')
    await spawn('cnpm', ['install'], { cwd: `./${name}` })
    console.log(chalk.green(`
👌安装完成：
To get Start:
===========================
    cd ${name}
    npm run serve
===========================
            `))

    open(`http://localhost:8080`);
    await spawn('npm', ['run', 'serve'], { cwd: `./${name}` })
}

const refresh = async () => {

    // 获取页面列表
    const list =
        fs.readdirSync('./src/views')
            .filter(v => v !== 'Home.vue')
            .map(v => ({
                name: v.replace('.vue', '').toLowerCase(),
                file: v
            }))

    // 生成路由定义
    compile({
        list
    }, './src/router.js', './template/router.js.hbs')

    // 生成菜单
    compile({
        list
    }, './src/App.vue', './template/App.vue.hbs')

    /**
     * 编译模板文件
     * @param meta 数据定义
     * @param filePath 目标文件路径
     * @param templatePath 模板文件路径
     */
    function compile(meta, filePath, templatePath) {
        if (fs.existsSync(templatePath)) {
            const content = fs.readFileSync(templatePath).toString();
            const result = handlebars.compile(content)(meta);
            fs.writeFileSync(filePath, result);
        }
        console.log(symbols.success, chalk.green(`🚀${filePath} 创建成功`))
    }
}
module.exports.refresh = refresh

const serve = (...args) => {
    const { spawn } = require('child_process');
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    return proc
}

module.exports.serve = async () => {
    const watch = require('watch')
    let process
    let isRefresh = false
    watch.watchTree('./src', async (f) => {
        console.log('change...', f)
        if (!isRefresh) {
            isRefresh = true
            process && process.kill()
            await refresh()
            setTimeout(() => { isRefresh = false }, 5000)
            process = serve('npm', ['run', 'serve'])
        }
    })
}