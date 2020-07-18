const { MessageEmbed } = require('discord.js');
const { prefix, owner } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'virus',
   alias: 'spam',
   usage: `${prefix}virus`,
   cat: 'No lo uses',
   perms: ['ADMINISTRATOR'],
   desc: `Simplemente no lo uses, no es necesario.`,
   run: async (sela, msg, args) => {
      if (!msg.member.hasPermission(module.exports.perms, false, false))
         return msg.channel.send('Debes ser administrador del servidor para usar este comando, pero repito, no lo uses.');
      msg.channel.send(`Este comando está hecho por broma, ni siquiera sé porqué ${sela.users.cache.get(owner.id)} lo creó.\n`+
      `No me hago responsable de nada. ¿Quieres ejecutarlo?`)
      .then(async m => {
         await m.react('✅');
         await m.react('❌');
         const filter = (reaction, user) => {
            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === msg.author.id;
         };
         m.awaitReactions(filter, { max: 1, time: 15000, errors: ['time'] })
         .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
               msg.channel.send(new MessageEmbed()
               .setAuthor(sela.user.username, sela.user.displayAvatarURL())
               .setThumbnail(msg.author.displayAvatarURL())
               .setTitle(`Comando ejecutado`)
               .addField(`**Ejecución hecha por:**\n${msg.author.tag}`, `\`\`\`Ejecutando comando en 10 segundos... ⛔\`\`\``)
               .setColor('#FF0000')
               .setTimestamp())
               .then(m => msg.delete({timeout: 10000}));
               setTimeout(() => {
                  virusExecuted(msg);
               }, 10000);
               return;
            }
            msg.channel.send('Sabia decisión.');
         })
         .catch(() => {
            msg.reply('no has seleccionado ninguna opción, así que no haré nada.');
         });
      });
   }
}

async function virusExecuted(msg) {
   for (var i = 0; i <= 100; i++) {
      let everyone = `@everyone `;
      await msg.channel.send(`${everyone.toString().repeat(200)}`)
         .then(m => m.delete());

   }
   msg.channel.send(`Terminé. (:\n**Gomen'nasai u,n,u**`)
      .then(m => m.delete({timeout: 10000}));
}
