var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Board = require('../models/board');
var Post = require('../models/post')
var User = require('../models/user')


module.exports = function(passport) {
  router.get('/boards/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
    Board.findById(req.params.id).populate([{path: 'contents.item', populate: [{path: 'postedBy'}, {path: 'attendees'}, {path: 'comments', populate: {path: 'postedBy'}}]}]).exec(function(err, board) {
      if (err) throw err;
      var contents = [];
      for (var i=0; i<board.contents.length; i++) {
        if (board.contents[board.contents.length-1-i].kind == 'Post') {
        	var comments = [];
        	for (var j=0; j<board.contents[board.contents.length-1-i].item.comments.length; j++) {
        		comments.push({
        			"id": board.contents[board.contents.length-1-i].item.comments[board.contents[board.contents.length-1-i].item.comments.length-1-j]._id,
        			"createdAt": board.contents[board.contents.length-1-i].item.comments[board.contents[board.contents.length-1-i].item.comments.length-1-j].createdAt,
        			"postedBy": {
        				"id": board.contents[board.contents.length-1-i].item.comments[board.contents[board.contents.length-1-i].item.comments.length-1-j].postedBy._id,
        				"firstName": board.contents[board.contents.length-1-i].item.comments[board.contents[board.contents.length-1-i].item.comments.length-1-j].postedBy.firstName,
        				"lastName": board.contents[board.contents.length-1-i].item.comments[board.contents[board.contents.length-1-i].item.comments.length-1-j].postedBy.lastName
        			},
        			"text": board.contents[board.contents.length-1-i].item.comments[board.contents[board.contents.length-1-i].item.comments.length-1-j].text
        		})
        	}
          if (req.user._id.toString() === board.contents[board.contents.length-1-i].item.postedBy._id.toString()) {
            contents.push({
              "own": true,
              "id": board.contents[board.contents.length-1-i].item._id,
              "createdAt": board.contents[board.contents.length-1-i].item.createdAt,
              "postedBy": {
                "id": board.contents[board.contents.length-1-i].item.postedBy._id,
                "firstName": board.contents[board.contents.length-1-i].item.postedBy.firstName,
                "lastName": board.contents[board.contents.length-1-i].item.postedBy.lastName
              },
              "title": board.contents[board.contents.length-1-i].item.title,
              "text": board.contents[board.contents.length-1-i].item.text,
              "comments": comments
            })
          } else {
            contents.push({
              "own": false,
              "id": board.contents[board.contents.length-1-i].item._id,
              "createdAt": board.contents[board.contents.length-1-i].item.createdAt,
              "postedBy": {
                "id": board.contents[board.contents.length-1-i].item.postedBy._id,
                "firstName": board.contents[board.contents.length-1-i].item.postedBy.firstName,
                "lastName": board.contents[board.contents.length-1-i].item.postedBy.lastName
              },
              "title": board.contents[board.contents.length-1-i].item.title,
              "text": board.contents[board.contents.length-1-i].item.text,
              "comments": comments
            })
          }
        } else {
          var attending = false;
          for (var j=0; j<req.user.attendedEvents.length; j++) {
          	if (req.user.attendedEvents[j].toString() === board.contents[board.contents.length-1-i].item._id.toString()) {
          		attending = true;
          	}
          }
          var attendees = [];
          for (var j=0; j<board.contents[board.contents.length-1-i].item.attendees.length; j++) {
          	attendees.push({
          		"id": board.contents[board.contents.length-1-i].item.attendees[i]._id,
          		"username": board.contents[board.contents.length-1-i].item.attendees[i].username,
          		"firstname": board.contents[board.contents.length-1-i].item.attendees[i].firstName,
          		"lastname": board.contents[board.contents.length-1-i].item.attendees[i].lastName
          	})
          }
          if (req.user._id.toString() === board.contents[board.contents.length-1-i].item.postedBy._id.toString()) {
            contents.push({
              "own": true,
              "attending": attending,
              "id": board.contents[board.contents.length-1-i].item._id,
              "createdAt": board.contents[board.contents.length-1-i].item.createdAt,
              "postedBy": {
                "id": board.contents[board.contents.length-1-i].item.postedBy._id,
                "firstName": board.contents[board.contents.length-1-i].item.postedBy.firstName,
                "lastName": board.contents[board.contents.length-1-i].item.postedBy.lastName
              },
              "title": board.contents[board.contents.length-1-i].item.title,
              "date": board.contents[board.contents.length-1-i].item.date,
              "startTime": board.contents[board.contents.length-1-i].item.startTime,
              "endTime": board.contents[board.contents.length-1-i].item.endTime,
              "location": board.contents[board.contents.length-1-i].item.location,
              "description": board.contents[board.contents.length-1-i].item.description,
              "comments": [],
              "attendees": attendees
            })
          } else {
            contents.push({
              "own": false,
              "attending": attending,              
              "id": board.contents[board.contents.length-1-i].item._id,
              "createdAt": board.contents[board.contents.length-1-i].item.createdAt,
              "postedBy": {
                "id": board.contents[board.contents.length-1-i].item.postedBy._id,
                "firstName": board.contents[board.contents.length-1-i].item.postedBy.firstName,
                "lastName": board.contents[board.contents.length-1-i].item.postedBy.lastName
              },
              "title": board.contents[board.contents.length-1-i].item.title,
              "date": board.contents[board.contents.length-1-i].item.date,
              "startTime": board.contents[board.contents.length-1-i].item.startTime,
              "endTime": board.contents[board.contents.length-1-i].item.endTime,
              "location": board.contents[board.contents.length-1-i].item.location,
              "description": board.contents[board.contents.length-1-i].item.description,              
              "comments": [],
              "attendees": attendees
            })
          }          
        }
      }
      res.json({
      	board: {
      		id: board._id,
      		name: board.name,
      		description: board.description,
      		contents: contents
      	}
      })
    })
  });
  
  router.post('/boards/:id/post', passport.authenticate('jwt', { session: false }), function(req, res) {
  	var newPost = new Post({
      postedBy: req.user._id,
      board: req.params.id,
      title: req.body.title,
      text: req.body.text
    })
    newPost.save(function(err, newPost) {
    	if (err) throw err;
    	Board.findById(req.params.id, function(err, board) {
    		if (err) throw err;
    		var boardContents = board.contents;
    		boardContents.push({"kind": 'Post', "item": newPost._id})
    		board.contents = boardContents;
    		board.save(function(err, updatedBoard) {
    	    User.findById(req.user._id, function(err, user) {
    		    var userPosts = user.posts;
    		    userPosts.push(newPost._id);
    		    user.posts = userPosts
    		    user.save(function(err, user) {
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
