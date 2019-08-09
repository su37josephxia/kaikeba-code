module.exports.clone = async function clone(repo, desc) {
    const { promisify } = require('util')
    const download = promisify(require('download-git-repo'));
    const ora = require('ora');
    const process = ora(`正在下载....${repo}`);
    process.start();
    try {
        await download(repo,desc)
    } catch (error) {
        process.fail()
    }
    process.succeed()

    // download(repo, desc, err => {
    //     // console.log(err ? 'Error': 'OK')
    //     if (err) {
    //         process.fail();
    //     }
    //     else {
    //         process.succeed();
    //     }
    // });
}
