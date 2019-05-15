const kaikeba = {
    info:{name: '开课吧', desc:'开课吧太棒了'},
    get name(){
        console.log('get .....')
        return this.info.name
    },
    set name(val) {
        this.info.name = val + '!!!'
    }
}
console.log(kaikeba.name)
kaikeba.name = 'KKB'
console.log(kaikeba.name)
