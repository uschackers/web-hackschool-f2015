var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  content: String,
  created: Date,
  votes: Number
});

postSchema.methods.vote = function(up, cb) {
  var vote = up ? 1 : -1;
  this.votes += vote;
  this.save(function(err) {
    if(err) cb(err);
    else cb();
  });
};

module.exports = mongoose.model('Post', postSchema);
