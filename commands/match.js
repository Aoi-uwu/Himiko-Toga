const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(3000, 1500);
const ctx = canvas.getContext('2d');
const { prefix } = require('../utility/config.json');
const getMember = require('../utility/getMember');

module.exports = {
   name: 'match',
   alias: '',
   usage: `${prefix}match [@miembro] [@miembro]`,
   cat: 'Diversión',
   perms: [],
   desc: `Haz match con cualquier miembro del servidor.`,
   run: async (sela, msg, args) => {
      if (!args[0]) {

         return;
      }
      if (!args[1]) {
         return;
      }

   }
}