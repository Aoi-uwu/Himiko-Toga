/*const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(3000, 1500);
const ctx = canvas.getContext('2d');*/
const { prefix } = require('../config');

module.exports = {
   name: 'match',
   alias: '',
   usage: `${prefix}match [@miembro] [@miembro]`,
   cat: 'Diversión',
   perms: [],
   desc: `Haz match con cualquier miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!args[0]) {
         let me = msg.author.username;
         let meA = msg.member.nickname || me;
         let rnd = msg.guild.members.cache.filter(m => m.id !== msg.author.id).random();
         let match = rnd.user.username;
         let matchA = rnd.nickname || match;
         loadImage(msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .then(img1 => {
            ctx.drawImage(img1, 0, 0, 1500, 1500);
            loadImage(rnd.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
            .then(async img2 => {
               ctx.drawImage(img2, 1500, 0, 1500, 1500);
               let matchName1 = `${me.slice(0, me.length/2)}${match.slice(match.length/2)}`;
               let matchName2 = `${meA.slice(0, meA.length/2)}${matchA.slice(matchA.length/2)}`;
               let emotes = [
                  '<a:love1:687056905100984494>',
                  '<a:love2:687056904815771821>',
                  '<a:love3:687056903737573439>',
                  '<a:love4:687056904312455323>',
                  '<a:love5:687056904370782284>',
                  '<a:love6:687056904199209041>'
               ];
               let idx = Math.floor(Math.random() * emotes.length);
               if ((meA == me && matchA == match) ||
               (meA == me && matchA != match) ||
               (meA != me && matchA == match)) {
                  await msg.channel.send(`**${matchName1}** ${emotes[idx]}`, {
                     files: [{
                        attachment: canvas.toBuffer(),
                        name: `${matchName1}.png`
                     }]
                  });
                  return;
               } else {
                  await msg.channel.send(`**${matchName1}** | **${matchName2}** ${emotes[idx]}`, {
                     files: [{
                        attachment: canvas.toBuffer(),
                        name: `${matchName1}.png`
                     }]
                  });
               }
            });
         });
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         return;
      }
      var member1 = msg.mentions.members.first();
      var member2 = msg.mentions.members.filter(m => m !== member1).first();
      if (!member2) {
         let me = msg.author.username;
         let meA = msg.member.nickname || me;
         let match = member1.user.username;
         let matchA = member1.nickname || match;
         loadImage(msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .then(img1 => {
            ctx.drawImage(img1, 0, 0, 1500, 1500);
            loadImage(member1.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
            .then(async img2 => {
               ctx.drawImage(img2, 1500, 0, 1500, 1500);
               let matchName1 = `${me.slice(0, me.length/2)}${match.slice(match.length/2)}`;
               let matchName2 = `${meA.slice(0, meA.length/2)}${matchA.slice(matchA.length/2)}`;
               let emotes = [
                  '<a:love1:687056905100984494>',
                  '<a:love2:687056904815771821>',
                  '<a:love3:687056903737573439>',
                  '<a:love4:687056904312455323>',
                  '<a:love5:687056904370782284>',
                  '<a:love6:687056904199209041>'
               ];
               let idx = Math.floor(Math.random() * emotes.length);
               if ((meA == me && matchA == match) ||
               (meA == me && matchA != match) ||
               (meA != me && matchA == match)) {
                  await msg.channel.send(`**${matchName1}** ${emotes[idx]}`, {
                     files: [{
                        attachment: canvas.toBuffer(),
                        name: `${matchName1}.png`
                     }]
                  });
                  return;
               } else {
                  await msg.channel.send(`**${matchName1}** | **${matchName2}** ${emotes[idx]}`, {
                     files: [{
                        attachment: canvas.toBuffer(),
                        name: `${matchName1}.png`
                     }]
                  });
               }
            });
         });
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         return;
      }
      let me = member1.user.username;
      let meA = member1.nickname || me;
      let match = member2.user.username;
      let matchA = member2.nickname || match;
      loadImage(member1.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .then(img1 => {
         ctx.drawImage(img1, 0, 0, 1500, 1500);
         loadImage(member2.user.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .then(async img2 => {
            ctx.drawImage(img2, 1500, 0, 1500, 1500);
            let matchName1 = `${me.slice(0, me.length/2)}${match.slice(match.length/2)}`;
            let matchName2 = `${meA.slice(0, meA.length/2)}${matchA.slice(matchA.length/2)}`;
            let emotes = [
               '<a:love1:687056905100984494>',
               '<a:love2:687056904815771821>',
               '<a:love3:687056903737573439>',
               '<a:love4:687056904312455323>',
               '<a:love5:687056904370782284>',
               '<a:love6:687056904199209041>'
            ];
            let idx = Math.floor(Math.random() * emotes.length);
            if ((meA == me && matchA == match) ||
            (meA == me && matchA != match) ||
            (meA != me && matchA == match)) {
               await msg.channel.send(`**${matchName1}** ${emotes[idx]}`, {
                  files: [{
                     attachment: canvas.toBuffer(),
                     name: `${matchName1}.png`
                  }]
               });
               return;
            } else {
               await msg.channel.send(`**${matchName1}** | **${matchName2}** ${emotes[idx]}`, {
                  files: [{
                     attachment: canvas.toBuffer(),
                     name: `${matchName1}.png`
                  }]
               });
            }
         });
      });
      ctx.clearRect(0, 0, canvas.width, canvas.height);
   }
}
