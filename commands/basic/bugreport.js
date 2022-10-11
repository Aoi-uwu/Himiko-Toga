const { EmbedBuilder } = require('discord.js')
const { prefix, owner } = require('../../config')
const rndColor = require('../../utility/rndColor')

module.exports = {
   name: 'bugreport',
   alias: 'bugr',
   usage: `${prefix}bugreport <mensaje>`,
   cat: 'Bot',
   perms: [],
   desc: `Puedes notificar a mi creador sobre algún bug que hayas encontrado con algún comando.`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes especificar el mensaje indicando el bug que hayas encontrado.' +
            '\nTrata de ser lo más específico posible.')
      var message = args.slice(0).join(' ')
      sela.users.cache.get(owner.id).send({embeds:[new EmbedBuilder()
         .setTitle('Reporte de bug')
         .setAuthor({
            name: msg.author.tag, iconURL: msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            })
         })
         .setDescription(message)
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .addFields({ name: 'Enviado desde', value: msg.guild.name, inline: true })
         .setTimestamp()]})
      msg.channel.send('¡Listo! Tu mensaje ha sido enviado.')
   }
}