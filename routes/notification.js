var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user')
var Notification = require('../models/notification')

module.exports = function(passport) {
  router.get('/notifications', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findById(req.user._id).populate('notifications').exec(function(err, user) {
      if (err)
        throw err;
      res.json({success: true})
    })
  })

  return router;
}