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
        },
        // logging: false, // 是否需要打印日志
    });
    const delay = (tick) => new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, tick)
    })

    // 定义模型
    const Account = sequelize.define("Account", {
        amount: { type: Sequelize.INTEGER, defaultValue: 0 }
    });

    // 同步数据库，force: true则会删除已存在表
    let ret = await Account.sync({ force: true })
    console.log('sync', ret)

    ret = await Account.create({
        amount: 5
    })

    const doTransation = (isAutoCommit, sleep) => async () => {
        const tx = isAutoCommit ? await sequelize.transaction(
            {
                autoCommit: false,
                // isolationLevel: 'SERIALIZABLE'
            }
        ) : null

        ret = await Account.findAll({
            // where: { id: 1 },
            transation: tx,
            // lock: Sequelize.Transaction.LOCK.UPDATE
            lock: true,
 
        })
        console.log('SELECT LOCK ' + sleep)

        await delay(sleep)

        ret = await Account.update({
            amount: 3
        }, {
            where: { id: 1 },
            transation: tx,
        })
        console.log('UPDATE ' + sleep, ret)

        // tx.commit()

    }
    const isCommit = true
    doTransation(isCommit, 4000)()
    await delay(500)
    doTransation(isCommit, 2000)()
    await delay(500)
    doTransation(isCommit, 0)()

})()

