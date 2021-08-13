const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose")

//CONNECT TO DATABASE


// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    let ryoreward = Math.floor(Math.random() * 500) + 100;
    let timeout = 86400000;
    let reward = ryoreward;

    let embed = new Discord.MessageEmbed();
    embed.setTitle("Mission!");
     var Channel = message.channel.name
    
    Data.findOne({
      userID: message.author.id,
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
              name: message.author.username,
              userID: message.author.id,
              lb: "all",
              money: reward,
              mission: Date.now(),
            })
            newData.save().catch(err => console.log(err));
            embed.setDescription(`You went on a mission and succesfully completed it with a reward of **${reward}** Ryo!`);
            embed.setColor("00ff00");
            return message.channel.send(embed);
        } else {
          if(timeout - (Date.now() - data.mission) > 0) {
            let time = ms(timeout - (Date.now() - data.mission));
            let mentioned = message.mentions.members.first() || message.member;
            embed.setTitle(`Cooldown | ${mentioned.user.username}`)
            embed.setColor("ff0000");
            embed.setDescription(`You are currently on a cooldown. You can go on a mission again in: **${time.hours}h ${time.minutes}m ${time.seconds}s**`);

            return message.channel.send(embed);
          } else {
              data.money += reward;
              data.mission = Date.now()
              data.save().catch(err => console.log(err))
              embed.setDescription(`You went on a mission and completed it and got **${reward}** Ryo!`);
              embed.setColor("00ff00");
              return message.channel.send(embed);
          }
        } 
    })
 }
    

module.exports.help = {
    name: "mission",
    aliances: []
}