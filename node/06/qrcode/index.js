var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const ip = '192.168.84.225';

const port = 3000;
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})
app.get('/auth/login/:id', (req, res) => {
  console.log('param',req.params.id,io.sockets[req.params.id])
  // 认证id
  // io[req.params.id]
  // io.send('success', '登录成功');
  res.end('scan success')
})


io.on('connection', function (socket) {
  console.log('a user connected', socket.id);

  socket.emit('qrcode', `http://${ip}:${port}/auth/login/${socket.id}`)


  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});
// ip绑定需要设定一下
http.listen(port, ip, function () {
  console.log('listening on *:3000');
});

