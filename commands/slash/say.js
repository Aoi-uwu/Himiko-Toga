const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const tts = require('google-tts-api')
const { es } = require('../../badwords.json')
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('say')
      .setDescription('Puedes hacerme escribir un mensaje por ti o decir algo por voz. (Sé gentil)')
      .addStringOption(op => op.setName('texto')
         .setDescription('Escribe el texto que me harás repetir')
         .setMaxLength(200)
         .setRequired(true)),
   async execute(sela, interaction) {
      const { user, channel, guild, options } = interaction

      const member = guild.members.cache.get(user.id)
      var lowes = es.map(word => word.toLowerCase())
      var textArr = options.getString('texto').trim().split(/ +/)
      var lowargs = textArr.map(word => word.toLowerCase())
      for (i = 0; i < lowes.length; i++) {
         if (lowargs.includes(lowes[i]))
            return interaction.reply({ content: 'No quiero decir eso...', ephemeral: true })
      }
      var text = options.getString('texto')
      if ((!member.voice.channel && !guild.members.me.voice.channel) ||
         (member.voice.channel !== guild.members.me.voice.channel)) {
         channel.send(text)
         return interaction.reply({
            content: '¡Listo!',
            ephemeral: true
         })
      }
      try {
         var voice = tts.getAudioUrl(text, { lang: 'es', slow: false, host: 'https://translate.google.com' })
         const c = joinVoiceChannel({
            channelId: member.voice.channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
         })
         const resource =
            createAudioResource(voice, {
               inlineVolume: true
            })
         const player = createAudioPlayer()
         c.subscribe(player)
         player.play(resource)
         channel.send({
            embeds: [new EmbedBuilder()
               .setAuthor({
                  name: user.username, iconURL: user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  })
               })
               .setColor(member.displayHexColor === '#000000' ? rndColor() : member.displayHexColor)
               .setDescription(text)]
         })
         interaction.reply({
            content: '¡Listo!',
            ephemeral: true
         })
      } catch (e) {
         console.error(e)
         var voice = tts.getAudioUrl('Mucho texto.', { lang: 'es', slow: false, host: 'https://translate.google.com' })
         const c = joinVoiceChannel({
            channelId: member.voice.channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
         })
         const resource =
            createAudioResource(voice, {
               inlineVolume: true
            })
         const player = createAudioPlayer()
         c.subscribe(player)
         player.play(resource)
         interaction.reply({
            content: 'Mucho texto.',
            ephemeral: true
         })
      }
   },
}