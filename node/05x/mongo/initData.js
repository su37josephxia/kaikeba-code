// 插入一百条数据
const mongodb = require('./db') // 连接

mongodb.once('connect', async () => {
    const col = mongodb.col('fruits')
    await col.deleteMany()
    const data = new Array(100).fill().map((v, i ) => {
        return {
            name : 'XXXX' + i,
            price: i,
            category: Math.random() > 0.5? '水果': '蔬菜'
        }
    })
    await col.insertMany(data)
    console.log('insert ok')

})