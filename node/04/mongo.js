const MongoClient = require("mongodb").MongoClient;
// 连接URL
const url = "mongodb://localhost:27017";
// 数据库名
const dbName = "test";

(async () => {
  // 0.创建客户端
  const client = new MongoClient(url, { useNewUrlParser: true });
//   try {
    // 1.连接数据库，返回Promise
    await client.connect();
    console.log("连接成功"); 
      
    // 2.获取数据库
    const db = client.db(dbName);

    // 3.获取集合
    const fruitsColl = db.collection("fruits");

    // 4.插入文档，返回Promise<CommandResult>
    let r = await fruitsColl.insertOne({ name: "芒果", price: 20.0 });
    console.log("插入成功", r.result);
    
    // 5.查询文档
    r = await fruitsColl.findOne();
    console.log('查询结果', r);
      
    // 6.更新文档，返回Promise<CommandResult>
    r = await fruitsColl.updateOne({ name: "芒果" }, { $set: { name:'苹果' } });
    console.log("更新成功", r.result);
    
    // 7.删除文档
    r = await fruitsColl.deleteOne({name:"苹果"});
    console.log('删除成功', r.result);
//   } catch (error) {
//     console.error(error);
//   }

  client.close();
})();