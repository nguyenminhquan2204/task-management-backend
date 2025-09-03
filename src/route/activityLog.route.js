import express from 'express';
import controller from '../controllers/activityLogController';

let router = express.Router();

router.post('/create-activitylog', controller.postCreateActivityLog)

router.get('/get-all-activitylog-or-user-action', controller.getAllActivityOrUserAction);

module.exports = router;