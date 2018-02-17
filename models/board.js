var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  description: {type: String},
  create: {type: Boolean, default: true},
  unsubscribable: {type: Boolean, default: false},
  private: {type: Boolean, default: false},
  asset: {type: String},
  archive: {type: Boolean, default: false},
  active: {type: Boolean, default: true},  
  notifications: [{type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}],
  contents: [{
    kind: String,
    item: { type: mongoose.Schema.Types.ObjectId, refPath: 'contents.kind' }
  }]
})



// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Board', boardSchema);