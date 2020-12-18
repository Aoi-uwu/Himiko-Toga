const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'userinfo',
   alias: 'ui',
   usage: `${prefix}userinfo [@miembro]`,
   cat: 'Información',
   perms: [],
   desc: `Mira la información tuya o de algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      const user = msg.mentions.users.first();

      if (!user) {
         const embed = new MessageEmbed()
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .setTitle(`Información de **${msg.author.username}** *(${msg.member.displayName})*`)
         .setThumbnail(msg.author.displayAvatarURL())
         .setDescription(`**Estado:** ${msg.author.presence.status}
Este usuario ${msg.author.bot ? '**SI**' : '**NO**'} es un bot
**Tag:** ${msg.author.tag.slice(msg.author.tag.length - 5)}`
/***Jugando a:** ${msg.author.presence.game == null ? 'Nada' : msg.author.presence.game}`*/)
      }
   }
}