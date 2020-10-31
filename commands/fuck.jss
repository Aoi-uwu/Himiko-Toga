const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'fuck',
   alias: 'jojojoder',
   usage: `${prefix}fuck`,
   cat: 'NSFW',
   perms: [],
   desc: `El nombre es bastante claro.`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes mencionar a quien quieres follar.');
      var member = msg.mentions.members.first();
      if (!member)
         return msg.channel.send('Parece que no has mencionado a un miembro.');
      await fetch(`https://nekos.life/api/v2/img/kiss`, { method: "GET" })
      .then(res => res.json())
      .then(async data => {
         msg.channel.send(new MessageEmbed()
         .setAuthor(`${msg.author.username} ha follado a ${member.user.username}`, msg.author.displayAvatarURL())
         .setColor(msg.member.displayHexColor == '#000000' ? rndColor() : msg.member.displayHexColor)
         .setImage(data.url)
         .setFooter(`x///x`, member.user.displayAvatarURL()));
      });
   }
}