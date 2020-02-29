const callback = require('../index')

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

test('Test 使用事务', async (done) => {
    const pool = await mysql.createPool(cfg)

    // 准备环境
    // 所有表数据清空
    const conn = await pool.getConnection()
    // 清理表数据
    await conn.query(`
      TRUNCATE TABLE accountA 
    `)
    await conn.query(`
      TRUNCATE TABLE accountB
    `)

    await callback(pool, true)

    // 查询结果
    const [countA] = await conn.execute(`SELECT count(*) as count FROM accountA`)
    const [countB] = await conn.execute(`SELECT count(*) as count FROM accountB`)
    console.log('AmountA', countA[0].count)
    console.log('AmountB', countB[0].count)
    done()
    // setTimeout(done,4000)
})

test('Test 未使用事务', async (done) => {
    const pool = await mysql.createPool(cfg)

    // 准备环境
    // 所有表数据清空
    const conn = await pool.getConnection()
    // 清理表数据
    await conn.query(`
      TRUNCATE TABLE accountA 
    `)
    await conn.query(`
      TRUNCATE TABLE accountB
    `)

    await callback(pool, false)

    // 查询结果
    const [countA] = await conn.execute(`SELECT count(*) as count FROM accountA`)
    const [countB] = await conn.execute(`SELECT count(*) as count FROM accountB`)
    console.log('AmountA', countA[0].count)
    console.log('AmountB', countB[0].count)
    done()
    // setTimeout(done,4000)
})