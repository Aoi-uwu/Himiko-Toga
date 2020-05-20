const { prefix } = require('../utility/config.json');

module.exports = async (sela, msg) => {
   if (!msg.content.startsWith(prefix)) return;
   const args = msg.content.slice(prefix.length)
   .trim().split(/ +/);
   const cmdName = args.shift().toLowerCase();
   const cmd = !sela.commands.get(cmdName) && cmdName != '' ?
      sela.aliases.get(cmdName) :
      sela.commands.get(cmdName);
   if (!cmd)
      return msg.channel.send('Revisa que hayas escrito bien el comando que querías.')
      .then(m => m.delete(2500));
   if (cmd) cmd.run(sela, msg, args);
}