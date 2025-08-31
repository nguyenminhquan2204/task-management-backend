import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashValue = async (value) => {
   try {
      let hash = await bcrypt.hash(value, salt);
      return hash;
   } catch (error) {
      console.log('Error from hash value!!');
   }
}

module.exports = {
   hashValue
}