function add(x, y) {
    return x + y
}

function square(z) {
    return z * z
}

// 第一步
// const ret = square(add(1,2))
// console.log(ret)

// 第二步
// function compose(fn1,fn2){
//     return (...args)=>{
//         return fn1(fn2(...args))
//     }
// }

// 第三步
function compose(...mids) {
    const len = mids.length
    return (...args) => {
        // 先获取初始值
        let res = mids[0](...args)
        // 挨个处理，每个函数返回的结果，是下一个函数的输入值
        for (let i = 1; i < len; i++) {
            res = mids[i](res)
        }
        return res
    }
}

const retFn = compose(add, square)
console.log(retFn(1, 2))