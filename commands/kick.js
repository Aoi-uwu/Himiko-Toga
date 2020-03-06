const { RichEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
   name: 'kick',
   alias: '',
   usage: `${prefix}kick <@miembro | ID> [motivo]`,
   cat: 'Moderación',
   perms: ['KICK_MEMBERS'],
   desc: `Expulsa a algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!msg.guild.me.hasPermission(module.exports.perms, false)) 
         return msg.channel.send('Mk, no tengo permiso para expulsar miembros. Paila.');
      if (!msg.member.hasPermission(module.exports.perms, false))
         return msg.channel.send('Usted no tiene el permiso para hacerlo, porte la seriedad más bien.');
      if (!args[0])
         return msg.channel.send('Deje la maricada, mencione a alguien o coloque la ID, hijueputa.');
      var member = msg.mentions.members.first();
      if (!member) {
         member = args[0].replace(/^<@!?(\d+)>$/, '');
         member = msg.guild.members.get(member);
      }
      if (!member)
         return msg.channel.send('Oiga, mk, a lo bien, es tan fácil como mencionar a alguien o colocar la ID, '+
         'qué maricada.');
      if (member === msg.guild.owner)
         return msg.channel.send('JAJAJAJAJA, ya dijo.');
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
               msg.channel.send('Vean a este marica, disque a expulsarme.\n'+
               'Eso vaya y coma mierda.')
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
         `El marica debe tener un rol más alto.`);
      });
   }
}