module.exports = async (pool,isAutoCommit) => {
  const conn = await pool.getConnection()

  // 开启事务
  isAutoCommit && await conn.beginTransaction()
  try {
    // 操作表A
    let res = await conn.query(`
      INSERT INTO accountA (amount) VALUES (1)
    `)

    // 人为制造异常
    res = await conn.query(`
      KKB 
   `)

    // 操作表B
    res = await conn.query(`
      INSERT INTO accountB (amount) VALUES (1)
    `)
    // console.log('INSERT ACCOUNT B ', res)

    isAutoCommit && await conn.commit()
  } catch (error) {
    // console.log('发生error...', error)
    await conn.rollback()
  }
  conn.release()
}

