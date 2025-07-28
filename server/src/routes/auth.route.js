import express from 'express'
import passport from 'passport';
import authController from '../controllers/auth.controller.js'
import authenticateUser from '../middlewares/authenticate.middleware.js'
import validator from '../validations/validator.js'
import { schemaLogin, schemaRegister, schemaVerifyOtp } from '../validations/schema.auth.js'


const authRouter = express.Router()


authRouter.post('/register/patient', validator(schemaRegister), authController.registerPatient)
authRouter.post('/register/doctor', validator(schemaRegister), authController.registerDoctor)

// authRouter.post('/login', validator(schemaLogin), authController.login)
authRouter.post('/login', validator(schemaLogin), passport.authenticate('local'), authController.loginSuccess);

// authRouter.post('/google-login/patient', authController.googleLoginPatient)
// authRouter.post('/google-login/doctor', authController.googleLoginDoctor)

// authRouter.get('/facebook', authController.facebookLogin)
// authRouter.get('/facebook/callback', authController.facebookCallback)
// authRouter.post('/facebook-data-deletion', authController.facebookDataDeletion)

// --- 3. Google OAuth Routes ---
// เส้นทางแรก: เมื่อ User กด "Login with Google", Frontend จะชี้มาที่นี่
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// เส้นทางที่สอง: Callback URL ที่ Google จะยิงกลับมาหลัง User ยืนยันตัวตน
authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google-failed` // ถ้าล้มเหลวให้กลับไปหน้า login
  }),
  authController.socialLoginSuccess // ถ้าสำเร็จให้ไปที่ controller นี้
);


// --- 4. Facebook OAuth Routes ---
// เส้นทางแรก: สำหรับเริ่มกระบวนการ Login with Facebook
authRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// เส้นทางที่สอง: Callback URL จาก Facebook
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
