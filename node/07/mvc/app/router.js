'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.mvc.index);
  router.get('/content', controller.mvc.content);
  router.get('/origin/:api', controller.origin.index);
};
