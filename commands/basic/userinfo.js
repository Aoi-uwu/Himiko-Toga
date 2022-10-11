const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config');
const rndColor = require('../../utility/rndColor');

module.exports = {
   name: 'userinfo',
   alias: 'ui',
   usage: `${prefix}userinfo [@miembro]`,
   cat: 'Información',
   perms: [],
   desc: `Mira la información tuya o de algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      const member = msg.mentions.members.first();
      if (!member) {
         const embed = new MessageEmbed()
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
      .setTitle(`Información de **${msg.author.username}** *(${msg.member.displayName})*`)
      .setThumbnail(msg.author.displayAvatarURL())
      .setDescription(`**Estado:** ${msg.author.presence.status}
Este usuario ${msg.author.bot ? '**SI**' : '**NO**'} es un bot
**Tag:** ${msg.author.tag.slice(msg.author.tag.length - 5)}
**ID:** ${msg.author.id}
**Cuenta creada:** ${msg.author.createdAt}
**Apodo (${msg.guild.name}):** ${msg.member.displayName !== msg.author.username ? msg.member.displayName : "Sin apodo"}
**Rol más alto (${msg.guild.name}):** ${msg.member.roles.highest}
**Unión al servidor (${msg.guild.name}):** ${msg.member.joinedAt}`);
      msg.channel.send(embed);
         return;
      }
      const embed = new MessageEmbed()
         .setColor(member.displayHexColor === '#000000' ? rndColor() : member.displayHexColor)
         .setTitle(`Información de **${member.user.username}** *(${member.displayName})*`)
         .setThumbnail(member.user.displayAvatarURL())
         .setDescription(`**Estado:** ${member.user.presence.status}
Este usuario ${member.user.bot ? '**SI**' : '**NO**'} es un bot
**Tag:** ${member.user.tag.slice(member.user.tag.length - 5)}
**ID:** ${member.user.id}
**Cuenta creada:** ${member.user.createdAt}
**Apodo (${msg.guild.name}):** ${member.displayName !== member.user.username ? member.displayName : "Sin apodo"}
**Rol más alto (${msg.guild.name}):** ${member.roles.highest}
**Unión al servidor (${msg.guild.name}):** ${member.joinedAt}`);
         msg.channel.send(embed);
   }
}