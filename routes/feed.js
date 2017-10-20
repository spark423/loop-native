var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var Board = require('../models/board');
var User = require('../models/user');

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;


    while (i <= j) {

        while (items[i].item.createdAt < pivot.item.createdAt) {
            i++;
        }

        while (items[j].item.createdAt > pivot.item.createdAt) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function quickSort(items, left, right) {

    var index;

    if (items.length > 1) {

        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}

module.exports = function(passport) {
  router.get('/feed', passport.authenticate('jwt', { session: false }), function(req, res) {
    User.findById(req.user._id, function(err, user) {
      if (err)
        throw err;
      Board.find({_id: {$in: user.subscribedBoards}}).populate([{path: 'contents.item', populate: [{path: 'postedBy'}, {path: 'attendees'}, {path: 'comments', populate: {path: 'postedBy'}}]}]).exec(function (err, boards) {
        if (err) 
          throw err;
        var contents = [];
        for (var i=0; i<boards.length; i++) {
          contents = contents.concat(boards[i].contents)
        }
        sortedContents1 = quickSort(contents, 0, contents.length - 1);
        sortedContents2 = [];
        for (var i=sortedContents1.length - 1; i > -1; i--) {
          sortedContents2.push(sortedContents1[i].item)
        }
        res.json({success: true})
      })      
    })
  });
  return router;
}

