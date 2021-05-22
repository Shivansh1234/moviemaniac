const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // movies: [{
    //     type: String
    // }]
    movies: [{
        _id: false,
        Title: {
            type: String
        },
        Year: {
            type: String
        },
        Rated: {
            type: String
        },
        Released: {
            type: String
        },
        Runtime: {
            type: String
        },
        Genre: {
            type: String
        },
        Director: {
            type: String
        },
        Writer: {
            type: String
        },
        Actors: {
            type: String
        },
        Plot: {
            type: String
        },
        Language: {
            type: String
        },
        Country: {
            type: String
        },
        Awards: {
            type: String
        },
        Poster: {
            type: String
        },
        Ratings: [{
            _id: false,
            Source: {
                type: String
            },
            Value: {
                type: String
            }
        }],
        Metascore: {
            type: String
        },
        imdbRating: {
            type: String
        },
        imdbVotes: {
            type: String
        },
        imdbID: {
            type: String,
            unique: true
        },
        Type: {
            type: String
        },
        DVD: {
            type: String
        },
        BoxOffice: {
            type: String
        },
        Production: {
            type: String
        },
        Website: {
            type: String
        },
        Response: {
            type: String
        }
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
                throw err;
            } else {
                newUser.password = hash;
                newUser.save(callback);
            }
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}