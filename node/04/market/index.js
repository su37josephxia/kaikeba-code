const express = require('express')
const app = express()
const path = require('path')
const mongo = require('./models/db')
// const testdata = require('./models/testdata')

app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.get('/api/list', async (req, res) => {
  const page = + req.query.page
  const col = mongo.col('fruits')
  const total = await col.find().count()
  const fruits = await col
    .find()
    .skip((page - 1) * 5)
    .limit(5)
    .toArray()

  res.json({
    ok: 1,
    data: {
      fruits, pagination: {
        total, page
      }
    }
  })
})


app.listen(3000)