const kaikeba = {
    info: {
        name: '开课吧'
    },
    get name() {
        return `【${this.info.name}】`
    },

    set name(val) {
        this.info.name = val
    }
}

// 变优雅 【开课吧】
console.log(kaikeba.name)

kaikeba.name = 'kaikeba'

console.log(kaikeba.name)
