const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Movie Update
router.post('/update', (req, res, next) => {
    User.findOne({ 'movies.imdbID': req.body.movieInfo.imdbID, _id: req.body._id }, function (err, result) {
        if (result === null) {
            User.findByIdAndUpdate(req.body._id, {
                $addToSet: {
                    movies: req.body.movieInfo
                }
            }, function (err, result) {
                if (err) {
                    res.json({ success: false, msg: 'Failed to update user' });
                } else {
                    res.json({ success: true, msg: req.body.movieInfo.Title })
                }
            });
        } else {
            res.json({ success: false, msg: 'Movie already exists' })
        }
    }).limit(1);
});

module.exports = router;