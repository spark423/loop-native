var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Event = require('../models/event');
var Comment = require('../models/comment');

module.exports = function(passport) {
	router.put('/events/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
		Event.findById(req.params.id, function(err, event) {
			var attendees = event.attendees;
			attendees.push(req.user._id);
			event.attendees = attendees;
			event.save(function(err, updatedEvent) {
				if (err) throw err;
				User.findById(req.user._id, function(err, user) {
					var attendedEvents = user.attendedEvents;
					attendedEvents.push(req.params.id)
					user.attendedEvents = attendedEvents;
					user.save(function(err, updatedUser) {
						if (err) throw err;
						res.json({success: true})
					})
				})
			})
		})
	})

  router.delete('/events/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	  Event.findById(req.params.id, function(err, event) {
		  if (err) throw err;
		  Board.findById(event.board, function(error, board) {
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

  router.post('/events/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
  	var newComment = new Comment({
  		postedBy: req.user._id,
  		source: {"kind": 'Event', "item": req.params.id},
  		text: req.body.text
  	})
  	newComment.save(function(err, newComment) {
  		if (err) throw err;
  		Event.findById(req.params.id, function(err, event) {
  			var eventComments = event.comments
  			eventComments.push(newComment._id);
  			event.comments = eventComments
  			event.save(function(err, updatedEvent) {
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