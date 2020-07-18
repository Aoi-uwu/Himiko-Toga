const { MessageEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const getMember = require('../utility/getMember');

module.exports = {
   name: 'avatar',
   alias: 'a',
   usage: `${prefix}avatar [@miembro | ID]`,
   cat: 'Utilidad',
   perms: [],
   desc: `Mira tu avatar o el de otro miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!args[0]) {
         msg.channel.send(new MessageEmbed()
         .setAuthor(`Avatar de ${msg.author.username}`,
         '', msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .setImage(msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .setColor(msg.member.displayHexColor === '#000000' ?
         '#F5B8D4' : msg.member.displayHexColor));
         return;
      }
      var member = getMember(msg, args[0]);
      if (!member)
         return msg.channel.send('Debes mencionar a alguien o colocar su ID.');
      msg.channel.send(new MessageEmbed()
      .setAuthor(`Avatar de ${member.user.username}`,
      '', member.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setImage(member.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setColor(member.displayHexColor === '#000000' ?
      '#F5B8D4' : member.displayHexColor));
   }
}