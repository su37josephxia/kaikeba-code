const log = name => {
    console.log(`Log.....${name} ${new Date().getTime()}`)
}
const delay = 1000
// setTimeout(() => {
//     log('callback')
//     setTimeout(() => {
//         log('callback2')
//     },delay)
// },delay)

const promise = name => new Promise(resolve => {
    setTimeout(() => {
        resolve()
        log(name)
    },delay)
})
// promise('Promise')
// .then(() => promise('P2'))
// .then(() => {
//     promise('p3')
// })

const generator = function* (name) {
    yield promise(name)
    yield promise(name)
}
// const gen = generator('Generator')
// gen.next().value.then(() => {
//     gen.next()
// })

// let co = function(gen,name) {
//     var it = gen(name);
//     var ret = it.next();
//     ret.value.then(function(res) {
//         it.next(res);
//     });
// }
// co(generator,'CO');


setTimeout(async () => {
    await promise('Async/await')
    await promise('Async/await')
})
