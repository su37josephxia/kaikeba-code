// cookie.js
const http = require("http")
const session = {}
http
    .createServer((req, res) => {
        // 观察cookie存在
        console.log('cookie:', req.headers.cookie)

        const sessionKey = 'sid'
        const cookie = req.headers.cookie
        if(cookie && cookie.indexOf(sessionKey) > -1 ){
            res.end('Come Back ')
            // 简略写法未必具有通用性
            const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
            const sid = pattern.exec(cookie)[1]
            console.log('session:',sid ,session ,session[sid])
        } else {
            const sid = (Math.random() * 99999999).toFixed()
            // 设置cookie
            res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
            session[sid] = {name : 'laowang'}
            res.end('Hello')
        }
        res.end('hello cookie!!')
    })
    .listen(3000)