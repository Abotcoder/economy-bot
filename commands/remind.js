const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const ms = require("ms")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {
let timeuser = args[0]
let reason = args.slice(1).join(" ")
   var Channel = message.channel.name
   

if(!timeuser) return message.reply(":x:Please enter a time: 10m 10s 10d")
if(!reason) return message.reply(":x: Please enter a reason")

db.set(`remind.${message.author.id}`,Date.now() + ms(timeuser))
message.channel.send("I will remind you! ")
const interval = setInterval(function() {


    if(Date.now() > db.fetch(`remind.${message.author.id}`)){
        var remindsendembed = new MessageEmbed()
        .setColor('#40E0D0')
        .setDescription(`The time for your reminder has expired!\n**${reason}**`)
        db.delete(`remind.${message.author.id}`)
        message.author.send(remindsendembed)
        .catch(e => console.log(e))
        clearInterval(interval)
    }

},1000)
}

module.exports.help = {
  name: "remind",
  aliances: ["alarm"]
}