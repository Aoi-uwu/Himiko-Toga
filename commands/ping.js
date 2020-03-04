const { RichEmbed } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
   name: 'ping',
   alias: 'p',
   usage: `${prefix}ping`,
   cat: 'Bot',
   perms: [],
   desc: `Pong! Mira mi latencia y la latencia de la API.`,
   run: async (miku, msg, args) => {
      const embed = new RichEmbed()
      .setAuthor(miku.user.username, miku.user.displayAvatarURL)
      .setTitle('Haciendo ping...')
      .setColor('#FFC373')
      msg.channel.send(embed)
      .then(m => {
         setTimeout(async () => {
            let ping = await m.createdTimestamp -
            msg.createdTimestamp;
            let ch = [
               '¿Realmente ese es mi ping? o.o',
               '¿Te parece que está bien? No lo puedo ver. XD',
               'Sólo espero que no esté mal. uwu'
            ];
            let a = ch[Math.floor(Math.random() * ch.length)];
            embed.setTitle('Pong! 🏓')
            .setDescription(`
               📥 **Mi latencia:** ${ping}ms
               📡 **Latencia de DiscordAPI:** `+
               `${Math.floor(miku.ping)}ms
            `)
            .setColor('#6AF291')
            .setFooter(a)
            .setTimestamp();
            await m.edit(embed);
         }, 750);
      });
   }
}