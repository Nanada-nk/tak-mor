import express from 'express'
import authController from '../controllers/auth.controller.js'
// import authenticateUser from '../middlewares/authenticate.middleware.js'
import validator from '../validations/validator.js'
import { schemaLogin, schemaRegister } from '../validations/schema.auth.js'


const authRouter = express.Router()


authRouter.post('/register', validator(schemaRegister), authController.register)
authRouter.post('/login', validator(schemaLogin), authController.login)
authRouter.post('/google-login', authController.googleLogin)
// authRouter.get('/me', authenticateUser, authController.getMe)
// authRouter.post('/forgot-password', authController.forgotPassword);
// authRouter.post('/reset-password', authController.resetPassword);




export default authRouter