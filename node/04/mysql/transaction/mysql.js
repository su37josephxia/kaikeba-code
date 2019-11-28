var mysql = require('mysql');

var transaction = require('node-mysql-transaction');
var trCon = transaction({
    // mysql driver set 
    connection: [mysql.createConnection, {
        // mysql connection config
        host: "localhost",
        user: "root",
        password: "example", // 修改为你的密码
        database: "kaikeba" // 请确保数据库存在
    }],
    // create temporary connection for increased volume of async work.
    // if request queue became empty, 
    // start soft removing process of the connection.
    // recommended for normal usage.
    dynamicConnection: 32,
    // set dynamicConnection soft removing time.
    idleConnectionCutoffTime: 1000,
    // auto timeout rollback time in ms
    // turn off is 0
    timeout: 600
});

var chain = trCon.chain();

chain.
on('commit', function(){
  console.log('number commit');
}).
on('rollback', function(err){
  console.log(err);
});

chain
.query('SELECT * FROM test WHERE message = ? FOR UPDATE','a')
.query('INSERT INTO test(message) VALUES(?)','a')
.query('INSERT INTO test(message) VALUES(?)','b');

