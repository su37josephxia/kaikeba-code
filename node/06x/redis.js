const redis = require('redis')
const client = redis.createClient(6379, 'localhost')

client.set('hello','1123')
client.get('hello', (err,v) => {
    console.log('redis get ', v)
})