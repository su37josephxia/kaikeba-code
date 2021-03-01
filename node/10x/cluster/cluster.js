var cluster = require('cluster')
var os = require('os')
var numCPUs = os.cpus().length
console.log('numCPU:',numCPUs)
var prcess = require('process')
var workers = {}

if(cluster.isMaster) {
    // 主进程 管理

    for(var i =0 ;i < numCPUs ; i++) {
        var worker = cluster.fork()
        console.log('init ...pid', worker.process.pid)
        workers[worker.process.pid] = worker
    }

    // 监督执行状态
    cluster.on('exit', (worker,code ,signal) => {
        console.log('工作进程 关闭',code)
        delete workers[worker.process.pid]
        worker = cluster.fork()
        workers[worker.process.pid] = worker
    })
}else {
    // 子进程 工作
    var app = require('./app')
    // 显示端口占用
    app.listen(3000)
}

// ctrl + c
process.on('SIGTERM', () => {
    for(var pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})

// require('./test')