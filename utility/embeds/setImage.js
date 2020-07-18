const deleteMsg = require('../deleteMsg');

module.exports = async (sela, uMsg, msg, embed) => {
   msg.edit('¡Perfecto! ¿Qué imagen deseas colocar?\n'+
   '*Coloca un enlace de alguna imagen o GIF o escribe **avatar** si deseas usar '+
   'tu imagen de perfil.*')
   .then(async msg1 => {
      const f = m => m.author.id === uMsg.author.id;
      const c = uMsg.channel.createMessageCollector(f);
      c.once('collect', async m => {
         deleteMsg(m);
         if (m.content.toLowerCase() === 'avatar') {
            let image = uMsg.author.displayAvatarURL();
            embed.setImage(image);
            await msg1.edit('¡Listo! Así quedó el mensaje con el campo **imagen**, ¡sigamos!',
            { embed: embed });
            return;
         } else if (m.content.toLowerCase().startsWith('http')) {
            let image = m.content;
            embed.setImage(image);
            await msg1.edit('¡Listo! Así quedó el mensaje con el campo **imagen**, ¡sigamos!',
            { embed: embed })
            .then(m => deleteMsg(m, 3500));
            return setTimeout(async () => {
               await uMsg.channel.send('Sigamos con el campo **pie de página**, ¿deseas agregarlo?')
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
                        await require('./setFooter')(sela, uMsg, msg2, embed);
                        return;
                     }
                     await msg2.reactions.cache.each(r => r.remove());
                     await require('./sendEmbed')(sela, uMsg, embed);
                  });
               });
            }, 3500);
         } else {
            await uMsg.channel.send('Vaya, parece que no has ingresado un valor válido.\n'+
            'Tendrás que empezar nuevamente')
            .then(m => deleteMsg(m, 5000));
            return;
         }
      })
   });
}