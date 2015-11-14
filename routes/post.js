var router = require('express').Router(),
    Post = require('../models/post');

router.get('/', function(req, res, next) {
  Post.find({}).sort({ created: 'desc' }).lean().exec(function(err, posts) {
    if(err) return res.send({ success: false, msg: 'Unable to retrieve posts' });
    res.send({ success: true, posts: posts });
  });
});

router.post('/', function(req, res, next) {

});

router.put('/:id/vote/:direction', function(req, res, next) {

});

module.exports = router;
