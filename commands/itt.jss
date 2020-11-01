const { MessageEmbed } = require('discord.js');
const { prefix } = require('../config');
const rndColor = require('../utility/rndColor');
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
// const fileName = 'Local image file, e.g. /path/to/image.png';

// Performs text detection on the local file


module.exports = {
   name: 'itt',
   alias: 'imagetotext',
   usage: `${prefix}imagetotext`,
   cat: 'Utilidad',
   perms: ['ATTACH_FILES'],
   desc: `Saca el texto de una imagen adjuntada.`,
   run: async (sela, msg, args) => {
      if (!msg.member.hasPermission(module.exports.perms, false))
         return msg.channel.send('No tienes permiso para subir archivos.');
      if (!msg.attachments)
         return msg.channel.send('Debes subir una imagen.');
      const fileName = msg.attachments.first().url;
      const [result] = await client.textDetection(fileName);
      const detections = result.textAnnotations;
      detections.forEach(text => msg.channel.send(text));
   }
}
