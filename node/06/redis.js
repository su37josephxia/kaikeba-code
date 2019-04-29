var redis = require('redis');

var client = redis.createClient(6379,'localhost');

client.set('hello',JSON.stringify({a:123}));

client.get('hello',function (err,v) {
    console.log("redis get hello err,v",err,JSON.parse(v));
})


client.keys('*', (err, keys) => {
    console.log(keys);
    keys.forEach(key => {
        client.get(key, (err, val) => {
            console.log(val);
        })
    })
})