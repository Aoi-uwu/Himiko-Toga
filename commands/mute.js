const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
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
         return msg.channel.send('No tengo permiso para silenciar miembros ni para gestionar canales.');
      if (!msg.member.hasPermission(module.exports.perms, false))
         return msg.channel.send('No tienes permiso para silenciar miembros ni para gestionar canales.');
      if (!args[0])
         return msg.channel.send('Menciona a alguien o coloca su ID.');
      var member = getMember(msg, args[0]);
      if (!member)
         return msg.channel.send('No encontré ningún miembro con esa ID.');
      if (member === msg.guild.owner)
         return msg.channel.send('Creo que sobra decirte porqué no puedes mutear al owner.');
      var reason = !args[1] ? '*Motivo no especificado.*' : args.slice(1).join(' ');         
      if (member === msg.guild.me) {
         return msg.channel.send(new MessageEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .setThumbnail(member.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9AD87')
         .setFooter('Usuario muteado')
         .setTimestamp())
         .then(m => {
            setTimeout(() => {
               m.delete();
               msg.channel.send('...');
            }, 3000);
         });
      }
      try {
         msg.guild.channels.cache.filter(ch => ch.type == 'category').forEach(async ch => {
            await ch.overwritePermissions([
               {
                  id: member,
                  deny: ['SEND_MESSAGES']
               },
               {
                  id: member.id,
                  deny: ['CONNECT']
               },
               {
                  id: member.id,
                  deny: ['SPEAK']
               },
               {
                  id: member.id,
                  deny: ['SEND_TTS_MESSAGES']
               },
               {
                  id: member.id,
                  deny: ['ADD_REACTIONS']
               }
            ], reason);
            await ch.updateOverwrite(member, {
               SEND_MESSAGES: false,
               CONNECT: false,
               SPEAK: false,
               SEND_TTS_MESSAGES: false,
               ADD_REACTIONS: false
            }, reason);
         });
         msg.channel.send(new MessageEmbed()
         .setAuthor(`Moderador: ${msg.author.username}`, msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .setThumbnail(member.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .addField('Usuario', member, true)
         .addField('Motivo', reason)
         .setColor('#F9AD87')
         .setFooter('Usuario muteado')
         .setTimestamp());
      } catch(e) {
         msg.channel.send(`No pude mutear a ${member}.\n`+
         `Probablemente tiene un rol superior al mío.`);
      }
   }
}
