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
        Post.findOneAndUpdate({_id: comment.source.item}, {$pull: {comments: req.params.id}}, function(err, board) {
          if (err) {
            throw err;
          }
          res.json({success: true});
        })        
      } else if (comment.source.kind === 'Event') {
        Event.findOneAndUpdate({_id: comment.source.item}, {$pull: {comments: req.params.id}}, function(err, board) {
          if (err) {
            throw err;
          }
          res.json({success: true});
        })                
      } else {
        Comment.findOneAndUpdate({_id: comment.source.item}, {$pull: {comments: req.params.id}}, function(err, board) {
          if (err) {
            throw err;
          }
          res.json({success: true});
        })                
      }
	  })
  })

  router.post('/comments/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
  	let newComment = new Comment({
  		postedBy: req.user._id,
  		source: {"kind": 'Comment', "item": req.params.id},
  		text: req.body.text
  	})
  	newComment.save(function(err, newComment) {
  		if (err) {
        throw err;
      }
      Comment.findOneAndUpdate({_id: req.params.id}, {$push: {comments: newComment._id}}, function(err, board) {
        if (err) {
          throw err;
        }
        User.findOneAndUpdate({_id: req.user._id}, {$push: {comments: newComment._id}}, function(err, user) {
          if (err) {
            throw err;
          }
          res.json({success: true})
        })
      });      
  	})
  })

  router.put('/comments/:id/flag', passport.authenticate('jwt', { session: false }), function(req, res) {
    Comment.findOneAndUpdate({_id: req.params.id}, {$set: {flagged: true}},function(err,comment) {
      Post.findById(comment.source.item, function(err, sourcePost) {
        if (err) {
          throw err;
        } else {
          let notificationToCommenter = new Notification({
            type: 'Flagged Comment',
            message: "Your comment to the post \"" + sourcePost.title + "\" has been flagged. Please wait for the admin's review.",
            routeID: {
              kind: 'Comment',
              id: comment._id
            }
          })
          notificationToCommenter.save(function(err, notificationToCommenter) {
            if (err) {
              throw err;
            } else {
              User.findOneAndUpdate({_id: req.user._id}, {$push: {notifications: notificationToCommenter}}, function(err,user) {
                if (err) {
                  throw err;
                } else {
                  let notificationToAdmin = new Notification({
                    type: "Flagged Post",
                    message: "A comment to the post titled \"" + sourcePost.title + "\" has been flagged.",
                    routeID: {
                      kind: 'Post',
                      id: post._id
                    }               
                  })
                  notificationToAdmin.save(function(err, notificationToAdmin) {
                    if (err) {
                      throw err;
                    } else {
                      User.updateMany({admin: true}, {$push: {notifications: notificationToAdmin}}, function(err, admin) {
                        if (err) {
                          throw err;
                        } else {
                          Board.findOneAndUpdate({_id: post.board}, {$push: {notifications: notificationToAdmin}}, function(err, originBoard) {
                            if (err) {
                              throw err;
                            } else {
                              res.json({success: true});
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          }) 
        }
      })     
    })  
  })


  return router;
}