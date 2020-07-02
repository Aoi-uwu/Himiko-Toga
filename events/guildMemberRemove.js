module.exports = async (sela, member) => {
   if (member.guild.id !== '391824350690672640') return;
   channel = sela.channels.get('606551048362131467');
   channel.send(`${member} la mató. <:DXDSad:676352445168877605>`);
}