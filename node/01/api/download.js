const {promisify} = require('util')
module.exports.downGit = async function() {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora')
    const process = ora(`下载.....项目`)
    process.start()
    await download('github:su37josephxia/vue-template', 'test')
    process.succeed()
}