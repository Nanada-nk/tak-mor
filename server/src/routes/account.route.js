import express from 'express';
import authenticateUser from '../middlewares/authenticate.middleware.js';
import accountController from '../controllers/account.controller.js';
import multer from 'multer';

const accountRouter = express.Router();
const upload = multer();



// Upload profile picture
accountRouter.post(
  '/upload-profile-picture',
  authenticateUser,
  upload.single('profilePicture'),
  accountController.uploadProfilePicture
);

// Update account info (phone, profilePictureUrl, etc.)
accountRouter.put('/', authenticateUser, accountController.updateAccount);

export default accountRouter;
