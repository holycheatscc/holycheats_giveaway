const Discord = require('discord.js');
let started_time_duration = ""
let time_duration = ""
exports.run = async (client, message, args) => {
    async function giveaway() {
        let time_length = ""
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have enough permissions to use this command.');
        if (!message.content.split(' ')[1]) return message.channel.send('Bitte gehe nach dem Exampel vor: ``?giveaway ZEIT CHANNELID PREIS``.');
        const prize = message.content.split(' ').slice(3).join(' ');
        let channel = message.content.split(' ')[2]
        const started_time_duration_start = message.content.split(' ')[1]
        if (started_time_duration_start.toLowerCase().includes("h")){
            started_time_duration = started_time_duration_start.split("h")[0]
            time_duration = started_time_duration * 3600000
            if (time_duration == 3600000){time_length = "hour"}
            if (time_duration > 7200000){time_length = "hours"}
        }
        if (started_time_duration_start.toLowerCase().includes("m")){
            started_time_duration = started_time_duration_start.split('m')[0]
            time_duration = started_time_duration * 60000
            if (time_duration < 3600000){time_length = "minutes"}
            if (time_duration == 60000){time_length = "minute"}
        }
        if (isNaN(started_time_duration)) return message.channel.send('Die Zeit muss eine Zahl sein!');
        if (started_time_duration < 1) return message.channel.send('Die Zeitangabe muss in **(m or h)** sein.');
        if (!message.guild.channels.cache.find(channels => channels.id === `${channel}`)) return message.channel.send("Bitte gib eine Channel ID ein, wo das Giveaway sein soll!")
        if (prize === '') return message.channel.send('Bitte definiere einen Preis!');
        const embed = new Discord.MessageEmbed()
          .setTitle(`${prize}`)
          .setColor('#21b1e3')
          .setDescription(`React with 🎉 to enter!\nTime remaining: **${started_time_duration}** ${time_length}\n\nBy: ${message.author}`)
          .setTimestamp(Date.now() + time_duration)
          .setFooter('Endet um')
        let msg = await client.channels.cache.get(`${channel}`).send(':tada: **GIVEAWAY** :tada:', embed)
          await msg.react('🎉')
            setTimeout(() => {
              msg.reactions.cache.get('🎉').users.remove(client.user.id)
                setTimeout(() => {
        let winner = msg.reactions.cache.get('🎉').users.cache.random();
        if (msg.reactions.cache.get('🎉').users.cache.size < 1) {
            const winner_embed = new Discord.MessageEmbed()
                .setTitle(`${prize}`)
                .setColor('#e92855')
                .setDescription(`Nobody entered the Giveaway 🙁\n\nBy: ${message.author}`)
                .setTimestamp()
                .setFooter('Endet at')
                msg.edit(':tada: **Giveaway Ended** :tada:', winner_embed);
        }
        if (!msg.reactions.cache.get('🎉').users.cache.size < 1) {
            const winner_embed = new Discord.MessageEmbed()
                .setTitle(`${prize}`)
                .setColor('#f9b428')
                .setDescription(`Winner:\n${winner}\n\nBy: ${message.author}`)
                .setTimestamp()
                .setFooter('Endet at')
                msg.edit(':tada: **Giveaway Ended** :tada:', winner_embed);
        }
        }, 1000);
        }, time_duration);
        }
        giveaway();
    }
