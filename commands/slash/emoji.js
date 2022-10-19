const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('emote')
      .setDescription('Convierte un emote personalizado en imagen.')
      .addStringOption(op => op.setName('emote')
         .setDescription('Coloca algún emote (personalizado)')
         .setMinLength(25)
         .setRequired(true)),
   async execute(sela, interaction) {
      const { options } = interaction

      var e = options.getString('emote')

      if (!e.startsWith('<:') && !e.startsWith('<a:'))
         return interaction.reply({
            content: 'No ingresaste ningún emote válido.',
            ephemeral: true
         })

      var em = e.slice(e.indexOf(':') + 1)
      var name = em.slice(0, em.indexOf(':'))
      var id = e.substr(e.lastIndexOf(':'), e.length).replace(':', '').replace('>', '')
      var emote = `https://cdn.discordapp.com/emojis/${id}.${e.startsWith('<a:') ? 'gif' : 'png'}`

      interaction.reply({
         content: `\`${name}\``,
         files: [emote]
      })
   },
}