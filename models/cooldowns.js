const mongoose = require("mongoose");

const cooldownSchema = mongoose.Schema({
    name: String,
    userID: String,
    Sharingan: Number,
    Rinnegan: Number,
    RinneSharingan: Number,
    Tenseigan: Number,
    Jougan: Number,
    ParticleStyle: Number,
    IndrasArrow: Number,
    KCM: Number,
})

module.exports = mongoose.model("Cooldown", cooldownSchema);