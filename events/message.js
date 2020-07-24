const { prefix } = require('../config');

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
   // console.log(`${msg.guild.name} => ${msg.author.tag}: ${msg.content}`);

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
   if (msg.content == `<@!${sela.user.id}>, what's your name?`) {
      msg.channel.startTyping();
      setTimeout(() => {
         msg.channel.stopTyping();
         msg.channel.send({
            files: [
               './utility/movistar.png'
            ]
         });
      }, 3000);
   }
   if (msg.content === 'wachu wachu wo')
      msg.channel.send('wachu wachu wo', {
         files: [
            './utility/fernan.mp4'
         ]
      });
   if (msg.content === 'wachi wachi wa')
      msg.channel.send('wachi wachi wa', {
         files: [
            './utility/fernan.mp4'
         ]
      });
   if (msg.content.toLowerCase() === 'what')
      msg.channel.send({
         files: [
            './utility/WHAT.mp3'
         ]
      });
   if (msg.content.toLowerCase() === 'how')
      msg.channel.send({
         files: [
            './utility/HOW.mp3'
         ]
      });
   if (msg.content.toLowerCase() === 'pongan bachata')
      msg.channel.send({
         files: [
            './utility/Propuesta Indecente.m4a'
         ]
      });
   if (msg.content === 'Hace años que ocurrió')
      msg.channel.send('Y no lo olvidaré');
   if (msg.content === 'Y no lo olvidaré')
      msg.channel.send('Las almas de los niños siempre las recordaré');
   if (msg.content === 'Las almas de los niños siempre las recordaré')
      msg.channel.send('Ya, valórate.');
   if (msg.content === 'Jueputa, puta')
      return msg.channel.send(`Jueputa, puta
Hijueputa (Hijueputa)

Jueputa, puta, jueputa, puta
Jueputa, puta, jueputa, puta
Hijueputa (Hijueputa)
Hijueputa (Hijueputa)

Vam-, Vamo' la hijueputa
Perreo hijueputa
Hijueputa, hijueputa
Hijueputa, hijueputa

Esto es un perreo hijueputa
Hijueputa, hijueputa
Hijueputa, jueputa
Jueputa-jueputa-jueputa

Vam-, Vamo' la hijueputa
Perreo hijueputa
Bellaqueo hijueputa
Vos sos un hijueputa
Hijueputa, hijueputa
Hijueputa, hijueputa
Jueputa, jueputa
Jueputa, jueputa`);
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