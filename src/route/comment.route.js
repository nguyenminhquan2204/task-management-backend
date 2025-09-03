import express from 'express';
import controller from '../controllers/commentController';

let router = express.Router();

router.post('/create-comment', controller.postCreateComment);

router.get('/get-all-comments-or-userId', controller.getAllComments);

router.delete('/delete-comment-by-id', controller.deleteCommentById);

module.exports = router;
