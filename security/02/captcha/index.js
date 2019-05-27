const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/'))



function Canvas() {
  console.log(...arguments)
  return createCanvas(...arguments)
}

// 背景图片的宽可以传参设置，默认值是320 * 180，小拼图默认是60 * 45
app.get('/drag_captcha', async (req, res) => {
  const { bgWidth: width } = req.query;
  const bgWidth = parseInt(width) || 320;
  const bgHeight = (width && parseInt(width * 180 / 320)) || 180;
  const dragPicWidth = 60;
  const dragPicHeight = 45;
  const index = Math.floor(Math.random() * 13);
  const positionX = Math.floor(Math.random() * (bgWidth - dragPicWidth - 10) + 11);  // 空白拼图的定位X
  const positionY = Math.floor(Math.random() * (bgHeight - dragPicHeight - 10) + 11);
  const bgCanvas = new Canvas(bgWidth, bgHeight);
  const dragCanvas = new Canvas(dragPicWidth, dragPicHeight);
  const background = bgCanvas.getContext('2d');
  const dragPic = dragCanvas.getContext('2d');

  const image = await loadImage('bg.jpg')
  background.drawImage(image, 0, 0, 320, 180, 0, 0, bgWidth, bgHeight);
  dragPic.drawImage(bgCanvas, positionX, positionY, dragPicWidth, dragPicHeight, 0, 0,
    dragPicWidth, dragPicHeight);
  background.clearRect(positionX, positionY, dragPicWidth, dragPicHeight);

  if (req.session) {
    req.session.dragCaptcha = {
      positionX,
      positionY
    };
  }
  res.send({ bgCanvas: bgCanvas.toDataURL(), dragCanvas: dragCanvas.toDataURL() });
});

app.post('/check_captcha_position', (req, res) => {
  const { offsetLeft, offsetTop } = req.body;
  const { dragCaptcha = {} } = req.session;
  const range = 5;  // 误差范围
  if (!offsetLeft || !offsetTop) return;
  console.log(dragCaptcha.positionX, dragCaptcha.positionY);

  const deviationX = Math.abs(offsetLeft - dragCaptcha.positionX);
  const deviationY = Math.abs(offsetTop - dragCaptcha.positionY);
  if (deviationX < range && deviationY < range) {
    res.send({ error: false });
  } else {
    res.send({ error: true });
  }
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

