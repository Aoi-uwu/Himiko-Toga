const { RichEmbed } = require('discord.js');
const { prefix, api } = require('../config.json');
const fetch = require('node-fetch');

module.exports = {
   name: 'cry',
   alias: '',
   usage: `${prefix}cry [@miembro]`,
   cat: 'Acción',
   perms: [],
   desc: `Pues... El mismo nombre lo indica.`,
   run: async (miku, msg, args) => {
      fetch(`https://api.tenor.com/v1/search?q=anime%20cry&limit=10`+
      `&key=${api.tenor}`, { method: "GET" })
      .then(res => res.json())
      .then(data => {
         var img = data.results[Math.floor(Math.random() * data.results.length)]
      })
   }
   var user = msg.mentions.users.first();
      if (!user) {

         return;
      }
}