import taskServices from '../services/taskServices';

let postCreateTask = async (req, res) => {
   try {
      let data = await taskServices.postCreateTask(req.body);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from the server! Contact Nguyen Quan'
      })
   }
}

let getAllTasks = async (req, res) => {
   try {
      let data = await taskServices.getAllTasks();
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server ! contact Nguyen Quan'
      })
   }
}

let getTaskById = async (req, res) => {
   try {
      let data = await taskServices.getTaskById(req.query.id);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server ! contact Nguyen Quan'
      })
   }
}

let deleteTaskById = async (req, res) => {
   try {
      let data = await taskServices.deleteTaskById(req.query.id);
      return res.status(200).json(data);
   } catch (error) {
      console.log(error);
      return res.status(200).json({
         errorCode: -1,
         errorMessage: 'Error from server! contact Nguyen Quan'
      })
   }
}

module.exports = {
   postCreateTask,
   getAllTasks,
   getTaskById,
   deleteTaskById,

}