const Discord = require("discord.js");
const mongoose = require("mongoose");
const botconfig = require('dotenv').config();
const colors = require("../colors.json");

//CONNECT TO DATABASE
mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// MODELS
const Data = require("../models/data.js");
module.exports.run = async (bot, message, args) => {

  var shop = {
    "hobi-hobi-no-mi": "Hobi Hobi no mi",

    


  };
  var prices = {

    "hobi-hobi-no-mi": 10000,

  };

    let embed0 = new Discord.MessageEmbed();
    embed0.setColor("#ff7100");
    embed0.setDescription("You do not have enough Berries to purchase anything!");
    let embed1 = new Discord.MessageEmbed();
    embed1.setColor("#ff7100");
    embed1.setDescription("Please specify the role you want to buy!");
    let embed2 = new Discord.MessageEmbed();
    embed2.setColor("#ff7100");
    embed2.setDescription("You already have this role!");
    let embed3 = new Discord.MessageEmbed();
    embed3.setColor("#ff7100");
    embed3.setDescription("You don't have enough Berries in your treasure to buy it!");
    let embed5 = new Discord.MessageEmbed();
    embed5.setColor("#ff7100");

    embed5.setDescription("❌ | Usage: `%buy hobi-hobi-no-mi`");

 
      Data.findOne({
        userID: message.author.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: 0,
                daily: 0,
            })
            newData.save().catch((err) => console.log(err));
            return message.channel.send(embed0);
        } else {
            if (!args[0]) return message.channel.send(embed1);
            let rolename = args[0];
            if(rolename.toLowerCase() in shop) {
            let role = message.guild.roles.cache.find((x) => x.name.toLowerCase() === shop[rolename.toLowerCase()].toLowerCase());
              if (message.member.roles.cache.some((y) => y.name.toLowerCase() === shop[rolename.toLowerCase()].toLowerCase())) {
                return message.channel.send(embed2);
              } else {
                if (data.money < prices[rolename.toLowerCase()]) return message.reply(embed3);
                if (data.money >= prices[rolename.toLowerCase()]) {
                  data.money -= prices[rolename.toLowerCase()];
                  data.save().catch((err) => console.log(err));
                }
                message.member.roles.add(role).catch((e) => console.log(e));
                let embed4 = new Discord.MessageEmbed();
                embed4.setColor("#ff7100");
                embed4.setDescription(`Succesfully bought ${role}!`);
                message.channel.send(embed4);
              }
            } else {
              return message.channel.send(embed5);
            }
        }
    }
  )
    



};
module.exports.help = {
  name: "buy",
  aliances: [],
};