const { Client, MessageEmbed, Intents } = require('discord.js');

module.exports.run = async(bot, message, args) => {
   var Channel = message.channel.name
  var pingembed = new MessageEmbed();
  var editingembed = new MessageEmbed()
  editingembed.setColor("#40E0D0")
  editingembed.setDescription("Pinging...")
  const diff = Date.now() - message.createdTimestamp;
  let msg = (` 🏓  **|** Pong! **Bot Latency:** \`${diff} ms\``)
  pingembed.setColor('#ff7100')
  pingembed.setDescription(msg);
  message.channel.send({ embeds: [pingembed] })
 

}

module.exports.help = {
  name: "ping",
  aliances: []
}


