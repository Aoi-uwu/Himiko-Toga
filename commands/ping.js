const { RichEmbed } = require('discord.js');
const { prefix } = require('../config.json');

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
               'Pille ese pingo piola. Creo.',
               'Ay, mk, espero esté bien el ping.',
               'Vea ese malparido ping.'
            ];
            let a = ch[Math.floor(Math.random() * ch.length)];
            embed.setTitle('Pong! 🏓')
            .setDescription(`
               📥 **Latencia del melo:** ${ping}ms
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