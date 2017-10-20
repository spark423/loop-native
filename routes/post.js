var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Post = require('../models/post');
var Comment = require('../models/comment');
var Notification = require('../models/notification')

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
    async.waterfall([
      function(done) {
        var newComment = new Comment({
          postedBy: req.user._id,
          source: {"kind": 'Post', "item": req.params.id},
          text: req.body.text
        })
        newComment.save(function(err, newComment) {
          if (err) 
            throw err;
          done(err, newComment)
        })
      },
      function(newComment, done) {
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
                done(err, updatedPost)
              })
            })
          })
        })
      },
      function(updatedPost, done) {
        var posterNotification = new Notification({
          type: 'Comment on Created Post',
          message: req.user.firstName + " " + req.user.lastName + " " + "commented on the post " + updatedPost.title + " that you created.",
          routeID: {
            kind: 'Post',
            item: updatedPost._id
          }
        })
        posterNotification.save(function(err, newnotification1) {
          if (err) throw err;
          done(err, updatedPost, newnotification1)
        })
      },
      function(updatedPost, newnotification1, done) {
        User.findById(updatedPost.postedBy, function(err, user) {
          if (err)
            throw err;
          var notifications = user.notifications
          console.log('notifications length 1', notifications.length)
          notifications.push(newnotification1._id);
          user.notifications = notifications
          user.save(function(err, user) {
            if (err)
              throw err;
            done(err, updatedPost)
          })
        })
      },
      function(updatedPost, done) {
        var followerNotification = new Notification({
          type: 'Comment on Followed Post',
          message: req.user.firstName + " " + req.user.lastName + " " + "commented on the post " + updatedPost.title + " that you are following.",
          routeID: {
            kind: 'Post',
            item: updatedPost._id
          }
        })
        followerNotification.save(function(err, newnotification2) {
          if (err) throw err;
          done(err, updatedPost, newnotification2)
        })        
      }
    ],function(err, updatedPost, newNotification2) {
        var promises = updatedPost.followers.map(function(followerID) {
          return new Promise(function(resolve, reject) {       
            User.findById(followerID, function(err, follower){
              var notifications = follower.notifications
              notifications.push(newNotification2._id)
              follower.save(function(err, updatedFollower) {
                if (err) {
                  return reject(err);
                }
                resolve();
              })
            });
          });
        });
        Promise.all(promises).then(function() {
          res.json({success: true})
        }).catch(console.error);        
      })
    });    

  return router;
}