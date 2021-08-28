(async () => {
  const { MongoClient } = require("mongodb");
  const client = new MongoClient("mongodb://localhost:27017", {
    useNewUrlParser: true,
  });

  let ret = await client.connect()
  const db = client.db('test')
  // 表 => 集合
  const fruits = db.collection('fruits')
  
  // 插入一条数据 => 添加文档
  ret = await fruits.insertOne({
      name:'芒果',
      price:20.1
  })
  console.log('insert', JSON.stringify(ret))

  // 更新
  // 操作符
  ret = await fruits.updateMany({name: '芒果'},{
      $set: {
          name: '苹果'
      }
  })
  console.log('update', JSON.stringify(ret))

  ret = await fruits.findOne()
  console.log('查询',JSON.stringify(ret))


})();
