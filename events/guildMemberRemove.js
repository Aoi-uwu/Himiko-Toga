module.exports = async (sela, member) => {
   if (member.guild.id !== '391824350690672640') return;
   channel = sela.channels.cache.get('606551048362131467');
   channel.send(`**${member.user.username}** se ha ido.`, {
      files: ['https://media.tenor.com/crZCWuFP3ZcAAAAi/club-pls-clubpenguin.gif']
   })
}