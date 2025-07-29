import authService from "../services/auth.service.js";
import jwtService from "../services/jwt.service.js";
import hashService from "../services/hash.service.js";
import generateHN from "../utils/generateHN.js";
import { OAuth2Client } from "google-auth-library";
import createError from "../utils/create-error.js";
import crypto from "crypto";
import prisma from "../config/prisma.config.js";
import { token } from "morgan";
import axios from 'axios'


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const authController = {};



// Register Patient
authController.registerPatient = async (req, res, next) => {
  const { email, phone, firstName, lastName, password, confirmPassword } = req.body;
  const role = "PATIENT";
  if (password !== confirmPassword) {
    throw createError(400, "Password and Confirm Password do not match");
  }
  const findAccount = await authService.findAccountByEmail(email);
  if (findAccount) {
    throw createError(400, "This email has already been used.");
  }
  const hashPassword = await hashService.hash(password);
  const accountData = {
    email,
    password: hashPassword,
    phone,
    role,
  };
  const newAccount = await authService.createAccount(accountData);
  const profile = await authService.createPatientProfile({
    hn: generateHN(),
    firstName,
    lastName,
    Account: { connect: { id: newAccount.id } },
  });
  res.status(201).json({
    message: "Register Patient Successfully",
    account: newAccount,
    profile,
  });
};

// Register Doctor
authController.registerDoctor = async (req, res, next) => {
  const { email, phone, firstName, lastName, password, confirmPassword } = req.body;
  const role = "DOCTOR";
  if (password !== confirmPassword) {
    throw createError(400, "Password and Confirm Password do not match");
  }
  const findAccount = await authService.findAccountByEmail(email);
  if (findAccount) {
    throw createError(400, "Email already exists");
  }
  const hashPassword = await hashService.hash(password);
  const accountData = {
    email,
    password: hashPassword,
    phone,
    role,
  };
  const newAccount = await authService.createAccount(accountData);
  const profile = await authService.createDoctorProfile({
    firstName,
    lastName,
    Account: { connect: { id: newAccount.id } },
  });
  res.status(201).json({
    message: "Register Doctor Successfully",
    account: newAccount,
    profile,
  });
};


authController.loginSuccess = async (req, res, next) => {
  try {
   
    const user = req.user;

    
    const accessToken = await jwtService.genAccessToken({ id: user.id, role: user.role });

   
    const refreshToken = await jwtService.genRefreshToken(user.id);

    

    await authService.storeRefreshToken(user.id, refreshToken);

    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', 
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 วัน
    });

   
    const { password, ...userWithoutPassword } = user;
    res.json({
      accessToken,
      user: userWithoutPassword
    });
  } catch (err) {
    next(err);
  }
};


authController.socialLoginSuccess = async (req, res, next) => {
  try {
    
    const user = req.user;

    
    const accessToken = await jwtService.genAccessToken({ id: user.id, role: user.role });
    const refreshToken = await jwtService.genRefreshToken(user.id);


    await prisma.refreshToken.upsert({
      where: { accountId: user.id },
      update: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      create: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        accountId: user.id,
      }
    });

    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

   
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
  } catch (err) {
    
    const errorMessage = encodeURIComponent(err.message || 'An unknown error occurred during social login.');
    res.redirect(`${process.env.FRONTEND_URL}/login?error=${errorMessage}`);
  }
};



authController.getMe = async (req, res, next) => {
  try {

    const account = req.user
    const { password, ...userWithoutPassword } = account;
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.log("getMe error", error)
    next(error);
  }
}

authController.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw createError(400, "Email is required.");

    await authService.requestPasswordReset(email);

    res.status(200).json({ message: "OTP has been sent to your email." });
  } catch (err) {
    next(err);
  }
};

authController.verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw createError(400, "Email and OTP are required.");
    }
    if (otp.length !== 4) {
      throw createError(400, "OTP must be 4 digits.")
    }

    const resetToken = await authService.verifyOtp(email, otp);

    res.status(200).json({
      message: "OTP verified successfully. You can now reset your password.",
      resetToken: resetToken // This token is sent to the client
    });
  } catch (err) {
    next(err);
  }
};

authController.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword)
      throw createError(400, "Token and new password are required.");

    await authService.resetPasswordWithToken(token, newPassword);

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (err) {
    next(err);
  }
};

authController.refresh = async (req, res, next) => {
  try {
    console.log('req.cookies.refreshToken', req.cookies.refreshToken)
    const oldRefreshToken = req.cookies.refreshToken;
    console.log('oldRefreshToken===================', oldRefreshToken)
    if (!oldRefreshToken) {
      throw createError(401, 'Authentication required.');
    }


    const oldRefresh = await prisma.refreshToken.findFirst({
      where: {
        token: oldRefreshToken
      },
      select: {
        accountId: true,
        expiresAt: true
      }
    });
    console.log('oldRefresh', oldRefresh)

    if (!oldRefresh) {
      throw createError(401, 'Invalid token');
    }

    if (new Date() > oldRefresh.expiresAt) {
      throw createError(401, 'Token has not expired yet.');
    }

    const userId = oldRefresh.accountId;
    console.log('userId', userId)

    const newAccessToken = await jwtService.genAccessToken({ id: userId });
    console.log('newAccessToken', newAccessToken)

    res.status(200).json({
      success: true,
      accessToken: newAccessToken
    });


  } catch (err) {
    next(err);
  }
};

export default authController;
