const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config');
const rndColor = require('../../utility/rndColor');

module.exports = {
   name: 'vc',
   alias: '',
   usage: `${prefix}vc [leave]`,
   cat: 'TTS',
   perms: ['CONNECT'],
   desc: `Invítame al VC donde te encuentres.`,
   run: async (sela, msg, args) => {
      if (!args[0] || args[0] != 'leave') {
         if (!msg.member.voice.channel)
            return msg.channel.send('No estás en ningún canal de voz.');
         if (msg.guild.me.voice.channel && msg.member.voice.channel !== msg.guild.me.voice.channel)
            return msg.channel.send('Perdona, ya me encuentro en otro canal de voz.');
         if (msg.guild.me.voice.channel && msg.member.voice.channel === msg.guild.me.voice.channel)
            return msg.channel.send('Ya estoy contigo en el mismo canal de voz...');
         try {
            msg.member.voice.channel.join()
            .then(con => msg.channel.send('¡Listo!'));
         } catch (e) {
            msg.channel.send('No me pude conectar, probablemente no tengo permisos para unirme al VC.');
         }
         return;
      }
      if (args[0] === 'leave') {
         if (!msg.member.voice.channel)
            return msg.channel.send('No estás en ningún canal de voz.');
         if (!msg.guild.me.voice.channel)
            return msg.channel.send('No estoy en ningún canal de voz...');
         if (msg.member.voice.channel !== msg.guild.me.voice.channel)
            return msg.channel.send('No estoy en el mismo canal de voz que tú.')
         try {
            msg.member.voice.channel.leave();
            msg.channel.send('Bye, bye.');
         } catch (e) {
            msg.channel.send('Ehm... No sé qué ocurrió, pero no pude desconectarme.\n'+
            'Inténtalo de nuevo o desconéctame manualmente.');
         }
      }
   }
}