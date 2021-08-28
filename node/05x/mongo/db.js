// 返回一个Mongo实例
// 并且自动连接  100ms 异步操作
// 插入 相当于在一个异步的过程后 promise
// 事件  或者说是订阅发布模式
const conf = require("./conf");
const { EventEmitter } = require("events");
const { MongoClient } = require("mongodb");

class Mongodb {
  constructor(conf) {
    // 数据库连接
    this.conf = conf;
    this.emmiter = new EventEmitter();
    this.client = new MongoClient(conf.url, { useNewUrlParser: true });
    this.client.connect((err) => {
      if (err) throw err;
      console.log("连接成功");
      this.emmiter.emit("connect");
    });
  }

  /**
   *
   * @param {*} colName 集合名
   * @param {*} dbName
   */
  col(colName, dbName = conf.dbName) {
    return this.client.db(dbName).collection(colName);
  }

  // 订阅连接事件
  once(event, cb) {
    this.emmiter.once(event, cb);
  }
}

module.exports = new Mongodb(conf);
