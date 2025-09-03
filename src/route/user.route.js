import express from 'express';
import controller from '../controllers/userController';

let router = express.Router();
   
router.post("/create-user", controller.postCreateUser);

router.put('/edit-user', controller.putEditUser);

router.get('/get-all-users', controller.getAllUsers);

router.get('/get-user-by-id', controller.getUserById);

router.delete('/delete-user-by-id', controller.deleteUser);

router.get('/search-users-by-username', controller.getSearchUsersByUserName);

module.exports = router;