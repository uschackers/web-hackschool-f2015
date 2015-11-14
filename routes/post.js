var router = require('express').Router(),
    Post = require('../models/post');

router.get('/', function(req, res, next) {
  Post.find({}).lean().exec(function(err, posts) {
    if(err) return res.send({ success: false, msg: 'Unable to retrieve posts' });
    res.send({ success: true, posts: posts });
  });
});

router.post('/', function(req, res, next) {
  var newPost = new Post({
    content: req.body.content,
    vote: 0,
    created: Date.now()
  });
  newPost.save(function(err) {
    if(err) return res.send({ success: false, msg: 'Unable to save post' });
    res.send({ success: true });
  });
});

router.put('/:id/vote/:direction', function(req, res, next) {
  if(req.params.direction !== 'up' && req.params.direction !== 'down') {
    return res.send({ 
      success: false, 
      msg: 'Invalid voting direction'
    });
  }
  var direction = req.params.direction === 'up' ? true : false;
  Post.findOne(req.params.id).exec(function(err, post) {
    if(err) { 
      return res.send({ 
        success: false,
        msg: 'Unable to find post with id ' + req.params.id
      });
    }
    post.vote(direction, function(err) {
      if(err) return res.send({ success: false, msg: 'Voting failed' });
      return res.send({ success: true });
    });
  });
});

module.exports = router;
