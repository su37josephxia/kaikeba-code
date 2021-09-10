const cluster = require("cluster");
const os = require("os");
const numCpus = os.cpus().length;

const process = require("process");
const workers = {};
if (cluster.isMaster) {
  // 复制进程
  // 管理
  for (let i = 0; i < numCpus; i++) {
    const worker = cluster.fork();
    console.log("init ...pid", worker.process.pid);
    workers[worker.process.pid] = worker;
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log("工作进程 关闭 " + worker.process.pid);
    delete workers[worker.process.pid];
    worker = cluster.fork();
    workers[worker.process.pid] = worker;
  });

  process.on("SIGTERM", () => {
    for (let pid in workers) {
      process.kill(pid);
    }
    process.exit(0);
  });

  require("./test");
} else {
  // 附属进程
  // 工作进程
  const app = require("./app");
  app.listen(3000); // 8次 不会冲突
}
