const { createCanvas, loadImage, registerFont } = require('canvas');
registerFont('./utility/fonts/JushleyShine.otf', { family: 'Cute Fonts' });
const canvas = createCanvas(1920, 540);
const ctx = canvas.getContext('2d');

module.exports = async (sela, member) => {
   channel = sela.channels.get('606551048362131467');
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let name = member.user.username;
   let avatar = member.user.displayAvatarURL;
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
         loadImage(member.guild.owner.user.displayAvatarURL)
         .then(owner => {
            ctx.drawImage(owner, 25, 415, 100, 100);
            ctx.font = '55px "Cute Fonts"';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'start';
            ctx.fillText(`Owner:\n${member.guild.owner.user.tag}`, 150, 444);
            ctx.font = '80px "Cute Fonts"';
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'start';
            ctx.fillText(`¡Bienvenid@ a\n${member.guild.name}!`, canvas.width/32, canvas.height/4);
            channel.send(`${member} <3`, {
               files: [{
                  attachment: canvas.toBuffer(),
                  name: 'dequiswelcome.png'
               }]
            });
         });
      });
   });
}