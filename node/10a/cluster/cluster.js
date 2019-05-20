const cluster = require('cluster')
const os = require('os')
const numCPUs = os.cpus().length
const process = require('process')
console.log('numCpu:' + numCPUs)

const workers = {}
if (cluster.isMaster) {
    // 主进程
    cluster.on('death', function (worker) {
        worker = cluster.fork()
        worker[worker.pid] = worker;
    })
    // 初始化开启和cpu数量一致的进程
    for (var i = 0; i < numCPUs; i++) {
        const worker = cluster.fork()
        workers[worker.pid] = worker
    }
} else {
    // 工作分支
    const app = require('./app.js')
    app.use(async (ctx, next) => {
        console.log('worker ' + cluster.worker.id + ',PID' + process.pid)
        next()
    })
    app.listen(3000)
}
// 当主进程终止
process.on('SIGTERM', function () {
    for (var pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})

require('./test')