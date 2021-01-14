const { prefix, pass } = require('../config');
const MongoClient = require('mongodb').MongoClient;
var url = `mongodb+srv://Sela:${pass.mongodb}@leveling.5ddm6.mongodb.net/Leveling?retryWrites=true&w=majority`;

var emojis = ['😺','😸','😹','😻','😼','😽','🙀',
'😿','😾','🐱‍👤','🐱‍🏍','🐱‍💻','🐱‍🐉','🐱‍👓','🐱‍🚀','🙈','🙉',
'🙊','🐵','🐶','🐺','🐱','🦁','🐯','🦒','🦊','🦝',
'🐮','🐷','🐗','🐭','🐹','🐰','🐻','🐨','🐼','🐸',
'🦓','🐴','🦄','🐔','🐲','🐽','🐾','🐒','🦍','🦧',
'🦮','🐕‍🦺','🐩','🐕','🐈','🐅','🐆','🐎','🦌','🦏',
'🦛','🐂','🐃','🐄','🐖','🐏','🐑','🐐','🐪','🐫',
'🦙','🦘','🦥','🦨','🦡','🐘','🐁','🐀','🦔','🐇',
'🐿','🦎','🐊','🐢','🐍','🐉','🦕','🦖','🦦','🦈',
'🐬','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦞',
'🦀','🐚','🦆','🐓','🦃','🦅','🕊','🦢','🦜','🦩','🦚',
'🦉','🐦','🐧','🐥','🐤','🐣','🦇','🦋','🐌','🐛',
'🦟','🦗','🐜','🐝','🐞','🦂','🕷','🕸','🦠',
'🧞‍♀️','🧞‍♂️','🗣','👤','👥','🦴','🦷','👅','👄','🧠',
'🦾','🦿','👣','🤺','⛷','🤼‍♂️','🤼‍♀️','👯‍♂️','👯‍♀️','💑',
'👩‍❤️‍👩','👨‍❤️‍👨','💏','👩‍❤️‍💋‍👩','👨‍❤️‍💋‍👨','👪','👨‍👩‍👦','👨‍👩‍👧','👨‍👩‍👧‍👦',
'👨‍👩‍👦‍👦','👨‍👩‍👧‍👧','👨‍👨‍👦','👨‍👨‍👧','👨‍👨‍👧‍👦','👨‍👨‍👦‍👦','👨‍👨‍👧‍👧','👩‍👩‍👦',
'👩‍👩‍👧','👩‍👩‍👧‍👦','👩‍👩‍👦‍👦','👩‍👩‍👧‍👧','👩‍👦','👩‍👧','👩‍👧‍👦','👩‍👦‍👦','👩‍👧‍👧',
'👨‍👦','👨‍👧','👨‍👧‍👦','👨‍👦‍👦','👨‍👧‍👧','👭','👩🏻‍🤝‍👩🏻','👩🏼‍🤝‍👩🏻','👩🏼‍🤝‍👩🏼','👩🏽‍🤝‍👩🏻',
'👩🏽‍🤝‍👩🏼','👩🏽‍🤝‍👩🏽','👩🏾‍🤝‍👩🏻','👩🏾‍🤝‍👩🏼','👩🏾‍🤝‍👩🏽','👩🏾‍🤝‍👩🏾','👩🏿‍🤝‍👩🏻','👩🏿‍🤝‍👩🏼','👩🏿‍🤝‍👩🏽','👩🏿‍🤝‍👩🏾',
'👩🏿‍🤝‍👩🏿','👫','👩🏻‍🤝‍🧑🏻','👩🏻‍🤝‍🧑🏼','👩🏻‍🤝‍🧑🏽','👩🏻‍🤝‍🧑🏾','👩🏻‍🤝‍🧑🏿','👩🏼‍🤝‍🧑🏻','👩🏼‍🤝‍🧑🏼','👩🏼‍🤝‍🧑🏽',
'👩🏼‍🤝‍🧑🏾','👩🏼‍🤝‍🧑🏿','👩🏽‍🤝‍🧑🏻','👩🏽‍🤝‍🧑🏼','👩🏽‍🤝‍🧑🏽','👩🏽‍🤝‍🧑🏾','👩🏽‍🤝‍🧑🏿','👩🏾‍🤝‍🧑🏻','👩🏾‍🤝‍🧑🏼','👩🏾‍🤝‍🧑🏽',
'👩🏾‍🤝‍🧑🏾','👩🏾‍🤝‍🧑🏿','👩🏿‍🤝‍🧑🏻','👩🏿‍🤝‍🧑🏼','👩🏿‍🤝‍🧑🏽','👩🏿‍🤝‍🧑🏾','👩🏿‍🤝‍🧑🏿','👬','👨🏻‍🤝‍👨🏻','👨🏼‍🤝‍👨🏻',
'👨🏼‍🤝‍👨🏼','👨🏽‍🤝‍👨🏻','👨🏽‍🤝‍👨🏼','👨🏽‍🤝‍👨🏽','👨🏾‍🤝‍👨🏻','👨🏾‍🤝‍👨🏼','👨🏾‍🤝‍👨🏽','👨🏾‍🤝‍👨🏾','👨🏿‍🤝‍👨🏻','👨🏿‍🤝‍👨🏼',
'👨🏿‍🤝‍👨🏽','👨🏿‍🤝‍👨🏾','👨🏿‍🤝‍👨🏿','👩','👨','🧑','👧','👦','🧒','👶',
'👵','👴','🧓','👩‍🦰','👨‍🦰','👩‍🦱','👨‍🦱','👩‍🦲','👨‍🦲','👩‍🦳',
'👨‍🦳','👱‍♀️','👱‍♂️','👸','🤴','👳‍♀️','👳‍♂️','👲','🧔','👼',
'🤶','🎅','👮‍♀️','👮‍♂️','🕵️‍♀️','🕵️‍♂️','💂‍♀️','💂‍♂️','👷‍♀️','👷‍♂️',
'👩‍⚕️','👨‍⚕️','👩‍🎓','👨‍🎓','👩‍🏫','👨‍🏫','👩‍⚖️','👨‍⚖️','👩‍🌾','👨‍🌾',
'👩‍🍳','👨‍🍳','👩‍🔧','👨‍🔧','👩‍🏭','👨‍🏭','👩‍💼','👨‍💼','👩‍🔬','👨‍🔬',
'👩‍💻','👨‍💻','👩‍🎤','👨‍🎤','👩‍🎨','👨‍🎨','👩‍✈️','👨‍✈️','👩‍🚀','👨‍🚀',
'👩‍🚒','👨‍🚒','🧕','👰','🤵','🤱','🤰','🦸‍♀️','🦸‍♂️','🦹‍♀️',
'🦹‍♂️','🧙‍♀️','🧙‍♂️','🧚‍♀️','🧚‍♂️','🧛‍♀️','🧛‍♂️','🧜‍♀️','🧜‍♂️','🧝‍♀️',
'🧝‍♂️','🧟‍♀️','🧟‍♂️','🙍‍♀️','🙍‍♂️','🙎‍♀️','🙎‍♂️','🙅‍♀️','🙅‍♂️','🙆‍♀️',
'🙆‍♂️','🧏‍♀️','🧏‍♂️','💁‍♀️','💁‍♂️','🙋‍♀️','🙋‍♂️','🙇‍♀️','🙇‍♂️','🤦‍♀️',
'🤦‍♂️','🤷‍♀️','🤷‍♂️','💆‍♀️','💆‍♂️','💇‍♀️','💇‍♂️','🧖‍♀️','🧖‍♂️','🤹‍♀️',
'🤹‍♂️','👩‍🦽','👨‍🦽','👩‍🦼','👨‍🦼','👩‍🦯','👨‍🦯','🧎‍♀️','🧎‍♂️','🧍‍♀️','🧍‍♂️',
'🚶‍♀️','🚶‍♂️','🏃‍♀️','🏃‍♂️','💃','🕺','🧗‍♀️','🧗‍♂️','🧘‍♀️','🧘‍♂️','🛀',
'🛌','🕴','🏇','🏂','🏌️‍♀️','🏌️‍♂️','🏄‍♀️','🏄‍♂️','🚣‍♀️','🚣‍♂️','🏊‍♀️',
'🏊‍♂️','🤽‍♀️','🤽‍♂️','🤾‍♀️','🤾‍♂️','⛹️‍♀️','⛹️‍♂️','🏋️‍♀️','🏋️‍♂️','🚴‍♀️','🚴‍♂️',
'🚵‍♀️','🚵‍♂️','🤸‍♀️','🤸‍♂️'];

module.exports = async (sela, msg) => {
   if (msg.author.bot) return;

   if (msg.guild && msg.guild.id == '391824350690672640') {
      for (let i = 0; i < emojis.length; i++) {
         if (msg.content.includes(emojis[i])) {
            msg.delete();
            await msg.reply('aquí no.');
            await msg.channel.send('<a:fastomop:727881429383380993>');
            break;
         }
      }
   }
   if (msg.content == `<@!${sela.user.id}>`) {
      var say = [
         'Nani?', `Holi, ${msg.author}.`,
         `${msg.author}`, '¿Por qué me mencionas? Sabes que no te puedo contestar.',
         'Arroba Himiko Toga.', '<a:wavingCute:720297656831705219>',
         's t o p .',
         'Joder, buenas tardes.'
      ];
      if (Math.floor(Math.random() * 2) == 0) {

      } else {
         msg.channel.startTyping();
         setTimeout(() => {
            msg.channel.stopTyping();
            msg.channel.send(say[Math.floor(Math.random() * say.length)]);
         }, 1000);
      }
   }
   if (msg.content.toLowerCase() === 'what')
      msg.channel.send({
         files: [
            './utility/WHAT.m4a'
         ]
      });
   if (msg.content.toLowerCase() === 'how')
      msg.channel.send({
         files: [
            './utility/HOW.mp3'
         ]
      });

   if (!msg.guild.id) return;
   MongoClient.connect(url, (err, db) => {
      if (err) throw err;
      console.log('Database created');
      if (msg.channel.id == '799410344451768334')
         msg.channel.send('Database created');
      db.close();
   });
   /*const xp = await bd.fetch(`xp.${msg.guild.id}.${msg.author.id}`);
   if (xp === null || xp === undefined) bd.set(`xp.${msg.guild.id}.${msg.author.id}`, { xp: 0, lvl: 1 });
   let rndxp = msg.author.id === owner.id ? Math.floor(Math.random() * 100) + 10 : Math.floor(Math.random() * 100) + 5;
   let nxtlvl = parseInt(bd.fetch(`xp.${msg.guild.id}.${msg.author.id}.lvl`)) * 1000;
   let xpBlacklist = await bd.fetch(`levelup.${msg.guild.id}.blacklist`);
   if (xpBlacklist === null || xpBlacklist === undefined) xpBlacklist = [];
   if (msg.content.startsWith(pre.fix) || !isNaN(msg.content)) {
      bd.add(`xp.${msg.guild.id}.${msg.author.id}.xp`, 0);
   } else if (xpBlacklist.includes(msg.channel.id)) {
      bd.add(`xp.${msg.guild.id}.${msg.author.id}.xp`, 0);
   } else {
      bd.add(`xp.${msg.guild.id}.${msg.author.id}.xp`, parseInt(rndxp));
   }*/
   
   if (!msg.content.startsWith(prefix)) return;
   const args = msg.content.slice(prefix.length)
   .trim().split(/ +/);
   const cmdName = args.shift().toLowerCase();
   const cmd = !sela.commands.get(cmdName) && cmdName != '' ?
      sela.aliases.get(cmdName) :
      sela.commands.get(cmdName);
   if (!cmd)
      return msg.channel.send('Revisa que hayas escrito bien el comando que querías.')
      .then(m => m.delete({timeout: 2500}));
   if (cmd) cmd.run(sela, msg, args);
}
