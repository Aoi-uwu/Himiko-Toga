const deleteMsg = require('../deleteMsg');

module.exports = async (sela, uMsg, msg, embed) => {
   msg.edit('¡Perfecto! ¿Qué deseas colocar en el pie de página?')
   .then(async msg1 => {
      const f = m => m.author.id === uMsg.author.id;
      const c = uMsg.channel.createMessageCollector(f);
      c.once('collect', async m => {
         deleteMsg(m);
         let footer = {};
         footer.text = m.content;
         await msg1.edit('¡Listo! ¿Qué imagen deseas colocar para el pie de página?\n'+
         '*Coloca un enlace de alguna imagen o GIF, escribe **avatar** si deseas usar '+
         'tu imagen de perfil o **null** si no quieres colocar una imagen.*')
         .then(async msg2 => {
            const f = m => m.author.id === uMsg.author.id;
            const c = uMsg.channel.createMessageCollector(f);
            c.once('collect', async m => {
               deleteMsg(m);
               if (m.content.toLowerCase() === 'avatar') {
                  footer.avatar = uMsg.author.displayAvatarURL();
                  embed.setFooter(footer.text, footer.avatar);
                  await msg2.edit('¡Listo! Así quedó el mensaje con el campo **pie de página**, ¡sigamos!',
                  { embed: embed })
                  .then(m => deleteMsg(m, 3500));
                  return setTimeout(async () => {
                     await require('./sendEmbed')(sela, uMsg, embed);
                  }, 3500);
               } else if (m.content.toLowerCase() === 'null') {
                  embed.setFooter(footer.text);
                  await msg2.edit('¡Listo! Así quedó el mensaje con el campo **pie de página**, ¡sigamos!',
                  { embed: embed })
                  .then(m => deleteMsg(m, 3500));
                  return setTimeout(async () => {
                     await require('./sendEmbed')(sela, uMsg, embed);
                  }, 3500);
               } else if (m.content.toLowerCase().startsWith('http')) {
                  footer.avatar = m.content;
                  embed.setFooter(footer.text, footer.avatar);
                  await msg2.edit('¡Listo! Así quedó el mensaje con el campo **pie de página**, ¡sigamos!',
                  { embed: embed })
                  .then(m => deleteMsg(m, 3500));
                  return setTimeout(async () => {
                     await require('./sendEmbed')(sela, uMsg, embed);
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