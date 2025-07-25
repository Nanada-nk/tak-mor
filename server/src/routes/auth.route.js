import express from 'express'
import authController from '../controllers/auth.controller.js'
import authenticateUser from '../middlewares/authenticate.middleware.js'
import validator from '../validations/validator.js'
import { schemaLogin, schemaRegister, schemaVerifyOtp } from '../validations/schema.auth.js'


const authRouter = express.Router()


authRouter.post('/register/patient', validator(schemaRegister), authController.registerPatient)
authRouter.post('/register/doctor', validator(schemaRegister), authController.registerDoctor)

authRouter.post('/login', validator(schemaLogin), authController.login)

authRouter.post('/google-login/patient', authController.googleLoginPatient)
authRouter.post('/google-login/doctor', authController.googleLoginDoctor)

authRouter.get('/facebook', authController.facebookLogin)
authRouter.get('/facebook/callback', authController.facebookCallback)
authRouter.post('/facebook-data-deletion', authController.facebookDataDeletion)

authRouter.get('/refresh', authController.refresh);

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/verify-otp',validator(schemaVerifyOtp), authController.verifyOtp);
authRouter.post('/reset-password', authController.resetPassword);

authRouter.get('/me', authenticateUser, authController.getMe)

export default authRouter
