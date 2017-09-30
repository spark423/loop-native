var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Post = require('../models/post');
var Event = require('../models/event')
var Comment = require('../models/comment');

module.exports = function(passport) {
  router.delete('/comments/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	  Comment.findById(req.params.id, function(err, comment) {
		  if (err) {
        throw err;
      } else if (comment.source.kind === 'Post') {
        Post.findById(comment.source.item, function(err, post) {
          var postComments = post.comments
          var comments = [];
          for (var i=0; i<post.comments.length; i++) {
            comments.push(post.comments[i].toString())
          }
          var index = comments.indexOf(req.params.id.toString())
          post.comments = postComments.slice(0, index).concat(postComments.slice(index+1, postComments.length))
          post.save(function(err, updatedPost) {
            if (err) throw err;
            res.send({success: true});
          })
        })
      } else if (comment.source.kind === 'Event') {
        Event.findById(comment.source.item, function(err, event) {
          var eventComments = event.comments
          var comments = [];
          for (var i=0; i<event.comments.length; i++) {
            comments.push(event.comments[i].toString())
          }
          var index = comments.indexOf(req.params.id.toString())
          event.comments = eventComments.slice(0, index).concat(eventComments.slice(index+1, eventComments.length))
          event.save(function(err, updatedEvent) {
            if (err) throw err;
            res.send({success: true});
          })
        })
      } else {
        Comment.findById(comment.source.item, function(err, comment) {
          var commentComments = comment.comments
          var comments = [];
          for (var i=0; i<comment.comments.length; i++) {
            comments.push(comment.comments[i].toString())
          }
          var index = comments.indexOf(req.params.id.toString())
          comment.comments = commentComments.slice(0, index).concat(commentComments.slice(index+1, commentComments.length))
          comment.save(function(err, updatedComment) {
            if (err) throw err;
            res.send({success: true});
          })
        })
      }
	  })
  })

  router.post('/comments/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
  	var newComment = new Comment({
  		postedBy: req.user._id,
  		source: {"kind": 'Comment', "item": req.params.id},
  		text: req.body.text
  	})
  	newComment.save(function(err, newComment) {
  		if (err) throw err;
  		Comment.findById(req.params.id, function(err, comment) {
  			var commentComments = comment.comments
  			commentComments.push(newComment._id);
  			comment.comments = commentComments
  			comment.save(function(err, updatedComment) {
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