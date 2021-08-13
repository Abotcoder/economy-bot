const fs = require("fs");
const { Client, MessageEmbed, Intents } = require('discord.js')
const quiz = require("../quiz.json")



const Discord = require("discord.js");
const ms = require("parse-ms");
const mongoose = require("mongoose")

//CONNECT TO DATABASE


// MODELS
const Data = require("../models/data.js");
const Characters = require("../models/game.js");


module.exports.run = async (bot, message, args) => {

  let ryoreward = Math.floor(Math.random() * 40) + 10;
  let timeout = 0;
  let reward = ryoreward;

   var Channel = message.channel.name
    
  let user = await Data.findOne({ userID: message.author.id });

  if (!user) {
    const newData = new Data({
      name: message.author.username,
      userID: message.author.id,
      lb: "all",
      money: reward,
      quiz: Date.now(),
      finished: []
    })
    newData.save().catch(err => console.log(err));
  }

  user = await Data.findOne({ userID: message.author.id });
  let total = await Characters.countDocuments()
  if(!user.finished) user.finished = []
  var rand = await Characters.aggregate([{$sample: {size: 1}}]);
          let dupe = true
        while(dupe === true){
           var rand = await Characters.aggregate([{$sample: {size: 1}}]);
            if(user.finished.length >= total){
                user.finished = [];
                dupe = false
                user.finished.push(rand[0].image)

            } else if(!user.finished.includes(rand[0].image)){
                await user.finished.push(rand[0].image)
                dupe = false
            }
        }
  const item = rand[0]

  await message.channel.send({ embeds: [new MessageEmbed().setColor('#40E0D0').setAuthor("Guess the character", message.author.displayAvatarURL({dynamic: true})).setDescription("You have 30 seconds to answer correctly!").setImage(item.image)]});

  const filter = (m) => m.author.id === message.author.id;
  const collector = message.channel.createMessageCollector(filter, { max: 3, time: 30000 });
  let attempts = 3;
  collector.on("collect", (m) => {
    
    if(m.content.toLowerCase() === '%end') {
      collector.stop('end issued');
      return 
    } else if (item.answers.map(ans => ans.toLowerCase()).includes(m.content.toLowerCase())) {
      user.money += reward;
      user.save();
      message.channel.send({ embeds: [new MessageEmbed().setColor('#40E0D0').setTitle("That was Correct!").setDescription(`💵 You got **${reward}** Berries!`).addField("Correct Answers", item.answers.join(", ")).setThumbnail(message.author.displayAvatarURL({dynamic: true}))] });
      collector.stop(`correct`);


    } else {
        if (attempts <= 1) {
            return collector.stop("lost")
        }else {
            attempts--
            message.channel.send({ embeds: [new MessageEmbed().setColor('#40E0D0').setDescription(`That was incorrect! You have **${attempts}** attempts left!`)]});
        }
    }

  });

  collector.on("end", (collected, reason) => {
    if (reason === "correct") {
      return;
    } else if (reason === "lost") {
            message.channel.send({ embeds: [new MessageEmbed().setColor('#40E0D0').setTitle("Incorrect!").setDescription(`:x: You did not guess correctly!`).addField("Correct Answers", item.answers.join(", ")).setThumbnail(message.author.displayAvatarURL({dynamic: true}))]});
    } else if (reason === "time") {
            console.log(send({embeds: [new MessageEmbed().setColor('#40E0D0').setTitle("Times Up!").setDescription(`❌ You ran out of time!`).addField("Correct Answers", item.answers.join(", ")).setThumbnail(message.author.displayAvatarURL({dynamic: true}))]}));
    } else if (reason === "end issued") {
        message.channel.send({embeds: [new MessageEmbed().setColor("#40E0D0").setTitle("Ended!").setDescription(`:x: You ended the game!`).addField("Correct Answers", item.answers.join(", ")).setThumbnail(message.author.displayAvatarURL({dynamic: true}))]})

    } else if (reason === "lost"){
        message.channel.send({ embeds: new MessageEmbed().setColor('#40E0D0').setTitle("Max reached!").setDescription(`❌ You reached a given max!`).addField("Correct Answers", item.answers.join(", ")).setThumbnail(message.author.displayAvatarURL({dynamic: true}))});
    }
  }); 
}


module.exports.help = {
  name: "game",
  aliances: []
}