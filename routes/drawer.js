var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Board = require('../models/board');
var Group = require('../models/group');

module.exports = function(passport) {
  router.get('/drawer', passport.authenticate('jwt', { session: false }), function(req, res) {
  	Board.find({}, function(err, boards) {
  		if (err) throw err;
  		var boardsList = [];
  		for (var i=0; i<boards.length; i++) {
  			boardsList.push({"id": boards[i]._id, "name": boards[i].name, "asset": boards[i].asset})
  		}
  		Group.find({}, function(err, groups) {
  			if (err) throw err;
  		  var groupsList = [];
  		  for (var i=0; i<groups.length; i++) {
  			  groupsList.push({"id": groups[i]._id, "name": groups[i].name})
  		  }
  		  res.json({boards: boardsList, groups: groupsList});  		  
  		})
  	})
  });

  // router.get('/boards', passport.authenticate('jwt', { session: false }), function(req, res) {
  //   console.log("got here 1")
  // 	// Board.findById(req.params.id).populate('contents').exec(function(err, board) {
  //  //    if (err) throw err;
  //  //    console.log("Board is", board);
  //  //    res.json({message: "Hello"})
  //  //  })
  //   res.json({message: "Hello"})
  // });  
  return router;
}

