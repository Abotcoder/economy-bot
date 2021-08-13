const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, args) => {
  let banned = message.mentions.users.first() || bot.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");
  
    // MESSAGES

  
    if (message.author === banned) {
      let sanctionyourselfembed = new MessageEmbed()
        .setDescription(`You cannot ban yourself`)
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
  
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      let nopermsembed = new MessageEmbed()
        .setDescription(
          "You do not have permission to use that command!"
        )
        .setColor("#40E0D0");
      message.channel.send(nopermsembed);
  
      return;
    }
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      let botnopermsembed = new MessageEmbed()
        .setDescription(
          "I do not have `BAN MEMBERS` permission, please contact an administrator"
        )
        .setColor("#40E0D0");
      message.channel.send(botnopermsembed);
  
      return;
    }
  
    message.guild.members.ban(banned, { reason: reason });
  
    let successfullyembed = new MessageEmbed()
      .setTitle(`${banned.tag} has been successfully banned.`)
      .setColor("#40E0D0");
  
    message.channel.send(successfullyembed);
}
  





module.exports.help = {
  name: "ban",
  aliances: []
}

