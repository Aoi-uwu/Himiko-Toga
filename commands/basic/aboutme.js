const { EmbedBuilder } = require('discord.js');
const { prefix, owner } = require('../../config');
const rndColor = require('../../utility/rndColor');

module.exports = {
   name: 'aboutme',
   alias: 'am',
   usage: `${prefix}aboutme`,
   cat: 'Bot',
   perms: [],
   desc: `Conóceme un poco. uwu`,
   run: async (sela, msg, args) => {
      var about = `Hola, ${msg.author}, soy ${sela.user.username}, un bot programado en JavaScript con el entorno de ejecución` +
         ` [**Node.js**](https://nodejs.org/es/) y usando la libreria [**Discord.js**](https://discord.js.org/#/). ` +
         `Gracias a ${sela.users.cache.get(owner.id)} soy capaz de ejecutar cada uno de los comandos ` +
         `que poseo, aunque ni él ni yo podemos negar que algunos no estén *del todo* funcionales, así ` +
         `que puedes usar \`~bugreport\` para notificar a ${sela.users.cache.get(owner.id)} y que lo pueda ` +
         `resolver lo más pronto posible, puedes enviar una sugerencia usando \`~suggest\` o bien puedes escribirle directamente (aunque sinceramente **no lo recomiento**, ` +
         `podría molestarse).\nSupongo que no sería mucho más por ahora, simplemente usa \`~help\` y ` +
         `disfruta con mis comandos. owo`;
      var embed = new EmbedBuilder()
         .setAuthor({
            name: msg.author.username, iconURL: msg.author.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            })
         })
         .setDescription(about)
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .setImage('https://thumbs.gfycat.com/DownrightFemaleBobolink-small.gif')
         .setTimestamp();
      msg.channel.send({ embeds: [embed] });
   }
}