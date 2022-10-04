const { EmbedBuilder } = require('discord.js');
const { prefix } = require('../config');
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
         return msg.channel.send('Debes hacer alguna pregunta que pueda contestar con Sí/No.');
      var question = args.slice(0).join(' ');
      var answers = [
         'Sí.', 'No.', 'A saber.', 'Yes.',
         'I guess (?', 'No, no, no.', 'Creo que no.',
         'Totalmente.', 'No estoy segura.'
      ];
      msg.channel.send({
         embeds: [
            new EmbedBuilder()
               .setAuthor({
                  name: msg.author.username, iconURL: msg.author.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  })
               })
               .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
               .addFields({ name: 'Pregunta', value: question }, { name: 'Respuesta', value: answers[Math.floor(Math.random() * answers.length)] })
               .setFooter({
                  text: sela.user.username, iconURL: sela.user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  })
               })
         ]
      });
   }
}