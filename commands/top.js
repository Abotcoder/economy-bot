const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, args) => {
  var Channel = message.channel.name
   
  var top = new MessageEmbed();
  top.setColor('#40E0D0')
  top.setDescription("Leadboards will be added soon! We thank you for your patience!");
  message.channel.send(top);
  

}

module.exports.help = {
  name: "top",
  aliances: []
}