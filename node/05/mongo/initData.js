// 初始化数据
const mongodb = require('./models/db')

mongodb.once('connect', async () => {
    const col = mongodb.col('fruits')
    await col.deleteMany()
    // 插入数据
    const data = new Array(100)
        .fill()
        .map((v, i) => {
            return {
                name: 'XXX' + i,
                price: i,
                category: Math.random() > 0.5 ? '蔬菜' : '水果'
            }
        })

    await col.insertMany(data)
    console.log('插入成功')
})