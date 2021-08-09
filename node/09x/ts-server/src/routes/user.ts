import { middlewares } from './../../../../09/ts-server/src/utils/decors';

import * as Koa from 'koa'
import { get, post  } from '../utils/route-decors'
const users = [{name : 'tom'}]
import model from '../model/user'

// 注册中间件
@middlewares([
    // 鉴权功能
    async function guard(ctx,next) {
        if(ctx.header.token) {
            await next()
        }else {
            throw '请登录'
        }
    }
])
export default class User{
    // 使用装饰器完成路由注册
    @get('/users')
    public async list(ctx) {
        const list = await model.findAll()
        ctx.body = {
            ok:1,
            data: list
        }
    }

    @post('/users',{
        middlewares: [
            async function validation(ctx, next) {
                // 用户名必须
                const name = ctx.request.body.name
                if(!name) {
                    throw '请输入用户名'
                }
                await next()
            }
        ]
    })
    // 参数校验 name属性
    public add(ctx) {
        users.push(ctx.request.body)
        ctx.body =  {
            ok:1
        }
    }

 }