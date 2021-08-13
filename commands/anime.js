
const Discord = require("discord.js")
const Kitsu = require("kitsu.js")
const kitsu = new Kitsu()

const { Client, MessageEmbed } = require('discord.js');

module.exports.run = async(bot, message, args) => {
  let embed = new Discord.MessageEmbed();
    
    
    
    
  var search = message.content.split(/\s+/g).slice(1).join(" ");
    if(!args[0]) return message.channel.send("Please specify the anime movie")
    kitsu.searchAnime(search).then(async result => {
      if(result.length === 0) return message.channel.send(new MessageEmbed().setTitle("Anime not Found!").setColor('#40E0D0').setDescription("I could not find the Anime you were looking for!"))
      
      let anime = result[0]
      const embed40 = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
      .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
      .addField('❯Information', `•**Japanese Name:** ${anime.titles.romaji}\n•**Age Rating:** ${anime.ageRating}\n`, true)
      .addField('❯Stats', `•**Average Rating:** ${anime.averageRating}\n\•**Rank by rating:** ${anime.ratingRank}\n\•**Rank by popularity:** ${anime.popularityRank}`, true)
      .addField('❯Status', `•**Episode Count:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n`, true)
      .setThumbnail(anime.posterImage.original, 100, 200);
      return message.channel.send(embed40)
    }).catch(err => {
      console.log(err)
      return message.channel.send(new MessageEmbed().setTitle("Anime not Found!").setColor('#40E0D0').setDescription("I could not find the Anime you were looking for!"))
    })
    

    

}


module.exports.help = {
  name: "anime",
  aliances: []
}

