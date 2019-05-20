const http = require('http')
setInterval(
async () => {
    await http.get('http://localhost:3000')
},
1000)