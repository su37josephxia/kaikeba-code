const kaikeba = {
    info:{name: '开课吧' , desc: '开课吧不错'},
    get name() {
        console.log('get..')
        return this.info.name
    },
    set name(val) {
        console.log('new name is '+ val)
        this.info.name = val
    } 
}
console.log(kaikeba.name)
kaikeba.name = 'kaikeba'
console.log(kaikeba.name)
