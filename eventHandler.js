const event = (e) => require(`./events/${e}`);
module.exports = (sela) => {
   sela.on('ready', () => event('ready') (sela));
   sela.on('message', msg => event('message') (sela, msg));
   sela.on('guildMemberAdd', member => event('guildMemberAdd') (sela, member));
   sela.on('guildMemberRemove', member => event('guildMemberRemove') (sela, member));
}