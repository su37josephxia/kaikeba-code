const http = require('http')

const session = {

}

http.createServer((req, res) => {
    console.log('cookie', req.headers.cookie)
    const sessionKey = 'sid'
    const cookie = req.headers.cookie

    if(cookie && cookie.indexOf(sessionKey) > -1) {
      // 来过
      res.end("Come Back");

      // xxx=123;sid=12321321;ccd=12312;
      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
      const sid = pattern.exec(cookie)[1];
      console.log("session:", sid, session, session[sid]);
    }else {
        // 新用户
        // 唯一 顺序 php asp  jsp
        // sid  1  mayun admin
        //      2
        //      3 xia
        // 随机数 
        // uuid

        const sid = (Math.random() * 9999999).toFixed()
        res.setHeader('Set-Cookie', `${sessionKey}=${sid};`)
        session[sid] = {
            name: 'laowang'
        } 
        res.end('Hello cookie')
    }

    // res.setHeader('Set-Cookie','sid=123;xx=123;yy=123;')
    // res.end('Hello cookie')
})
.listen(3000)