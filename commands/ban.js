const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'ban',
   alias: '',
   usage: `${prefix} <@miembro | ID> <motivo>`,
   cat: 'Moderación',
   perms: ['BAN_MEMBERS'],
   desc: `Banea a algún miembro del servidor. (Automáticamente se eliminarán los mensajes de dicho miembro de los últimos 7 días)`,
   run: async (sela, msg, args) => {
      if (!msg.guild.me.hasPermission(module.exports.perms, false)) 
         return msg.channel.send('No tengo permiso para banear miembros.');
      if (!msg.member.hasPermission(module.exports.perms, false))
         return msg.channel.send('No tienes permiso para banear miembros.');
      if (!args[0])
         return msg.channel.send('Menciona a alguien o coloca su ID.');
      var member = msg.mentions.members.first();
      if (!member) {
         member = args[0].replace(/^<@!?(\d+)>$/, '');
         member = msg.guild.members.get(member);
      }
      if (!member)
         return msg.channel.send('No encontré ningún miembro con esa ID.');
      if (member === msg.guild.owner)
         return msg.channel.send('Creo que sobra decirte porqué no puedes banear al owner.');
      if (!args[1])
         return msg.channel.send('Debes especificar la razón.');
      var reason = args.slice(1).join(' ');         
      if (member === msg.guild.me) {
         return msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9D387')
         .setFooter('Usuario baneado')
         .setTimestamp())
         .then(m => {
            setTimeout(() => {
               m.delete();
               msg.channel.send('...');
            }, 3000);
         });
      }
      member.ban({ days: 7, reason: reason })
      .then(member => {
         msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9D387')
         .setFooter('Usuario baneado')
         .setTimestamp());
      })
      .catch(() => {
         msg.channel.send(`No pude banear a ${member}.\n`+
         `Probablemente tiene un rol superior al mío.`);
      });
   }
}