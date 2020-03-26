const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')

function load(dir, cb) {
    const url = path.resolve(__dirname, dir)
    const files = fs.readdirSync(url)
    files.forEach(filename => {
        filename = filename.replace('.js', '')
        const file = require(url + '/' + filename)
        cb(filename, file)
    })
}

const loadModel = config => app => {
    mongoose.connect(config.db.url, config.db.options)

    const conn = mongoose.connection
    conn.on('error', () => console.error('连接数据库失败'))

    app.$model = {}
    load('../model', (filename, { schema }) => {
        console.log('load model:' + filename, schema)
        app.$model[filename] = mongoose.model(filename, schema)
    })

}

module.exports = {
    loadModel
}