const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');
const tts = require('google-tts-api');

module.exports = {
   name: 'say',
   alias: 's',
   usage: `${prefix}say <texto>`,
   cat: 'Utilidad, TTS',
   perms: [],
   desc: `Puedes hacerme excribir un mensaje por ti o decir algo por voz. (Sé gentil)`,
   run: async (sela, msg, args) => {
      if (!args[0]) {
         msg.channel.send('Debes escribir algún texto.');
         return;
      }
      var text = args.slice(0).join(' ');
      if ((!msg.member.voiceChannel && !msg.guild.me.voiceChannel) ||
      (msg.member.voiceChannel !== msg.guild.me.voiceChannel)) {
         msg.delete();
         msg.channel.send(text);
         return;
      }
      tts(text, 'es', 1.6)
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
            msg.channel.send('Mucho texto.');
         });
      })
   }
}