class Router {
    constructor() {
      this.stack = [];
    }
  
    register(path, methods, middleware) {
      let route = {path, methods, middleware}
      this.stack.push(route);
    }
    // 现在只支持get和post，其他的同理
    get(path,middleware){
      this.register(path, 'get', middleware);
    }
    post(path,middleware){
      this.register(path, 'post', middleware);
    }
    routes() {
      let stock = this.stack;
      return async function(ctx, next) {
        let currentPath = ctx.url;
        let route;
  
        for (let i = 0; i < stock.length; i++) {
          let item = stock[i];
          if (currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
            // 判断path和method
            route = item.middleware;
            break;
          }
        }
  
        if (typeof route === 'function') {
          route(ctx, next);
          return;
        }
  
        await next();
      };
    }
  }
  module.exports = Router;