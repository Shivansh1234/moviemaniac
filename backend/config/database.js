module.exports = {
    'database': 'mongodb://localhost:27017/moviemaniac',
    'secret': 'yoursecret',
    'dbSettings': {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
}