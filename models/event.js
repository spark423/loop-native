var mongoose = require('mongoose');

var eventSchema = new mongoose.Schema({
  EMSid: {type: String},  
  createdAt: {type: Date, default: Date.now},
  updatedTime: {type: Date, default: Date.now},
  contact: {type: String},
  board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'},
  title: {type: String},
  date: {type: Date},
  startTime: {type: Date},
  endTime: {type: Date},
  location: {type: String},
  description: {type: String},
  attendees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],  
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});



// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Event', eventSchema);