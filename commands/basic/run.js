const { MessageEmbed } = require('discord.js');
const { prefix, api } = require('../../config');
const fetch = require('node-fetch');

module.exports = {
   name: 'run',
   alias: '',
   usage: `${prefix}run`,
   cat: 'Acción',
   perms: [],
   desc: `Pues... El mismo nombre lo indica.`,
   run: async (sela, msg, args) => {
      fetch(`https://api.tenor.com/v1/search?q=anime%20run&`+
      `limit=10&key=${api.tenor}`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
         var img = data.results[Math.floor(Math.random() *
            data.results.length)].media[0].gif.url;
         var color = msg.member.displayHexColor === '#000000' ?
         '#CC5151' : [msg.member.displayHexColor, '#CC5151'][
            Math.floor(Math.random() * 2)
         ];
         const embed = new MessageEmbed()
         .setAuthor(`${msg.author.username} está corriendo.`,
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