const { Collection } = require('discord.js');
const fs = require('fs');

module.exports = (sela) => {
   sela.commands = new Collection();
   sela.aliases = new Collection();
   var commands = fs.readdirSync('./commands/basic/')
   .filter(f => f.endsWith('.js'));
   for (const command of commands) {
      let cmd = require(`./commands/basic/${command}`);
      sela.commands.set(cmd.name, cmd);
      sela.aliases.set(cmd.alias, cmd);
      console.log(`Command ${cmd.name} status: 👌`);
   }
}