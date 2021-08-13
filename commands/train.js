const { Client, MessageEmbed } = require("discord.js")
const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose")

//CONNECT TO DATABASE


// MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

    let ryoreward = Math.floor(Math.random() * 200) + 50;
    let timeout = 3600000;
    let reward = ryoreward;
    var Channel = message.channel.name
  
    let embed = new Discord.MessageEmbed();
    embed.setTitle("Pirate Training!");

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
              train: Date.now(),
            })
            newData.save().catch(err => console.log(err));
            embed.setTitle("Pirate Training!")
            embed.setDescription(`You trained to become an amazing pirate and got ${reward} Berries!`);
            embed.setColor("00ff00");
            return message.channel.send(embed);
        } else {
          if(timeout - (Date.now() - data.train) > 0) {
                let time = ms(timeout - (Date.now() - data.train));
                let mentioned = message.mentions.members.first() || message.member;
                embed.setTitle(`Cooldown | ${mentioned.user.username}`)
                embed.setColor("ff0000");
                embed.setDescription(`You are currently on a cooldown. You can train again in: **${time.hours}h ${time.minutes}m ${time.seconds}s**`);

                return message.channel.send(embed);
           } else {
              data.money += reward;
              data.train = Date.now()
              data.save().catch(err => console.log(err))
              embed.setTitle("Pirate Training!")
              embed.setDescription(`You trained to become an amazing pirate and got ${reward} Berries!`);
              return message.channel.send(embed);
          }
        } 
    })

    
}

module.exports.help = {
    name: "train",
    aliances: []
}