const { MessageEmbed } = require('discord.js');
const { prefix, owner } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'suggest',
   alias: 'sug',
   usage: `${prefix}suggest <tu sugerencia>`,
   cat: 'Bot',
   perms: [],
   desc: `Envía una sugerencia a mi creador.`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes escribir tu sugerencia.');
      var suggestion = args.slice(0).join(' ');
      sela.users.cache.get(owner.id).send(new MessageEmbed()
      .setTitle('Sugerencia')
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setDescription(suggestion)
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
      .addField('Enviado desde', msg.guild.name, true)
      .setTimestamp());
      msg.channel.send('¡Listo! Tu mensaje ha sido enviado.');
   }
}