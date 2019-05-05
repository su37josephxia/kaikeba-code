// app.js
const Koa = require('koa')
const app = new Koa()
app.use(async ctx => {
    // Math.random() > 0.8 ? abc() : ''
    // ctx.body = 'Hello Docker3'
    ctx.body = await Cat.find()
    
})
app.listen(3000, () => {
    console.log('app started at http://localhost:3000/')
})


const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/test', {useNewUrlParser: true});
const Cat = mongoose.model('Cat', { name: String });
Cat.deleteMany({})
const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));