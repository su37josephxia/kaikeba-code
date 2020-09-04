const fs = require('fs')
function set(key, value) {
    fs.readFile('./db.json', (err, data) => {
        // 判断为空
        const json = data ? JSON.parse(data) : {}
        json[key] = value
        // 写入
        fs.writeFile('./db.json', JSON.stringify(json), err => {
            if (err) {
                console.log(err)
            }
            console.log('写入成功')
        })
    })
}

function get(key) {
    fs.readFile('./db.json', (err, data) => {
        const json = JSON.parse(data)
        console.log(json[key])
    })
}

// 命令行调用
// set a 1
// get a
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', function (input) {
    // set a 1
    const [op, key, value] = input.split(' ')
    if (op === 'get') {
        get(key)
    } else if (op === 'set') {
        set(key, value)
    } else if (op === 'quit') {
        rl.close()
    } else {
        console.log('没有该操作')
    }
})


rl.on('close', function () {
    process.exit(0)
})