const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
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
      if (!args[0])
         return msg.channel.send('Debes escribir algo.');
      var lowes = es.map(word => word.toLowerCase());
      var lowargs = args.map(word => word.toLowerCase());
      for (i = 0; i < lowes.length; i++) {
         if (lowargs.includes(lowes[i]))
            return msg.channel.send('No quiero decir eso...');
      }
      var text = args.slice(0).join(' ');
      if ((!msg.member.voice.channel && !msg.guild.me.voice.channel) ||
      (msg.member.voice.channel !== msg.guild.me.voice.channel)) {
         msg.delete();
         return msg.channel.send(text);
      }
      tts(text, 'es', 1.6)
      .then(voice => msg.member.voice.channel.join()
      .then(c => {
         msg.delete();
         c.play(voice);
         msg.channel.send(new MessageEmbed()
         .setAuthor(msg.author.username, msg.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }))
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .setDescription(text));
      }).catch(e => {
         msg.channel.send('perdon');
      })).catch(e => {
         tts('Mucho texto.', 'es', 1.6)
         .then(voice => {
            msg.member.voice.channel.join()
            .then(c => {
               c.play(voice);
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