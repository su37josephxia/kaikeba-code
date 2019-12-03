// mysql2.js
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
  const pool = await mysql.createPool(cfg)
  const conn = await pool.getConnection()

  const conn2 = await pool.getConnection()
  const delay = (tick)=> new Promise(resolve=>{
    setTimeout(()=>{
        resolve()
    },tick)
})
  // 开启事务
  await conn.beginTransaction()
  try {
    await conn.query(`
      SELECT (1) FROM account 
      WHERE id = 1
      FOR UPDATE ;
    `)
    console.log('delay')
    await delay(1000)

    conn2.query(`UPDATE account set amount = 5 WHERE id = 1;`)
    // conn2.query(`SELECT * FROM account WHERE id = 1;`)
    .then(result => {
      console.log('select2:')
    })

    await delay(1000)
    await conn.query(`
      UPDATE account set amount = amount - 3 WHERE id = 1; 
    `)
    await conn.commit()
    console.log('update')
  } catch (error) {
    await conn.rollback()
  } finally {
    conn.release()
  }

})()

