const { MessageEmbed } = require('discord.js');

const Discord = require("discord.js");
const mongoose = require("mongoose");


//CONNECT TO DATABASE

// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    let embed = new Discord.MessageEmbed();
    
    
    if(!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    }
    Data.findOne({
        userID: user.id
    }, async (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: 0,
                daily: 0,
            })
            newData.save().catch(err => console.log(err));
            let mentioned = message.mentions.members.first() || message.member;
            embed.setColor("#40E0D0")
            embed.setTitle(`Balance | ${mentioned.user.username}`)
            embed.setThumbnail(mentioned.user.displayAvatarURL())
            embed.setDescription(`💵 | Berries: **0**`)
            return message.channel.send(embed);
            
        } else {
           let mentioned = message.mentions.members.first() || message.member;
            embed.setColor("#40E0D0")
            embed.setTitle(`Balance | ${mentioned.user.username}`)
            embed.setThumbnail(mentioned.user.displayAvatarURL())
            embed.setDescription(`💵 | Berries: **${data.money}**`)
            return message.channel.send(embed);
        }
           
    })

}

module.exports.help = {
  name: "balance",
  aliances: ["bal"]
}