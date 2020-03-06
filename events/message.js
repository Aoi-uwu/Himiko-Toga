const { prefix } = require('../config.json');

module.exports = async (sela, msg) => {
   if (!msg.content.startsWith(prefix)) return;
   const args = msg.content.slice(prefix.length)
   .trim().split(/ +/);
   const cmdName = args.shift().toLowerCase();
   const cmd = !sela.commands.get(cmdName) ?
      sela.aliases.get(cmdName) :
      sela.commands.get(cmdName);
   if (cmd) cmd.run(sela, msg, args);
}