const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'rps',
   alias: 'ppt',
   usage: `${prefix}rps [@miembro]`,
   cat: 'Diversión',
   perms: [],
   desc: `Juega a piedra, papel o tijera conmigo o con algún miembro del servidor.`,
   run: async (sela, msg, args) => {
      var player = ['✊','✋','✌'];
      var bot = ['💎','🧻','✂'];
      if (!args[0]) {
         var botplay = bot[Math.floor(Math.random() * 2)];
         var embed = new MessageEmbed()
         .setAuthor(sela.user.username, sela.user.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }))
         .setDescription('Elije piedra, papel o tijera. owo\n'+'*Tienes 15 segundos para reaccionar.*')
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .setFooter(msg.author.username, msg.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }));
         msg.channel.send(embed)
         .then(async m => {
            for (i = 0; i < player.length; i++)
               await m.react(player[i]);
            const f = (reaction, user) => {
               return player.includes(reaction.emoji.name) && user.id === msg.author.id;
            }
            m.awaitReactions(f, { max: 1, time: 15000 })
            .then(collected => {
               m.reactions.cache.each(r => r.remove());
               const reaction = collected.first();
               if (reaction.emoji.name === player[0]) {
                  if (botplay === bot[0]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('Fue un empate. o.o')
                     .setImage('https://media1.tenor.com/images/25f1a2e222ddce06074de1e0bda7eb81/tenor.gif?itemid=16697440')
                     .setColor('#FDFA9C')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                  } else if (botplay === bot[1]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('¡Gané!')
                     .setImage('https://pa1.narvii.com/7021/8d03ec014af915f935edd54491047c8c0bffd1c9r1-600-338_00.gif')
                     .setColor('#9CFD9F')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                  } else if (botplay === bot[2]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('Perdí... ;w;')
                     .setImage('https://media.tenor.com/images/c73f0f7cd272f163459200fbcd50a6ce/tenor.gif')
                     .setColor('#FF7D7D')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                     return;
                  }
               } else if (reaction.emoji.name === player[1]) {
                  if (botplay === bot[1]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('Fue un empate. o.o')
                     .setImage('https://media1.tenor.com/images/25f1a2e222ddce06074de1e0bda7eb81/tenor.gif?itemid=16697440')
                     .setColor('#FDFA9C')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                  } else if (botplay === bot[2]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('¡Gané!')
                     .setImage('https://pa1.narvii.com/7021/8d03ec014af915f935edd54491047c8c0bffd1c9r1-600-338_00.gif')
                     .setColor('#9CFD9F')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                  } else if (botplay === bot[0]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('Perdí... ;w;')
                     .setImage('https://media.tenor.com/images/c73f0f7cd272f163459200fbcd50a6ce/tenor.gif')
                     .setColor('#FF7D7D')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                     return;
                  }
               } else if (reaction.emoji.name === player[2]) {
                  if (botplay === bot[2]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('Fue un empate. o.o')
                     .setImage('https://media1.tenor.com/images/25f1a2e222ddce06074de1e0bda7eb81/tenor.gif?itemid=16697440')
                     .setColor('#FDFA9C')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                  } else if (botplay === bot[0]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('¡Gané!')
                     .setImage('https://pa1.narvii.com/7021/8d03ec014af915f935edd54491047c8c0bffd1c9r1-600-338_00.gif')
                     .setColor('#9CFD9F')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                  } else if (botplay === bot[1]) {
                     embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .setDescription('Perdí... ;w;')
                     .setImage('https://media.tenor.com/images/c73f0f7cd272f163459200fbcd50a6ce/tenor.gif')
                     .setColor('#FF7D7D')
                     .setFooter(sela.user.username, sela.user.displayAvatarURL({
                        format: 'png',
                        dynamic: true,
                        size: 2048
                     }))
                     .addField(msg.author.username, reaction.emoji.name, true)
                     .addField(sela.user.username, botplay, true);
                     m.edit(embed);
                     return;
                  }
                  return;
               }
            }).catch(() => {
               msg.channel.send('No reaccionaste a tiempo.');
               return;
            });
         });
         return;
      }
      var member = msg.mentions.members.first();
      if (member.user.bot)
         return msg.channel.send('No puedes jugar contra un bot.\n'+'Si quieres jugar conmigo, usa el comando sin mencionar a nadie.');
      var embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setDescription(`${msg.author} quiere jugar piedra, papel o tijera contigo. ¿Quieres jugar?\n`+
      '*Tienes 15 segundos para reaccionar.*')
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor);
      msg.channel.send(`${member}`, { embed: embed })
      .then(async m => {
         await m.react('✔');
         await m.react('❌');
         const f = (reaction, user) => {
            return ['✔','❌'].includes(reaction.emoji.name) && user.id === member.id;
         }
         m.awaitReactions(f, { max: 1, time: 15000 })
         .then(collected => {
            m.delete();
            const reaction = collected.first();
            if (reaction.emoji.name === '✔') {
               embed.setAuthor(sela.user.username, sela.user.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 2048
               }))
               .setDescription('Esperando a ambos jugadores.\n'+'*Revisen sus DMs.*')
               .setColor(msg.guild.me.displayHexColor === '#000000' ? rndColor() : msg.guild.me.displayHexColor);
               msg.channel.send(embed)
               .then(message => {
                  var embed2 = new MessageEmbed()
                  .setAuthor(sela.user.username, sela.user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                  .setDescription('Elije piedra, papel o tijera. owo\n'+'*Tienes 15 segundos para reaccionar.*')
                  .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
                  .setFooter(msg.author.username, msg.author.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }));
                  msg.author.send(embed2)
                  .then(async m => {
                     for (i = 0; i < player.length; i++)
                        await m.react(player[i]);
                     const f1 = (reaction, user) => {
                        return player.includes(reaction.emoji.name) && user.id === msg.author.id;
                     }
                     m.awaitReactions(f1, { max: 1, time: 15000 })
                     .then(collectedP1 => {
                        var reactionP1 = collectedP1.first();
                        var embed3 = new MessageEmbed()
                        .setAuthor(sela.user.username, sela.user.displayAvatarURL({
                           format: 'png',
                           dynamic: true,
                           size: 2048
                        }))
                        .setDescription('Elije piedra, papel o tijera. owo\n'+'*Tienes 15 segundos para reaccionar.*')
                        .setColor(member.displayHexColor === '#000000' ? rndColor() : member.displayHexColor)
                        .setFooter(member.user.username, member.user.displayAvatarURL({
                           format: 'png',
                           dynamic: true,
                           size: 2048
                        }));
                        member.user.send(embed3)
                        .then(async m2 => {
                           for (i = 0; i < player.length; i++)
                              await m2.react(player[i]);
                           const f2 = (reaction, user) => {
                              return player.includes(reaction.emoji.name) && user.id === member.id;
                           }
                           m2.awaitReactions(f2, { max: 1, time: 15000 })
                           .then(collectedP2 => {
                              var reactionP2 = collectedP2.first();
                              if (reactionP1.emoji.name === player[0]) {
                                 if (reactionP2.emoji.name === player[0]) {
                                    embed.setAuthor(sela.user.username, sela.user.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription('Fue un empate. o.o')
                                    .setColor('#FDFA9C')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                 } else if (reactionP2.emoji.name === player[1]) {
                                    embed.setAuthor(member.user.username, member.user.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription(`¡${member} ganó! o/`)
                                    .setColor('#9CFD9F')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                 } else if (reactionP2.emoji.name === player[2]) {
                                    embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription(`¡${msg.author} ganó! o/`)
                                    .setColor('#9CFD9F')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                    return;
                                 }
                              } else if (reactionP1.emoji.name === player[1]) {
                                 if (reactionP2.emoji.name === player[1]) {
                                    embed.setAuthor(sela.user.username, sela.user.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription('Fue un empate. o.o')
                                    .setColor('#FDFA9C')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                 } else if (reactionP2.emoji.name === player[2]) {
                                    embed.setAuthor(member.user.username, member.user.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription(`¡${member} ganó! o/`)
                                    .setColor('#9CFD9F')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                 } else if (reactionP2.emoji.name === player[0]) {
                                    embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription(`¡${msg.author} ganó! o/`)
                                    .setColor('#9CFD9F')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                    return;
                                 }
                              } else if (reactionP1.emoji.name === player[2]) {
                                 if (reactionP2.emoji.name === player[2]) {
                                    embed.setAuthor(sela.user.username, sela.user.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription('Fue un empate. o.o')
                                    .setColor('#FDFA9C')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                 } else if (reactionP2.emoji.name === player[0]) {
                                    embed.setAuthor(member.user.username, member.user.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription(`¡${member} ganó! o/`)
                                    .setColor('#9CFD9F')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                 } else if (reactionP2.emoji.name === player[1]) {
                                    embed.setAuthor(msg.author.username, msg.author.displayAvatarURL({
                                       format: 'png',
                                       dynamic: true,
                                       size: 2048
                                    }))
                                    .setDescription(`¡${msg.author} ganó! o/`)
                                    .setColor('#9CFD9F')
                                    .addField(msg.author.username, reactionP1.emoji.name, true)
                                    .addField(member.user.username, reactionP2.emoji.name, true);
                                    message.edit(embed);
                                    return;
                                 }
                                 return;
                              }
                           });
                        });
                     });
                  });
               });
            } else {
               m.delete();
               msg.reply('parece que tendrá que ser en otra ocasión.');
               return;
            }
         }).catch(() => {
            msg.channel.send('No reaccionaste a tiempo.');
            return;
         });
      })
   }
}