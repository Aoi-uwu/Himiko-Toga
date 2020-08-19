const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const Danbooru = require('danbooru');
const login = 'Selita';
const key = 'xHxb3nWbnjGsamPzupKTG4t2';
const booru = new Danbooru(login + ':' + key);
const fetch = require('node-fetch');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'boobs',
   alias: 'tiddies',
   usage: `${prefix}boobs`,
   cat: 'NSFW',
   perms: [],
   desc: `El nombre es bastante claro.`,
   run: async (sela, msg, args) => {
      const posts = await booru.posts({ limit: 100, tags: 'boobs', random: true });
      const img = posts[Math.floor(Math.random() * posts.length)].file_url;
      console.log(img);
   }
}