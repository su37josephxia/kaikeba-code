// const add = (x, y) => x + y;
// const square = (z) => z * z;

// // 硬编码
// // 只能合成两个
// // const compose =
// //   (fn1, fn2) =>
// //   (...args) =>
// //     fn2(fn1(...args));

// // 无限数量Fn fn1,fn2,fn3
// // 一种组合方法
// const compose = (...[first,...other]) => (...args) => {
//     // reduce  
//     let ret = first(...args)
//     other.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret
// }

// const fn = compose(add, square,square,square);

// console.log(fn(1, 2));

// 递归函数
function compose(middlewares) {
    return function() {
        return dispatch(0)
        function dispatch(i) {
            const fn = middlewares[i]
            if(!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(
                fn(function next() {
                    return dispatch(i + 1)
                })
            )
        }
    }
}

// 一个接一个  
// 一半一半运行 Promise方法执行 串行异步方法
async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
  }
  
  async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
  }
  
  function fn3(next) {
    console.log("fn3");
  }
  
  function delay() {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        reslove();
      }, 2000);
    });
  }
  
  const middlewares = [fn1, fn2, fn3];
  const finalFn = compose(middlewares);
  finalFn();