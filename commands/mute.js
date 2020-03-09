const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const getMember = require('../utility/getMember');

module.exports = {
   name: 'mute',
   alias: 'silence',
   usage: `${prefix}mute <@miembro | ID> [motivo]`,
   cat: 'Moderación',
   perms: ['MUTE_MEMBERS', 'MANAGE_CHANNELS'],
   desc: `Silencia a algún miembro del servidor.`,
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
         return msg.channel.send('JAJAJAJAJA, ya dijo.');
      var reason = !args[1] ? '*Motivo no especificado.*' : args.slice(1).join(' ');         
      if (member === msg.guild.me) {
         return msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9AD87')
         .setFooter('Usuario muteado')
         .setTimestamp())
         .then(m => {
            setTimeout(() => {
               msg.channel.send('Vean a este marica, disque a mutearme.\n'+
               'Vaya y cállele el hocico a su madre, perro hijueputa.')
            }, 3000);
         });
      }
      try {
         msg.guild.channels.filter(ch => ch.type == 'category').forEach(ch => {
            ch.overwritePermissions(member, {
               SEND_MESSAGES: false,
               CONNECT: false,
               SPEAK: false,
               SEND_TTS_MESSAGES: false,
               ADD_REACTIONS: false
            }, reason);
         });
         msg.channel.send(new RichEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL)
         .setThumbnail(member.user.displayAvatarURL)
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9AD87')
         .setFooter('Usuario muteado')
         .setTimestamp());
      } catch(e) {
         msg.channel.send(`No pude mutear a ${member}.\n`+
         `Lo más probable es que tenga un rol superior al mío.`);
      }
   }
}
