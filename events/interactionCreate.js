module.exports = async (sela, interaction) => {
   if (!interaction.isChatInputCommand()) return
   if (!interaction.inGuild()) return
   const { commandName } = interaction
   const command = sela.sCommands.get(commandName)
   if (!command) return
   try {
      await command.execute(sela, interaction)
   } catch (error) {
      interaction.reply({ content: 'Parece que algo falló. Perdón. :c', ephemeral: true })
      console.error(error)
      return
   }
}