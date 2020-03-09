const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const getMember = require('../utility/getMember');

module.exports = {
   name: 'unmute',
   alias: 'remsilence',
   usage: `${prefix}unmute <@miembro | ID> [motivo]`,
   cat: 'Moderación',
   perms: ['MUTE_MEMBERS', 'MANAGE_CHANNELS'],
   desc: `Quita el silencio a algún miembro muteado.`,
   run: async (sela, msg, args) => {
      if (!msg.guild.me.hasPermission(module.exports.perms, false)) 
         return msg.channel.send('No tengo permiso para silenciar miembros ni para gestionar canales. Paila.');
      if (!msg.member.hasPermission(module.exports.perms, false))
         return msg.channel.send('No tienes permiso para silenciar miembros ni para gestionar canales.');
         if (!args[0])
         return msg.channel.send('Deje la maricada, mencione a alguien o coloque la ID, hijueputa.');
      var member = getMember(msg, args[0]);
      if (!member)
         return msg.channel.send('Oiga, mk, a lo bien, es tan fácil como mencionar a alguien o colocar la ID, '+
         'qué maricada.');
      if (member === msg.guild.owner)
         return msg.channel.send('No sea marica.');
      var reason = !args[1] ? '*Motivo no especificado.*' : args.slice(1).join(' ');         
      if (member === msg.guild.me) {
         return msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#87F9B9')
         .setFooter('Usuario desmuteado')
         .setTimestamp())
         .then(m => {
            setTimeout(() => {
               msg.channel.send('Qué malparido tan desparchado.')
            }, 3000);
         });
      }
      try {
         msg.guild.channels.filter(ch => ch.type == 'category').forEach(ch => {
            ch.overwritePermissions(member, {
               SEND_MESSAGES: null,
               CONNECT: null,
               SPEAK: null,
               SEND_TTS_MESSAGES: null,
               ADD_REACTIONS: null
            }, reason);
         });
         msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#87F9B9')
         .setFooter('Usuario desmuteado')
         .setTimestamp());
      } catch(e) {
         msg.channel.send(`No pude desmutear a ${member}.`);
      }
   }
}
