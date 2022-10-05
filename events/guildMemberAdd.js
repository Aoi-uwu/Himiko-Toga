const { AttachmentBuilder } = require('discord.js')
const { request } = require('undici')
const { createCanvas, GlobalFonts, loadImage } = require('@napi-rs/canvas')
GlobalFonts.registerFromPath('./utility/fonts/JushleyShine.otf', 'Cute Fonts')
const canvas = createCanvas(1920, 540)
const ctx = canvas.getContext('2d')

module.exports = async (sela, member) => {
   if (member.guild.id !== '391824350690672640') return
   channel = sela.channels.cache.get('606551048362131467')
   ctx.clearRect(0, 0, canvas.width, canvas.height)
   let name = member.user.username
   let avatar = member.user.displayAvatarURL({ extension: 'png' })
   let Owner = await member.guild.members.cache.get(member.guild.ownerId)
   let owner = Owner.user.displayAvatarURL({ extension: 'png' })
   let banner = 'https://i.imgur.com/OOusLeF.png'
   const avatarBody = (await request(avatar)).body
   var av = await loadImage(await avatarBody.arrayBuffer())
   ctx.drawImage(av, 780, 25, 357, 357)
   const bannerBody = (await request(banner)).body
   var bnr = await loadImage(await bannerBody.arrayBuffer())
   ctx.drawImage(bnr, 0, 0, 1920, 540)
   ctx.font = '111px "Cute Fonts"'
   ctx.fillStyle = '#FFFFFF'
   ctx.textAlign = 'center'
   ctx.fillText(name, canvas.width / 2, 500)
   const ownerBody = (await request(owner)).body
   var ownr = await loadImage(await ownerBody.arrayBuffer())
   ctx.drawImage(ownr, 25, 415, 100, 100)
   ctx.font = '55px "Cute Fonts"'
   ctx.fillStyle = '#FFFFFF'
   ctx.textAlign = 'start'
   ctx.fillText(`Owner:\n${Owner.user.tag}`, 150, 480)
   ctx.font = '80px "Cute Fonts"'
   ctx.fillStyle = '#FFFFFF'
   ctx.textAlign = 'start'
   ctx.fillText(`¡Bienvenid@ a`, canvas.width / 32, canvas.height / 4)
   ctx.fillText(`${member.guild.name}!`, canvas.width / 32, canvas.height / 2.5)
   const attach = new AttachmentBuilder(await canvas.encode('png'), { name: 'dequiswelcome.png' })
   channel.send({
      content: `${member} <3`,
      files: [attach]
   })
}
