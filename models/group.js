var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  description: {type: String},
  admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});



// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Group', groupSchema);