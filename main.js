const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const token = require('./config.json');
const config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as user: ${client.user.tag}, ID: ${client.user.id}`);
    client.user.setStatus('online');
    client.user.setActivity("holycheats.cc", {
        type: "PLAYING",
      });
    });

client.on('message', msg => {
    if (!msg.channel.guild) {
      return;
    }
  });

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      console.log(`Loading event ${eventName}`);
      client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Loaded ${commandName}`);
        client.commands.set(commandName, props);
    });
});
client.login(token.token);