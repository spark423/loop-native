var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Group = require('../models/group')
var User = require('../models/user');

module.exports = function(passport) {
	router.get('/groups/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
		Group.findById(req.params.id).populate('members').populate('admins').exec(function(err, group) {
			if (err) {
				throw err;
			} else {
				var adminIDs = [];
				var admins = [];
				for (var i=0; i<group.admins.length; i++) {
					admins.push({
						id: group.admins[i]._id,
						username: group.admins[i].username,
						firstName: group.admins[i].firstName,
						lastName: group.admins[i].lastName
					})
				}
				var memberIDs = [];
				var members = [];
				for (var i=0; i<group.members.length; i++) {
					memberIDs.push(group.members[i]._id.toString());
			  	members.push({
						id: group.members[i]._id,
						username: group.members[i].username,
						firstName: group.members[i].firstName,
						lastName: group.members[i].lastName			  			
			  	})
			  }
			  if (adminIDs.indexOf(req.user._id.toString()) > -1) {
			  	res.json({
			  		admin: true,
            member: true, 
            group: {
              id: group._id,
              name: group.name,
              description: group.description,
              admins: admins,
              members: members
            }
			  	})
			  } else if (memberIDs.indexOf(req.user._id.toString()) > -1) {
			  	res.json({
			  		admin: false,
            member: true, 
            group: {
              id: group._id,
              name: group.name,
              description: group.description,
              admins: admins,
              members: members
            }
          })
			  } else {
			  	res.json({
			  		admin: false,
            member: false, 
            group: {
              id: group._id,
              name: group.name,
              description: group.description,
              admins: admins,
              members: members
            }
          })
			  }
			}
		})
	})

	router.put('/groups/:id/join', passport.authenticate('jwt', { session: false }), function(req, res) {
		Group.findById(req.params.id, function(err, group) {
			if (err) throw err;
			var members = group.members;
			members.push(req.user._id);
			group.members = members;
			group.save(function(err, updatedGroup) {
				if (err) throw err;
				res.json({success: true})
			})
		})
	})

	router.put('/groups/:id/leave', passport.authenticate('jwt', { session: false }), function(req, res) {
		Group.findById(req.params.id, function(err, group) {
			if (err) throw err;
			var members = group.members;
			var index = members.indexOf(req.user._id);
			group.members = members.slice(0, index).concat(members.slice(index+1, members.length));
			group.save(function(err, updatedGroup) {
				if (err) throw err;
				res.json({success: true})
			})
		})
	})


	return router;
}