(async () => {
    const log = (text, data) => {
        console.log(`===========${text}========`)
        console.log(JSON.stringify(data,null,"\t"))
        console.log(`==========================`)
    }

    const sequelize = require('./util/database')
    // 定义模型 1:N 关系
    const Product = require('./models/product');
    const User = require('./models/user');
    const Cart = require('./models/cart');
    const CartItem = require('./models/cart-item');
    Product.belongsTo(User, {
        constraints: true,
        onDelete: 'CASCADE'
    });
    

    // N : N关系
    User.hasOne(Cart)
    Cart.belongsTo(User)

    User.hasMany(Product)

    Cart.belongsToMany(Product, {
        through: CartItem
    });
    Product.belongsToMany(Cart, {
        through: CartItem
    });


    await sequelize.sync({ force: true })
    // 创建用户
    let user = await User.findByPk(1)
    if (!user) {
        user = await User.create({
            name: 'kaikeba',
            email: 'mail@kaikeba.com'
        })
    }
    // 添加商品
    let product = await user.createProduct({
        title: '商品一',
        price: 123,
        imageUrl: 'abc.png',
        description: '商品描述'
    })
    log('product', product)

    // 添加购物车
    await user.createCart()
    ret = await User.findAll({ include: [Cart] })
    log('getCart:', ret)

    // 添加购物车商品
    let cart = await user.getCart()
    await cart.addProduct(product, {
        through: {
            quantity: 1
        }
    })

    // 获取购物车商品数量
    const productId = 1
    const item = await cart.getProducts({
        where: {
            id: productId
        }
    })
    log('item', item)
    // 商品是否存在
    if(item.length > 0){
        console.log('商品存在....................')
        await cart.addProduct(product, {
            through: {
                quantity: item[0].cartItem.quantity + 1
            }
        })
    }else{
        await cart.addProduct(product, {
            through: {
                quantity: 1
            }
        }) 
    }
    log('cart', cart)

})()