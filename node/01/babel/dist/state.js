'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showCpu = undefined;

var _cpuStat = require('cpu-stat');

var _cpuStat2 = _interopRequireDefault(_cpuStat);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUsagePercent = _util2.default.promisify(_cpuStat2.default.usagePercent);
var showCpu = async function showCpu() {
    var percent = await getUsagePercent();
    console.log('CPU\u5360\u7528\uFF1A' + percent.toFixed(2) + '%');
};
exports.showCpu = showCpu;