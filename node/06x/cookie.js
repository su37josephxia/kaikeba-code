const http = require('http')

const session = {

}


http.createServer((req,res) => {
    const cookie = req.headers.cookie
    console.log('cookie',cookie)
    // 记录浏览器状态 
    // http没有状态  登陆态
    // 存id
    const sessionKey = 'sid'
    if(cookie && cookie.indexOf(sessionKey) > -1) {
        // 老用户

        res.end('Come Back')
        // abc=123;sid=32183219;kk=123;
        const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`)
        const sid = pattern.exec(cookie)[1]
        console.log('session:', session[sid])

    }else {
        // 新用户
        // 发布id uuid
        const sid = (Math.random() * 99999).toFixed()
        
        res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
        session[sid] = {name: 'laowang'}
        res.end('Hello')
        
    }



})
.listen(3000)