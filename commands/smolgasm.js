const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const fetch = require('node-fetch');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'smolgasm',
   alias: 'sgasm',
   usage: `${prefix}smolgasm`,
   cat: 'NSFW',
   perms: [],
   desc: `El nombre es bastante claro.`,
   run: async (sela, msg, args) => {
      if (!msg.channel.nsfw)
         return msg.channel.send('Este comando sólo lo puedes usar en canales NSFW.');
      await fetch(`https://nekos.life/api/v2/img/gasm`, { method: "GET" })
      .then(res => res.json())
      .then(async data => {
         // embed = new RichEmbed()
         // .setAuthor('Enlace a la imagen', '', data.url)
         // .setColor(msg.member.displayHexColor == '#000000' ? rndColor() : msg.member.displayHexColor)
         // .setImage(data.url)
         // .setFooter(`Pedido por ${msg.author.username}`, msg.author.displayAvatarURL);
         await msg.channel.send('\💕', { file: data.url });
         // await m.edit(embed);
      });
   }
}