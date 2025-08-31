let randomDigitString = (n) => {
   let result = '';
   for (let i = 0; i < n; i++) {
      result += Math.floor(Math.random() * 10);
   }
   return result;
}

module.exports = {
   randomDigitString
}