
### 答疑问题
初始状态
```js
const router = new KoaRouter()
export const get = (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options.prefix ? options.prefix + path : path
        router[method](url, target[property])
    }
}
```

解决get post put delete方法公用逻辑

需要进一步对原有函数进行柯里化

```js

const router = new KoaRouter()
const method = method => (path: string, options?: RouteOptions) => {
    return (target, property, descriptor) => {
        const url = options.prefix ? options.prefix + path : path
        router[method](url, target[property])
    }
}
export const get = method('get')
export const post = method('post')
```

router变量 不符合函数式编程引用透明的特点 对后面移植不利

所以要再次进行柯里化

```js
const router = new KoaRouter()
const decorate = (method: HTTPMethod, path: string, options: RouteOptions = {}, router: KoaRouter) => {
    return (target, property: string) => {
            const url = options.prefix ? options.prefix + path : path
            router[method](url, target[property])
    }
}
const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router)

export const get = method('get')
export const post = method('post')
```

