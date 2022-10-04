require('dotenv').config();

module.exports = {
   owner: {
      id: "873726976760889495"
   },
   prefix: "~",
   token: process.env.TOKEN,
   api: {
      tenor: process.env.tenorapi
   },
   pass: {
      mongodb: "camiloco500"
   }
}