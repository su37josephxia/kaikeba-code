const conf = require('./conf')
const { EventEmitter } = require('events')

// 客户端
const { MongoClient } = require('mongodb')

class Mongodb {
    constructor(conf) {
        this.conf = conf
        this.emmiter = new EventEmitter()
        this.client = new MongoClient(conf.url, {
            useNewUrlParser: true
        })
        this.client.connect(err => {
            if (err) throw err
            console.log('连接成功')
            this.emmiter.emit('connect')
        })

        
    }
    col(colName, dbName = conf.dbName){
        return this.client.db(dbName).collection(colName)
    }
    once(event,cb){
        this.emmiter.once(event,cb)
    }
}

module.exports = new Mongodb(conf)