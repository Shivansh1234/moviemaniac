const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

// User Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: true, msg: 'User has been registered' })
        }
    })
});

// User Update
router.put('/update', (req, res, next) => {
    User.findOneAndUpdate(req.body._id, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname
        }
    }, function (err, result) {
        if (err) {
            res.json({ success: false, msg: 'Failed to update user' });
        } else {
            res.json({ success: true, msg: 'User has been updated' })
        }
    });
});

// User Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: 'User not found' });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 Week
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        fname: user.fname,
                        lname: user.lname,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    });
});

// User Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.json(req.user);
});

// User Delete
router.delete('/profile/:id', (req, res, next) => {
    User.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
})


module.exports = router;