const { Client, GatewayIntentBits, Collection } = require('discord.js')
const fs = require('fs')
const sela = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildBans,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.GuildWebhooks,
      GatewayIntentBits.GuildInvites,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMessageTyping,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.DirectMessageTyping
   ]
})

sela.sCommands = new Collection()
const cmdFiles = fs.readdirSync('./commands/slash/').filter(file => file.endsWith('.js'))
for (const file of cmdFiles) {
   const command = require(`./commands/slash/${file}`)
   sela.sCommands.set(command.data.name, command)
}

const { token } = require('./config')

require('./cmdHandler')(sela)

require('./eventHandler')(sela)

sela.login(token)