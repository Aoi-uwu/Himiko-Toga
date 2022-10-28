const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const fetch = require('node-fetch')

require('dotenv').config()

module.exports = {
   data: new SlashCommandBuilder()
      .setName('interact')
      .setDescription('Interactua con miembros del servidor.')
      .addStringOption(op =>
         op.setName('interaccion')
            .setDescription('Elige alguna interacción para enviar un GIF aleatorio.')
            .addChoices(
               { name: 'Bonk', value: 'bonk' },
               { name: 'Abrazar', value: 'hug' },
               { name: 'Besar', value: 'kiss' },
               { name: 'Acurrucarse', value: 'cuddle' },
               { name: 'Abofetear', value: 'slap' },
               { name: 'Acariciar', value: 'pat' },
               { name: 'Alimentar', value: 'feed' },
               { name: 'Hacer cosquillas', value: 'tickle' },
               { name: 'Nalguear', value: 'spank' }
            ).setRequired(true))
      .addUserOption(op =>
         op.setName('usuario')
            .setDescription('Elige al usuario con el que deseas interactuar.')
            .setRequired(true)),
   async execute(sela, interaction) {
      const { user, member, options } = interaction
      const keyword = options.getString('interaccion')
      const mention = options.getUser('usuario')
      if (keyword == 'bonk') {
         var bonk = ['https://i.kym-cdn.com/entries/icons/facebook/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg',
            'https://staticdelivery.nexusmods.com/mods/1151/images/thumbnails/45470/45470-1591231144-923308353.jpeg',
            'https://i.redd.it/wv16ryuhry841.png']
         var color = member.displayHexColor === '#000000' ||
            member.displayHexColor === '#FFFFFF' ?
            rndColor() : member.displayHexColor

         const embed = new EmbedBuilder()
            .setImage(bonk[Math.floor(Math.random() * bonk.length)])
            .setColor(color)

         embed.setAuthor({
            name: interactText(user, mention, keyword).user,
            iconURL: user.displayAvatarURL()
         }).setFooter({
            text: interactText(user, mention, keyword).user2,
            iconURL: mention.displayAvatarURL()
         })
         interaction.reply({
            embeds: [embed],
            content: `${mention}`,
            files: [
               './utility/bonk.mp3'
            ]
         })
         return
      }

      fetch(`https://nekos.life/api/v2/img/${keyword}`,
         { method: 'GET' }).then(res => res.json())
         .then(data => {
            var color = member.displayHexColor === '#000000' ||
               member.displayHexColor === '#FFFFFF' ?
               rndColor() : member.displayHexColor

            const embed = new EmbedBuilder()
               .setImage(data.url)
               .setColor(color)
            embed.setAuthor({
               iconURL: user.displayAvatarURL(),
               name: user.username
            }).setFooter({
               iconURL: mention.displayAvatarURL(),
               text: mention.username
            }).setDescription(interactText(user, mention, keyword))

            interaction.reply({
               embeds: [embed],
               content: `${mention}`
            })
         })

   },
}

function interactText(user, mention, interact) {
   if (interact == 'bonk') {
      return {
         user: `${user.username}: Bonk`,
         user2: `${mention.username}: ouch`
      }
   } else if (interact == 'hug') {
      return `${user} ha abrazado a ${mention}.`
   } else if (interact == 'kiss') {
      return [`${user} le ha dado un beso a ${mention}.`,
      `${user} ha besado a ${mention}.`][Math.floor(Math.random() * 2)]
   } else if (interact == 'cuddle') {
      return `${user} se ha acurrucado con ${mention}.`
   } else if (interact == 'slap') {
      return `${user} ha abofeteado a ${mention}.`
   } else if (interact == 'pat') {
      return `${user} ha acariciado a ${mention}.`
   } else if (interact == 'feed') {
      return `${user} ha alimentado a ${mention}.`
   } else if (interact == 'tickle') {
      return `${user} le ha hecho cosquillas a ${mention}.`
   } else if (interact == 'spank') {
      return `${user} ha nalgueado a ${mention}.`
   }
}