# Node.js 单点登录实例

一个基于 Express 实现的 Node.js 单点登录实例，核心思路是通过重定向到统一的认证中心进行登录验证。

不过，通过研究淘宝 & 天猫、京东和谷歌的单点登录机制发现，他们都是通过跨域设置 cookie 来实现的，其中淘宝和京东通过 JSONP 设置，谷歌通过重定向方式设置，计划日后通过这样的方式再实现一个例子。

## 如何测试

运行 Demo 需要先安装 Node.js 和 Yarn。

1. **克隆仓库并安装依赖**：

```bash
$ git clone https://github.com/hezhii/nodejs-sso-example.git
$ cd nodejs-sso-example
$ yarn install
```

2. **启动服务**
然后分别启动三个服务：
  
```bash
$ cd passport
$ node app.js
$ cd ../system
$ PORT=8081 SERVER_NAME=a node app.js
$ PORT=8082 SERVER_NAME=b node app.js
```

测试用户名/密码

3. **测试**

打开浏览器访问 `localhost:8081`，发现会被重定向到 `localhost:8080`，输入用户名和密码后登录。

接着新开一个窗口访问 `localhost:8082`，发现不需要登录直接可以访问。
