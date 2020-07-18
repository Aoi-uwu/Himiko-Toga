const { MessageEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');
// const db = require('quick.db');

module.exports = {
   name: 'ttt',
   alias: '',
   usage: `${prefix}ttt [@miembro]`,
   cat: 'Juegos',
   perms: [],
   desc: `Juega Tic-Tac-Toe (Xs & Os) conmigo o con algún miembro.`,
   run: async (sela, msg, args) => {
      if (args[0] == '-hard') {
         var ttt = '1️⃣2️⃣3️⃣\n'+
         '4️⃣5️⃣6️⃣\n'+
         '7️⃣8️⃣9️⃣\n';
         var ettt = new MessageEmbed()
         .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
         .setTitle('Tu turno')
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .setDescription(ttt);
         msg.channel.send(ettt)
         .then(async game => {
            const f1 = m => !isNaN(m) && m.author == msg.author;
            const c1 = msg.channel.createMessageCollector(f1, { max: 1 });
            c1.once('collect', async user1 => {
               user1.delete();
               var ttt2 = ttt.replace(numToEmote(user1), '❌');
               game.edit(ettt.setDescription(ttt2));
               var bot1;
               setTimeout(() => {
                  game.edit(ettt
                  .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                  .setTitle('Mi turno')
                  .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
               setTimeout(() => {
                  bot1 = user1 == 1 || user1 == 3 || user1 == 7 || user1 == 9 ? 5 :
                  user1 == 2 ? 9 : user1 == 4 ? 3 : user1 == 6 ? 7 : user1 == 8 ? 1 : 3;
                  var ttt3 = ttt2.replace(numToEmote(bot1), '⭕');
                  game.edit(ettt.setDescription(ttt3));
                  const f2 = m => !isNaN(m) && (m != user1 || m != bot1) && m.author == msg.author;
                  const c2 = msg.channel.createMessageCollector(f2, { max: 1 });
                  setTimeout(() => {
                     game.edit(ettt
                     .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                     .setTitle('Tu turno')
                     .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                  c2.once('collect', async user2 => {
                     user2.delete();
                     var ttt4 = ttt3.replace(numToEmote(user2), '❌');
                     game.edit(ettt.setDescription(ttt4));
                     var bot2;
                     setTimeout(() => {
                        game.edit(ettt
                        .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                        .setTitle('Mi turno')
                        .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
                     setTimeout(() => {
                        bot2 = (user1 == 1 && user2 == 9 && bot1 == 5) || (user1 == 9 && user2 == 1 && bot1 == 5) ? 6 :
                        (user1 == 3 && user2 == 7 && bot1 == 5) || (user1 == 7 && user2 == 3 && bot1 == 5) ? 2 :
                        (user1 == 1 && user2 == 7 && bot1 == 5) || (user1 == 7 && user2 == 1 && bot1 == 5) ? 4 :
                        (user1 == 1 && user2 == 3 && bot1 == 5) || (user1 == 3 && user2 == 1 && bot1 == 5) ? 2 :
                        (user1 == 7 && user2 == 9 && bot1 == 5) || (user1 == 9 && user2 == 7 && bot1 == 5) ? 8 :
                        (user1 == 3 && user2 == 9 && bot1 == 5) || (user1 == 9 && user2 == 3 && bot1 == 5) ? 6 :
                        (user1 == 1 && user2 == 2 && bot1 == 5) ? 3 : (user1 == 1 && user2 == 4 && bot1 == 5) ? 7 :
                        (user1 == 7 && user2 == 4 && bot1 == 5) ? 1 : (user1 == 7 && user2 == 8 && bot1 == 5) ? 9 :
                        (user1 == 9 && user2 == 8 && bot1 == 5) ? 7 : (user1 == 9 && user2 == 6 && bot1 == 5) ? 3 :
                        (user1 == 3 && user2 == 6 && bot1 == 5) ? 9 : (user1 == 3 && user2 == 2 && bot1 == 5) ? 1 :
                        (user1 == 1 && user2 == 6 && bot1 == 5) ? 3 : (user1 == 1 && user2 == 8 && bot1 == 5) ? 7 :
                        (user1 == 3 && user2 == 4 && bot1 == 5) ? 1 : (user1 == 3 && user2 == 8 && bot1 == 5) ? 9 :
                        (user1 == 7 && user2 == 6 && bot1 == 5) ? 9 : (user1 == 7 && user2 == 2 && bot1 == 5) ? 1 :
                        (user1 == 9 && user2 == 4 && bot1 == 5) ? 7 : (user1 == 9 && user2 == 2 && bot1 == 5) ? 3 :
                        (user1 == 2 && user2 == 4 && bot1 == 9) ? 7 : (user1 == 2 && user2 == 8 && bot1 == 9) ? 5 :
                        (user1 == 2 && user2 == 1 && bot1 == 9) ? 3 : (user1 == 2 && user2 == 7 && bot1 == 9) ? 3 :
                        /*Pierde*/(user1 == 2 && user2 == 3 && bot1 == 9) ? 1 : (user1 == 2 && user2 == 6 && bot1 == 9) ? 7 :
                        (user1 == 4 && user2 == 8 && bot1 == 3) ? 9 : (user1 == 4 && user2 == 6 && bot1 == 3) ? 5 :
                        (user1 == 4 && user2 == 7 && bot1 == 3) ? 1 : (user1 == 4 && user2 == 9 && bot1 == 3) ? 1 :
                        /*Pierde*/(user1 == 4 && user2 == 1 && bot1 == 3) ? 7 : (user1 == 4 && user2 == 2 && bot1 == 3) ? 9 :
                        (user1 == 6 && user2 == 2 && bot1 == 1) ? 7 : (user1 == 6 && user2 == 4 && bot1 == 1) ? 5 :
                        (user1 == 6 && user2 == 9 && bot1 == 1) ? 3 : (user1 == 6 && user2 == 7 && bot1 == 1) ? 3 :
                        /*Pierde*/(user1 == 6 && user2 == 3 && bot1 == 1) ? 9 : (user1 == 6 && user2 == 8 && bot1 == 1) ? 7 :
                        // Continue here
                        game.edit(ettt.setDescription(ttt5));
                        const f3 = m => !isNaN(m) && (m != user1 || m != bot1 || m != user2 ||
                        m != bot2) && m.author == msg.author;
                        const c3 = msg.channel.createMessageCollector(f3, { max: 1 });
                        setTimeout(() => {
                           game.edit(ettt
                           .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                           .setTitle('Tu turno')
                           .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                        c3.once('collect', async user3 => {
                           user3.delete();
                           var ttt6 = ttt5.replace(numToEmote(user3), '❌');
                           game.edit(ettt.setDescription(ttt6));
                           var check1 = ttt6.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                           .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                           .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                           .replace(/9️⃣/g, 9);
                           if (check1.includes('❌❌❌') || (check1.indexOf('❌') == 0 && check1.indexOf('❌', 1) == 4 &&
                           check1.lastIndexOf('❌') == 8) || (check1.indexOf('❌') == 1 && check1.indexOf('❌', 2) == 5 &&
                           check1.lastIndexOf('❌') == 9) || (check1.indexOf('❌') == 2 && check1.indexOf('❌', 3) == 6 &&
                           check1.lastIndexOf('❌') == 10) || (check1.indexOf('❌') == 0 && check1.indexOf('❌', 1) == 5 &&
                           check1.lastIndexOf('❌') == 10) || (check1.indexOf('❌') == 2 && check1.indexOf('❌', 3) == 5 &&
                           check1.lastIndexOf('❌') == 8)) {
                              msg.channel.send(`${msg.author}, ¡ganaste!`);
                              return;
                           } else {
                              var bot3;
                              setTimeout(() => {
                                 game.edit(ettt
                                 .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                 .setTitle('Mi turno')
                                 .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
                              setTimeout(() => {
                                 do {
                                    bot3 = Math.floor(Math.random() * 9);
                                 } while (bot3 == user1 || bot3 == bot1 || bot3 == user2 ||
                                 bot3 == bot2 || bot3 == user3);
                                 var ttt7 = ttt6.replace(numToEmote(bot3), '⭕');
                                 game.edit(ettt.setDescription(ttt7));
                                 var check2 = ttt7.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                 .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                 .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                 .replace(/9️⃣/g, 9);
                                 if (check2.includes('⭕⭕⭕') || (check2.indexOf('⭕') == 0 && check2.indexOf('⭕', 1) == 4 &&
                                 check2.lastIndexOf('⭕') == 8) || (check2.indexOf('⭕') == 1 && check2.indexOf('⭕', 2) == 5 &&
                                 check2.lastIndexOf('⭕') == 9) || (check2.indexOf('⭕') == 2 && check2.indexOf('⭕', 3) == 6 &&
                                 check2.lastIndexOf('⭕') == 10) || (check2.indexOf('⭕') == 0 && check2.indexOf('⭕', 1) == 5 &&
                                 check2.lastIndexOf('⭕') == 10) || (check2.indexOf('⭕') == 2 && check2.indexOf('⭕', 3) == 5 &&
                                 check2.lastIndexOf('⭕') == 8)) {
                                    msg.channel.send(`¡Gané! >w<`);
                                    return;
                                 } else {
                                    const f4 = m => !isNaN(m) && (m != user1 || m != bot1 || m != user2 ||
                                    m != bot2 || m != user3 || m != bot3) && m.author == msg.author;
                                    const c4 = msg.channel.createMessageCollector(f4, { max: 1 });
                                    setTimeout(() => {
                                       game.edit(ettt
                                       .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                       .setTitle('Tu turno')
                                       .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                                    c4.once('collect', async user4 => {
                                       user4.delete();
                                       var ttt8 = ttt7.replace(numToEmote(user4), '❌');
                                       game.edit(ettt.setDescription(ttt8));
                                       var check3 = ttt8.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                       .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                       .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                       .replace(/9️⃣/g, 9);
                                       if (check3.includes('❌❌❌') || (check3.indexOf('❌') == 0 && check3.indexOf('❌', 1) == 4 &&
                                       check3.lastIndexOf('❌') == 8) || (check3.indexOf('❌') == 1 && check3.indexOf('❌', 2) == 5 &&
                                       check3.lastIndexOf('❌') == 9) || (check3.indexOf('❌') == 2 && check3.indexOf('❌', 3) == 6 &&
                                       check3.lastIndexOf('❌') == 10) || (check3.indexOf('❌') == 0 && check3.indexOf('❌', 1) == 5 &&
                                       check3.lastIndexOf('❌') == 10) || (check3.indexOf('❌') == 2 && check3.indexOf('❌', 3) == 5 &&
                                       check3.lastIndexOf('❌') == 8)) {
                                          msg.channel.send(`${msg.author}, ¡ganaste!`);
                                          return;
                                       } else {
                                          var bot4;
                                          setTimeout(() => {
                                             game.edit(ettt
                                             .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                             .setTitle('Mi turno')
                                             .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
                                          setTimeout(() => {
                                             do {
                                                bot4 = Math.floor(Math.random() * 9);
                                             } while (bot4 == user1 || bot4 == bot1 || bot4 == user2 ||
                                             bot4 == bot2 || bot4 == user3 || bot4 == bot3 || bot4 == user4);
                                             var ttt9 = ttt8.replace(numToEmote(bot4), '⭕');
                                             game.edit(ettt.setDescription(ttt9));
                                             var check4 = ttt9.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                             .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                             .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                             .replace(/9️⃣/g, 9);
                                             if (check4.includes('⭕⭕⭕') || (check4.indexOf('⭕') == 0 && check4.indexOf('⭕', 1) == 4 &&
                                             check4.lastIndexOf('⭕') == 8) || (check4.indexOf('⭕') == 1 && check4.indexOf('⭕', 2) == 5 &&
                                             check4.lastIndexOf('⭕') == 9) || (check4.indexOf('⭕') == 2 && check4.indexOf('⭕', 3) == 6 &&
                                             check4.lastIndexOf('⭕') == 10) || (check4.indexOf('⭕') == 0 && check4.indexOf('⭕', 1) == 5 &&
                                             check4.lastIndexOf('⭕') == 10) || (check4.indexOf('⭕') == 2 && check4.indexOf('⭕', 3) == 5 &&
                                             check4.lastIndexOf('⭕') == 8)) {
                                                msg.channel.send(`¡Gané! >w<`);
                                                return;
                                             } else {
                                                const f5 = m => !isNaN(m) && (m != user1 || m != bot1 || m != user2 ||
                                                m != bot2 || m != user3 || m != bot3 || m!= user4 || m != bot4) &&
                                                m.author == msg.author;
                                                const c5 = msg.channel.createMessageCollector(f5, { max: 1 });
                                                setTimeout(() => {
                                                   game.edit(ettt
                                                   .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                                   .setTitle('Tu turno')
                                                   .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                                                c5.once('collect', async user5 => {
                                                   user5.delete();
                                                   var ttt10 = ttt9.replace(numToEmote(user5), '❌');
                                                   game.edit(ettt.setDescription(ttt10));
                                                   var check5 = ttt10.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                                   .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                                   .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                                   .replace(/9️⃣/g, 9);
                                                   if (check5.includes('❌❌❌') || (check5.indexOf('❌') == 0 && check5.indexOf('❌', 1) == 4 &&
                                                   check5.lastIndexOf('❌') == 8) || (check5.indexOf('❌') == 1 && check5.indexOf('❌', 2) == 5 &&
                                                   check5.lastIndexOf('❌') == 9) || (check5.indexOf('❌') == 2 && check5.indexOf('❌', 3) == 6 &&
                                                   check5.lastIndexOf('❌') == 10) || (check5.indexOf('❌') == 0 && check5.indexOf('❌', 1) == 5 &&
                                                   check5.lastIndexOf('❌') == 10) || (check5.indexOf('❌') == 2 && check5.indexOf('❌', 2) == 5 &&
                                                   check5.lastIndexOf('❌') == 8)) {
                                                      msg.channel.send(`${msg.author}, ¡ganaste!`);
                                                      return;
                                                   } else {
                                                      return msg.channel.send('¡Empate!');
                                                   }
                                                });
                                                }, 2000);
                                             }
                                          }, 2000);
                                          }, 2000);
                                       }
                                    });
                                    }, 2000);
                                 }
                              }, 2000);
                              }, 2000);
                           }
                        });
                        }, 2000);
                     }, 2000);
                     }, 2000);
                  });
                  }, 2000);
               }, 2000);
               }, 2000);
            });
         });
         return;
      }
      let start = Math.floor(Math.random() * 2);
      if (start = 1) {
         var ttt = '1️⃣2️⃣3️⃣\n'+
         '4️⃣5️⃣6️⃣\n'+
         '7️⃣8️⃣9️⃣\n';
         var ettt = new MessageEmbed()
         .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
         .setTitle('Tu turno')
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .setDescription(ttt);
         msg.channel.send(ettt)
         .then(async game => {
            const f1 = m => !isNaN(m) && m.author == msg.author;
            const c1 = msg.channel.createMessageCollector(f1, { max: 1 });
            c1.once('collect', async user1 => {
               user1.delete();
               var ttt2 = ttt.replace(numToEmote(user1), '❌');
               game.edit(ettt.setDescription(ttt2));
               var bot1;
               setTimeout(() => {
                  game.edit(ettt
                  .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                  .setTitle('Mi turno')
                  .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
               setTimeout(() => {
                  do {
                     bot1 = Math.floor(Math.random() * 9);
                  } while (bot1 == user1);
                  var ttt3 = ttt2.replace(numToEmote(bot1), '⭕');
                  game.edit(ettt.setDescription(ttt3));
                  const f2 = m => !isNaN(m) && (m != user1 || m != bot1) && m.author == msg.author;
                  const c2 = msg.channel.createMessageCollector(f2, { max: 1 });
                  setTimeout(() => {
                     game.edit(ettt
                     .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                     .setTitle('Tu turno')
                     .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                  c2.once('collect', async user2 => {
                     user2.delete();
                     var ttt4 = ttt3.replace(numToEmote(user2), '❌');
                     game.edit(ettt.setDescription(ttt4));
                     var bot2;
                     setTimeout(() => {
                        game.edit(ettt
                        .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                        .setTitle('Mi turno')
                        .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
                     setTimeout(() => {
                        do {
                           bot2 = Math.floor(Math.random() * 9);
                        } while (bot2 == user1 || bot2 == bot1 || bot2 == user2);
                        var ttt5 = ttt4.replace(numToEmote(bot2), '⭕');
                        game.edit(ettt.setDescription(ttt5));
                        const f3 = m => !isNaN(m) && (m != user1 || m != bot1 || m != user2 ||
                        m != bot2) && m.author == msg.author;
                        const c3 = msg.channel.createMessageCollector(f3, { max: 1 });
                        setTimeout(() => {
                           game.edit(ettt
                           .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                           .setTitle('Tu turno')
                           .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                        c3.once('collect', async user3 => {
                           user3.delete();
                           var ttt6 = ttt5.replace(numToEmote(user3), '❌');
                           game.edit(ettt.setDescription(ttt6));
                           var check1 = ttt6.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                           .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                           .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                           .replace(/9️⃣/g, 9);
                           if (check1.includes('❌❌❌') || (check1.indexOf('❌') == 0 && check1.indexOf('❌', 1) == 4 &&
                           check1.lastIndexOf('❌') == 8) || (check1.indexOf('❌') == 1 && check1.indexOf('❌', 2) == 5 &&
                           check1.lastIndexOf('❌') == 9) || (check1.indexOf('❌') == 2 && check1.indexOf('❌', 3) == 6 &&
                           check1.lastIndexOf('❌') == 10) || (check1.indexOf('❌') == 0 && check1.indexOf('❌', 1) == 5 &&
                           check1.lastIndexOf('❌') == 10) || (check1.indexOf('❌') == 2 && check1.indexOf('❌', 3) == 5 &&
                           check1.lastIndexOf('❌') == 8)) {
                              msg.channel.send(`${msg.author}, ¡ganaste!`);
                              return;
                           } else {
                              var bot3;
                              setTimeout(() => {
                                 game.edit(ettt
                                 .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                 .setTitle('Mi turno')
                                 .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
                              setTimeout(() => {
                                 do {
                                    bot3 = Math.floor(Math.random() * 9);
                                 } while (bot3 == user1 || bot3 == bot1 || bot3 == user2 ||
                                 bot3 == bot2 || bot3 == user3);
                                 var ttt7 = ttt6.replace(numToEmote(bot3), '⭕');
                                 game.edit(ettt.setDescription(ttt7));
                                 var check2 = ttt7.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                 .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                 .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                 .replace(/9️⃣/g, 9);
                                 if (check2.includes('⭕⭕⭕') || (check2.indexOf('⭕') == 0 && check2.indexOf('⭕', 1) == 4 &&
                                 check2.lastIndexOf('⭕') == 8) || (check2.indexOf('⭕') == 1 && check2.indexOf('⭕', 2) == 5 &&
                                 check2.lastIndexOf('⭕') == 9) || (check2.indexOf('⭕') == 2 && check2.indexOf('⭕', 3) == 6 &&
                                 check2.lastIndexOf('⭕') == 10) || (check2.indexOf('⭕') == 0 && check2.indexOf('⭕', 1) == 5 &&
                                 check2.lastIndexOf('⭕') == 10) || (check2.indexOf('⭕') == 2 && check2.indexOf('⭕', 3) == 5 &&
                                 check2.lastIndexOf('⭕') == 8)) {
                                    msg.channel.send(`¡Gané! >w<`);
                                    return;
                                 } else {
                                    const f4 = m => !isNaN(m) && (m != user1 || m != bot1 || m != user2 ||
                                    m != bot2 || m != user3 || m != bot3) && m.author == msg.author;
                                    const c4 = msg.channel.createMessageCollector(f4, { max: 1 });
                                    setTimeout(() => {
                                       game.edit(ettt
                                       .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                       .setTitle('Tu turno')
                                       .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                                    c4.once('collect', async user4 => {
                                       user4.delete();
                                       var ttt8 = ttt7.replace(numToEmote(user4), '❌');
                                       game.edit(ettt.setDescription(ttt8));
                                       var check3 = ttt8.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                       .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                       .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                       .replace(/9️⃣/g, 9);
                                       if (check3.includes('❌❌❌') || (check3.indexOf('❌') == 0 && check3.indexOf('❌', 1) == 4 &&
                                       check3.lastIndexOf('❌') == 8) || (check3.indexOf('❌') == 1 && check3.indexOf('❌', 2) == 5 &&
                                       check3.lastIndexOf('❌') == 9) || (check3.indexOf('❌') == 2 && check3.indexOf('❌', 3) == 6 &&
                                       check3.lastIndexOf('❌') == 10) || (check3.indexOf('❌') == 0 && check3.indexOf('❌', 1) == 5 &&
                                       check3.lastIndexOf('❌') == 10) || (check3.indexOf('❌') == 2 && check3.indexOf('❌', 3) == 5 &&
                                       check3.lastIndexOf('❌') == 8)) {
                                          msg.channel.send(`${msg.author}, ¡ganaste!`);
                                          return;
                                       } else {
                                          var bot4;
                                          setTimeout(() => {
                                             game.edit(ettt
                                             .setAuthor(sela.user.username, sela.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                             .setTitle('Mi turno')
                                             .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor));
                                          setTimeout(() => {
                                             do {
                                                bot4 = Math.floor(Math.random() * 9);
                                             } while (bot4 == user1 || bot4 == bot1 || bot4 == user2 ||
                                             bot4 == bot2 || bot4 == user3 || bot4 == bot3 || bot4 == user4);
                                             var ttt9 = ttt8.replace(numToEmote(bot4), '⭕');
                                             game.edit(ettt.setDescription(ttt9));
                                             var check4 = ttt9.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                             .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                             .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                             .replace(/9️⃣/g, 9);
                                             if (check4.includes('⭕⭕⭕') || (check4.indexOf('⭕') == 0 && check4.indexOf('⭕', 1) == 4 &&
                                             check4.lastIndexOf('⭕') == 8) || (check4.indexOf('⭕') == 1 && check4.indexOf('⭕', 2) == 5 &&
                                             check4.lastIndexOf('⭕') == 9) || (check4.indexOf('⭕') == 2 && check4.indexOf('⭕', 3) == 6 &&
                                             check4.lastIndexOf('⭕') == 10) || (check4.indexOf('⭕') == 0 && check4.indexOf('⭕', 1) == 5 &&
                                             check4.lastIndexOf('⭕') == 10) || (check4.indexOf('⭕') == 2 && check4.indexOf('⭕', 3) == 5 &&
                                             check4.lastIndexOf('⭕') == 8)) {
                                                msg.channel.send(`¡Gané! >w<`);
                                                return;
                                             } else {
                                                const f5 = m => !isNaN(m) && (m != user1 || m != bot1 || m != user2 ||
                                                m != bot2 || m != user3 || m != bot3 || m!= user4 || m != bot4) &&
                                                m.author == msg.author;
                                                const c5 = msg.channel.createMessageCollector(f5, { max: 1 });
                                                setTimeout(() => {
                                                   game.edit(ettt
                                                   .setAuthor(msg.author.username, msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
                                                   .setTitle('Tu turno')
                                                   .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor));
                                                c5.once('collect', async user5 => {
                                                   user5.delete();
                                                   var ttt10 = ttt9.replace(numToEmote(user5), '❌');
                                                   game.edit(ettt.setDescription(ttt10));
                                                   var check5 = ttt10.replace(/1️⃣/g, 1).replace(/2️⃣/g, 2)
                                                   .replace(/3️⃣/g, 3).replace(/4️⃣/g, 4).replace(/5️⃣/g, 5)
                                                   .replace(/6️⃣/g, 6).replace(/7️⃣/g, 7).replace(/8️⃣/g, 8)
                                                   .replace(/9️⃣/g, 9);
                                                   if (check5.includes('❌❌❌') || (check5.indexOf('❌') == 0 && check5.indexOf('❌', 1) == 4 &&
                                                   check5.lastIndexOf('❌') == 8) || (check5.indexOf('❌') == 1 && check5.indexOf('❌', 2) == 5 &&
                                                   check5.lastIndexOf('❌') == 9) || (check5.indexOf('❌') == 2 && check5.indexOf('❌', 3) == 6 &&
                                                   check5.lastIndexOf('❌') == 10) || (check5.indexOf('❌') == 0 && check5.indexOf('❌', 1) == 5 &&
                                                   check5.lastIndexOf('❌') == 10) || (check5.indexOf('❌') == 2 && check5.indexOf('❌', 2) == 5 &&
                                                   check5.lastIndexOf('❌') == 8)) {
                                                      msg.channel.send(`${msg.author}, ¡ganaste!`);
                                                      return;
                                                   } else {
                                                      return msg.channel.send('¡Empate!');
                                                   }
                                                });
                                                }, 2000);
                                             }
                                          }, 2000);
                                          }, 2000);
                                       }
                                    });
                                    }, 2000);
                                 }
                              }, 2000);
                              }, 2000);
                           }
                        });
                        }, 2000);
                     }, 2000);
                     }, 2000);
                  });
                  }, 2000);
               }, 2000);
               }, 2000);
            });
         });
      } else {

      }
   }
}

function numToEmote(num) {
   if (num == 1) { return '1️⃣' } else if (num == 2) { return '2️⃣' }
   else if (num == 3) { return '3️⃣' } else if (num == 4) { return '4️⃣' }
   else if (num == 5) { return '5️⃣' } else if (num == 6) { return '6️⃣' }
   else if (num == 7) { return '7️⃣' } else if (num == 8) { return '8️⃣' }
   else return '9️⃣'
}