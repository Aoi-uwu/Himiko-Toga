const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong! Mira mi latencia y la latencia de la API.'),
	async execute(sela, interaction) {
		const embed = new EmbedBuilder()
			.setAuthor({
				name: sela.user.username,
				iconURL: sela.user.displayAvatarURL({
					format: 'png',
					dynamic: true,
					size: 2048
				})
			})
			.setTitle('Haciendo ping...')
			.setColor('#FFC373')
		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		}).then(async i => {
			var now = Date.now()
			var ping = Math.floor(Math.abs(now - await interaction.createdTimestamp)/1000)
			setTimeout(async () => {
				let ch = [
					'Espero esté en condiciones. u////u',
					'owo',
					'uwu'
				]
				let a = ch[Math.floor(Math.random() * ch.length)]
				embed.setTitle('Pong! 🏓')
					.setDescription(`📥 **Mi latencia:** ${ping}ms
📡 **Latencia de DiscordAPI:** `+ `${Math.floor(sela.ws.ping)}ms`)
					.setColor('#6AF291')
					.setFooter({ text: a })
					.setTimestamp()
				await interaction.editReply({ embeds: [embed] })
			}, 750)
		})
	},
}