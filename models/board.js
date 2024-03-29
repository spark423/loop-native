var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({  
  name: {type: String, required: true},
  description: {type: String},
  asset: {type: String},
  contents: [{
    kind: String,
    item: { type: mongoose.Schema.Types.ObjectId, refPath: 'contents.kind' }
  }]
})



// Export schema =====================================================================================================================================================================
module.exports = mongoose.model('Board', boardSchema);