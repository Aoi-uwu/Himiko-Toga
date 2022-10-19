const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('avatar')
      .setDescription('Mira tu avatar o el de algún miembro (del servidor o global).')
      .addBooleanOption(op => op.setName('servidor')
         .setDescription('Avatar del servidor (?')
         .setRequired(true)
      ).addBooleanOption(op => op.setName('oculto')
         .setDescription('Elige si quieres que el avatar sólo sea visible para ti.')
         .setRequired(true)
      ).addUserOption(op => op.setName('usuario')
         .setDescription('Elige al usuario para ver su avatar.')
      ),
   async execute(sela, interaction) {
      const { user, member, guild, options } = interaction

      const server = options.getBoolean('servidor')
      const mention = options.getUser('usuario')
      const hidden = options.getBoolean('oculto')

      if (!server) {
         if (!mention) {
            var avatarUrl = user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            })

            return interaction.reply({
               content: `\`Tu avatar\``,
               files: [avatarUrl],
               ephemeral: hidden
            })
         }

         var avatarUrl = mention.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         })

         return interaction.reply({
            content: `\`Avatar de ${mention.username}\``,
            files: [avatarUrl],
            ephemeral: hidden
         })
      }
      if (!mention) {
         var avatarUrl = member.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         })

         return interaction.reply({
            content: `\`Tu avatar en ${guild.name}\``,
            files: [avatarUrl],
            ephemeral: hidden
         })
      }

      const guildMember = guild.members.cache.get(mention.id)

      var avatarUrl = guildMember.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      })

      interaction.reply({
         content: `\`Avatar de ${guildMember.nickname} en ${guild.name}\``,
         files: [avatarUrl],
         ephemeral: hidden
      })
   },
}