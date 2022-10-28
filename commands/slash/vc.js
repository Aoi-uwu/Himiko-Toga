const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('vc')
      .setDescription('Invítame al VC donde te encuentres.')
      .addStringOption(op => op.setName('opcion')
         .setDescription('Entraré o saldré del VC en el que te encuentres.')
         .addChoices({ name: 'Entrar', value: 'join' },
            { name: 'Salir', value: 'leave' })
         .setRequired(true)),
   async execute(sela, interaction) {
      const { user, guild, options } = interaction

      const member = guild.members.cache.get(user.id)

      const option = options.getString('opcion')

      if (option == 'join') {
         if (!member.voice.channel)
            return interaction.reply({
               content: 'No estás en ningún canal de voz.',
               ephemeral: true
            })
         if (guild.members.me.voice.channel && member.voice.channel !== guild.members.me.voice.channel)
            return interaction.reply({
               content: 'Perdona, ya me encuentro en otro canal de voz.',
               ephemeral: true
            })
         if (guild.members.me.voice.channel && member.voice.channel === guild.members.me.voice.channel)
            return interaction.reply({
               content: 'Ya estoy contigo en el mismo canal de voz...',
               ephemeral: true
            })
         try {
            const connection = joinVoiceChannel({
               channelId: member.voice.channel.id,
               guildId: guild.id,
               adapterCreator: guild.voiceAdapterCreator,
            })
            interaction.reply({
               content: '¡Listo!',
               ephemeral: true
            })
         } catch (e) {
            console.error(e)
            interaction.reply({
               content: 'No me pude conectar, probablemente no tengo permisos para unirme al VC.',
               ephemeral: true
            })
         }
         return
      }
      if (!member.voice.channel)
         return interaction.reply({
            content: 'No estás en ningún canal de voz.',
            ephemeral: true
         })
      if (!guild.members.me.voice.channel)
         return interaction.reply({
            content: 'No estoy en ningún canal de voz...',
            ephemeral: true
         })
      if (member.voice.channel !== guild.members.me.voice.channel)
         return interaction.reply({
            content: 'No estoy en el mismo canal de voz que tú.',
            ephemeral: true
         })
      try {
         const connection = joinVoiceChannel({
            channelId: member.voice.channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator,
         })
         connection.destroy()
         interaction.reply({
            content: 'Bye, bye.',
            ephemeral: true
         })
      } catch (e) {
         interaction.reply({
            content: 'Ehm... No sé qué ocurrió, pero no pude desconectarme.\n' +
               'Inténtalo de nuevo o desconéctame manualmente.',
            ephemeral: true
         })
      }
   },
}