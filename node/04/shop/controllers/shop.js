const Product = require('../models/product');

exports.getProducts = (req, resp) => {
    Product.findAll()
        .then(products => {
            resp.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/products'
            });
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, resp) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then((product) => {
            resp.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        })
        .catch(err => console.error(err));
};

exports.getIndex = (req, resp) => {
    Product.findAll()
        .then(products => {
            resp.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/'
            });
        })
        .catch(err => console.log(err));
};

exports.getCart = (req, resp) => {
    req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            resp.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};

exports.postCart = (req, resp) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQty = 1;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQty = product.cartItem.quantity;
                newQty = oldQty + 1;
                return product;
            } else {
                return Product.findByPk(prodId);
            }
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: {
                    quantity: newQty
                }
            });
        })
        .then(() => resp.redirect('/cart'))
        .catch(err => console.error(err));
};

exports.postCartDeleteProduct = (req, resp) => {
    const prodId = req.body.productId;
    req.user.getCart()
        .then(cart => {
            return cart.getProducts({
                where: {
                    id: prodId
                }
            });
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => resp.redirect('/cart'))
        .catch(err => console.error(err));
};

exports.getCheckout = (req, resp) => {
    resp.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};

exports.getOrders = (req, resp) => {
    req.user.getOrders({include: ['products']})
        .then(orders => {
            resp.render('shop/orders', {
                orders: orders,
                pageTitle: 'Orders',
                path: '/orders'
            });
        })
        .catch(err => console.error(err));
};

exports.postOrder = (req, resp) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then(products => {
            return req.user.createOrder()
                .then(order => {
                    return order.addProducts(products.map(p => {
                        p.orderItem = {
                            quantity: p.cartItem.quantity
                        };
                        return p;
                    }));
                })
                .catch(err => console.error(err));
        })
        .then(result => {
            return fetchedCart.setProducts(null);
        })
        .then((result) => {
            resp.redirect('/orders');
        })
        .catch(err => console.error(err));
}