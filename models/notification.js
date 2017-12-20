var mongoose = require('mongoose');

var notificationSchema = new mongoose.Schema({
	type: {type: String},
	createdAt: {type: Date, default: Date.now},
	message: {type: String},
	routeID: {
		kind: String,
		contentId: {type: mongoose.Schema.Types.ObjectId, refPath: 'source.kind'},
		boardId: {type: mongoose.Schema.Types.ObjectId, refPath: 'Board'}
	}
});

module.exports = mongoose.model('Notification', notificationSchema);