// 使用文件进行存取 json
const fs = require('fs')
// a: 1  b:2
function set(key, value) {
    // 读取文件
    fs.readFile('./db.json', (err, data) => {
        const json =  data ? JSON.parse(data) : {}
        json[key] = value
        //  写入
        fs.writeFile('./db.json', JSON.stringify(json), err => {
            if(err) {
                console.log(err)
                return
            }
            console.log('写入成功')
        })

    })

}

function get(key) {
    fs.readFile('./db.json', (err,data) => {
        const json = JSON.parse(data)
        console.log(json[key])
    })
}

// 测试 或者 运行
// node 解析了输入流 编辑输出流
// \n
const readline = require('readline')
// 阀门
const rl = readline.createInterface({
    input: process.stdin,
    outpu: process.stdout
})

// set a 1
// get a
rl.on('line' , function(input) {
    const [op,key, value] = input.split(' ')
    if(op === 'get' ) {
        get(key)
    }else if(op === 'set') {
        set(key,value)
    }else if(op === 'quit' ) {
        rl.close()
    }else {
        console.log('没有此操作')
    }

})

rl.on('close', () => {
    console.log('Bye!!')
    process.exit(0)
})
