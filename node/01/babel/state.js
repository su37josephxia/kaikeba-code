import cpuStat from 'cpu-stat'
import util from 'util'
const getUsagePercent = util.promisify(cpuStat.usagePercent)
const showCpu = async () => {
    const percent = await getUsagePercent()
    console.log(`CPU占用：${percent.toFixed(2)}%`)
}
export { showCpu } 