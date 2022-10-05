const { EmbedBuilder } = require('discord.js')
const { prefix } = require('../config')
const Booru = require('booru')
const db = Booru.forSite('sb')
const rndColor = require('../utility/rndColor')

module.exports = {
   name: 'search',
   alias: 'sb',
   usage: `${prefix}search <tags de los booru's separados por espacio>`,
   cat: 'NSFW',
   perms: [],
   desc: `Busca imágenes en Safebooru.`,
   run: async (sela, msg, args) => {
      if (!msg.channel.nsfw)
         return msg.reply({
            content: "Este comando sólo se puede utilizar en canales NSFW.",
            allowedMentions: {
               repliedUser: false
            }
         })
      if (!args[0])
         return msg.reply({
            content: 'No especificaste al menos un tag.',
            allowedMentions: {
               repliedUser: false
            }
         })

      const tags = args.splice(0)
      db.search(tags, { limit: 100, random: true })
         .then(posts => {
            var randomNum = Math.floor(Math.random() * posts.length)
            const embed = new EmbedBuilder()
               .setAuthor({
                  name: 'Clic para abrir el enlace de Safebooru',
                  url: posts[randomNum].fileUrl
               })
               .setImage(posts[randomNum].fileUrl)
               .setThumbnail('https://safebooru.org/includes/header.png')
               .setColor(msg.member.displayHexColor === '#000000' || msg.member.displayHexColor === '#FFFFFF' ?
                  rndColor() : msg.member.displayHexColor)
            msg.channel.send({ embeds: [embed] })
         }).catch(e => {
            msg.reply({
               content: `Parece que algo falló, probablemente ${tags.length > 1 ? 'alguno de los tags' : 'el tag'} que especificaste no es válido.`,
               allowedMentions: {
                  repliedUser: false
               }
            })
         })
   }
}