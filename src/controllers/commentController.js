import commentServices from '../services/commentServices';

let postCreateComment = async (req, res) => {
   try {
      let data = await commentServices.postCreateComment(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

let getAllComments = async (req, res) => {
   try {
      let data = await commentServices.getAllComments(req.query);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from Server! Contact Nguyen Quan'
      })
   }
}

let deleteCommentById = async (req, res) => {
   try {
      let data = await commentServices.deleteCommentById(req.query);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! Contact Nguyen Quan'
      })
   }
}

module.exports = {
   postCreateComment,
   getAllComments,
   deleteCommentById,

}
