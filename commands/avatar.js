const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../config');
const getMember = require('../utility/getMember');

module.exports = {
   name: 'avatar',
   alias: 'a',
   usage: `${prefix}avatar <global/g | local/l> [@miembro | ID]`,
   cat: 'Utilidad',
   perms: [],
   desc: `Mira tu avatar o el de otro miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!args[0]) {
         return msg.reply('Debes especificar si quieres ver el avatar global o local.')
      }
      if (!args[1]) {
         if (args[0].toLowerCase() == 'global' || args[0].toLowerCase() == 'g') {
            msg.channel.send({
               embeds: [new EmbedBuilder()
                  .setAuthor({
                     name: `Avatar de ${msg.author.username}`,
                     url: msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     })
                  })
                  .setImage(msg.author.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                  .setColor(msg.member.displayHexColor === '#000000' ?
                     '#F5B8D4' : msg.member.displayHexColor)]
            });
         } else if (args[0].toLowerCase() == 'local' || args[0].toLowerCase() == 'l') {
            msg.channel.send({
               embeds: [new EmbedBuilder()
                  .setAuthor({
                     name: `Avatar de ${msg.member.nickname} en ${msg.guild.name}`,
                     url: msg.member.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     })
                  })
                  .setImage(msg.member.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                  .setColor(msg.member.displayHexColor === '#000000' ?
                     '#F5B8D4' : msg.member.displayHexColor)]
            });
         } else return msg.reply('No especificaste Global o Local.')
         return
      }
      var member = getMember(msg, args[1]);
      if (!member)
         return msg.channel.send('Debes mencionar a alguien o colocar su ID.');
         if (args[0].toLowerCase() == 'global' || args[0].toLowerCase() == 'g') {
            msg.channel.send({
               embeds: [new EmbedBuilder()
                  .setAuthor({
                     name: `Avatar de ${member.user.username}`,
                     url: member.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     })
                  })
                  .setImage(member.user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                  .setColor(member.displayHexColor === '#000000' ?
                     '#F5B8D4' : member.displayHexColor)]
            });
         } else if (args[0].toLowerCase() == 'local' || args[0].toLowerCase() == 'l') {
            msg.channel.send({
               embeds: [new EmbedBuilder()
                  .setAuthor({
                     name: `Avatar de ${member.nickname} en ${msg.guild.name}`,
                     url: member.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     })
                  })
                  .setImage(member.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                  .setColor(member.displayHexColor === '#000000' ?
                     '#F5B8D4' : member.displayHexColor)]
            });
         } else return msg.reply('No especificaste Global o Local.')
   }
}