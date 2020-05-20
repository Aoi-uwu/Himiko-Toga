const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');

module.exports = {
   name: 'ping',
   alias: 'p',
   usage: `${prefix}ping`,
   cat: 'Bot',
   perms: [],
   desc: `Pong! Mira mi latencia y la latencia de la API.`,
   run: async (sela, msg, args) => {
      const embed = new RichEmbed()
      .setAuthor(sela.user.username, sela.user.displayAvatarURL)
      .setTitle('Haciendo ping...')
      .setColor('#FFC373')
      msg.channel.send(embed)
      .then(m => {
         setTimeout(async () => {
            let ping = await m.createdTimestamp -
            msg.createdTimestamp;
            let ch = [
               'Espero esté en condiciones. u////u',
               'owo',
               'uwu'
            ];
            let a = ch[Math.floor(Math.random() * ch.length)];
            embed.setTitle('Pong! 🏓')
            .setDescription(`
               📥 **Mi latencia:** ${ping}ms
               📡 **Latencia de DiscordAPI:** `+
               `${Math.floor(sela.ping)}ms
            `)
            .setColor('#6AF291')
            .setFooter(a)
            .setTimestamp();
            await m.edit(embed);
         }, 750);
      });
   }
}