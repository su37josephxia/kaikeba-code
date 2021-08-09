import * as Koa from 'koa'
import * as bodify from 'koa-bodyparser';
import * as Router from 'koa-router'
import {load} from './utils/route-decors'
import {resolve} from 'path'
import {Sequelize} from 'sequelize-typescript'

const database = new Sequelize({
    port:3306,
    database:'kaikeba',
    username:'root',
    password:'example',
    dialect:'mysql',
    modelPaths: [`${__dirname}/model`],    
});
database.sync({force: true})

const app = new Koa()

app.use(
    bodify({
        // 使用非严格模式，解析 delete 请求的请求体
        strict: false,
    }),
);

// const router = new Router()
// router.get('/abc',ctx => {
//     ctx.body = 'abc'
// })
// 加载器自动引用 routes

// app.use(router.routes())


const router = load(resolve(__dirname,'./routes'))
app.use(router.routes())

app.listen(3000, () => {
    console.log('服务器启动成功');
});