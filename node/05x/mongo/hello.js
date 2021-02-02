(async () => {
  const { MongoClient } = require("mongodb");

  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: "true",
  });

  let ret 

  ret = await client.connect()

  const db = client.db('test')

  const fruits = db.collection('fruits')

  // 添加文档
  ret = await fruits.insertOne({
      name:'芒果',
      price:20.1
  })

  console.log('insert : ',JSON.stringify(ret))

  // 查询文档
  ret = await fruits.findOne()
  console.log('查询文档:',ret)

  // 更新文档
  ret = await fruits.updateOne({name:'芒果'}, {
      $set: {
          name : '苹果'
      }
  })

  // 删除文档
  ret = await fruits.deleteMany()

  client.close()


})();
