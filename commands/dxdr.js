const { RichEmbed } = require('discord.js');
const { prefix } = require('../utility/config.json');
const rndColor = require('../utility/rndColor');

module.exports = {
   name: 'dxdr',
   alias: 'dxdr',
   usage: `${prefix}dxdr`,
   cat: 'DXD',
   perms: ['DXD'],
   desc: `Dequisdé`,
   run: async (sela, msg, args) => {
      if (msg.guild.id !== '391824350690672640')
         return msg.channel.send('no');
      var dxd = [
         '<:DXDy:676361282496233474>', '<:DXDveneco:696187893072396298>',
         '<:DXDSans:676361282160558083>', '<:DXDSad:676352445168877605>',
         '<a:DXDr:676353295761145896>', '<:DXDr:676361281778876437>',
         '<:DXDperuano:676361281334280193>', '<:DXDParaguayo:698408277243068416>',
         '<:DXDp:676361278796595211>', '<:DXDMorado:704852401575952515>',
         '<:DXDInvisible:676607613248471080>', '<a:DXDinfinitum:691488368537894933>',
         '<:DXDGold:676361279161761792>', '<:DXDg:676361278591336469>',
         '<:DXDCool:676361278285021205>', '<:DXDb:676361278528159772>',
         '<a:DXDance:691492809533947964>', '<:DXD19:691441817400508496>',
         '<:dxd:653114549213462529>', '<:felizcumplemipana:716026915013525604>'
      ];
      var rnd = Math.floor(Math.random() * dxd.length);
      var color = msg.member.displayHexColor === '#000000' ? rndColor() : msg.member.displayHexColor;
      var embed = new RichEmbed()
      .setFooter(msg.author.username, msg.author.displayAvatarURL)
      .setColor(color);
      msg.channel.send(dxd[rnd], { embed: embed });
   }
}