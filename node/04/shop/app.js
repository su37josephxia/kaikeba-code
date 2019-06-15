const path = require('path');

const express = require('express');
const parser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const error = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(parser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname)));

app.use((req, resp, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.error(err));
});

app.use('/admin', adminRoutes.routes);
app.use(shopRoutes);

app.use(error.get404Page);

Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);


User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, {
    through: CartItem
});
Product.belongsToMany(Cart, {
    through: CartItem
});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {
    through: OrderItem
});
Product.belongsToMany(Order, {
    through: OrderItem
});

sequelize.sync().then(
    result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Sourav',
                email: 'sourav.dey9@gmail.com'
            })
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000, () => console.log("Listening to port 3000"));
    })
    .catch(err => console.error(err));