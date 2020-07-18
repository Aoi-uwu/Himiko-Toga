const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'users',
   alias: '',
   usage: `${prefix}users`,
   cat: 'Bot',
   perms: [],
   desc: `Te muestro la cantidad de servidores en los que estoy y cuántos usuarios interactúan conmigo.`,
   run: async (sela, msg, args) => {
      msg.channel.send('<a:aww:733054268327854210>', {
         embed: new MessageEmbed()
         .setAuthor(msg.author.username, msg.author.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }))
         .setColor(msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor)
         .addField('Usuarios', sela.users.cache.size, true)
         .addField('Servidores', sela.guilds.cache.size, true)
         .setImage('https://i.pinimg.com/originals/0c/35/0c/0c350cb53879b53e042e2145c689aa91.gif')
         .setFooter(msg.guild.name, msg.guild.iconURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }))
         .setTimestamp()
      });
   }
}