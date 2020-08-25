(async () => {
    const mysql = require('mysql2/promise')
    const cfg = {
        host: "localhost",
        user: "root",
        password: "example", // 修改为你的密码
        database: "kaikeba" // 请确保数据库存在
    };

    const connection = await mysql.createConnection(cfg)
    let ret = await connection.execute(`CREATE TABLE IF NOT EXISTS test (
        id INT NOT NULL AUTO_INCREMENT,
        message VARCHAR(45) NULL,
        PRIMARY KEY (id))`)
    console.log('create', ret)

    ret = await connection.execute(`INSERT INTO test(message) VALUE(?)`, ['abc'])

    const [rows, fields] = await connection.execute(`SELECT * FROM test`)
    console.log('select', JSON.stringify(rows),JSON.stringify(fields))
})()