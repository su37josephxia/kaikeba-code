// 根据model文件夹中的model加载模型

const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

// 加载摸个文件夹中的所有js模块 
function load(dir,cb) {
    const url = path.resolve(__dirname,dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        // xxx.js => xxx
        filename = filename.replace('.js','')
        //导入文件
        const file = require(url + '/' + filename)
        // 处理逻辑
        cb(filename,file)
    })
}

const loadModel = config => app => {
    mongoose.connect(config.db.url , config.db.options)
    const conn = mongoose.connection
    conn.on('error', () => console.error('conn fail ...'))
    app.$model = {}
    load('../model', (filename,{schema}) => {
        console.log('load model:' + filename ,schema)
        app.$model[filename] = mongoose.model(filename, schema)
    })
}

module.exports = {
    loadModel
}