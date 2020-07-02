const { spawn } = require('child_process')

const syncSpawn = (...args) => {
    const options = args[args.length - 1]
    if(process.platform === 'win32'){
        console.log('win32')

        options.cmd = options.cwd
        delete options.cwd

    }else {
        console.log('Linux/Unix')
    }

    return new Promise(resolve => {
        const proc = spawn(...args)
        proc.stdout.pipe(process.stdout)
        const ret = []
        proc.stdout.on('data',data => {
            ret.push(data)
        })
        proc.on('close', () => {
            resolve(Buffer.concat(ret).toString())
        })
    })
    
}
module.exports.syncSpawn = syncSpawn
// process.nextTick( async () => {
//     const ret = await syncSpawn('ls',{cwd: './__tests__'})
//     console.log('返回值....',ret)
// })