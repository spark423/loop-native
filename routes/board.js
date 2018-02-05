var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Board = require('../models/board');
var Post = require('../models/post');
var User = require('../models/user');
var Event = require('../models/event');
var contensort = require('./contentsort')

module.exports = function(passport) {
  router.get('/boards', passport.authenticate('jwt', {session:false}), function(req, res) {
    Board.find({create: true}).select('name')
    .then(function(boards) {
      res.json({boards: boards})
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
  })
  
  router.get('/boards/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    let boardPromise = Board.find({_id: req.params.id}).limit(1).lean();
    let postsPromise = boardPromise.then(async function(board) {
      if (board[0].private) {
        let posts = await Post.find({board: req.params.id, postedBy: req.user._id}).sort({createdAt: -1}).limit(100).populate('board').populate('postedBy').populate({path: 'comments', populate: 'postedBy'})
      } else {
        let posts = await Post.find({board: req.params.id}).sort({createdAt: -1}).limit(100).populate('board').populate('postedBy').populate({path: 'comments', populate: {path: 'postedBy'}});;
        return posts
      }
    })
    let eventsPromise = boardPromise.then(async function(board) {
      let start = new Date();
      let end = new Date(start.getTime() + 30 * 24 * 60 * 60 * 1000);    
      if (board[0].name === 'Events') {
        let events = await Event.find({$and: [{date: {$gte: start}}, {date: {$lte: end}}]}).sort({EventDetailUpdatedDate: -1}).limit(100).populate('board').populate('attendees').populate({path: 'comments', populate: {path: 'postedBy'}});
        return events
      } else {
        let events = await Event.find({board: req.params.id, $and: [{date: {$gte: start}}, {date: {$lte: end}}]}).sort({EventDetailUpdatedDate: -1}).limit(100).populate('board').populate({path: 'comments', populate: {path: 'postedBy'}});
        return events
      }
    })
    Promise.all([
      boardPromise,
      postsPromise,
      eventsPromise
    ])
    .then(async function([board,posts,events]) {
      let contents = contensort(posts,events,req.user);
      res.json({contents: contents})
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).send(err);
    })
  });
  
  router.post('/boards/:id/post', passport.authenticate('jwt', { session: false }), function(req, res) {
  	let newPost = new Post({
      postedBy: req.user._id,
      board: req.params.id,
      title: req.body.title,
      text: req.body.text
    });
    let postPromise = newPost.save();
    let boardPromise = postPromise.then(function(post) {
      Board.findOneAndUpdate({_id: req.params.id}, {$push: {contents: {"kind": "Post", "item": post._id}}});
    })
    let userPromise = postPromise.then(function(post) {
      User.findOneAndUpdate({_id: req.user._id}, {$push: {posts: post._id}});
    })
    Promise.all([postPromise,boardPromise,userPromise])
    .then(function([post,board,user]) {
      res.json({success: true});
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
  })

  return router;
}
