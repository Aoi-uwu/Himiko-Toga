const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');

module.exports = {
   name: 'kick',
   alias: '',
   usage: `${prefix}kick <@miembro | ID> [motivo]`,
   cat: 'Moderación',
   perms: ['KICK_MEMBERS'],
   desc: `Expulsa a algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!msg.guild.me.hasPermission(module.exports.perms, false)) 
         return msg.channel.send('No tengo permiso para expulsar miembros.');
      if (!msg.member.hasPermission(module.exports.perms, false))
         return msg.channel.send('No tienes permiso para expulsar miembros.');
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
         return msg.channel.send('Creo que sobra decirte porqué no puedes expulsar al owner.');
      var reason = !args[1] ? '*Motivo no especificado.*' : args.slice(1).join(' ');         
      if (member === msg.guild.me) {
         return msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9D387')
         .setFooter('Usuario expulsado')
         .setTimestamp())
         .then(m => {
            setTimeout(() => {
               m.delete();
               msg.channel.send('...');
            }, 3000);
         });
      }
      member.kick(reason)
      .then(member => {
         msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9D387')
         .setFooter('Usuario expulsado')
         .setTimestamp());
      })
      .catch(() => {
         msg.channel.send(`No pude expulsar a ${member}.\n`+
         `Probablemente tiene un rol superior al mío.`);
      });
   }
}