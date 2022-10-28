const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const wait = require('node:timers/promises').setTimeout

module.exports = {
   data: new SlashCommandBuilder()
      .setName('rps')
      .setDescription('Juega a Piedra, Papel, Tijeras conmigo.')
      .addUserOption(op => op.setName('usuario')
         .setDescription('Elige con quién quieres jugar (tiene que aceptar)')),
   async execute(sela, interaction) {
      const { user, options } = interaction
      const mention = options.getUser('usuario')
      if (!mention) {
         const row = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
               .setCustomId('rock')
               .setLabel('✊')
               .setStyle(ButtonStyle.Success))
            .addComponents(new ButtonBuilder()
               .setCustomId('paper')
               .setLabel('✋')
               .setStyle(ButtonStyle.Success))
            .addComponents(new ButtonBuilder()
               .setCustomId('scissor')
               .setLabel('✌️')
               .setStyle(ButtonStyle.Success))
         var embed = new EmbedBuilder()
            .setThumbnail('https://imgur.com/v33gAdC.png')
            .setAuthor({
               name: sela.user.username,
               iconURL: sela.user.displayAvatarURL()
            })
            .setTitle('¡Piedra, papel o tijeras!')
            .setDescription('Elige bien. ùwú')
         interaction.reply({
            embeds: [embed],
            components: [row]
         })
         const filter = i => (i.customId === 'rock' || i.customId === 'paper' || i.customId === 'scissor') && i.user.id === user.id

         const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 })

         const disabledRow = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
               .setCustomId('rockD')
               .setLabel('✊')
               .setStyle(ButtonStyle.Success)
               .setDisabled(true))
            .addComponents(new ButtonBuilder()
               .setCustomId('paperD')
               .setLabel('✋')
               .setStyle(ButtonStyle.Success)
               .setDisabled(true))
            .addComponents(new ButtonBuilder()
               .setCustomId('scissorD')
               .setLabel('✌️')
               .setStyle(ButtonStyle.Success)
               .setDisabled(true))

         collector.on('collect', async i => {
            var botPlay = ['🪨', '🧻', '✂️']
            var selected = botPlay[Math.floor(Math.random() * botPlay.length)]
            console.log(selected)
            if (selected == '🪨') {
               if (i.customId == 'rock') {
                  embed.setTitle('Empate. o.o')
                     .setDescription('🪨 vs ✊')
                     .setThumbnail(null)
                     .setImage('https://media1.tenor.com/images/25f1a2e222ddce06074de1e0bda7eb81/tenor.gif?itemid=16697440')
                     .setColor('#FDFA9C')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               } else if (i.customId == 'paper') {
                  embed.setTitle('Perdí... u.u')
                     .setDescription('🪨 vs ✋')
                     .setThumbnail(null)
                     .setImage('https://media.tenor.com/images/c73f0f7cd272f163459200fbcd50a6ce/tenor.gif')
                     .setColor('#FF7D7D')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               } else {
                  embed.setTitle('¡Gané! >u<')
                     .setDescription('🪨 vs ✌️')
                     .setThumbnail(null)
                     .setImage('https://pa1.narvii.com/7021/8d03ec014af915f935edd54491047c8c0bffd1c9r1-600-338_00.gif')
                     .setColor('#9CFD9F')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               }
            } else if (selected == '🧻') {
               if (i.customId == 'paper') {
                  embed.setTitle('Empate. o.o')
                     .setDescription('🧻 vs ✋')
                     .setThumbnail(null)
                     .setImage('https://media1.tenor.com/images/25f1a2e222ddce06074de1e0bda7eb81/tenor.gif?itemid=16697440')
                     .setColor('#FDFA9C')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               } else if (i.customId == 'scissor') {
                  embed.setTitle('Perdí... u.u')
                     .setDescription('🧻 vs ✌️')
                     .setThumbnail(null)
                     .setImage('https://media.tenor.com/images/c73f0f7cd272f163459200fbcd50a6ce/tenor.gif')
                     .setColor('#FF7D7D')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               } else {
                  embed.setTitle('¡Gané! >u<')
                     .setDescription('🧻 vs ✊')
                     .setThumbnail(null)
                     .setImage('https://pa1.narvii.com/7021/8d03ec014af915f935edd54491047c8c0bffd1c9r1-600-338_00.gif')
                     .setColor('#9CFD9F')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               }
            } else if (selected == '✂️') {
               if (i.customId == 'scissor') {
                  embed.setTitle('Empate. o.o')
                     .setDescription('✂️ vs ✌️')
                     .setThumbnail(null)
                     .setImage('https://media1.tenor.com/images/25f1a2e222ddce06074de1e0bda7eb81/tenor.gif?itemid=16697440')
                     .setColor('#FDFA9C')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               } else if (i.customId == 'rock') {
                  embed.setTitle('Perdí... u.u')
                     .setDescription('✂️ vs ✊')
                     .setThumbnail(null)
                     .setImage('https://media.tenor.com/images/c73f0f7cd272f163459200fbcd50a6ce/tenor.gif')
                     .setColor('#FF7D7D')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               } else {
                  embed.setTitle('¡Gané! >u<')
                     .setDescription('✂️ vs ✋')
                     .setThumbnail(null)
                     .setImage('https://pa1.narvii.com/7021/8d03ec014af915f935edd54491047c8c0bffd1c9r1-600-338_00.gif')
                     .setColor('#9CFD9F')
                     .setFooter({
                        text: i.user.username,
                        iconURL: i.user.displayAvatarURL()
                     })
               }
            }
            await i.deferUpdate()
            await wait(500)
            await i.editReply({
               embeds: [embed],
               components: [disabledRow]
            })
         })

         collector.on('end', collected => {
            if (collected.size >= 1) {
               return
            } else interaction.editReply({
               content: 'Si no querías jugar conmigo, no hubieras usado el comando...',
               components: [],
               embeds: []
            })
         })
         return
      }
      if (mention.id == user.id || mention.bot)
         return interaction.reply({
            content: 'Umm... Si no tienes con quién jugar, puedes jugar conmigo, ¿sabes? ...',
            ephemeral: true
         })
      const rowGame = new ActionRowBuilder()
         .addComponents(new ButtonBuilder()
            .setCustomId('rock')
            .setLabel('✊')
            .setStyle(ButtonStyle.Success))
         .addComponents(new ButtonBuilder()
            .setCustomId('paper')
            .setLabel('✋')
            .setStyle(ButtonStyle.Success))
         .addComponents(new ButtonBuilder()
            .setCustomId('scissor')
            .setLabel('✌️')
            .setStyle(ButtonStyle.Success))
      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setAuthor({
                  name: `¡Mucha suerte para ambos! owo`,
                  iconURL: sela.user.displayAvatarURL()
               })
               .addFields([{
                  name: user.username,
                  value: 'Eligiendo...'
               }, {
                  name: mention.username,
                  value: 'Esperando...'
               }])
               .setColor(rndColor() == '#FFFFFF' ||
                  rndColor() == '#000000' ? rndColor() :
                  rndColor())
         ],
         components: [rowGame]
      })
      const f1 = i => (i.customId === 'rock' || i.customId === 'paper' || i.customId === 'scissor') &&
         (i.user.id === user.id || i.user.id === mention.id)
      const c1 = interaction.channel.createMessageComponentCollector({
         f1, time: 10000,
         max: 2, maxUsers: 2,
         componentType: ComponentType.Button
      })
      c1.on('collect', async i => {
         if (i.user.id !== user.id) {
            return i.message.reply({
               content: 'Aún no es tu turno, debes esperar.',
               ephemeral: true
            })
         }
         i.message.reply({
            content: `Ya elegiste, ahora espera a qué ${mention} elija.`,
            ephemeral: true
         })

      })
   },
}