const { prefix } = require('../utility/config.json');

module.exports = async (sela, msg) => {
   if (msg.mentions.users.has(sela.user.id)) {
      var say = [
         'Nani?', `Holi, ${msg.author}.`,
         `${msg.author}`, '¿Por qué me mencionas? Sabes que no te puedo contestar.',
         'Arroba Himiko Toga.', '<a:wavingCute:720297656831705219>',
         's t o p .'
      ];
      if (Math.floor(Math.random() * 2) == 0) return;
      msg.channel.startTyping();
      setTimeout(() => {
         msg.channel.stopTyping();
         msg.channel.send(say[Math.floor(Math.random() * say.length)]);
      }, 1000);
   }
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