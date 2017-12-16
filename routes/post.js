var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user');
var Board = require('../models/board');
var Post = require('../models/post');
var Comment = require('../models/comment');
var Notification = require('../models/notification')
var Time = require('../models/time')

module.exports = function(passport) {
  router.delete('/posts/:id', passport.authenticate('jwt', { session: false }), function(req, res) {
	  Post.findById(req.params.id, function(err, post) {
		  if (err) {
        throw err;
      } else {
        Board.findOneAndUpdate({_id: post.board}, {$pull: {contents: {item: req.params.id}}}, function(err, board) {
          if (err) {
            throw err;
          } else {
            res.json({success: true});
          }
        })
      }
	  })
  })

  router.put('/posts/:id/follow', passport.authenticate('jwt', { session: false }), function(req, res) {
    Time.findOneAndUpdate({}, {$push: {follows: {createdAt: Date.now(), post: req.params.id, user:req.user._id}}}, function(err, time) {
      if (err) {
        throw err;
      } else {
        Post.findOneAndUpdate({_id: req.params.id}, {$push: {followers: req.user._id}}, function(err, post) {
          if (err) {
            throw err;
          } else {
            User.findOneAndUpdate({_id: req.user._id}, {$push: {followingPosts: post._id}}, function(err, user) {
              if (err) {
                throw err;
              } else {
                res.json({success: true});
              }
            })
          }
        })
      }
    })
  })

  router.put('/posts/:id/unfollow', passport.authenticate('jwt', { session: false }), function(req, res) {
    Time.findOneAndUpdate({_id: "5a073c57134ccaaa80e6c7f5"}, {$pull: {follows: {post: req.params.id, user:req.user._id}}}, function(err, time) {
      if (err) {
        throw err;
      } else {
        Post.findOneAndUpdate({_id: req.params.id}, {$pull: {followers: req.user._id}}, function(err, post) {
          if (err) {
            throw err;
          } else {
            User.findOneAndUpdate({_id: req.user._id}, {$pull: {followingPosts: post._id}}, function(err, user) {
              if (err) {
                throw err;
              } else {
                res.json({success: true});
              }
            })
          }
        })        
      }
    })    
  })  

  router.post('/posts/:id/comment', passport.authenticate('jwt', { session: false }), function(req, res) {
    let newComment = new Comment({
      postedBy: req.user._id,
      source: {"kind": 'Post', "item": req.params.id},
      text: req.body.text
    })
    newComment.save(function(err, comment) {
      Post.findOneAndUpdate({_id: req.params.id}, {$push: {comments: comment._id}}, function(err, post) {
        if (err) {
          throw err;
        } else {
          User.findOneAndUpdate({_id: req.user._id}, {$push: {comments: comment._id}}, function(err, currentUser) {
            if (err) {
              throw err;
            } else if (req.user._id.toString() === post.postedBy.toString()) {
              let notificationToFollowers = new Notification({
                type: 'Comment on Following Post',
                message: currentUser.firstName + " " + currentUser.lastName + " " + "commented on the post \"" + post.title + "\" that you are following.",
                routeID: {
                  kind: 'Post',
                  id: post._id
                }
              })
              notificationToFollowers.save(function(err, notificationToFollowers) {
                if (err) {
                  throw err;
                } else {
                  let followers = post.followers.filter(function(follower) {
                    return follower.toString() !== post.postedBy.toString() && follower.toString() !== req.user._id.toString();
                  })
                  let promises = followers.map(function(followerID) {
                    return new Promise(function(resolve, reject) {   
                      User.findOneAndUpdate({_id: followerID}, {$push: {notifications: notificationToFollowers._id}}, function(err) {
                        if (err) {
                          throw reject(err);
                        } else {
                          resolve();
                        }
                      })    
                    });
                  });
                  Promise.all(promises).then(function() {
                    res.json({comment: {
                      "id": comment._id,
                      "postedBy": {
                        "id": req.user._id,
                        "firstName": req.user.firstName,
                        "lastName": req.user.lastName,
                        "username": req.user.username,
                        "isLoopUser": true
                      },
                      "createdAt": comment.createdAt,
                      "text": comment.text
                    }})
                  }).catch(console.error);                      
                }
              })
            } else  {
              let notificationToPoster = new Notification({
                type: 'Comment on Created Post',
                message: currentUser.firstName + " " + currentUser.lastName + " " + "commented on your post titled \"" + post.title + "\".",
                routeID: {
                  kind: 'Post',
                  id: post._id
                }
              })
              notificationToPoster.save(function(err, notificationToPoster) {
                User.findOneAndUpdate({_id: post.postedBy}, {$push: {notifications: notificationToPoster._id}}, function(err) {
                  if (err) {
                    throw err;
                  } else {
                    let notificationToFollowers = new Notification({
                      type: 'Comment on Following Post',
                      message: currentUser.firstName + " " + currentUser.lastName + " " + "commented on the post \"" + post.title + "\" that you are following.",
                      routeID: {
                        kind: 'Post',
                        id: post._id
                      }
                    })
                    notificationToFollowers.save(function(err, notificationToFollowers) {
                      if (err) {
                        throw err;
                      } else {
                        let followers = post.followers.filter(function(follower) {
                          return follower.toString() !== post.postedBy.toString() && follower.toString() !== req.user._id.toString();
                        })
                        let promises = followers.map(function(followerID) {
                          return new Promise(function(resolve, reject) {   
                            User.findOneAndUpdate({_id: followerID}, {$push: {notifications: notificationToFollowers._id}}, function(err) {
                              if (err) {
                                throw reject(err);
                              } else {
                                resolve();
                              }
                            })    
                          });
                        });
                        Promise.all(promises).then(function() {
                          res.json({comment: {
                            "id": comment._id,
                            "own": true,
                            "postedBy": {
                              "id": req.user._id,
                              "firstName": req.user.firstName,
                              "lastName": req.user.lastName,
                              "username": req.user.username,
                              "isLoopUser": true
                            },
                            "createdAt": comment.createdAt,
                            "text": comment.text
                          }})
                        }).catch(console.error);                      
                      }
                    })                    
                  }
                })
              })
            }
          })
        } 
      })   
    })   
  })


  router.put('/posts/:id/flag', passport.authenticate('jwt', { session: false }), function(req, res) {
  	Post.findOneAndUpdate({_id: req.params.id}, {$set: {flagged: true}},function(err,post) {
  		let notificationToPoster = new Notification({
  			type: 'Flagged Post',
  			message: "Your post \"" + post.title + "\" has been flagged. Please wait for the admin's review.",
  			routeID: {
  				kind: 'Post',
  				id: post._id
  			}
      })
      notificationToPoster.save(function(err, notificationToPoster) {
      	if (err) {
      		throw err;
      	} else {
      		User.findOneAndUpdate({_id: req.user._id}, {$push: {notifications: notificationToPoster}}, function(err,user) {
      			if (err) {
      				throw err;
      			} else {
      				let notificationToAdmin = new Notification({
      					type: "Flagged Post",
      					message: "The post titled \"" + post.title + "\" has been flagged.",
      					routeID: {
      						kind: 'Post',
      						id: post._id
      					}      					
      				})
      				notificationToAdmin.save(function(err, notificationToAdmin) {
      					if (err) {
      						throw err;
      					} else {
      						User.updateMany({admin: true}, {$push: {notifications: notificationToAdmin}}, function(err, admin) {
      							if (err) {
      								throw err;
      							} else {
                      console.log("got here")
                      Board.findOneAndUpdate({_id: post.board}, {$push: {notifications: notificationToAdmin}}, function(err, originBoard) {
                        if (err) {
                          throw err;
                        } else {
                          res.json({success: true});
                        }
                      })
      							}
      						})
      					}
      				})
      			}
      		})
      	}
      })  		
  	})	
  })


  return router;
}