const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(require("koa-static")(__dirname + "/"));
app.use(bodyParser());

// 初始化数据库
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");
const { sync } = require("cross-spawn");

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart); // User.createCart delet update
Cart.belongsTo(User);
Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

sequelize.sync().then(
  // 初始数据
  async (result) => {
    let user = await User.findByPk(1);
    if (!user) {
      user = await User.create({
        name: "laoxia",
        email: "xxx@qq.com",
      });
      await user.createCart();
    }
    app.listen(3000, () => console.log("shop listen at 3000"));
  }
);

// 模拟鉴权
app.use(async (ctx, next) => {
  const user = await User.findByPk(1);
  ctx.user = user;
  await next();
});

const router = require("koa-router")();

/**
 * 查询接口
 */
router.get("/admin/products", async (ctx, next) => {
    const products = await Product.findAll()
    ctx.body = {
        prods: products
    }
});

/**
 * 创建商品
 */
router.post('/admin/product', async ctx => {
    const body = ctx.request.body 
    const res = await ctx.user.createProduct(body)
    ctx.body = {
        success: true
    }
})

/**
 * 删除商品
 */
router.delete('/admin/product/:id' ,async ctx => {
    const id = ctx.params.id
    const res = await Product.destroy({
        where : {
            id
        }
    })
    ctx.body = {success: true}
})


/**
 * 查询购物车
 */
router.get('/cart',async ctx => {
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts()
    ctx.body = {
        products
    }
})

/**
 * 添加购物车
 */
router.post('/cart', async ctx => {
    const { body } = ctx.request
    const prodId = body.id
    let newQty = 1
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts({
        where: {
            id: prodId
        }
    })

    let product
    if (products.length > 0) {
        product = products[0]
    }
    if (product) {
        const oldQty = product.cartItem.quantity
        newQty = oldQty + 1
    } else {
        product = await Product.findByPk(prodId)
    }
    await cart.addProduct(product, {
        through: {
            quantity: newQty
        }
    })
    ctx.body = { success: true }
})

/**
 * 添加订单
 */
router.post('/orders', async ctx => {
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts()
    const order = await ctx.user.createOrder()
    const result = await order.addProduct(
        products.map(p => {
            p.orderItem = {
                quantity: p.cartItem.quantity
            }
            return p
        })
    )
    await cart.setProducts(null)
    ctx.body = { success: true }
})

/**
 * 删除购物车
 */
router.delete('/cartItem/:id', async ctx => {
    const id = ctx.params.id
    const cart = await ctx.user.getCart()
    const products = await cart.getProducts({
        where: { id }
    })
    const product = products[0]
    await product.cartItem.destroy()
    ctx.body = { success: true }
})

/**
 * 查询订单
 */
router.get('/orders', async ctx => {
    const orders = await ctx.user.getOrders({ include: ['products'], order: [['id', 'DESC']] })
    ctx.body = { orders }
})






app.use(router.routes())