
describe('Spawn 多平台兼容性', () => {
    test('原生spwan', async () => {
        const {syncSpawn} = require('../index')
        const ret = await syncSpawn('ls',{cwd: __dirname})
        expect(ret).toContain('index.spec.js')
    })

    test('跨平台spawn库', () => {
        const spawn = require('cross-spawn');
        const ret = spawn.sync('ls',{cwd: __dirname});
        expect(ret.stdout.toString()).toContain('index.spec.js')
    })
})