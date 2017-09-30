var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Post = require('../models/post');
var Comment = require('../models/comment');

module.exports = function(passport) {
  router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	  Post.findById(req.params.id, function(err, post) {
		  if (err) throw err;
		  Board.findById(post.board, function(error, board) {
			  if (err)throw err;
			  var boardContents = board.contents;
			  var contents = [];
			  for (var i=0; i<board.contents.length; i++) {
				  contents.push(board.contents[i].item.toString())
			  }
			  var index = contents.indexOf(req.params.id.toString())
			  board.contents = boardContents.slice(0, index).concat(boardContents.slice(index+1, boardContents.length))
			  board.save(function(error, updatedBoard) {
			  	if (err) throw err;
			  	res.json({success: true})
			  })
		  })
	  })
  })

  router.post('/posts/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
  	var newComment = new Comment({
  		postedBy: req.user._id,
  		source: {"kind": 'Post', "item": req.params.id},
  		text: req.body.text
  	})
  	newComment.save(function(err, newComment) {
  		if (err) throw err;
  		Post.findById(req.params.id, function(err, post) {
  			var postComments = post.comments
  			postComments.push(newComment._id);
  			post.comments = postComments
  			post.save(function(err, updatedPost) {
  				if (err) throw err;
  				User.findById(req.user._id, function(err, user) {
  					var userComments = user.comments
  					userComments.push(newComment._id)
  					user.comments = userComments
  					user.save(function(err, updatedUser) {
  						if (err) throw err;
  						res.json({success: true})
  					})
  				})
  			})
  		})
  	})
  })

  return router;
}