module.exports = () => {
   let hex = [
      '0','1','2','3','4','5','6','7',
      '8','9','A','B','C','D','E','F'
   ];
   let rnd = [
      Math.floor(Math.random() * hex.length),
      Math.floor(Math.random() * hex.length),
      Math.floor(Math.random() * hex.length),
      Math.floor(Math.random() * hex.length),
      Math.floor(Math.random() * hex.length),
      Math.floor(Math.random() * hex.length)
   ];
   return `#${hex[rnd[Math.floor(Math.random() * rnd.length)]]}`+
   `${hex[rnd[Math.floor(Math.random() * rnd.length)]]}`+
   `${hex[rnd[Math.floor(Math.random() * rnd.length)]]}`+
   `${hex[rnd[Math.floor(Math.random() * rnd.length)]]}`+
   `${hex[rnd[Math.floor(Math.random() * rnd.length)]]}`+
   `${hex[rnd[Math.floor(Math.random() * rnd.length)]]}`;
}