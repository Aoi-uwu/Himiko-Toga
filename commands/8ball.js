const { MessageEmbed } = require('discord.js');
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
         'Sí.', 'No.', 'A saber.', '<:TogaShrug:728672143310585856>',
         'I guess (?', '<a:yes:728672934918619136>', '<a:no:728674436168941608>',
         '<a:yesyes:728674436655611904>', '<a:nono:728674435732734014>'
      ];
      msg.channel.send(new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
      .addField('Pregunta', question)
      .addField('Respuesta', answers[Math.floor(Math.random() * answers.length)])
      .setFooter(sela.user.username, sela.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      })));
   }
}