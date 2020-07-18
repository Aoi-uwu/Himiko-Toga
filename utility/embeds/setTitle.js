const deleteMsg = require('../deleteMsg');

module.exports = async (sela, uMsg, msg, embed) => {
   msg.edit('¡Perfecto! ¿Qué deseas colocar como título?')
   .then(async msg1 => {
      const f = m => m.author.id === uMsg.author.id;
      const c = uMsg.channel.createMessageCollector(f);
      c.once('collect', async m => {
         deleteMsg(m);
         let title = m.content;
         embed.setTitle(title);
         await msg1.edit('¡Listo! Así quedó el mensaje con el campo **título**, ¡sigamos!',
         { embed: embed })
         .then(m => deleteMsg(m, 3500));
         return setTimeout(async () => {
            await uMsg.channel.send('Sigamos con la **descripción**, ¿deseas agregar una?')
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
                     await require('./setDescription')(sela, uMsg, msg2, embed);
                     return;
                  }
                  await msg2.reactions.cache.each(r => r.remove());
                  await msg2.edit('Sigamos con el **color**, ¿deseas agregar uno?')
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
                           await require('./setColor')(sela, uMsg, msg3, embed);
                           return;
                        }
                        await msg3.reactions.cache.each(r => r.remove());
                        await msg3.edit('Sigamos con la **miniatura**, ¿deseas agregar una?')
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
                                 await require('./setThumbnail')(sela, uMsg, msg4, embed);
                                 return;
                              }
                              await msg4.reactions.cache.each(r => r.remove());
                              await msg4.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
                              .then(async msg5 => {
                                 await msg5.react('✅');
                                 await msg5.react('❌');
                                 const f5 = (reaction, user) => {
                                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                 }
                                 await msg5.awaitReactions(f5, { max: 1 })
                                 .then(async c5 => {
                                    const reaction = c5.first();
                                    if (reaction.emoji.name === '✅') {
                                       await msg5.reactions.cache.each(r => r.remove());
                                       await require('./setImage')(sela, uMsg, msg5, embed);
                                       return;
                                    }
                                    await msg5.reactions.cache.each(r => r.remove());
                                    await msg5.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                                    .then(async msg6 => {
                                       await msg6.react('✅');
                                       await msg6.react('❌');
                                       const f6 = (reaction, user) => {
                                          return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                       }
                                       await msg6.awaitReactions(f6, { max: 1 })
                                       .then(async c6 => {
                                          const reaction = c6.first();
                                          if (reaction.emoji.name === '✅') {
                                             await msg6.reactions.cache.each(r => r.remove());
                                             await require('./setFooter')(sela, uMsg, msg6, embed);
                                             return;
                                          }
                                          await msg6.reactions.cache.each(r => r.remove());
                                          await require('./sendEmbed')(sela, uMsg, embed);
                                       });
                                    });
                                 });
                              });
                           });
                        });
                     });
                  });
               });
            });
         }, 3500);
      });
   });
}