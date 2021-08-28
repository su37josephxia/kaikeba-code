(async () => {
  // 箱操作对象一样操作数据库
  const Sequelize = require("sequelize");
  // 建立连接
  const sequelize = new Sequelize("kaikeba", "root", "example", {
    host: "localhost",
    dialect: "mysql", //方言
    operatorAliases: false,
  });

  // Create 模型
  const Fruit = sequelize.define("Fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 },
  });

// stock => stock2  // float int
// sql语句 
// 回退程序

  // 同步
let ret = await Fruit.sync({force:true});

  // insert
  ret = await Fruit.create({
    name: "banana",
    price: 2.4,
  });

//   ret = await Fruit.findAll();

//   await Fruit.update({ price: 4 }, { where: { name: "香蕉" } });

//   console.log("findAll", JSON.stringify(ret));
//   const Op = Sequelize.Op;
//   ret = await Fruit.findAll({
//     // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } }
//     where: { price: { [Op.lt]: 4, [Op.gt]: 2 } },
//   });
//   console.log("findAll", JSON.stringify(ret, "", "\t"));
})();
