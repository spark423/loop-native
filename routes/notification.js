var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Notification = require('../models/notification')

module.exports = function(passport) {
  router.get('/notifications', passport.authenticate('jwt', { session: false }), function(req, res) {
    let date = new Date();
    let comparisonDate = new Date(date.getTime() - 60 * 60 * 24 * 1000);    
    Notification.find({to: req.user._id, $or: [{readAt: {$exists: false}},{readAt: {$gte: comparisonDate}}]}).sort({createdAt: -1})
    .then(function(notifications) {
      for (var i=0; i<notifications.length; i++) {
        console.log(notifications[i].createdAt)
      }
      let filteredNotifications = notifications.map(function(notification) {
        return {"id": notification._id, "type": notification.type, "createdAt": notification.createdAt, "message": notification.message, "routeID": {"kind": notification.routeID.kind, "contentId": notification.routeID.id, "boardId": notification.routeID.boardId}, "read": notification.read};
      })
      res.json({notifications: filteredNotifications});
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
  })

  router.put('/notifications/:id/read', passport.authenticate('jwt', { session: false }), function(req, res) {
    Notification.findOneAndUpdate({_id: req.params.id}, {$set: {read: true, readAt: Date.now()}})
    .then(function(notification) {
      res.json({success: true});
    })
    .catch(function(err) {
      res.status(500).send(err);
    })
  })


  return router;
}