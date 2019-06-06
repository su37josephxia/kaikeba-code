const EventEmitter = require('events').EventEmitter;     // 引入事件模块
var event = new EventEmitter();     // 实例化事件模块
// 注册事件(customer_event)
event.on('customer_event', function() {
 console.log('customer_event has be occured : ' + new Date());
});
setInterval(function() {
	event.emit('customer_event');     // 发射(触发)事件
}, 500);