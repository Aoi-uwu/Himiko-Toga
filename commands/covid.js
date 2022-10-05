const { EmbedBuilder } = require('discord.js')
const { prefix } = require('../config')
const rndColor = require('../utility/rndColor')
const fetch = require('node-fetch')
module.exports = {
   name: 'covid',
   alias: 'corona',
   usage: `${prefix}covid <país>`,
   cat: 'Información',
   perms: [],
   desc: `Mira la cantidad de infectados por Covid-19 en el país que especifiques. ¡Cuídate!`,
   run: async (sela, msg, args) => {
      if (!args[0]) return msg.channel.send('Coloca el país que deseas buscar.')
      var country = args[0]
      await fetch(`https://api.covid19api.com/country/${country}`, { method: "GET" })
         .then(res => res.json())
         .then(async data1 => {
            fetch(`https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=${args[0]}`, { method: "GET" })
               .then(res => res.json())
               .then(async data2 => {
                  var covid = data1[data1.length - 1]
                  var countryName = data2.data.rows[0].country
                  var flag = data2.data.rows[0].flag
                  var embed = new EmbedBuilder()
                     .setAuthor({ name: msg.author.username, iconURL: msg.author.displayAvatarURL() })
                     .setThumbnail(flag)
                     .setTitle(`Informe de COVID-19 en ${countryName}`)
                     .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
                     .addFields({ name: 'Confirmados', value: `${covid.Confirmed}`, inline: true },
                        { name: 'Muertes', value: `${covid.Deaths}`, inline: true },
                        { name: 'Recuperados', value: `${covid.Recovered}`, inline: true },
                        { name: 'Activos', value: `${covid.Active}`, inline: true })
                     .setTimestamp(new Date(covid.Date))
                  msg.channel.send({ embeds: [embed] })
               })
         })
   }
}
