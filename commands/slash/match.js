const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js')
const rndColor = require('../../utility/rndColor')
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas')
GlobalFonts.registerFromPath('./utility/fonts/JushleyShine.otf', 'Cute Fonts')
const canvas = createCanvas(3000, 1500)
const ctx = canvas.getContext('2d')

module.exports = {
   data: new SlashCommandBuilder()
      .setName('match')
      .setDescription('Haz match con alguien.')
      .addUserOption(op => op.setName('usuario1')
         .setDescription('Con quién quieres hacer match'))
      .addUserOption(op => op.setName('usuario2')
         .setDescription('Para hacer match de las 2 personas mencionadas')),
   async execute(sela, interaction) {
      const { user, guild, options } = interaction

      const user1 = options.getUser('usuario1')
      const user2 = options.getUser('usuario2')
      const member = guild.members.cache.get(user.id)

      if (!user1) {
         if (!user2) {
            let me = user.username
            let meA = member.nickname || me
            let rnd = guild.members.cache.filter(m => m.id !== user.id).random()
            let match = rnd.user.username
            let matchA = rnd.nickname || match
            loadImage(user.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
               .then(img1 => {
                  ctx.drawImage(img1, 0, 0, 1500, 1500)
                  loadImage(rnd.user.displayAvatarURL({
                     format: 'png',
                     dynamic: true,
                     size: 2048
                  }))
                     .then(async img2 => {
                        ctx.drawImage(img2, 1500, 0, 1500, 1500)
                        let matchName1 = `${me.slice(0, me.length / 2)}${match.slice(match.length / 2)}`
                        let matchName2 = `${meA.slice(0, meA.length / 2)}${matchA.slice(matchA.length / 2)}`
                        let emotes = [
                           '<a:love1:687056905100984494>',
                           '<a:love2:687056904815771821>',
                           '<a:love3:687056903737573439>',
                           '<a:love4:687056904312455323>',
                           '<a:love5:687056904370782284>',
                           '<a:love6:687056904199209041>'
                        ]
                        let idx = Math.floor(Math.random() * emotes.length)
                        if ((meA == me && matchA == match) ||
                           (meA == me && matchA != match) ||
                           (meA != me && matchA == match)) {
                           const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'match.png' })
                           await interaction.reply({
                              content: 'Cargando match...'
                           })
                           setTimeout(() => {
                              interaction.editReply({
                                 content: `**${matchName1}** ${emotes[idx]}`,
                                 files: [attach]
                              })
                           }, 5000)
                           return
                        } else {
                           const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'match.png' })
                           await interaction.reply({
                              content: 'Cargando match...'
                           })
                           setTimeout(() => {
                              interaction.editReply({
                                 content: `**${matchName1}** | **${matchName2}** ${emotes[idx]}`,
                                 files: [attach]
                              })
                           }, 5000)
                           return
                        }
                     })
               })
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            return
         }
         return interaction.reply({
            content: 'No puedes mencionar un segundo usuario sin mencionar el primero.',
            ephemeral: true
         })
      }
      if (!user2) {
         const member1 = guild.members.cache.get(user1.id)
         let me = user.username
         let meA = member.nickname || me
         let match = user1.username
         let matchA = member1.nickname || match
         loadImage(user.displayAvatarURL({
            format: 'png',
            dynamic: true,
            size: 2048
         }))
            .then(img1 => {
               ctx.drawImage(img1, 0, 0, 1500, 1500)
               loadImage(user1.displayAvatarURL({
                  format: 'png',
                  dynamic: true,
                  size: 2048
               }))
                  .then(async img2 => {
                     ctx.drawImage(img2, 1500, 0, 1500, 1500)
                     let matchName1 = `${me.slice(0, me.length / 2)}${match.slice(match.length / 2)}`
                     let matchName2 = `${meA.slice(0, meA.length / 2)}${matchA.slice(matchA.length / 2)}`
                     let emotes = [
                        '<a:love1:687056905100984494>',
                        '<a:love2:687056904815771821>',
                        '<a:love3:687056903737573439>',
                        '<a:love4:687056904312455323>',
                        '<a:love5:687056904370782284>',
                        '<a:love6:687056904199209041>'
                     ]
                     let idx = Math.floor(Math.random() * emotes.length)
                     if ((meA == me && matchA == match) ||
                        (meA == me && matchA != match) ||
                        (meA != me && matchA == match)) {
                        const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'match.png' })
                        await interaction.reply({
                           content: 'Cargando match...'
                        })
                        setTimeout(() => {
                           interaction.editReply({
                              content: `**${matchName1}** ${emotes[idx]}`,
                              files: [attach]
                           })
                        }, 5000)
                        return
                     } else {
                        const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'match.png' })
                        await interaction.reply({
                           content: 'Cargando match...'
                        })
                        setTimeout(() => {
                           interaction.editReply({
                              content: `**${matchName1}** | **${matchName2}** ${emotes[idx]}`,
                              files: [attach]
                           })
                        }, 5000)
                        return
                     }
                  })
            })
         ctx.clearRect(0, 0, canvas.width, canvas.height)
         return
      }
      const member1 = guild.members.cache.get(user1.id)
      const member2 = guild.members.cache.get(user2.id)
      let me = user1.username
      let meA = member1.nickname || me
      let match = user2.username
      let matchA = member2.nickname || match
      loadImage(user1.displayAvatarURL({
         format: 'png',
         dynamic: true,
         size: 2048
      }))
         .then(img1 => {
            ctx.drawImage(img1, 0, 0, 1500, 1500)
            loadImage(user2.displayAvatarURL({
               format: 'png',
               dynamic: true,
               size: 2048
            }))
               .then(async img2 => {
                  ctx.drawImage(img2, 1500, 0, 1500, 1500)
                  let matchName1 = `${me.slice(0, me.length / 2)}${match.slice(match.length / 2)}`
                  let matchName2 = `${meA.slice(0, meA.length / 2)}${matchA.slice(matchA.length / 2)}`
                  let emotes = [
                     '<a:love1:687056905100984494>',
                     '<a:love2:687056904815771821>',
                     '<a:love3:687056903737573439>',
                     '<a:love4:687056904312455323>',
                     '<a:love5:687056904370782284>',
                     '<a:love6:687056904199209041>'
                  ]
                  let idx = Math.floor(Math.random() * emotes.length)
                  if ((meA == me && matchA == match) ||
                     (meA == me && matchA != match) ||
                     (meA != me && matchA == match)) {
                     const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'match.png' })
                     await interaction.reply({
                        content: 'Cargando match...'
                     })
                     setTimeout(() => {
                        interaction.editReply({
                           content: `**${matchName1}** ${emotes[idx]}`,
                           files: [attach]
                        })
                     }, 5000)
                     return
                  } else {
                     const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'match.png' })
                     await interaction.reply({
                        content: 'Cargando match...'
                     })
                     setTimeout(() => {
                        interaction.editReply({
                           content: `**${matchName1}** | **${matchName2}** ${emotes[idx]}`,
                           files: [attach]
                        })
                     }, 5000)
                     return
                  }
               })
         })
      ctx.clearRect(0, 0, canvas.width, canvas.height)
   },
}