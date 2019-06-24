'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  mongoose : {
    enable: true,
    package: 'egg-mongoose',
  },
  
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  
  swaggerdoc: {
    enable: true,
    package: 'egg-swagger-doc-feat',
  },

  bcrypt : {
    enable: true,
    package: 'egg-bcrypt'
  },

  jwt: {
    enable: true,
    package: 'egg-jwt',
  }
};
