const {MessageEmbed} = require("discord.js")

module.exports.run = async(bot, message, args) => {
  let kicked = message.mentions.users.first() || bot.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");
  
    // MESSAGES
  
    if (message.author === kicked) {
      let sanctionyourselfembed = new MessageEmbed()
        .setDescription(`You cannot kick yourself!`)
        .setColor("#40E0D0");
      message.channel.send(sanctionyourselfembed);
  
      return;
    }
  
    if (!reason) {
      let noreasonembed = new MessageEmbed()
        .setDescription(`Enter a reason`)
        .setColor("#40E0D0");
      message.channel.send(noreasonembed);
  
      return;
    }
  
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      let nopermsembed = new MessageEmbed()
        .setDescription(
          "You do not have permission to use that command!"
        )
        .setColor("#40E0D0");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      let botnopermsembed = new MessageEmbed()
        .setDescription(
          "I do not have `KICK MEMBERS` permission, please contact an administrator"
        )
        .setColor("#40E0D0");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    message.guild.member(kicked).kick(reason);
  
    let successfullyembed = new MessageEmbed()
      .setDescription(`${kicked.tag} has been successfully kicked.`)
      .setColor("#40E0D0");
  
    message.channel.send(successfullyembed);

  }





module.exports.help = {
  name: "kick",
  aliances: []
}