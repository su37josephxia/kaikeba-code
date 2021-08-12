// 峡谷保安 
const cluster = require('cluster')
const os = require('os')
const numCpu = os.cpus().length

// 子进程 node  java py ruby sh 

const process = require('process')
const workers = {}
if(cluster.isMaster) {
    // 主进程
    // 自我复制 复制新的进程
    for(let i = 0;i < numCpu; i++) {
        let worker = cluster.fork() // 新的进程
        workers[worker.process.pid] = worker
    }
    cluster.on('exit', (worker,code ,signal) => {
        console.log('进程出错 ',worker.process.pid)
        delete workers[worker.process.pid]
        worker = cluster.fork() // 新的进程
        workers[worker.process.pid] = worker
    })
    

}else {
    // 附进程 http服务  工作进程
    var app = require('./app')
    app.listen(3000)
}

process.on('SIGTERM', () => {
    for(var pid in workers) {
        process.kill(pid)
    }
    process.exit(0)
})

require('./test')