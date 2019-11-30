const Controller = require('egg').Controller;

class TitleController extends Controller {
    async index() {
        console.log(this.ctx.params)
        const api = {
            index: () => {
                // 获取数据
                const data = [{
                    aid: '499',
                    catid: '20',
                    username: 'admin',
                    title: '【国内首家】微信小程序视频教程免费下载',
                    pic: 'portal/201610/13/211832yvlbybpl3rologrr.jpg',
                    dateline: '1476364740'
                },
                {
                    aid: '498',
                    catid: '20',
                    username: 'admin',
                    title: 'ionic域资源共享 CORS 详解',
                    pic: '',
                    dateline: '1472952906'
                },
                {
                    aid: '497',
                    catid: '20',
                    username: 'admin',
                    title: '移动端触摸滑动js插件_html5手机端轮播插件',
                    pic: 'portal/201606/28/211604ullzo5arr4iurnum.jpg',
                    dateline: '1467119820'
                },
                ]

                // 渲染视图
                const content = data.map(v => `
                    <li>
                        <a href="/origin/content?aid=${v.aid}">${v.title}></a>
                    </li>
                `).concat('')


                this.ctx.body = `
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                </head>
                <body>
                    <h2>新闻列表</h2>
                    <ul>
                        ${content}
                    </ul>
                </body>
                </html>
                `
            },
            content : () => {
                // 内容渲染
                const data = {
                    aid: '497',
                    catid: '20',
                    username: 'admin',
                    title: '移动端触摸滑动js插件_html5手机端轮播插件',
                    author: '',
                    summary:
                        '移动端触摸滑动js插件_html5手机端轮播插件Swiper常用于移动端网站的内容触摸滑动 Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。  Swiper能实现触屏焦点图、触屏Tab切换、触屏多图切换等 ...',
                    pic: 'portal/201606/28/211604ullzo5arr4iurnum.jpg',
                    content:
                        '<font size="5">移动端触摸滑动js插件_html5手机端轮播插件</font><br><br><br><h2>Swiper常用于移动端网站的内容触摸滑动</h2>\r\n<p><strong>Swiper</strong>是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端。</p>\r\n<br>\r\n<p><strong>Swiper</strong>能实现触屏焦点图、触屏Tab切换、触屏多图切换等常用效果。</p>\r\n<p><strong>Swiper</strong>开源、免费、稳定、使用简单、功能强大，是架构移动终端网站的重要选择！</p><p><br></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211604ullzo5arr4iurnum.jpg" target="_blank"><br></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211604ullzo5arr4iurnum.jpg" target="_blank"><img src="http://www.phonegap100.com/data/attachment/portal/201606/28/211604ullzo5arr4iurnum.jpg"></a></p><p><br></p><p><br></p><p>\r\n\r\n\r\n</p><h2>Swiper3依然拥有progress，这是制作3D切换效果的利器</h2>\r\n<p><strong>Swiper</strong>制作3D效果的方法多种多样。<a href="http://www.swiper.com.cn/api/Effects/2015/0308/195.html" target="_blank">cube</a>和<a href="http://www.swiper.com.cn/api/Effects/2015/0308/196.html" target="_blank">coverflow</a>可以轻松的实现3D过渡，如果你想制作其他新颖的切换方式，推荐使用<a href="http://www.swiper.com.cn/api/method/2015/0308/246.html">progress</a>。</p>\r\n<p><strong>progress</strong>可以帮助你获取到滑块的进度索引。</p><p><br></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211857sf9ugcc7c1v00cg3.jpg" target="_blank"><img src="http://www.phonegap100.com/data/attachment/portal/201606/28/211857sf9ugcc7c1v00cg3.jpg"></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg" target="_blank"><br></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg" target="_blank"><br></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg" target="_blank"><br></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622eusiszhuam340ahu.jpg" target="_blank"><img src="http://www.phonegap100.com/data/attachment/portal/201606/28/211622eusiszhuam340ahu.jpg"></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg" target="_blank"><br></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg" target="_blank"><br></a></p><p><a href="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg" target="_blank"><img src="http://www.phonegap100.com/data/attachment/portal/201606/28/211622r4dvva3zgv4f4o3o.jpg"></a></p><font size="5"><b>下载地址：<br><br></b></font><a href="http://www.swiper.com.cn/" target="_blank">http://www.swiper.com.cn/</a><br><br><br><br><br>'
                }
                this.ctx.body = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>Document</title>
                </head>
                <body>
                    <h2>${data.title}</h2>
                    <div>
                        ${data.content}
                    </div>
                </body>
                </html>
                `
            }
        }
        
        api[this.ctx.params.api]()

    }
}

module.exports = TitleController;
