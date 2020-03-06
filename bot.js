const { Client, Collection } = require('discord.js');
const fs = require('fs');
const sela = new Client();

sela.commands = new Collection();
sela.aliases = new Collection();
var commands = fs.readdirSync('./commands')
.filter(f => f.endsWith('.js'));
for (const command of commands) {
   let cmd = require(`./commands/${command}`);
   sela.commands.set(cmd.name, cmd);
   sela.aliases.set(cmd.alias, cmd);
   console.log(`Command ${cmd.name} status: 👌`);
}

const { token, prefix } = require('./config.json');

sela.on('ready', () => {
   console.log(`${sela.user.username} connected.`);
});

sela.on('message', async msg => {
   if (!msg.content.startsWith(prefix)) return;
   const args = msg.content.slice(prefix.length)
   .trim().split(/ +/);
   const cmdName = args.shift().toLowerCase();
   const cmd = !sela.commands.get(cmdName) ?
      sela.aliases.get(cmdName) :
      sela.commands.get(cmdName);
   if (cmd) cmd.run(sela, msg, args);
});

sela.login(token);