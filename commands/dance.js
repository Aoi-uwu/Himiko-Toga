const { MessageEmbed } = require('discord.js');
const { prefix, api } = require('../utility/config.json');
const fetch = require('node-fetch');

module.exports = {
   name: 'dance',
   alias: 'dancing',
   usage: `${prefix}dance`,
   cat: 'Acción',
   perms: [],
   desc: `Pues... El mismo nombre lo indica.`,
   run: async (sela, msg, args) => {
      fetch(`https://api.tenor.com/v1/search?q=anime%20dance&`+
      `limit=10&key=${api.tenor}`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
         var img = data.results[Math.floor(Math.random() *
            data.results.length)].media[0].gif.url;
         var color = msg.member.displayHexColor === '#000000' ?
         '#F593EA' : [msg.member.displayHexColor, '#F593EA'][
            Math.floor(Math.random() * 2)
         ];
         const embed = new MessageEmbed()
         .setAuthor(`${msg.author.username} está bailando.`,
            msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
         .setImage(img)
         .setColor(color);
         msg.channel.send(embed);
      });
   }
}