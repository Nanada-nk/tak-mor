import express from 'express'
import passport from 'passport';
import authController from '../controllers/auth.controller.js'
import authenticateUser from '../middlewares/authenticate.middleware.js'
import validator from '../validations/validator.js'
import { schemaLogin, schemaRegister, schemaVerifyOtp } from '../validations/schema.auth.js'


const authRouter = express.Router()


authRouter.post('/register/patient', validator(schemaRegister), authController.registerPatient)
authRouter.post('/register/doctor', validator(schemaRegister), authController.registerDoctor)

authRouter.post('/login', validator(schemaLogin), passport.authenticate('local'), authController.loginSuccess);


authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google-failed`
  }),
  authController.socialLoginSuccess
);


authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));


authRouter.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=facebook-failed`
  }),
  authController.socialLoginSuccess
);

authRouter.post('/refresh', authController.refresh);

authRouter.get('/me', authenticateUser, authController.getMe)

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/verify-otp',validator(schemaVerifyOtp), authController.verifyOtp);
authRouter.post('/reset-password', authController.resetPassword);


export default authRouter
