const spawn = (...args) => {
    const { spawn } = require('child_process');
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    return proc
}

module.exports = async () => {
    const watch = require('watch')
    let childProcess
    let isRefresh = false
    watch.watchTree('./src', async (f) => {
        if (!isRefresh) {
            isRefresh = true
            childProcess && childProcess.kill()
            await require('./refresh')()
            setTimeout(() => { isRefresh = false }, 5000)
            // 兼容windows系统
            childProcess = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run',  'serve']);
        }
    })
}