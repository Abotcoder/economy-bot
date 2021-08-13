const { Client, MessageEmbed } = require('discord.js');
var embed = new MessageEmbed()
embed.setDescription("That command has been reloaded")
embed.setColor("#40E0D0")

module.exports.run = async(bot, message, args) => {
  if(message.author.id !== "560282666361159690") {
    return;
  }
  else{
    if(!args || args.length < 1) return;
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!bot.commands.has(commandName)) {
    return;
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];

  bot.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  bot.commands.set(commandName, props);
  message.reply(embed);

 }
}

module.exports.help = {
  name: "reload",
  aliances: []
}


