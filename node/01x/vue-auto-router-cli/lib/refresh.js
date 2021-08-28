const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')

module.exports = async () => {
    // 读取文件列表
    const list = fs.readdirSync('./src/views')
        .filter(v => v !== 'Home.vue')
        .map(v => ({
            name: v.replace('.vue','').toLowerCase(),
            file:v
        }))


        // 生成代码

        // 路由定义
        compile({list}, './src/router.js','./template/router.js.hbs')
        // 菜单
        compile({list}, './src/App.vue','./template/App.vue.hbs')

        /**
         * 编译代码模板
         * @param {*} meta 
         * @param {*} filePath 
         * @param {*} templatePath 
         */
        function compile(meta, filePath,templatePath) {
            if(fs.existsSync(templatePath)) {
                const content = fs.readFileSync(templatePath).toString()
                const result = handlebars.compile(content)(meta)
                fs.writeFileSync(filePath,result)
                console.log('生成代码 '+ filePath)
            }
        }
}

