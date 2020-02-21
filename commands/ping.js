module.exports = {
   name: 'ping',
   aliases: ['p'],
   desc: 'Pong!',
   run: async (miku, msg, args) => {
      msg.channel.send('Pong 🏓');
   }
}