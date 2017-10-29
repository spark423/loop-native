var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Board = require('../models/board');
var Group = require('../models/group');

module.exports = function(passport) {
  router.get('/drawer', passport.authenticate('jwt', { session: false }), function(req, res) {
  	Board.find({}, function(err, boards) {
  		if (err) {
        throw err;
      }
  		var boardsArray = boards.map(function(board) {
        return {"id": board._id, "name": board.name, "asset": board.asset}
      })
  		Group.find({}, function(err, groups) {
  			if (err) {
          throw err;
        }
  		  var groupsArray = groups.map(function(group) {
          return {"id": group._id, "name": group.name}
        });
  		  res.json({boards: boardsArray, groups: groupsArray});  		  
  		})
  	})
  });  
  return router;
}

