import express from 'express';
import authenticateUser from '../middlewares/authenticate.middleware.js';
import accountController from '../controllers/account.controller.js';
import multer from 'multer';

const accountRouter = express.Router();
const upload = multer();




accountRouter.post(
  '/upload-profile-picture',
  authenticateUser,
  upload.single('profilePicture'),
  accountController.uploadProfilePicture
);


accountRouter.put('/', authenticateUser, accountController.updateAccount);


accountRouter.put('/change-password', authenticateUser, accountController.changePassword);

export default accountRouter;
