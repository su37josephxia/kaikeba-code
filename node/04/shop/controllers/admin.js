const Product = require('../models/product');

exports.getAddProduct = (req, resp) => {
    resp.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.getEditProduct = (req, resp) => {
    const editMode = req.query.edit;
    if (editMode && editMode !== 'true') {
        return resp.redirect('/');
    }
    const productId = req.params.productId;
    req.user.getProducts({
            where: {
                id: productId
            }
        })
        //Product.findByPk(productId)
        .then((products) => {
            const product = products[0];
            if (!product) {
                return resp.redirect('/');
            }
            resp.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode === undefined || editMode === 'true',
                product: product
            });
        })
        .catch(err => console.error(err));
};

exports.postAddProduct = (req, resp) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(result => {
            resp.redirect('/admin/products');
        })
        .catch(err => console.log(err));
};

exports.postEditProduct = (req, resp) => {
    const id = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    Product.findByPk(id)
        .then(product => {
            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;
            return product.save();
        })
        .then(result => resp.redirect('/admin/products'))
        .catch(err => console.error(err));
};

exports.getProducts = (req, resp) => {
    req.user.getProducts()
    //Product.findAll()
        .then((products) => {
            resp.render('admin/products', {
                prods: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        })
        .catch(err => console.error(err));
};

exports.postDeleteProduct = (req, resp) => {
    const productId = req.body.productId;
    Product.destroy({
            where: {
                id: productId
            }
        })
        .then(() => resp.redirect('/admin/products'))
        .catch(err => console.error(err));
};