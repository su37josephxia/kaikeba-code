const kaikeba = {
    info: { name: '开课吧' },
    get name() {
        return `[${this.info.name}]`
    },

    set name(val) {
        this.info.name = val
    }
}

// kaikeba.info.name => kaikeba.name
console.log(kaikeba.name)

kaikeba.name = 'kaikeba'
console.log(kaikeba.name)

// metadata
// raw

// AA,BB
// 11,22


