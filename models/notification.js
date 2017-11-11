var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
	type: {type: String},
	created: {type: Date, default: Date.now()},
	message: {type: String},
	routeID: {
		kind: String,
		id: { type: mongoose.Schema.Types.ObjectId, refPath: 'source.kind' }
	}
});

module.exports = mongoose.model('Notification', notificationSchema);