const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose")
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


const Discord = require("discord.js");
const { Client, MessageEmbed, Intents } = require("discord.js")
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] });
const fs = require("fs");
bot.interaction = {}; //Creating interaction object
const DiscordButtons = require('discord-buttons'); //Requiring Discord-BUttons module.
const ButtonPages = require('discord-button-pages'); //Requiring Discord-Button-Pages module.
DiscordButtons(bot);

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();

mongoose.connect(process.env.mongoPass, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// READ COMMANDS FOLDER
fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);

  let jsfile = files.filter(f => f.split (".").pop() === "js")
  if(jsfile.length <= 0) {
    console.log("Couldn't find any commands!");
    return;
  }

  jsfile.forEach((f) => {
    let props = require(`./commands/${f}`);
    console.log(`✅ | ${f} loaded!`);
    bot.commands.set(props.help.name, props);
    props.help.aliances.forEach( alias => {
      bot.aliases.set(alias, props.help.name)
    })
  })
})
 

// BOT ONLINE MESSAGE AND ACTIVITY MESSAGE
bot.on('ready', async () => {
  console.log(`${bot.user.username} is now online!`);
  bot.user.setActivity(`My Prefix is %`);

})
// const embed = new MessageEmbed()
// .setDescription("Welcome to **Boruto Discord**!\nCheck out:\n<#822488005587501157> ➪ This channel displays the information and rules for this server!\n<#822486773279883306> ➪ This channel is our main channel where you can just among newcomers and your friends!")
// .setImage("https://wallpapercave.com/wp/wp2875027.jpg")
// .setColor("#40E0D0")
// bot.on('guildMemberAdd', member => {
//       const welcome = member.guild.channels.cache.find(ch => ch.name === '『welcome』');
//       welcome.send(`${member}`, embed);
// });   

bot.on('clickButton', (button) => {
  ButtonPages.buttonInteractions(button, bot.interaction);
});
bot.on("message", async message => {
  if (message.content === '%shop') {
    const embed1 = new Discord.MessageEmbed()
        .setTitle('Test #1')
        .setColor('RED');
        
    const embed2 = new Discord.MessageEmbed()
        .setTitle('Test #2')
        .setColor('YELLOW');
        
    const embed3 = new Discord.MessageEmbed()
        .setTitle('Test #3')
        .setColor('BLUE');
    
    const embedPages = [embed1, embed2, embed3];
    ButtonPages.createPages(bot.interaction, message, embedPages, 60 * 1000, "green", "👉", "👈", "❌");
  }
  // CHECK CHANNEL TYPE
  if(message.channel.type === "dm") return;
  if(message.author.bot) return;

  // SET PREFIX
  let prefix = (process.env.prefix);

  // CHECK PREFIX, DEFINE ARGS & COMMAND
  if(!message.content.toLowerCase().startsWith(prefix)) return;
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd;
  cmd = args.shift().toLowerCase();
  let command;
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot, message, args);

  // RUN COMMANDS
  if(bot.commands.has(cmd)) {
    command = bot.commands.get(cmd);
  } else if (bot.aliases.has(cmd)) {
    command  = bot.commands.get(bot.aliases.get(cmd));
  }
  try {
    command.run(bot, message, args);
  } catch (e) {
    return;
  }
});

bot.login(process.env.bot_token);