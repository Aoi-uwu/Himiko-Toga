module.exports = (msg, mention_id) => {
   var member = msg.mentions.members.first();
   if (!member) {
      member = mention_id.replace(/^<@!?(\d+)>$/, '');
      member = msg.guild.members.cache.get(member);
   }
   return member;
}