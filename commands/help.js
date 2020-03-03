const { RichEmbed } = require('discord.js');
const { prefix } = require('../config.json');
const chunk = require('../chunkArray');

module.exports = {
   name: 'help',
   alias: 'h',
   usage: `${prefix}help [comando] [-nodm]`,
   cat: 'test',
   perms: [],
   desc: `Mira los comandos disponibles.`,
   run: async (miku, msg, args) => {
      if (!args[0]) return help(miku, msg);
      if (args[0].toLowerCase() !== '-nodm' && !args[1])
         return helpCMD(miku, msg, args);
      if (args[0].toLowerCase() === '-nodm')
         return help(miku, msg, false);
      helpCMD(miku, msg, args, false);
   }
}

function help(miku, msg, dm=true) {
   chunk(miku.commands.map(c => c.name), 5)
   .then(arr => {
      const embed = new RichEmbed()
      .setAuthor(miku.user.username, miku.user.displayAvatarURL)
      .setTitle('Lista de comandos')
      .setColor(msg.member.displayHexColor === '#000000' ?
      msg.guild.me.displayHexColor : msg.member.displayHexColor);
      for (let i = 0; i < arr.length; i++) {
         embed.addField(msg.guild.emojis.random(),
         `\`${arr.toString().replace(/,/g, '\n')}\``, true);
      }
      if (dm) {
         msg.reply('revisa tus DM\'s. uwu');
         msg.author.send(embed);
         return;
      }
      msg.channel.send(embed);
   });
}

function helpCMD(miku, msg, args, dm=true) {
   if (!miku.commands.get(args[0].toLowerCase()))
      return msg.reply(`perdona, pero no sé cuál es el comando `+
      `\`${args[0].toLowerCase()}\`.`);
   const cmd = miku.commands.get(args[0].toLowerCase());
   const embed = new RichEmbed()
   .setAuthor(miku.user.username, miku.user.displayAvatarURL)
   .setTitle(`Comando **${cmd.name}**`)
   .setColor(msg.member.displayHexColor === '#000000' ?
   msg.guild.me.displayHexColor : msg.member.displayHexColor)
   .setDescription(`
      **Nombre:** ${cmd.name}
      **Alias:** ${cmd.alias.length == 0 ? 'No tiene' : cmd.alias[0]}
      **Categoría:** ${cmd.cat}
      **Descripción:** *${cmd.desc}*
      **Uso:** \`${cmd.usage}\`
      **Permisos:** ${
         !cmd.perms.length ? 'Ninguno en especial' :
         `\`\`\`
         ${cmd.perms.map(p => `-> ${p}`)}
         \`\`\``
      }
   `).setFooter(`[] - Opcional, <> - Requerido`,
   msg.author.displayAvatarURL);
   if (dm) {
      msg.reply('revisa tus DM\'s. uwu');
      msg.author.send(embed);
      return;
   }
   msg.channel.send(embed);
}