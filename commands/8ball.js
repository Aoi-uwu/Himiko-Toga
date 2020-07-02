const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: '8ball',
   alias: '8b',
   usage: `${prefix}8ball <pregunta sí/no>`,
   cat: 'Diversión',
   perms: [],
   desc: `Hazme preguntas. (Deben ser respuestas de sí/no, para que tenga sentido)`,
   run: async (sela, msg, args) => {
      if (!args[0])
         return msg.channel.send('Debes hacer ');
   }
}