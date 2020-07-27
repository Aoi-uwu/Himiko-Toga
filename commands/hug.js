const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'hug',
   alias: '',
   usage: `${prefix}hug <@miembro>`,
   cat: 'Interacción',
   perms: [],
   desc: `Abraza a algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes mencionar a quien quieres abrazar.');
      var member = msg.mentions.members.first();
      if (!member)
         return msg.channel.send('Parece que no has mencionado a un miembro.');
      await fetch(`https://nekos.life/api/v2/img/hug`, { method: "GET" })
      .then(res => res.json())
      .then(async data => {
         msg.channel.send(new MessageEmbed()
         .setAuthor(`${msg.author.username} ha abrazado a ${member.user.username}`, msg.author.displayAvatarURL())
         .setColor(msg.member.displayHexColor == '#000000' ? rndColor() : msg.member.displayHexColor)
         .setImage(data.url)
         .setFooter(`uwu`, member.user.displayAvatarURL()));
      });
   }
}
