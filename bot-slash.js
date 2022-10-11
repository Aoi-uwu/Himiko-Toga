const { REST, Routes } = require('discord.js')
const { clientId, guildId } = require('./config')
const { readdirSync } = require('fs')
require('dotenv').config()

const commands = []
const commandFiles = readdirSync('./commands/slash').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/slash/${file}`)
	commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error)
