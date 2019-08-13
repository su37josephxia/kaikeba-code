function fun(arg, callback) {
    try {
        aaa()
        callback(null, 'result')
    } catch (error) {
        callback(error)
    }
    console.log('fs ' + arg)
}

// 回调方式
fun('./index1.js', (err, data) => {
    console.log(err ? 'read err' : data)
})

// promise方式
const promisify = require('./promisify')
// const { promisify } = require('util')
const promise = promisify(fun)
// promise('./index2.js')
//     .then(data => {
//         console.log(data)
//     }
//         , err => {
//             console.log('err::', err)
//         }
//     )
//     .catch(
//         res => {
//             console.log('catch data::', res)
//         })

// await方式
setTimeout(async () => {
    try {
        await promise('./abc.txt')
    } catch (error) {
        console.log('catch err', error)
    }
})


