const { Attachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(3000, 1500);
const ctx = canvas.getContext('2d');
const { prefix } = require('../utility/config.json');
const getMember = require('../utility/getMember');

module.exports = {
   name: 'match',
   alias: '',
   usage: `${prefix}match [@miembro] [@miembro]`,
   cat: 'Diversión',
   perms: [],
   desc: `Haz match con cualquier miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!args[0]) {
         var me = msg.author.username;
         var meA = msg.member.nickname || me;
         var rnd = msg.guild.members.random();
         var match = rnd.user.username;
         var matchA = rnd.nickname || match;
         loadImage(msg.author.displayAvatarURL)
         .then(img1 => {
            ctx.drawImage(img1, 0, 0, 1500, 1500);
            loadImage(rnd.user.displayAvatarURL)
            .then(async img2 => {
               ctx.drawImage(img2, 1500, 0, 1500, 1500);
               var matchName1 = `${me.slice(0, me.length/2)}${match.slice(match.length/2)}`;
               var matchName2 = `${meA.slice(0, meA.length/2)}${matchA.slice(matchA.length/2)}`;
               var emotes = [
                  '<a:love1:687056905100984494>',
                  '<a:love2:687056904815771821>',
                  '<a:love3:687056903737573439>',
                  '<a:love4:687056904312455323>',
                  '<a:love5:687056904370782284>',
                  '<a:love6:687056904199209041>'
               ];
               var idx = Math.floor(Math.random() * emotes.length);
               await msg.channel.send('**'+matchName1+'** | **'+matchName2+'**');
                  await msg.channel.send(emotes[idx], {
                     files: [{
                        attachment: canvas.toBuffer(),
                        name: `${matchName1}.png`
                     }]
                  });
                  return;
               if (meA == me && matchA == match) {
                  await msg.channel.send('**'+matchName1+'**');
                  await msg.channel.send(emotes[idx], {
                     files: new Attachment(canvas.toBuffer())
                  });
                  return;
               } else {
                  await msg.channel.send('**'+matchName1+'** | **'+matchName2+'**');
                  await msg.channel.send(emotes[idx], {
                     files: new Attachment(canvas.toBuffer())
                  });
               }
            });
         });
         return;
      }
      if (!args[1]) {
         return;
      }

   }
}