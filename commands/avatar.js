const { RichEmbed } = require('discord.js');
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
         msg.channel.send(new RichEmbed()
         .setAuthor(`Avatar de ${msg.author.username}`,
         '', msg.author.displayAvatarURL)
         .setImage(msg.author.displayAvatarURL)
         .setColor(msg.member.displayHexColor === '#000000' ?
         '#F5B8D4' : msg.member.displayHexColor));
         return;
      }
      var member = getMember(msg, args[0]);
      if (!member)
         return msg.channel.send('Venga, en serio, le dije una mención o una ID, deje la güevonada.');
      msg.channel.send(new RichEmbed()
      .setAuthor(`Avatar de ${member.user.username}`,
      '', member.user.displayAvatarURL)
      .setImage(member.user.displayAvatarURL)
      .setColor(member.displayHexColor === '#000000' ?
      '#F5B8D4' : member.displayHexColor));
   }
}