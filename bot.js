const { Client, Collection } = require('discord.js');
const fs = require('fs');
const miku = new Client();

miku.commands = new Collection();
miku.aliases = new Collection();
var commands = fs.readdirSync('./commands')
.filter(f => f.endsWith('.js'));
for (const command of commands) {
   let cmd = require(`./commands/${command}`);
   miku.commands.set(cmd.name, cmd);
   miku.aliases.set(cmd.alias, cmd);
   console.log(`Command ${cmd.name} status: ✅`);
}

const { token, prefix } = require('./config.json');

miku.on('ready', () => {
   console.log(`${miku.user.username} connected.`);
});

miku.on('message', async msg => {
   if (!msg.content.startsWith(prefix)) return;
   const args = msg.content.slice(prefix.length)
   .trim().split(/ +/);
   const cmdName = args.shift().toLowerCase();
   const cmd = !miku.commands.get(cmdName) ?
      miku.aliases.get(cmdName) :
      miku.commands.get(cmdName);
   if (cmd) cmd.run(miku, msg, args);
});

miku.login(token);