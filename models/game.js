const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    image: String,
    answers: []
})

module.exports = mongoose.model('anime', Schema)