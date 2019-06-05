(new Promise(resolve => {
    console.log('resolve')
    resolve()
}))
.then(() => console.log('promise then...'))

setImmediate(() => {
    console.log('set Immediate ...')
})
// setTimeout，放入Event Table中，1秒后将回调函数放入宏任务的Event Queue中
setTimeout(() => {
    console.log('setTimeout ...')
}, 0)

process.nextTick(() => {
    console.log('nextTick ...')
})