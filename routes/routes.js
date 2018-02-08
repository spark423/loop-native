var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var async = require('async');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var secret = process.env.secret;
var username = process.env.api_user;
var password = process.env.api_key;
var User = require('../models/user');
var Group = require('../models/group');

module.exports = function(passport) {
	router.get('/signup', function(req ,res) {
		res.statusCode = 204;
		res.end();
	})

	router.post('/signup', async function(req, res) {
		if(!req.body.username || !req.body.password) {
			res.json({ success: false, message: 'Please enter email and password.' });
		} else if (req.body.password !== req.body.confirmPassword) {
			res.json({ success: false, message: "The two password fields don't match."})
        } else if (!req.body.username.toLowerCase().includes('@haverford.edu')) {
            res.json({ success: false, message: "Username must be a Haverford email."})
        } else {
			if(!req.body.username || !req.body.password) {
				res.json({ success: false, message: 'Please enter email and password.' });
			} else if (req.body.password !== req.body.confirmPassword) {
				res.json({ success: false, message: "The two password fields don't match."})
	  	    } else if (!req.body.username.toLowerCase().includes('@haverford.edu')) {
                res.json({ success: false, message: "Username must be a Haverford email."})
            } else {
				let newUser = new User({
					username: req.body.username.toLowerCase(),
					password: req.body.password,
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					major: req.body.major,
					classYear: req.body.classYear
				});
                newUser.save()
       	        .then(async function(user) {
                    let group = await Group.findOneAndUpdate({admin: user.username}, {$push: {members: user._id}}).exec();
                    if (group) {
                        await User.findOneAndUpdate({_id: user._id}, {$push: {adminGroups: group._id, joinedGroups: group._id}}).exec();
                    }
                })
       	        .then(function() {
                    res.json({success: true});
       	        })
       	        .catch(function(err) {
         	      res.json({success: false, message: 'That email address already exists'});
       	        })
            }
        }
	})

	router.get('/login', function(req ,res) {
		res.statusCode = 204;
		res.end();
  })

  router.post('/login', function(req, res) {  
    User.findOne({
      username: req.body.username.toLowerCase()
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.send({ success: false, message: 'Authentication failed. User not found.'});
      } else {
        // Check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // Create token if the password matched and no error was thrown
            let token = jwt.sign({data: user}, secret);
            res.json({ success: true, token: 'JWT ' + token });
          } else {
            res.send(401, { success: false, message: 'Authentication failed. Incorrect password.'});
          }
        });
      }
    });
  });

	router.get('/settings', function(req ,res) {
		res.statusCode = 204;
		res.end();
  })  

  router.post('/forgot', function(req, res) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          let emailToken = buf.toString('hex');
          done(err, emailToken);
        });
      },
      function(emailToken, done) {
        User.findOne({ username: req.body.username }, function(err, user) {
          if (!user) {
            res.send(401, {success: false, message: 'No account with that email address exists.'});
           return;
          }
          let jwtoken = jwt.sign({data: user}, secret);
          user.resetPasswordToken = emailToken;
          user.resetPasswordExpires = Date.now() + 36000000; // 1 hour
 
          user.save(function(err) {
            done(err, jwtoken, emailToken, user);
          });
        });
      },
      function(jwtoken, emailToken, user, done) {
        let options = {
    	    auth: {
    		    api_user: username,
            api_key: password
          }
        }

        let client = nodemailer.createTransport(sgTransport(options));
  	
        let email = {
          from: 'support@theuniversityloop.com',      	
          to: user.username,
          subject: ' Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Paste the following token ' + emailToken + ' into the token field to set a new password.\n\n' +  
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
         };
        client.sendMail(email, function(err){
      	  done(err, jwtoken)
        });  
      }
    ], function(err, jwtoken) {
      if (err) throw err;
      res.send({success: true, token: 'JWT ' + jwtoken})
    });
  })

  router.put('/reset', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            res.json(401, {success: false, message: 'Password reset token is invalid or has expired.'});
          } else if (req.body.newPassword !== req.body.confirmNewPassword) {
          	res.json(401, {success: false, message: "Passwords don't match."})
          } else {
            user.password = req.body.newPassword;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function(err) {
              done(err, user);
            });
          }
        });
      },
      function(user, done) {
        let options = {
          auth: {
    		    api_user: username,
            api_key: password
          }
        }

        let client = nodemailer.createTransport(sgTransport(options));
  	
        let email = {
          from: 'support@theuniversityloop.com',      	
          to: user.username,
          subject: 'Successful Password Reset',
          text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.username + ' has just been changed. Login with your new password\n'
        };
        client.sendMail(email, function(err){
      	  done(err)
        });      	
      }
    ], function(err) {
      if (err) throw err;
      res.send({success: true});
    });
  });


	return router;
}