var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Group = require('../models/group');
var Time = require('../models/time');

module.exports = function(passport) {
  router.put('/subscription', passport.authenticate('jwt', { session: false }), function(req, res) {
    Time.findOneAndUpdate({}, {$push: {follows: {createdAt: Date.now(), user:req.user._id}}}, function(err, time) {
      if (err) {
        throw err;
      } else if (req.body["subscribedBoards[]"]) {
        User.findOneAndUpdate({_id: req.user._id}, {$set: {subscribedBoards: [].concat(req.body["subscribedBoards[]"])}},function(err,user) {
          if (err) {
            throw err;
          } else {
            res.json({success: true})
          }
        })             
      } else {
        User.findOneAndUpdate({_id: req.user._id}, {$set: {subscribedBoards: []}},function(err,user) {
          if (err) {
            throw err;
          } else {
            res.json({success: true})
          }
        }) 
      }
    }) 
  }); 

  router.get('/drawer', passport.authenticate('jwt', { session: false }), function(req, res) {
    let boardsPromise = Board.aggregate([{$match: {$and: [{create: true},{archive: false}]}},{$project: {"id": "$_id", "_id": 0, "name": 1}}]);
    let groupsPromise = Group.aggregate([{$match: {archive: false}},{$project: {"id": "$_id", "_id": 0, "name": 1}}]);
    Promise.all([boardsPromise, groupsPromise])
      .then(function([boards, groups]) {
        res.json({boards: boards, groups: groups});
      })
      .catch(function(err) {
        res.status(500).send(err);
      })
  });     
  return router;
}

