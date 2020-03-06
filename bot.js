const { Client } = require('discord.js');
const sela = new Client();
const { token } = require('./config.json');

require('./cmdHandler')(sela);
require('./eventHandler')(sela);

sela.login(token);