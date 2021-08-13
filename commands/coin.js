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

    var maxBet = 1000000;

    let embed0 = new Discord.MessageEmbed();
    embed0.setColor(colors.orange);
    embed0.setDescription(`You don't have any Berries to gamble with!`);
    let embed1 = new Discord.MessageEmbed();
    embed1.setColor(colors.orange);
    embed1.setDescription("You don't have any Berries in your wallet!");
    let embed2 = new Discord.MessageEmbed();
    embed2.setColor(colors.orange);
    embed2.setDescription("Please specify how much you want to gamble");
    let embed3 = new Discord.MessageEmbed();
    embed3.setColor(colors.orange);
    embed3.setDescription("You can only enter whole numbers!");
    let embed4 = new Discord.MessageEmbed();
    embed4.setColor(colors.orange);
    embed4.setDescription("You don't have that much Berries in your wallet!");
    let embed5 = new Discord.MessageEmbed();
    embed5.setColor(colors.orange);
    embed5.setDescription(`The maximum bet is ${maxBet.toLocaleString()} Berries!`);
    let embed99 = new Discord.MessageEmbed();
    embed99.setColor(colors.orange);
    embed99.setDescription(`Yeah same problem.`);



        Data.findOne({
            userID: message.author.id
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newData = new Data({
                    name: message.author.username,
                    userID: message.author.id,
                    lb: "all",
                    money: 0,
                    bank: 0,
                    daily: 0,
                    train: 0,
                })
                newData.save().catch(err => console.log(err));
                return message.channel.send(embed0);
            } else {

                if(data.money <= 0) return message.reply(embed1);
                if(!args[0]) return message.reply(embed2);
                if(!args[1]) return message.reply(embed2);
                if(args[1].toLowerCase() == "all") args[1] = data.money;

                var coin = args[0]
                if(coin.toLowerCase() === "heads" || coin.toLowerCase() === "tails") {

                    try {
                        var bet = parseFloat(args[1]);
                    } catch {
                        return message.reply(embed3);
                    }
                    if(bet != Math.floor(bet)) return message.reply(embed3);
                    if(bet < 0) return message.reply(embed3)
                    if(data.money < bet) return message.reply(embed4);
                    if(bet > maxBet) return message.reply(embed5);
    
                    const n = Math.floor(Math.random() * 2);
                    let result;
                    if (n === 1) result = 'Heads';
                    else result = 'Tails';
    
                    if(result.toLowerCase() === coin.toLowerCase()) {
                        data.money += bet;
                        data.save().catch(err => console.log(err));
                        let embed7 = new Discord.MessageEmbed();
                        embed7.setColor(colors.orange);
                        embed7.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                        embed7.setThumbnail(message.author.displayAvatarURL({dynamic: true}));
                        embed7.setDescription(`You won ${bet} Berries!`);
                        embed7.addFields(
                          {name: "Details", value: `🎰| Landed on ${coin}\n🍇| Gambled ${bet} Berries`}
                        )
                        return message.reply(embed7); 
                    } else {
                        data.money -= bet;
                        data.save().catch(err => console.log(err));
                        let embed6 = new Discord.MessageEmbed();
                        embed6.setColor(colors.orange);
                         embed6.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({dynamic: true})}`)
                        embed6.setThumbnail(message.author.displayAvatarURL({dynamic: true}));
                        embed6.setDescription(`You lost ${bet} Berries`);
                        embed6.addFields(
                          {name: "Details", value: `🎰| Landed on ${coin}\n🍇| Gambled ${bet} Berries`}
                        )
                        
                        return message.reply(embed6);
                    }

                } else {

                    return message.reply(embed2)
                }
            }
        })
    }

module.exports.help = {
    name: "coin",
    aliances: []
}