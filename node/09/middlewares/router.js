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
        console.log('go...')
      let stock = this.stack;
      return async function(ctx, next) {
        let currentPath = ctx.url;
        let route;
  
        for (let i = 0; i < stock.length; i++) {
            console.log('stock',stock)
          let item = stock[i];
          console.log('in'+currentPath+ctx.method)
          if (currentPath === item.path && item.methods.indexOf(ctx.method) >= 0) {
              
              console.log('in')
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