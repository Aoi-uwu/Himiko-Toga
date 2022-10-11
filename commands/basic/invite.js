const { MessageEmbed } = require('discord.js');
const { prefix } = require('../../config');
const rndColor = require('../../utility/rndColor');

module.exports = {
   name: 'invite',
   alias: 'inv',
   usage: `${prefix}invite [-priv | -dm]`,
   cat: 'Bot',
   perms: [],
   desc: `Invítame a cualquier servidor donde tengas permiso para **Administrar servidor**.`,
   run: async (sela, msg, args) => {
      let invite = `https://discord.com/oauth2/authorize?client_id=${sela.user.id}&scope=bot&permissions=376826998`;
      let embed = new MessageEmbed()
      .setAuthor(msg.author.username, msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setDescription(`${msg.author}, haz clic [aquí](${invite}) para invitarme a tu servidor o `+
      `cualquiera donde tengas permiso para **Administrar servidor**. o w o`)
      .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
      .setThumbnail(msg.author.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
      .setImage('https://pa1.narvii.com/7022/c7fb3899b50bca063d926e97274780cdad10dd42r1-268-170_hq.gif')
      .setFooter('¡Gracias! >u<')
      .setTimestamp();
      if (args[0] == '-priv' || args[0] == '-dm') {
         msg.reply('revisa tu DM.');
         msg.author.send(embed);
         return;
      }
      msg.channel.send(embed);
   }
}
