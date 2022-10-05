const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../config');
const chunk = require('../utility/chunkArray');

module.exports = {
   name: 'help',
   alias: 'h',
   usage: `${prefix}help [comando] [-nodm]`,
   cat: 'Información',
   perms: [],
   desc: `Mira los comandos disponibles o la información de ` +
      `un comando específico.`,
   run: async (sela, msg, args) => {
      if (!args[0]) return help(sela, msg);
      if (args[0].toLowerCase() !== '-nodm' && !args[1])
         return helpCMD(sela, msg, args);
      if (args[0].toLowerCase() == '-nodm')
         return help(sela, msg, false);
      helpCMD(sela, msg, args, false);
   }
}

function help(sela, msg, dm = true) {
   chunk(sela.commands.map(c => c.name), 5)
      .then(arr => {
         const embed = new EmbedBuilder()
            .setAuthor({
               name: sela.user.username,
               iconURL: sela.user.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 2048
               })
            })
            .setTitle('Lista de comandos')
            .setColor(msg.member.displayHexColor === '#000000' ?
               msg.guild.members.me.displayHexColor : msg.member.displayHexColor);
         for (let i = 0; i < arr.length; i++) {
            embed.addFields({
               name: `${msg.guild.emojis.cache.filter(e => e.available).random()}`,
               value: `\`${arr[i].toString().replace(/,/g, '\n')}\``,
               inline: true
            });
         }
         if (dm) {
            msg.reply('Mira tus DM\'s.');
            msg.author.send({
               embeds: [
                  embed
               ]
            });
            return;
         }
         msg.channel.send({
            embeds: [
               embed
            ]
         });
      });
}

function helpCMD(sela, msg, args, dm = true) {
   if (!sela.commands.get(args[0].toLowerCase()))
      return msg.reply(`No encontré ningún comando con ese nombre.`);
   const cmd = sela.commands.get(args[0].toLowerCase());
   const embed = new EmbedBuilder()
      .setFooter({
         text: `[] - Opcional, <> - Requerido`,
         iconURL: sela.user.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         })
      })
      .setTitle(`Comando **${cmd.name}**`)
      .setColor(msg.member.displayHexColor === '#000000' ?
         msg.guild.members.me.displayHexColor : msg.member.displayHexColor)
      .setDescription(`
      **Nombre:** ${cmd.name}
      **Alias:** ${cmd.alias.length == 0 ? 'No tiene' : cmd.alias}
      **Categoría:** ${cmd.cat}
      **Descripción:** *${cmd.desc}*
      **Uso:** \`${cmd.usage}\`
      **Permisos:** ${!cmd.perms.length ? 'Ninguno en especial' :
            `\`\`\`\n` +
            `${cmd.perms.map(p => `-> ${p}`).join('\n')}\n` +
            `\`\`\``
         }
   `).setAuthor({
            name: msg.author.username,
            iconURL: msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            })
         });
   if (dm) {
      msg.reply('Mira tus DM\'s.');
      msg.author.send({ embeds: [embed] });
      return;
   }
   msg.channel.send({ embeds: [embed] });
}