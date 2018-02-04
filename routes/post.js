var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Post = require('../models/post');
var Comment = require('../models/comment');
var Notification = require('../models/notification')
var Time = require('../models/time')

module.exports = function(passport) {
  router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	  Post.findById(req.params.id, function(err, post) {
		  if (err) {
        throw err;
      } else {
        Board.findOneAndUpdate({_id: post.board}, {$pull: {contents: {item: req.params.id}}}, function(err, board) {
          if (err) {
            throw err;
          } else {
            res.json({success: true});
          }
        })
      }
	  })
  })

  router.put('/posts/:id/follow', passport.authenticate('jwt', { session: false }), function(req, res) {
    Time.findOneAndUpdate({}, {$push: {follows: {createdAt: Date.now(), post: req.params.id, user:req.user._id}}}, function(err, time) {
      if (err) {
        throw err;
      } else {
        Post.findOneAndUpdate({_id: req.params.id}, {$push: {followers: req.user._id}}, function(err, post) {
          if (err) {
            throw err;
          } else {
            User.findOneAndUpdate({_id: req.user._id}, {$push: {followingPosts: post._id}}, function(err, user) {
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
  })

  router.put('/posts/:id/unfollow', passport.authenticate('jwt', { session: false }), function(req, res) {
    Time.findOneAndUpdate({_id: "5a073c57134ccaaa80e6c7f5"}, {$pull: {follows: {post: req.params.id, user:req.user._id}}}, function(err, time) {
      if (err) {
        throw err;
      } else {
        Post.findOneAndUpdate({_id: req.params.id}, {$pull: {followers: req.user._id}}, function(err, post) {
          if (err) {
            throw err;
          } else {
            User.findOneAndUpdate({_id: req.user._id}, {$pull: {followingPosts: post._id}}, function(err, user) {
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
  })  

  router.post('/posts/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
    let newComment = new Comment({
      postedBy: req.user._id,
      source: {kind: "Post", _id: req.params.id},
      text: req.body.text
    })
    let commentPromise = newComment.save();
    let updateUserPromise = commentPromise.then(async function(comment) {
      await User.findOneAndUpdate({_id: req.user._id}, {$push: {comments: comment._id}})
    })
    let updatePostPromise = commentPromise.then(async function(comment) {
      console.log("me", req.user._id)
      let post = await Post.findOneAndUpdate({_id: req.params.id}, {$push: {comments: comment._id}});
      console.log("him", post.postedBy);
      console.log(req.user._id.toString() !== post.postedBy.toString())
      if (req.user._id.toString() !== post.postedBy.toString()) {
        let newNotificationToPoster = new Notification({
          to: post.postedBy,
          type: 'Comment on Created Post',
          message: req.user.firstName + " " + req.user.lastName + " " + "commented on your post titled \"" + post.title + "\".",
          routeID: {
            kind: 'Post',
            id: post._id,
            boardId: post.board
          }
        })
        let savedNotificationToPoster = await newNotificationToPoster.save();
      }
      let followers = post.followers.filter(function(follower){
        return follower.toString() !== req.user._id.toString()
      })
      for (var i=0; i<followers.length; i++) {
        let newNotificationToFollowers = new Notification({
          to: followers[i],
          type: "Comment on Following Post",
          message: req.user.firstName + " " + req.user.lastName + " " + "commented on the post \"" + post.title + "\" that you are following.",
          routeID: {
            kind: "Post", 
            id: post._id,
            boardId: post.board
          }        
        })
        let savedNotificationToFollowers =  await newNotificationToFollowers.save();
      }      
      return comment
    })
    .then(function(comment) {
      res.json({
        comment: {
          "own": req.user._id.toString() === comment.postedBy.toString(),
          "id": comment._id,
          "postedBy": {
            "id": req.user._id,
            "firstName": req.user.firstName,
            "lastName": req.user.lastName,
            "username": req.user.username,
            "isLoopUser": true
          },
          "createdAt": comment.createdAt,
          "text": comment.text
        }
      })
    })
    .catch(function(err) {
      res.status(500).send(err);
    })    
  })


  router.put('/posts/:id/flag', passport.authenticate('jwt', { session: false }), function(req, res) {
    let postPromise = Post.findOneAndUpdate({_id: req.params.id}, {$set: {flagged: true}});
    let notificationToPosterPromise = postPromise.then(function(post) {
      let notificationToPoster = new Notification({
        to: post.postedBy,
        type: 'Flagged Post',
        message: "Your post \"" + post.title + "\" has been flagged. Please wait for the admin's review.",
        routeID: {
          kind: 'Post',
          id: post._id,
          boardId: post.board
        }
      })
      notificationToPoster.save();
    })
    let notificationToAdminPromise = postPromise.then(async function(post) {
      let users = await User.find({admin: true});
      for (var i=0; i<users.length; i++) {
        let notificationToAdmin = new Notification({
          to: users[i]._id,
          type: "Flagged Post",
          message: "The post titled \"" + post.title + "\" has been flagged.",
          routeID: {
            kind: 'Post',
            id: post._id,
            boardId: post.board
          }               
        })
        await notificationToAdmin.save();
      }      
    })
    Promise.all([postPromise,notificationToPosterPromise,notificationToAdminPromise])
    .then(function(result) {
      res.json({success: true})      
    })
    .catch(function(err) {
      res.status(500).send(err);
    }) 
  })


  return router;
}