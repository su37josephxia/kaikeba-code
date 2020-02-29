(async () => {
  // get the client
  const mysql = require('mysql2/promise');
  // 连接配置
  const cfg = {
    host: "localhost",
    user: "root",
    password: "example", // 修改为你的密码
    database: "test", // 请确保数据库存在
    connectionLimit: 5,
    // debug:true
  }

  // 设置连接池
  // const pool = await mysql.createPool(cfg)
  // const conn = await pool.getConnection()

  const delay = (tick) => new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, tick)
  })

  // await conn.query(`
  //   CREATE TABLE IF NOT EXISTS account (
  //     id INT NOT NULL AUTO_INCREMENT,
  //     amount INT NULL,
  //     PRIMARY KEY (id));
  // `)

  const doTransation = (isAutoCommit,sleep) => async () => {
    const pool = await mysql.createPool(cfg)
    const conn = await pool.getConnection()

    // 开启事务
    isAutoCommit && await conn.beginTransaction()
    await conn.query(`
      SELECT (1) FROM account 
      -- WHERE id = 1
      FOR UPDATE ;
    `)
    console.log('SELECT ACCOUNT '+ sleep)

    await delay(sleep)

    const res = await conn.query(`
      UPDATE account set amount = amount - 3 WHERE id = 1; 
    `)
    console.log('UPDATE ACCOUNT '+ sleep)

    isAutoCommit && await conn.commit()
    conn.release()
  }
  
  const isCommit = true
  doTransation(isCommit,4000)()
  await delay(500)
  doTransation(isCommit,2000)()
  await delay(500)
  doTransation(isCommit,0)()

})()