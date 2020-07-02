const { RichEmbed } = require('discord.js');
const { prefix, owner } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'reload',
   alias: '',
   usage: `${prefix}reload <comando>`,
   cat: 'Bot',
   perms: ['CREATOR'],
   desc: `Recarga uno de mis comandos.`,
   run: async (sela, msg, args) => {
      if (msg.author.id !== owner.id)
         return msg.channel.send('No eres mi creador, así que no puedes usar este comando.');
      if (!args[0])
         return msg.channel.send('Debes especificar el comando que quieras recargar.');
      let cmdName = args[0].toLowerCase();
      try {
         delete require.cache[require.resolve(`./${cmdName}.js`)];
         sela.commands.delete(cmdName);
         const pull = require(`./${cmdName}.js`);
         sela.commands.set(cmdName, pull);
         msg.channel.send(`El comando **${cmdName}** ha sido actualizado.`);
      } catch (e) {
         msg.channel.send(`Ehm... No he podido recargar ese comando, perdón.`);
      }
   }
}