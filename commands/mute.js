const { RichEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
   name: 'mute',
   alias: 'silence',
   usage: `${prefix}mute <@mencion | ID> [motivo]`,
   cat: 'Moderación',
   perms: ['MUTE_MEMBERS', 'MANAGE_CHANNELS'],
   desc: `Silencia a algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!msg.guild.me.hasPermission(module.exports.perms, false)) 
         return msg.channel.send('Mk, no tengo permiso para silenciar miembros ni para gestionar canales. Paila.');
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
         .setColor('#F9AD87')
         .setFooter('Usuario muteado')
         .setTimestamp())
         .then(m => {
            setTimeout(() => {
               msg.channel.send('Vean a este marica, disque a mutearme.\n'+
               'Vaya y cállele el hocico a su madre, maldito perro.')
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
         `El marica debe tener un rol más alto.`);
      }
   }
}
