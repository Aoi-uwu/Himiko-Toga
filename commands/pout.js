const { MessageEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'pout',
   alias: 'baka',
   usage: `${prefix}baka`,
   cat: 'Expresión',
   perms: [],
   desc: `Baka. <:hmph:733118298107150346>`,
   run: async (sela, msg, args) => {
      await fetch(`https://nekos.life/api/v2/img/baka`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
         embed = new MessageEmbed()
         .setAuthor(`${msg.author.username} está haciendo pucheros.`,
         msg.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }))
         .setColor(msg.member.displayHexColor == '#000000' ? rndColor() : msg.member.displayHexColor)
         .setImage(data.url);
         msg.channel.send(embed);
      });
   }
}