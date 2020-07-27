const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'bonk',
   alias: '',
   usage: `${prefix}bonk <@miembro>`,
   cat: 'Interacción',
   perms: [],
   desc: `Bonk. >:c`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes mencionar a quien quieres bonkear.');
      var member = msg.mentions.members.first();
      if (!member)
         return msg.channel.send('Parece que no has mencionado a un miembro.');
      var bonk = ['https://i.kym-cdn.com/entries/icons/facebook/000/033/758/Screen_Shot_2020-04-28_at_12.21.48_PM.jpg',
      'https://staticdelivery.nexusmods.com/mods/1151/images/thumbnails/45470/45470-1591231144-923308353.jpeg',
      'https://i.redd.it/wv16ryuhry841.png'];
      msg.channel.send(new MessageEmbed()
      .setAuthor(`${msg.author.username}: Bonk`, msg.author.displayAvatarURL())
      .setImage(bonk[Math.floor(Math.random() * bonk.length)])
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
      .setFooter(`${member.user.username}: ouch`, member.user.displayAvatarURL()));
   }
}