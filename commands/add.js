const { Client, MessageEmbed } = require("discord.js")
const isImageUrl = require("is-image-url")

// MODELS
const characterData = require("../models/game.js");

module.exports.run = async(bot, message, args) => {
  let allowed = ["398314054147637248", "560282666361159690"];
  if(!allowed.includes(message.author.id)) return;
  
  let image = args[0];
  var answers = args.slice(1);
  var anss = [];

  answers.forEach(ans => {
    var ans = ans.replace(/_/g, ' ');
    anss.push(ans);
  })

  if(!image || !answers) return message.channel.send(new MessageEmbed().setColor("RED").setDescription("Error: nr.add <image> <answers (replace spaces with \"_\")>"))

  if(!isImageUrl(image)) return message.channel.send(new MessageEmbed().setColor("RED").setDescription("Supplied url is not a valid image url!"))

  let embed = new MessageEmbed()
  .setTitle("Character Added")
  .setImage(image)
  .addField("Answers", anss.join(", "))
  .setColor("GREEN")
  
  message.channel.send(embed);

  await characterData.create({image: image, answers: anss})
}

module.exports.help = {
  name: "add",
  aliances: []
}