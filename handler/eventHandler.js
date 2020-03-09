const event = (e) => require(`./events/${e}`);
module.exports = (sela) => {
   sela.on('ready', () => event('ready') (sela));
   sela.on('message', msg => event('message') (sela, msg));
}