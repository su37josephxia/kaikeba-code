// TODO: 科里化变换 对象 =》 对象工厂
module.exports = (app) => ({
  "get /": app.$ctrl.home.index,
  "get /detail": app.$ctrl.home.detail,
});
