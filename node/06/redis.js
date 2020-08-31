const redis = require('redis')

const client = redis.createClient(6379,'localhost')

client.set('hello','This is 20 6666')

client.get('hello', function(err,v) {
    console.log('redis get', v)
})