let randomString = (n) => {
  const stringValue = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAMNBVCXZ';
  let result = '';
  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * stringValue.length);
    result += stringValue[randomIndex];
  }
  return result;
};

module.exports = {
  randomString
};
