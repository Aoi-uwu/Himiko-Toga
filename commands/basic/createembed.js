const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config');
const deleteMsg = require('../../utility/deleteMsg');

module.exports = {
   name: "createembed",
   alias: 'ce',
   usage: `${prefix}createembed`,
   cat: "Utilidad",
   perms: [],
   desc: `Crea mensajes embebidos.`,
   run: async (sela, msg, args) => {
      let embed = new MessageEmbed();
      msg.channel.send('**¡Bienvenido al creador de mensajes embebidos!**\n'+
      'Te recomiendo que uses este comando en algún canal donde no se envíen '+
      'demasiados mensajes, para evitar confusiones.')
      .then(m => deleteMsg(m, 5000));
      setTimeout(async () => {
         await msg.channel.send('**¡Bienvenido al creador de mensajes embebidos!**\n'+
         'Empecemos con el campo **autor**. ¿Deseas agregar este campo?')
         .then(async msg1 => {
            await msg1.react('✅');
            await msg1.react('❌');
            const f1 = (reaction, user) => {
               return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
            }
            await msg1.awaitReactions(f1, { max: 1 })
            .then(async c1 => {
               const reaction = c1.first();
               if (reaction.emoji.name === '✅') {
                  await msg1.reactions.cache.each(r => r.remove());
                  await require('../../utility/embeds/setAuthor')(sela, msg, msg1, embed);
                  return;
               }
               await msg1.reactions.cache.each(r => r.remove());
               await msg1.edit('Sigamos con el **título**, ¿deseas agregar uno?')
               .then(async msg2 => {
                  await msg2.react('✅');
                  await msg2.react('❌');
                  const f2 = (reaction, user) => {
                     return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
                  }
                  await msg2.awaitReactions(f2, { max: 1 })
                  .then(async c2 => {
                     const reaction = c2.first();
                     if (reaction.emoji.name === '✅') {
                        await msg2.reactions.cache.each(r => r.remove());
                        await require('../../utility/embeds/setTitle')(sela, msg, msg2, embed);
                        return;
                     }
                     await msg2.reactions.cache.each(r => r.remove());
                     await msg2.edit('Sigamos con la **descripción**, ¿deseas agregar una?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f3 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
                        }
                        await msg3.awaitReactions(f3, { max: 1 })
                        .then(async c3 => {
                           const reaction = c3.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('../../utility/embeds/setDescription')(sela, msg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           await msg3.edit('Sigamos con el **color**, ¿deseas agregar uno?')
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
                                    await require('./setColor')(sela, uMsg, msg4, embed);
                                    return;
                                 }
                                 await msg4.reactions.cache.each(r => r.remove());
                                 await msg4.edit('Sigamos con la **miniatura**, ¿deseas agregar una?')
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
                                          await require('./setThumbnail')(sela, uMsg, msg5, embed);
                                          return;
                                       }
                                       await msg5.reactions.cache.each(r => r.remove());
                                       await msg5.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
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
                                                await require('./setImage')(sela, uMsg, msg6, embed);
                                                return;
                                             }
                                             await msg6.reactions.cache.each(r => r.remove());
                                             await msg6.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                                             .then(async msg7 => {
                                                await msg7.react('✅');
                                                await msg7.react('❌');
                                                const f7 = (reaction, user) => {
                                                   return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                                }
                                                await msg7.awaitReactions(f7, { max: 1 })
                                                .then(async c7 => {
                                                   const reaction = c7.first();
                                                   if (reaction.emoji.name === '✅') {
                                                      await msg7.reactions.cache.each(r => r.remove());
                                                      await require('./setFooter')(sela, uMsg, msg7, embed);
                                                      return;
                                                   } else msg7.delete();
                                                   await msg7.reactions.cache.each(r => r.remove());
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
                  });
               });
            });
         });
      }, 5000);
   }
}