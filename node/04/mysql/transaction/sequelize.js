(async () => {
    const Sequelize = require("sequelize");

    // 建立连接
    const sequelize = new Sequelize("kaikeba", "root", "example", {
        host: "localhost",
        dialect: "mysql",
        // operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            idle: 30000
        }
    });

    // 定义模型
    const Account = sequelize.define("Account", {
        amount: { type: Sequelize.INTEGER, defaultValue: 0 }
    });

    // 同步数据库，force: true则会删除已存在表
    let ret = await Fruit.sync({ force: true })
    console.log('sync', ret)
    const tx = await sequelize.transation(
        {
            autocommit: false,
            isolationLevel: 'SERIALIZABLE'
        }
    )
    ret = await Account.create({
        amount: 5
    }, {
        transation: tx
    })

    ret = await Account.findAll({
        where: { id: 1 }
    })

    ret = await Account.update({
        amount: 3
    }, {
        transation: tx
    })



})()

