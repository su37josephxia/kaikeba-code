const http = require('http')
const session = {}
http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.end('')
        return
    }
    // 观察
    // console.log('cookie',req.headers.cookie)

    // // 设置Cookie
    // res.setHeader('Set-Cookie','cookie1=abc;')
    // res.end('Hello cookie')
    const sessionKey = 'sid'
    const cookie = req.headers.cookie
    if (cookie && cookie.indexOf(sessionKey) > -1) {
        res.end('Come back')
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', sid, session)
    } else {
        // 首次登陆
        const sid = (Math.random() * 999999).toFixed()
        // uuid
        // 设置sid
        res.setHeader('Set-Cookie', `${sessionKey}=${sid}`)
        session[sid] = {
            name: 'laowang'
        }
        res.end('Hello')

    }


})
    .listen(3000)