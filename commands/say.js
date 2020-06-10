const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');
const tts = require('google-tts-api');
const { es } = require('../badwords.json');

module.exports = {
   name: 'say',
   alias: 's',
   usage: `${prefix}say <texto>`,
   cat: 'Utilidad, TTS',
   perms: [],
   desc: `Puedes hacerme escribir un mensaje por ti o decir algo por voz. (Sé gentil)`,
   run: async (sela, msg, args) => {
      if (!args[0]) {
         msg.channel.send('Debes escribir algún texto.');
         return;
      }
      var lowes = es.map(word => word.toLowerCase());
      var lowargs = args.map(word => word.toLowerCase());
      for (j = 0; j < lowes.length; j++) {
         if (lowargs.includes(lowes[j])) {
            msg.channel.send('No quiero decir eso...');
            return;
         }
      }
      var text = args.slice(0).join(' ');
      if ((!msg.member.voiceChannel && !msg.guild.me.voiceChannel) ||
      (msg.member.voiceChannel !== msg.guild.me.voiceChannel)) {
         msg.delete();
         msg.channel.send(text);
         return;
      }
      tts(text+'⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀'+
      '⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀', 'es', 1.6)
      .then(voice => {
         msg.member.voiceChannel.join()
         .then(c => {
            if (c.speaking) return;
            msg.delete();
            c.playArbitraryInput(voice);
            msg.channel.send(new RichEmbed()
            .setAuthor(msg.member.nickname || msg.author.username, msg.author.displayAvatarURL)
            .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
            .setDescription(text));
         }).catch(() => {
            msg.channel.send('perdon');
         });
      }).catch(() => {
         tts('Mucho texto.', 'es', 1.6)
         .then(voice => {
            msg.member.voiceChannel.join()
            .then(c => {
               c.playArbitraryInput(voice);
               msg.delete();
               msg.channel.send('Mucho texto.');
            });
         });
      });
   }
}

function isInArray(value, array) {
   return array.indexOf(value) > -1;
}