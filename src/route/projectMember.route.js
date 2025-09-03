import express from 'express';
import controller from '../controllers/projectMemberController';

let router = express.Router();

router.post('/create-project-member', controller.postCreateProjectMember);

module.exports = router;