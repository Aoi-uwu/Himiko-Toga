const deleteMsg = require('../deleteMsg');
const colors = [
   '0','1','2','3','4','5','6','7',
   '8','9','A','B','C','D','E','F'
];
let random = [
   Math.floor(Math.random() * colors.length),
   Math.floor(Math.random() * colors.length),
   Math.floor(Math.random() * colors.length),
   Math.floor(Math.random() * colors.length),
   Math.floor(Math.random() * colors.length),
   Math.floor(Math.random() * colors.length)
];

module.exports = async (sela, uMsg, msg, embed) => {
   msg.edit('¡Perfecto! ¿Qué color deseas usar?\n'+
   '*Debes colocar un valor hexadecimal (`#012ABC`), escribe **me** para usar el '+
   'color de tu rol más alto o **random** para que sea aleatorio*.')
   .then(async msg1 => {
      const f = m => (m.content.length === 6 || m.content.length === 7 ||
         m.content.toLowerCase() === 'me' || m.content.toLowerCase() === 'random') &&
         m.author.id === uMsg.author.id;
      const c = uMsg.channel.createMessageCollector(f);
      c.once('collect', async m => {
         deleteMsg(m);
         if (m.content.toLowerCase() === 'random') {
            let color = `#${colors[random[0]]}${colors[random[1]]}${colors[random[2]]}`+
            `${colors[random[3]]}${colors[random[4]]}${colors[random[5]]}`;
            embed.setColor(color);
            await msg1.edit(`¡Listo! Así quedó el mensaje con el color **${color}**, ¡sigamos!`,
            { embed: embed })
            .then(m => deleteMsg(m, 3500));
            return setTimeout(async () => {
               await uMsg.channel.send('Sigamos con la **miniatura**, ¿deseas agregar una?')
               .then(async msg2 => {
                  await msg2.react('✅');
                  await msg2.react('❌');
                  const f2 = (reaction, user) => {
                     return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                  }
                  await msg2.awaitReactions(f2, { max: 1 })
                  .then(async c2 => {
                     const reaction = c2.first();
                     if (reaction.emoji.name === '✅') {
                        await msg2.reactions.cache.each(r => r.remove());
                        await require('./setThumbnail')(sela, uMsg, msg2, embed);
                        return;
                     }
                     await msg2.reactions.cache.each(r => r.remove());
                     await msg2.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f3 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                        }
                        await msg3.awaitReactions(f3, { max: 1 })
                        .then(async c3 => {
                           const reaction = c3.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('./setImage')(sela, uMsg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           await msg3.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                           .then(async msg4 => {
                              await msg4.react('✅');
                              await msg4.react('❌');
                              const f4 = (reaction, user) => {
                                 return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                              }
                              await msg4.awaitReactions(f4, { max: 1 })
                              .then(async c4 => {
                                 const reaction = c4.first();
                                 if (reaction.emoji.name === '✅') {
                                    await msg4.reactions.cache.each(r => r.remove());
                                    await require('./setFooter')(sela, uMsg, msg4, embed);
                                    return;
                                 }
                                 await msg4.reactions.cache.each(r => r.remove());
                                 await require('./sendEmbed')(sela, uMsg, embed);
                              });
                           });
                        });
                     });
                  });
               });
            }, 3500);
         } else if (m.content.toLowerCase() === 'me') {
            let color = uMsg.member.displayHexColor;
            embed.setColor(color);
            await msg1.edit(`¡Listo! Así quedó el mensaje con el color **${color}**, ¡sigamos!`,
            { embed: embed })
            .then(m => deleteMsg(m, 3500));
            return setTimeout(async () => {
               await uMsg.channel.send('Sigamos con la **miniatura**, ¿deseas agregar una?')
               .then(async msg2 => {
                  await msg2.react('✅');
                  await msg2.react('❌');
                  const f2 = (reaction, user) => {
                     return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                  }
                  await msg2.awaitReactions(f2, { max: 1 })
                  .then(async c2 => {
                     const reaction = c2.first();
                     if (reaction.emoji.name === '✅') {
                        await msg2.reactions.cache.each(r => r.remove());
                        await require('./setThumbnail')(sela, uMsg, msg2, embed);
                        return;
                     }
                     await msg2.reactions.cache.each(r => r.remove());
                     await msg2.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f3 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                        }
                        await msg3.awaitReactions(f3, { max: 1 })
                        .then(async c3 => {
                           const reaction = c3.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('./setImage')(sela, uMsg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           await msg3.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                           .then(async msg4 => {
                              await msg4.react('✅');
                              await msg4.react('❌');
                              const f4 = (reaction, user) => {
                                 return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                              }
                              await msg4.awaitReactions(f4, { max: 1 })
                              .then(async c4 => {
                                 const reaction = c4.first();
                                 if (reaction.emoji.name === '✅') {
                                    await msg4.reactions.cache.each(r => r.remove());
                                    await require('./setFooter')(sela, uMsg, msg4, embed);
                                    return;
                                 }
                                 await msg4.reactions.cache.each(r => r.remove());
                                 await require('./sendEmbed')(sela, uMsg, embed);
                              });
                           });
                        });
                     });
                  });
               });
            }, 3500);
         } else {
            let color = m.content.startsWith('#') ? m.content : `#${m.content}`;
            embed.setColor(color);
            await msg1.edit(`¡Listo! Así quedó el mensaje con el color **${color}**, ¡sigamos!`,
            { embed: embed })
            .then(m => deleteMsg(m, 3500));
            return setTimeout(async () => {
               await uMsg.channel.send('Sigamos con la **miniatura**, ¿deseas agregar una?')
               .then(async msg2 => {
                  await msg2.react('✅');
                  await msg2.react('❌');
                  const f2 = (reaction, user) => {
                     return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                  }
                  await msg2.awaitReactions(f2, { max: 1 })
                  .then(async c2 => {
                     const reaction = c2.first();
                     if (reaction.emoji.name === '✅') {
                        await msg2.reactions.cache.each(r => r.remove());
                        await require('./setThumbnail')(sela, uMsg, msg2, embed);
                        return;
                     }
                     await msg2.reactions.cache.each(r => r.remove());
                     await msg2.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f3 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                        }
                        await msg3.awaitReactions(f3, { max: 1 })
                        .then(async c3 => {
                           const reaction = c3.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('./setImage')(sela, uMsg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           await msg3.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                           .then(async msg4 => {
                              await msg4.react('✅');
                              await msg4.react('❌');
                              const f4 = (reaction, user) => {
                                 return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                              }
                              await msg4.awaitReactions(f4, { max: 1 })
                              .then(async c4 => {
                                 const reaction = c4.first();
                                 if (reaction.emoji.name === '✅') {
                                    await msg4.reactions.cache.each(r => r.remove());
                                    await require('./setFooter')(sela, uMsg, msg4, embed);
                                    return;
                                 }
                                 await msg4.reactions.cache.each(r => r.remove());
                                 await require('./sendEmbed')(sela, uMsg, embed);
                              });
                           });
                        });
                     });
                  });
               });
            }, 3500);
         }
      });
   });
}