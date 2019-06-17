
(async () => {
    const { MongoClient: MongoDB } = require('mongodb')

    // 创建客户端
    const client = new MongoDB(
        'mongodb://localhost:27017',
        {
            userNewUrlParser: true
        }
    )
    let ret
    // 创建连接
    ret = await client.connect()
    // console.log('ret:', ret)
    const db = client.db('test')
    // // 地理空间$geoIntersects,$geoWithin,$near,$nearSphere
    // // 创建stations集合
    // const stations = db.collection("stations");
    // // 添加测试数据，执行一次即可
    // await stations.insertMany([
    //     { name: "天安门东", loc: [116.407851, 39.91408] },
    //     { name: "天安门西", loc: [116.398056, 39.913723] },
    //     { name: "王府井", loc: [116.417809, 39.91435] }
    // ]);
    // await stations.createIndex({ loc: "2dsphere" });
    // r = await stations.find({
    //     loc: {
    //         $nearSphere: {
    //             $geometry: {
    //                 type: "Point",
    //                 coordinates: [116.403847, 39.915526]
    //             },
    //             $maxDistance: 1000
    //         }
    //     }
    // }).toArray();
    // console.log("天安门附近地铁站", r);
    const col = db.collection('fruits')
    await col.find({name:{$regex:/芒/}})
    await col.createIndex({name:'text'}) // 验证文本搜索需首先对字段加索引
     ret = await col.find({$text:{$search:'芒果'}}).toArray() // 按词搜索，单独字查询不出结果
    console.log('ret',ret)

    client.close()

})()
