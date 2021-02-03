const jsonwebtoken = require('jsonwebtoken')
const secret = '12345678'
const opt = {
  secret: 'jwt_secret',
  key: 'user'
}
const user = {
  id: 123123
}

const token = jsonwebtoken.sign({
  data: user,
  // 设置 token 过期时间
  exp: Math.floor(Date.now() / 1000) + (60 * 60), 
}, secret)

console.log('生成token:' + token)
// 生成token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWJjIiwicGFzc3dvcmQiOiIxMTExMTEifSwiZXhwIjoxNTQ2OTQyMzk1LCJpYXQiOjE1NDY5Mzg3OTV9.VPBCQgLB7XPBq3RdHK9WQMkPp3dw65JzEKm_LZZjP9Y=

const token2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjMxMjN9LCJleHAiOjE2MTIzNjU3MDcsImlhdCI6MTYxMjM2MjEwN30.ShWca8ZDdXNYIydqfiUkRKm71i5uENILKf_bCUuO1JQ'
console.log('解码:', jsonwebtoken.verify(token2, secret, opt))