const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const { owner } = require('../../config')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('aboutme')
      .setDescription('Conóceme un poco. uwu'),
   async execute(sela, interaction) {
      var about = `Hola, ${interaction.user}, soy ${sela.user.username}, un bot programado en JavaScript con el entorno de ejecución` +
         ` [**Node.js**](https://nodejs.org/es/) y usando la libreria [**Discord.js**](https://discord.js.org/#/). ` +
         `Gracias a ${sela.users.cache.get(owner.id)} soy capaz de ejecutar cada uno de los comandos ` +
         `que poseo, aunque ni él ni yo podemos negar que algunos no estén *del todo* funcionales, así ` +
         `que puedes usar \`/bugreport\` para notificar a ${sela.users.cache.get(owner.id)} y que lo pueda ` +
         `resolver lo más pronto posible, puedes enviar una sugerencia usando \`/suggest\` o bien puedes escribirle directamente (aunque sinceramente **no lo recomiendo**, ` +
         `podría molestarse).\nSupongo que no sería mucho más por ahora, simplemente usa \`/help\` y ` +
         `disfruta con mis comandos. (¡Sí, ahora tengo compatibilidad con comandos integrados! >w<)`
      var embed = new EmbedBuilder()
         .setAuthor({
            name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            })
         })
         .setDescription(about)
         .setColor(interaction.member.displayHexColor === '#000000' ? rndColor() : interaction.member.displayHexColor)
         .setImage('https://thumbs.gfycat.com/DownrightFemaleBobolink-small.gif')
         .setTimestamp()
      interaction.reply({ embeds: [embed], ephemeral: true })
   },
}