const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose");
const botconfig = require('dotenv').config();
const colors = require("../colors.json");

//CONNECT TO DATABASE
mongoose.connect(process.env.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// MODELS
const Cooldown = require("../models/cooldowns.js");
const Data = require("../models/data.js");
module.exports.run = async (bot, message, args) => {

    let ryoreward = Math.floor(Math.random() * 200) + 500;
    let timeout = 86400000;
    let reward = ryoreward;
    let embed = new Discord.MessageEmbed();

    let member = message.mentions.members.first() || message.member;
    if (member.roles.cache.some(role => role.name === 'Indra\'s Arrow'))  {

   var Channel = message.channel.name
    let embedo = new Discord.MessageEmbed();
    embedo.setDescription(`Please try this command in <#822497651466567701>`);
    
    if (!['822497651466567701'].includes(message.channel.id)) {
    message.channel.send(embedo);
    } else {
    
            Data.findOne({
                userID: message.author.id
            }, (err, data) => {
                if(err) console.log(err);
    
                Cooldown.findOne({
                    userID: message.author.id
                }, (err, cooldown) => {
                    if(err) console.log(err);
                    if(!cooldown) {
                        const newCooldown = new Cooldown({
                            name: message.author.username,
                            userID: message.author.id,
                            Sharingan: 0,
                            Rinnegan: 0,
                            Tenseigan: 0,
                            IndrasArrow: 0,
                        })
                        newCooldown.save().catch(err => console.log(err));
                        data.money += reward;
                        data.save().catch(err => console.log(err));
    
                        embed.setDescription(`You used your Susanoo's Arrow on an rogue shinobi and sucessfully got ${reward} Ryo!`)
                            embed.setColor("#40E0D0");
                        return message.channel.send(embed);
                    } else {
                        if(timeout -(Date.now() - cooldown.IndrasArrow) > 0) {
                            let time = ms(timeout - (Date.now() - cooldown.IndrasArrow));
        
                            embed.setColor(colors.red);
                            embed.setDescription(`You are currently on a cooldown. Please try again in ${time.hours}h ${time.minutes}m and ${time.seconds}s`);
                            return message.channel.send(embed);
                        } else {
                            data.money += reward;
                            cooldown.IndrasArrow = Date.now();
                            data.save().catch(err => console.log(err));
                            cooldown.save().catch(err => console.log(err));
    
                            embed.setDescription(`You used your Susanoo's Arrow on an rogue shinobi and sucessfully got ${reward} Ryo!`)
                            embed.setColor("#40E0D0");
                            return message.channel.send(embed);
                        }
                    }
                }) 
            })
        }
    }else{
        let embed4 = new Discord.MessageEmbed();
        embed4.setColor(colors.painPurple);
        embed4.setDescription("You do not own this command!");
        return message.channel.send(embed4);
    }

}
module.exports.help = {
  name: "arrow",
  aliances: []
}