/**
 *  全局定义
 * @param app
 */

class AppBootHook {
    constructor(app) {
        this.app = app;
        app.root_path = __dirname;
    }

    configWillLoad() {
        // Ready to call configDidLoad,
        // Config, plugin files are referred,
        // this is the last chance to modify the config.
    }

    configDidLoad() {
        // Config, plugin files have been loaded.
    }

    async didLoad() {
        // All files have loaded, start plugin here.
    }

    async willReady() {
        // All plugins have started, can do some thing before app ready
    }

    async didReady() {
        // Worker is ready, can do some things
        // don't need to block the app boot.
        console.log('========Init Data=========')
        const ctx = await this.app.createAnonymousContext();
        await ctx.model.User.remove();
        await ctx.service.user.create({
            mobile: '13611388415',
            password: '111111',
            realName: '老夏',
        })
    }

    async serverDidReady() {

    }

    async beforeClose() {
        // Do some thing before app close.
    }
}

module.exports = AppBootHook;

