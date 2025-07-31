import express from 'express';
import authenticateUser from '../middlewares/authenticate.middleware.js';
import accountController from '../controllers/account.controller.js';

const accountRouter = express.Router();

// Update account info (phone, profilePictureUrl, etc.)
accountRouter.put('/', authenticateUser, accountController.updateAccount);

export default accountRouter;
