const { prefix } = require('../config.json');

module.exports = {
   name: 'ping',
   alias: 'p',
   usage: `${prefix}ping`,
   cat: 'test',
   perms: [],
   desc: `Pong!`,
   run: async (miku, msg, args) => {
      msg.channel.send('Pong 🏓');
   }
}