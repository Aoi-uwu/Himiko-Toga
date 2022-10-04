const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'ban',
   alias: '',
   usage: `${prefix} <@miembro | ID> <motivo>`,
   cat: 'Moderación',
   perms: ['BanMembers'],
   desc: `Banea a algún miembro del servidor. (Automáticamente se eliminarán los mensajes de dicho miembro de los últimos 7 días)`,
   run: async (sela, msg, args) => {
      if (!msg.guild.members.cache.get(sela.user.id).permissions.has(module.exports.perms, false))
         return msg.channel.send('No tengo permiso para banear miembros.');
      if (!msg.member.permissions.has(module.exports.perms, false))
         return msg.channel.send('No tienes permiso para banear miembros.');
      if (!args[0])
         return msg.channel.send('Menciona a alguien o coloca su ID.');
      var member = msg.mentions.members.first();
      if (!member) {
         let memberId = args[0].replace(/^<@!?(\d+)>$/, '');
         member = msg.guild.members.cache.get(memberId);
      }
      if (!member)
         return msg.channel.send('No encontré ningún miembro con esa ID.');
      if (member.id === msg.guild.ownerId)
         return msg.channel.send('Creo que sobra decirte porqué no puedes banear al owner.');
      if (!args[1])
         return msg.channel.send('Debes especificar la razón.');
      var reason = args.slice(1).join(' ');
      if (member.id == sela.user.id) {
         return msg.channel.send({
            embeds: [new EmbedBuilder()
               .setAuthor({
                  name: `Moderador: ${msg.author.username}`, iconURL: msg.author.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  })
               })
               .setThumbnail(member.user.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 2048
               }))
               .addFields({ name: 'Usuario', value: `${member}`, inline: true }, { name: 'Motivo', value: reason })
               .setColor('#F9D387')
               .setFooter({ text: 'Usuario baneado' })
               .setTimestamp()]
         })
            .then(m => {
               setTimeout(() => {
                  m.delete();
                  msg.channel.send('...');
               }, 3000);
            });
      }
      member.ban({ deleteMessageSeconds: 604800, reason: reason })
         .then(member => {
            msg.channel.send({
               embeds: [new EmbedBuilder()
                  .setAuthor({
                     name: `Moderador: ${msg.author.username}`, iconURL: msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     })
                  })
                  .setThumbnail(member.user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                  .addFields({ name: 'Usuario', value: `${member}`, inline: true }, { name: 'Motivo', value: reason })
                  .setColor('#F9D387')
                  .setFooter('Usuario baneado')
                  .setTimestamp()]
            });
         })
         .catch(() => {
            msg.channel.send(`No pude banear a ${member}.\n` +
               `Probablemente tiene un rol superior al mío.`);
         });
   }
}