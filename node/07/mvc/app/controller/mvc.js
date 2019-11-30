const Controller = require('egg').Controller;

class TitleController extends Controller {
    async index() {
        let list = await this.service.title.getTitleList();
        await this.ctx.render('title', {
            list: list,
        })
    }
    async content() {
        let aid = this.ctx.query.aid;
        let content = await this.service.title.getContent(aid);        await this.ctx.render('content', {
            content: content[0]
        })
    }
}

module.exports = TitleController;
