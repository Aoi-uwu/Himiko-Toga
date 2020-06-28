const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');
const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./utility/fonts/JushleyShine.otf', { family: 'Cute Fonts' });
const canvas = createCanvas(1920, 540);
const ctx = canvas.getContext('2d');

module.exports = {
   name: 'test',
   alias: 'dequisde',
   usage: `${prefix}test`,
   cat: 'dequisde',
   perms: ['dequisde'],
   desc: `dequisde`,
   run: async (sela, msg, args) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let name = msg.author.username;
      let avatar = msg.author.displayAvatarURL;
      await loadImage(avatar)
      .then(av => {
         ctx.drawImage(av, 780, 25, 357, 357);
         loadImage('https://i.imgur.com/OOusLeF.png')
         .then(banner => {
            ctx.drawImage(banner, 0, 0, 1920, 540);
            ctx.font = '111px "Cute Fonts"';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.fillText(name, canvas.width/2, 500);
            loadImage(msg.guild.owner.user.displayAvatarURL)
            .then(owner => {
               ctx.drawImage(owner, 25, 415, 100, 100);
               ctx.font = '55px "Cute Fonts"';
               ctx.fillStyle = '#FFFFFF';
               ctx.textAlign = 'start';
               ctx.fillText(`Owner:\n${msg.guild.owner.user.tag}`, 150, 444);
               ctx.font = '80px "Cute Fonts"';
               ctx.fillStyle = '#FFFFFF';
               ctx.textAlign = 'start';
               ctx.fillText(`¡Bienvenid@ a\n${msg.guild.name}!`, canvas.width/32, canvas.height/4);
               msg.channel.send({
                  files: [{
                     attachment: canvas.toBuffer(),
                     name: 'dequisde.png'
                  }]
               });
            });
         });
      });
   }
}