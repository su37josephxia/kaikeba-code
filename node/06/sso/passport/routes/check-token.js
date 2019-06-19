'use strict';

const express = require('express');
const service = require('../service');
const router = express.Router();

router.get('/', function (req, res, next) {
  var token = req.query.token;
  var result = {
    error: 1, //登录失败
  };
  if (service.isTokenValid(token)) {
    result.error = 0;
    result.userId = 'test';
  }
  res.json(result);
});

module.exports = router;
