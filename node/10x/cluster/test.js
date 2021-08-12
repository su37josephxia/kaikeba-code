const request = require('request')
setInterval(() => {
    request('http://localhost:3000', (err, res,body) => {
        console.log('body:',body)
    })
},1000)