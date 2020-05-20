const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const chunk = require('../utility/chunkArray');

module.exports = {
   name: 'help',
   alias: 'h',
   usage: `${prefix}help [comando] [-nodm]`,
   cat: 'Información',
   perms: [],
   desc: `Mira los comandos disponibles o la información de `+
   `un comando específico.`,
   run: async (sela, msg, args) => {
      if (!args[0]) return help(sela, msg);
      if (args[0].toLowerCase() !== '-nodm' && !args[1])
         return helpCMD(sela, msg, args);
      if (args[0].toLowerCase() === '-nodm')
         return help(sela, msg, false);
      helpCMD(sela, msg, args, false);
   }
}

function help(sela, msg, dm=true) {
   chunk(sela.commands.map(c => c.name), 5)
   .then(arr => {
      const embed = new RichEmbed()
      .setAuthor(sela.user.username, sela.user.displayAvatarURL)
      .setTitle('Lista de comandos')
      .setColor(msg.member.displayHexColor === '#000000' ?
      msg.guild.me.displayHexColor : msg.member.displayHexColor);
      for (let i = 0; i < arr.length; i++) {
         embed.addField(msg.guild.emojis.random(),
         `\`${arr[i].toString().replace(/,/g, '\n')}\``, true);
      }
      if (dm) {
         msg.reply('mira tus DM\'s.');
         msg.author.send(embed);
         return;
      }
      msg.channel.send(embed);
   });
}

function helpCMD(sela, msg, args, dm=true) {
   if (!sela.commands.get(args[0].toLowerCase()))
      return msg.reply(`no encontré ningún comando con ese nombre.`);
   const cmd = sela.commands.get(args[0].toLowerCase());
   const embed = new RichEmbed()
   .setFooter(`[] - Opcional, <> - Requerido`,
   sela.user.displayAvatarURL)
   .setTitle(`Comando **${cmd.name}**`)
   .setColor(msg.member.displayHexColor === '#000000' ?
   msg.guild.me.displayHexColor : msg.member.displayHexColor)
   .setDescription(`
      **Nombre:** ${cmd.name}
      **Alias:** ${cmd.alias.length == 0 ? 'No tiene' : cmd.alias}
      **Categoría:** ${cmd.cat}
      **Descripción:** *${cmd.desc}*
      **Uso:** \`${cmd.usage}\`
      **Permisos:** ${
         !cmd.perms.length ? 'Ninguno en especial' :
         `\`\`\`\n`+
         `${cmd.perms.map(p => `-> ${p}`).join('\n')}\n`+
         `\`\`\``
      }
   `).setAuthor(msg.author.username,
   msg.author.displayAvatarURL);
   if (dm) {
      msg.reply('mira tus DM\'s.');
      msg.author.send(embed);
      return;
   }
   msg.channel.send(embed);
}