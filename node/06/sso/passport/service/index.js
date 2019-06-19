'use strict';

/**
 *
 * @param {String} token
 * @return {Boolean}
 */
function isTokenValid(token) {
  // TODO 从存储系统中查找相应 token 信息，判断 token 的合法性
  if (token && token === 'passport') {
    return true;
  }
  return false;
}

module.exports = {
  isTokenValid
};
