const { RichEmbed, Attachment } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'emoji',
   alias: 'e',
   usage: `${prefix}emoji <emote personalizado> [-noem]`,
   cat: 'Utilidad',
   perms: [],
   desc: `Obtén un emote más grande.`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes colocar un emote personalizado.');
      var e = args[0]; var em = e.slice(e.indexOf(':')+1);
      var name = em.slice(0, em.indexOf(':')); var id = e.substr(e.indexOf('>')-18, 18);
      var emote = `https://cdn.discordapp.com/emojis/${id}.${e.startsWith('<a:') ? 'gif' : 'png'}`;
      if (args[1] === '-noem')
         return msg.channel.send(new Attachment(emote));
      msg.channel.send(new RichEmbed()
      .setDescription(`[${name}](${emote})`)
      .setImage(emote)
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
   }
}