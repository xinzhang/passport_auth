var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var util = require('util');
var url = 'mongodb://localhost:27017/passport_auth';

authRouter.route('/register')
    .post(function (req, res) {
        console.log('my ' + req.body);

        mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');
            var user = {
                email: req.body.email,
                password: req.body.password
            };

            collection.insert(user,
                function (err, results) {
                    req.login(results.ops[0], function () {
                        //res.redirect('/auth/profile');
                        res.send(user);
                    })
                });
        });

    });

authRouter.route('/login')
    .post(passport.authenticate('local', {
        failureredirect: '/'
    }), function (req, res) {
        //res.redirect('/auth/profile');
        res.json(req.user);
    });

authRouter.route('/logout')
    .get(function(req, res){
        req.logout();
        res.status(200).send('1');
    });

module.exports = authRouter;
