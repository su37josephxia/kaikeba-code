const conf = require('./conf')
const WechatAPI = require('co-wechat-api')
const { ServerToken } = require('./mongoose')
const api = new WechatAPI(
    conf.appid,
    conf.appsecret,
    // 取Token
    async () => await ServerToken.findOne(),
    // 存Token
    async token => await ServerToken.updateOne({}, token, { upsert: true })
)

process.nextTick(async () => {
    // 获取关注者列表
    // let res = await api.getFollowers()
    // console.log('获取关注者列表',res)

    // 获取菜单
    // let res = await api.getMenu()
    // console.log('getMeno',JSON.stringify(res))

    // 清空菜单
    // res = await api.removeMenu()
    // console.log('removeMenu',JSON.stringify(res))

    let res = await api.getMenuConfig()
    console.log('self menu', JSON.stringify(res))

    // 创建菜单
    res = await api.createMenu({
        "button": [
            {
                "name": "然叔私房菜",
                "sub_button": [
                    {
                        "type": "view",
                        "name": "掘金",
                        "url": "https://juejin.im/user/593e0a32a0bb9f006b560bad/posts"
                    },
                    {
                        "type": "view",
                        "name": "个人网站",
                        "url": "https://www.josephxia.com/"
                    },
                ]
            }
        ]
    });
    console.log('create menu',res)




})