var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  content: String,
  created: Date,
  votes: Number
});

postSchema.methods.vote = function(up, cb) {
  
};

module.exports = mongoose.model('Post', postSchema);
