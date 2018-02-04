var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Notification = require('../models/notification')

module.exports = function(passport) {
  router.get('/notifications', passport.authenticate('jwt', { session: false }), function(req, res) {
    Notification.find({to: req.user._id}).sort({createdAt: -1})
    .then(function(notifications) {
      let filteredNotifications = notifications.map(function(notification) {
        return {"type": notification.type, "createdAt": notification.createdAt, "message": notification.message, "routeID": {"kind": notification.routeID.kind, "contentId": notification.routeID.id, "boardId": notification.routeID.boardId}}
      })
      res.json({notifications: filteredNotifications});
    })
    .catch(function(err) {
      res.status(500).send(err);
    })

    // User.findById(req.user._id).populate('notifications').exec(function(err, user) {
    //   if (err) {
    //     throw err;
    //   } else {
    //   	let notifications = user.notifications.map(function(notification) {
    //   		return {"type": notification.type, "createdAt": notification.createdAt, "message": notification.message, "routeID": {"kind": notification.routeID.kind, "contentId": notification.routeID.id, "boardId": notification.routeID.boardId}}
    //   	})
    //   	res.json({notifications: notifications});
    //   }
    // })
  })
  return router;
}