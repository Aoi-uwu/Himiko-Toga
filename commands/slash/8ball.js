const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('8ball')
      .setDescription('Hazme preguntas. (Si las respuestas no son de sí/no, no tendrá sentido)')
      .addStringOption(op =>
         op.setName('pregunta')
            .setDescription('Escribe la pregunta')
            .setRequired(true)
      ),
   async execute(sela, interaction) {
      const { options } = interaction
      const question = options.getString('pregunta')
      var answers = [
         'Sí.', 'No.', 'A saber.', 'Yes.',
         'I guess (?', 'No, no, no.', 'Creo que no.',
         'Totalmente.', 'No estoy segura.'
      ]
      interaction.reply({
         embeds: [new EmbedBuilder()
            .setAuthor({
               name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 2048
               })
            })
            .setColor(interaction.member.displayHexColor === '#000000' ? rndColor() : interaction.member.displayHexColor)
            .addFields({ name: 'Pregunta', value: question }, { name: 'Respuesta', value: answers[Math.floor(Math.random() * answers.length)] })
            .setFooter({
               text: sela.user.username, iconURL: sela.user.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 2048
               })
            })]
      })
   },
}