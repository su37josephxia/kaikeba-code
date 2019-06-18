var keystone = require('keystone');
var Types = keystone.Field.Types;

var Order = new keystone.List('Order');

Order.add({
	name: { type: Types.Text, required: true, index: true },
	date: { type: Types.Date },
	text: { type: Types.Text },
	markdown: { type: Types.Markdown},
	code: { type: Types.Code},
	color: { type: Types.Color},
});

Order.register();
