const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');
const fetch = require('node-fetch');
module.exports = {
   name: 'covid',
   alias: 'corona',
   usage: `${prefix}covid <país>`,
   cat: 'Información',
   perms: [],
   desc: `Mira la cantidad de infectados por Covid-19 en el país que especifiques. ¡Cuídate!`,
   run: async (sela, msg, args) => {
      if (!args[0]) return msg.channel.send('Coloca el país que deseas buscar.');
      var country = args[0];
      await fetch(`https://api.covid19api.com/country/${country}`, { method: "GET" })
         .then(res => res.json())
         .then(async data1 => {
            fetch(`https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=${args[0]}`, { method: "GET" })
            .then(res => res.json())
            .then(async data2 => {
            var covid = data1[data1.length-1];
            var countryName = data2.data.rows[0].country;
            var flag = data2.data.rows[0].flag;
            var embed = new MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL())
            .setThumbnail(flag)
            .setTitle(`Informe de COVID-19 en ${countryName}`)
            .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
            .addField('Confirmados', covid.Confirmed, true)
            .addField('Muertes', covid.Deaths, true)
            .addField('Recuperados', covid.Recovered, true)
            .addField('Activos', covid.Active, true)
            .setTimestamp(covid.Date);
            msg.channel.send(embed);
            });
         });
   }
}
