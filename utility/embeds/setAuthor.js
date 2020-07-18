const deleteMsg = require('../deleteMsg');

module.exports = async (sela, uMsg, msg, embed) => {
   msg.edit('¡Perfecto! ¿Qué deseas colocar en el nombre del autor?')
   .then(async msg1 => {
      const f = m => m.author.id === uMsg.author.id;
      const c = uMsg.channel.createMessageCollector(f);
      c.once('collect', async m => {
         deleteMsg(m);
         let author = {};
         author.name = m.content;
         await msg1.edit('¡Listo! ¿Qué imagen deseas colocar para el autor?\n'+
         '*Coloca un enlace de alguna imagen o GIF, escribe **avatar** si deseas usar '+
         'tu imagen de perfil o **null** si no quieres colocar una imagen.*')
         .then(async msg2 => {
            const f = m => m.author.id === uMsg.author.id;
            const c = uMsg.channel.createMessageCollector(f);
            c.once('collect', async m => {
               deleteMsg(m);
               if (m.content.toLowerCase() === 'avatar') {
                  author.avatar = uMsg.author.displayAvatarURL();
                  embed.setAuthor(author.name, author.avatar);
                  await msg2.edit('¡Listo! Así quedó el mensaje con el campo **autor**, ¡sigamos!',
                  { embed: embed })
                  .then(m => deleteMsg(m, 3500));
                  return setTimeout(async () => {
                     await uMsg.channel.send('Sigamos con el **título**, ¿deseas agregar uno?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f2 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                        }
                        await msg3.awaitReactions(f2, { max: 1 })
                        .then(async c2 => {
                           const reaction = c2.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('./setTitle')(sela, uMsg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           return setTimeout(async () => {
                              await msg3.edit('Sigamos con la **descripción**, ¿deseas agregar una?')
                              .then(async msg4 => {
                                 await msg4.react('✅');
                                 await msg4.react('❌');
                                 const f3 = (reaction, user) => {
                                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                 }
                                 await msg4.awaitReactions(f3, { max: 1 })
                                 .then(async c3 => {
                                    const reaction = c3.first();
                                    if (reaction.emoji.name === '✅') {
                                       await msg4.reactions.cache.each(r => r.remove());
                                       await require('./setDescription')(sela, uMsg, msg4, embed);
                                       return;
                                    }
                                    await msg4.reactions.cache.each(r => r.remove());
                                    await msg4.edit('Sigamos con el **color**, ¿deseas agregar uno?')
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
                                             await require('./setColor')(sela, uMsg, msg5, embed);
                                             return;
                                          }
                                          await msg5.reactions.cache.each(r => r.remove());
                                          await msg5.edit('Sigamos con la **miniatura**, ¿deseas agregar una?')
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
                                                   await require('./setThumbnail')(sela, uMsg, msg6, embed);
                                                   return;
                                                }
                                                await msg6.reactions.cache.each(r => r.remove());
                                                await msg6.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
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
                                                         await require('./setImage')(sela, uMsg, msg7, embed);
                                                         return;
                                                      }
                                                      await msg7.reactions.cache.each(r => r.remove());
                                                      await msg7.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                                                      .then(async msg8 => {
                                                         await msg8.react('✅');
                                                         await msg8.react('❌');
                                                         const f8 = (reaction, user) => {
                                                            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                                         }
                                                         await msg8.awaitReactions(f8, { max: 1 })
                                                         .then(async c8 => {
                                                            const reaction = c8.first();
                                                            if (reaction.emoji.name === '✅') {
                                                               await msg8.reactions.cache.each(r => r.remove());
                                                               await require('./setFooter')(sela, uMsg, msg8, embed);
                                                               return;
                                                            }
                                                            await msg8.reactions.cache.each(r => r.remove());
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
                  }, 3500);
               } else if (m.content.toLowerCase() === 'null') {
                  embed.setAuthor(author.name);
                  await msg2.edit('¡Listo! Así quedó el mensaje con el campo **autor**, ¡sigamos!',
                  { embed: embed })
                  .then(m => deleteMsg(m, 3500));
                  return setTimeout(async () => {
                     await uMsg.channel.send('Sigamos con el **título**, ¿deseas agregar uno?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f2 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                        }
                        await msg3.awaitReactions(f2, { max: 1 })
                        .then(async c2 => {
                           const reaction = c2.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('./setTitle')(sela, uMsg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           return setTimeout(async () => {
                              await msg3.edit('Sigamos con la **descripción**, ¿deseas agregar una?')
                              .then(async msg4 => {
                                 await msg4.react('✅');
                                 await msg4.react('❌');
                                 const f3 = (reaction, user) => {
                                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                 }
                                 await msg4.awaitReactions(f3, { max: 1 })
                                 .then(async c3 => {
                                    const reaction = c3.first();
                                    if (reaction.emoji.name === '✅') {
                                       await msg4.reactions.cache.each(r => r.remove());
                                       await require('./setDescription')(sela, uMsg, msg4, embed);
                                       return;
                                    }
                                    await msg4.reactions.cache.each(r => r.remove());
                                    await msg4.edit('Sigamos con el **color**, ¿deseas agregar uno?')
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
                                             await require('./setColor')(sela, uMsg, msg5, embed);
                                             return;
                                          }
                                          await msg5.reactions.cache.each(r => r.remove());
                                          await msg5.edit('Sigamos con la **miniatura**, ¿deseas agregar una?')
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
                                                   await require('./setThumbnail')(sela, uMsg, msg6, embed);
                                                   return;
                                                }
                                                await msg6.reactions.cache.each(r => r.remove());
                                                await msg6.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
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
                                                         await require('./setImage')(sela, uMsg, msg7, embed);
                                                         return;
                                                      }
                                                      await msg7.reactions.cache.each(r => r.remove());
                                                      await msg7.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                                                      .then(async msg8 => {
                                                         await msg8.react('✅');
                                                         await msg8.react('❌');
                                                         const f8 = (reaction, user) => {
                                                            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                                         }
                                                         await msg8.awaitReactions(f8, { max: 1 })
                                                         .then(async c8 => {
                                                            const reaction = c8.first();
                                                            if (reaction.emoji.name === '✅') {
                                                               await msg8.reactions.cache.each(r => r.remove());
                                                               await require('./setFooter')(sela, uMsg, msg8, embed);
                                                               return;
                                                            }
                                                            await msg8.reactions.cache.each(r => r.remove());
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
                  }, 3500);
               } else if (m.content.toLowerCase().startsWith('http')) {
                  author.avatar = m.content;
                  embed.setAuthor(author.name, author.avatar);
                  await msg2.edit('¡Listo! Así quedó el mensaje con el campo **autor**, ¡sigamos!',
                  { embed: embed })
                  .then(m => deleteMsg(m, 3500));
                  return setTimeout(async () => {
                     await uMsg.channel.send('Sigamos con el **título**, ¿deseas agregar uno?')
                     .then(async msg3 => {
                        await msg3.react('✅');
                        await msg3.react('❌');
                        const f2 = (reaction, user) => {
                           return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                        }
                        await msg3.awaitReactions(f2, { max: 1 })
                        .then(async c2 => {
                           const reaction = c2.first();
                           if (reaction.emoji.name === '✅') {
                              await msg3.reactions.cache.each(r => r.remove());
                              await require('./setTitle')(sela, uMsg, msg3, embed);
                              return;
                           }
                           await msg3.reactions.cache.each(r => r.remove());
                           return setTimeout(async () => {
                              await msg3.edit('Sigamos con la **descripción**, ¿deseas agregar una?')
                              .then(async msg4 => {
                                 await msg4.react('✅');
                                 await msg4.react('❌');
                                 const f3 = (reaction, user) => {
                                    return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                 }
                                 await msg4.awaitReactions(f3, { max: 1 })
                                 .then(async c3 => {
                                    const reaction = c3.first();
                                    if (reaction.emoji.name === '✅') {
                                       await msg4.reactions.cache.each(r => r.remove());
                                       await require('./setDescription')(sela, uMsg, msg4, embed);
                                       return;
                                    }
                                    await msg4.reactions.cache.each(r => r.remove());
                                    await msg4.edit('Sigamos con el **color**, ¿deseas agregar uno?')
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
                                             await require('./setColor')(sela, uMsg, msg5, embed);
                                             return;
                                          }
                                          await msg5.reactions.cache.each(r => r.remove());
                                          await msg5.edit('Sigamos con la **miniatura**, ¿deseas agregar una?')
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
                                                   await require('./setThumbnail')(sela, uMsg, msg6, embed);
                                                   return;
                                                }
                                                await msg6.reactions.cache.each(r => r.remove());
                                                await msg6.edit('Sigamos con el campo **imagen**, ¿deseas agregar una?')
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
                                                         await require('./setImage')(sela, uMsg, msg7, embed);
                                                         return;
                                                      }
                                                      await msg7.reactions.cache.each(r => r.remove());
                                                      await msg7.edit('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
                                                      .then(async msg8 => {
                                                         await msg8.react('✅');
                                                         await msg8.react('❌');
                                                         const f8 = (reaction, user) => {
                                                            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === uMsg.author.id;
                                                         }
                                                         await msg8.awaitReactions(f8, { max: 1 })
                                                         .then(async c8 => {
                                                            const reaction = c8.first();
                                                            if (reaction.emoji.name === '✅') {
                                                               await msg8.reactions.cache.each(r => r.remove());
                                                               await require('./setFooter')(sela, uMsg, msg8, embed);
                                                               return;
                                                            }
                                                            await msg8.reactions.cache.each(r => r.remove());
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
                  }, 3500);
               } else {
                  await uMsg.channel.send('Vaya, parece que no has ingresado un valor válido.\n'+
                  'Tendrás que empezar nuevamente')
                  .then(m => deleteMsg(m, 5000));
                  return;
               }
            });
         });
      });
   });

}