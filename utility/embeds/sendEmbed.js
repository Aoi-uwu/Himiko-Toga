const deleteMsg = require('../deleteMsg');

module.exports = async (sela, uMsg, embed) => {
   uMsg.channel.send('¡Listo! ¿Dónde quieres enviar el mensaje embebido?')
   .then(async msg1 => {
      const f = m => m.author.id === uMsg.author.id && m.mentions.channels.first();
      const c = uMsg.channel.createMessageCollector(f);
      c.once('collect', async m => {
         deleteMsg(m);
         deleteMsg(msg1);
         let channel = m.mentions.channels.first();
         channel.send(embed);
      });
   });
}