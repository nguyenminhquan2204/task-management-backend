import systemConfig from '../config/system';
import authMiddleware from '../middlewares/client/auth.middleware';
import userRouter from './user.route';
import loginRouter from './login.route';
import projectRouter from './project.route';
import taskRouter from './task.route';
import commentRouter from './comment.route';
import projectMemberRouter from './projectMember.route';
import activityLogRouter from './activityLog.route';

module.exports = (app) => {
   app.use(
      systemConfig.prefixPath,
      loginRouter
   )
   app.use(
      systemConfig.prefixPath + '/user',
      authMiddleware.requiredAuth,
      userRouter
   )
   app.use(
      systemConfig.prefixPath + '/project',
      authMiddleware.requiredAuth,
      projectRouter
   )
   app.use(
      systemConfig.prefixPath + '/task',
      authMiddleware.requiredAuth,
      taskRouter
   )
   app.use(
      systemConfig.prefixPath + '/comment',
      authMiddleware.requiredAuth,
      commentRouter
   )
   app.use(
      systemConfig.prefixPath + '/project-member',
      authMiddleware.requiredAuth,
      projectMemberRouter
   )
   app.use(
      systemConfig.prefixPath + '/activity-log',
      authMiddleware.requiredAuth,
      activityLogRouter
   )
}