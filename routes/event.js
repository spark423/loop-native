var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Event = require('../models/event');
var Comment = require('../models/comment');
var Notification = require('../models/notification');


module.exports = function(passport) {
	router.put('/events/:id/attend', passport.authenticate('jwt', { session: false }), async function(req, res) {
		let userPromise = User.findOneAndUpdate({_id: req.user._id}, {$addToSet: {attendedEvents: req.params.id}}, {new: true});
		let eventPromise = Event.findOneAndUpdate({_id: req.params.id}, {$addToSet: {attendees: req.user._id}}, {new: true});
		Promise.all([userPromise, eventPromise])
		.then(async function([user,event]) {
			let eventCreator = await User.findOne({username: event.contact});
			if (eventCreator) {
				let notificationToCreator = new Notification({
					to: user._id,
					type: 'Event',
					message: user.firstName + " " + user.lastName + " is attending your event: " + event.title,
					routeID: {
						kind: 'Event',
						id: event._id,
						boardId: event.board
					}
				})
				await notificationToCreator.save();
			}
			return [user, event]
		})
		.then(function([user, event]) {
			res.json({user: {
				id: user._id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				attendedEvents: user.attendedEvents
			}})
		})
		.catch(function(err) {
			res.status(500).send(err);
		})
	})



	router.put('/events/:id/unattend', passport.authenticate('jwt', { session: false }), function(req, res) {
		let userPromise = User.findOneAndUpdate({_id: req.user._id}, {$pull: {attendedEvents: req.params.id}}, {new: true});
		let eventPromise = Event.findOneAndUpdate({_id: req.params.id}, {$pull: {attendees: req.user._id}}, {new: true});
		Promise.all([userPromise, eventPromise])
		.then(function([user, event]) {
			res.json({user: {
				id: user._id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				attendedEvents: user.attendedEvents
			}})
		})
		.catch(function(err) {
			res.status(500).send(err);
		})
	})




  router.delete('/events/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	  Event.findById(req.params.id, function(err, event) {
		  if (err)  {
		  	throw err;
		  } else {
        Board.findOneAndUpdate({_id: event.board}, {$pull: {contents: {item: req.params.id}}}, function(err) {
          if (err) {
            throw err;
          } else {
        	  res.json({success: true});
          }
        })	  
		  }
    })
  })

  router.post('/events/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
  	let newComment = new Comment({
  		postedBy: req.user._id,
  		source: {"kind": 'Event', "item": req.params.id},
  		text: req.body.text
  	})
  	newComment.save(function(err, comment) {
  		if (err) {
        throw err;
      }
      Event.findOneAndUpdate({_id: req.params.id}, {$push: {comments: comment._id}}, function(err) {
        if (err) {
          throw err;
        }
        User.findOneAndUpdate({_id: req.user._id}, {$push: {comments: comment._id}}, function(err) {
          if (err) {
            throw err;
          }
          res.json({comment: {
            "own": req.user._id.toString() === comment.postedBy.toString(),	
            "id": comment._id,
            "own": true,
            "postedBy": {
              "id": req.user._id,
              "firstName": req.user.firstName,
              "lastName": req.user.lastName,
              "username": req.user.username,
              "isLoopUser": true
            },
            "text": comment.text,
            "createdAt": comment.createdAt
          }})
        })
      });      
  	})
  })

  return router;
}