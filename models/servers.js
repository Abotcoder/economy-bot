const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    color: String,
    serverID: String,
    prefix: String,
    lbpost_cd: String,
    lotteryTimer: String,
    dailyMissions_cd: String,
    weeklyMissions_cd: String
})

module.exports = mongoose.model('servers', Schema)