const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const fetch = require('node-fetch')

require('dotenv').config()

const api = process.env.tenorapi

module.exports = {
   data: new SlashCommandBuilder()
      .setName('feeling')
      .setDescription('Exprésate con GIFs.')
      .addStringOption(op =>
         op.setName('expresion')
            .setDescription('Elige alguna expresión para enviar un GIF aleatorio.')
            .addChoices(
               { name: 'Enojad@', value: 'angry' },
               { name: 'Sonrojad@', value: 'blush'},
               { name: 'Aburrid@', value: 'bored'},
               { name: 'Decepcionad@', value: 'disappointed'},
               { name: 'Disgustad@', value: 'disgusted'},
               { name: 'Borrach@', value: 'drunk'},
               { name: 'Feliz', value: 'happy'},
               { name: 'Enamorad@', value: 'inlove'},
               { name: 'Celos@', value: 'jealous'},
               { name: 'Pucheros', value: 'pout'},
               { name: 'Triste', value: 'sad'},
               { name: 'Asustad@', value: 'scared'},
               { name: 'Sorprendid@', value: 'surprised'},
               { name: 'Cansad@', value: 'tired'}
            ).setRequired(true)),
   async execute(sela, interaction) {
      const { user, member, options } = interaction
      const keyword = options.getString('expresion')

      fetch(`https://api.tenor.com/v1/search?q=anime%20${keyword}&limit=50&key=${api}`,
         { method: 'GET' }).then(res => res.json())
         .then(data => {
            var img = data.results[Math.floor(Math.random() *
               data.results.length)].media[0].gif.url
            var color = member.displayHexColor === '#000000' ||
               member.displayHexColor === '#FFFFFF' ?
               rndColor() : member.displayHexColor

            const embed = new EmbedBuilder()
               .setAuthor({
                  name: feelingText(user, keyword),
                  iconURL: user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  })
               })
               .setImage(img)
               .setColor(color)

            interaction.reply({
               embeds: [embed],
            })
         })
   },
}

function feelingText(user, feeling) {
   if (feeling == 'angry') {
      return `${user.username} está enojad@.`
   } else if (feeling == 'blush') {
      return `${user.username} está sonrojad@.`
   } else if (feeling == 'bored') {
      return `${user.username} está aburrid@.`
   } else if (feeling == 'disappointed') {
      return `${user.username} está decepcionad@.`
   } else if (feeling == 'disgusted') {
      return `${user.username} está disgustad@.`
   } else if (feeling == 'drunk') {
      return `${user.username} está borrach@.`
   } else if (feeling == 'happy') {
      return `${user.username} está feliz.`
   } else if (feeling == 'inlove') {
      return `${user.username} está enamorad@.`
   } else if (feeling == 'jealous') {
      return `${user.username} está celos@.`
   } else if (feeling == 'pout') {
      return `${user.username} está haciendo pucheros.`
   } else if (feeling == 'sad') {
      return `${user.username} está triste.`
   } else if (feeling == 'scared') {
      return `${user.username} está asustad@.`
   } else if (feeling == 'surprised') {
      return `${user.username} está sorprendid@.`
   } else if (feeling == 'tired') {
      return `${user.username} está cansad@.`
   }
}