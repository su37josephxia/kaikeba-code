(async () => {
    const Sequelize = require('sequelize')

    // 建立连接
    const sequelize = new Sequelize("kaikeba", "root", "example", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false // 仍可通过传入 operators map 至 operatorsAliases 的方式来使用字符串运算符，但会返回弃用警告
    });

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV1,
            primaryKey: true
        },
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    }, {
        timestamps: false,
        tableName: 'TBL_FRUIT'
    });

    let ret = await Fruit.sync({
        force: true
    })

    ret = await Fruit.create({
        name :'香蕉',
        price:3.5
    })

    console.log('create ', ret)
    const Op = Sequelize.Op
    ret = await Fruit.findAll({
        where: {
            price: {
                [Op.lt]: 4,
                [Op.gt]:2
            }
        }
    })
    console.log('select', JSON.stringify(ret))



})()