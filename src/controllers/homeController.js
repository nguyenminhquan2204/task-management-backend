import db from '../models/index';

let getHomePage = async(req, res) => {
   try {
      let data = await db.User.findAll();
      return res.json(data);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
   }
}

module.exports = {
   getHomePage: getHomePage,

}