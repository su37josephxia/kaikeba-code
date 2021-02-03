const redis = require("redis");

const client = redis.createClient(6379, "localhost");

client.set("hello", "This is a value");

client.get("hello", (err, v) => {
  console.log("redis get :", v);
});
