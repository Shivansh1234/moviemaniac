const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to db
mongoose.connect(config.database, config.dbSettings);

// on connection
mongoose.connection.on('Connected', () => {
    console.log('Connected to database ' + config.database);
});

// on error
mongoose.connection.on('Error', (err) => {
    console.log('Database error ' + err);
});

const app = express();

const users = require('./routes/users');
const movies = require('./routes/movies');

// port number
const port = 3000;

// cors middleware
app.use(cors());

// set static
app.use(express.static(path.join(__dirname, 'public')));

// bodyParser middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/movies', movies);

// index route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
})

// start server
app.listen(port, () => {
    console.log('server started on port ' + port);
})