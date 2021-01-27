const kaikeba = {
    info : {
        name: '开课吧'
    },
    get name () {
        return this.info.name
    },

    set name(val) {
        console.log('new v :' + val)
        // 响应
        this.info.name = `[[[${val}]]]`
    }
}

console.log(kaikeba.name)
kaikeba.name = 'kkb'
console.log(kaikeba.name)