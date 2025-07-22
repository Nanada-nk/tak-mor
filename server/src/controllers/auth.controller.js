
import authService from '../services/auth.service.js';
import jwtService from '../services/jwt.service.js';
import hashService from '../services/hash.service.js';
import generateHN from '../utils/generateHN.js';
import { OAuth2Client } from 'google-auth-library';
import createError from '../utils/create-error.js';
import crypto from 'crypto';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



const authController = {}

authController.registerPatient = async (req, res, next) => {
  const { email, phone, firstName, lastName, password, confirmPassword, role } = req.body;
  let profile;

  // if (!['PATIENT', 'DOCTOR'].includes(role)) {
  //   throw createError(400, 'Role must be PATIENT or DOCTOR')
  // }

  if (password !== confirmPassword) {
    throw createError(400, 'Password and Confirm Password do not match')
  }

  const findAccount = await authService.findAccountByEmail(email)
  if (findAccount) {
    throw createError(400, 'Email already exists')
  }

  const hashPassword = await hashService.hash(password)

  // Create Account
  const accountData = {
    email,
    password: hashPassword,
    role: 'PATIENT',
  };
  const newAccount = await authService.createAccount(accountData);

  // Create profile based on role
  // if (role === 'PATIENT') {
  //   profile = await authService.createPatientProfile({
  //     accountId: newAccount.id,
  //     hn: generateHN(),
  //     firstName,
  //     lastName,
  //     phone
  //   });
  // } else if (role === 'DOCTOR') {
  //   profile = await authService.createDoctorProfile({
  //     accountId: newAccount.id,
  //     firstName,
  //     lastName,
  //     phone
  //   });
  // } else {
  //   throw createError(400, 'Invalid role for profile creation');
  // }

  res.status(201).json({ message: "Register User Successfully", account: newAccount, profile })
}

authController.registerDoctor = async (req, res, next) => {
  const { email, phone, firstName, lastName, password, confirmPassword, role } = req.body;
  let profile;

  // if (!['PATIENT', 'DOCTOR'].includes(role)) {
  //   throw createError(400, 'Role must be PATIENT or DOCTOR')
  // }

  if (password !== confirmPassword) {
    throw createError(400, 'Password and Confirm Password do not match')
  }

  const findAccount = await authService.findAccountByEmail(email)
  if (findAccount) {
    throw createError(400, 'Email already exists')
  }

  const hashPassword = await hashService.hash(password)

  // Create Account
  const accountData = {
    email,
    password: hashPassword,
    role: 'DOCTOR',
  };
  const newAccount = await authService.createAccount(accountData);

  // Create profile based on role
  // if (role === 'PATIENT') {
  //   profile = await authService.createPatientProfile({
  //     accountId: newAccount.id,
  //     hn: generateHN(),
  //     firstName,
  //     lastName,
  //     phone
  //   });
  // } else if (role === 'DOCTOR') {
  //   profile = await authService.createDoctorProfile({
  //     accountId: newAccount.id,
  //     firstName,
  //     lastName,
  //     phone
  //   });
  // } else {
  //   throw createError(400, 'Invalid role for profile creation');
  // }

  res.status(201).json({ message: "Register User Successfully", account: newAccount, profile })
}

authController.login = async (req, res, next) => {
  const { email, password } = req.body
  const findEmail = await authService.findAccountByEmail(email)
  if (!findEmail) {
    throw createError(401, 'Invalid Email or Password!')
  }

  // if (!findEmail.enabled) {
  //   throw createError(403, "Your account has been disabled. Please contact support.");
  // }

  const isMatchPassword = await hashService.comparePassword(password, findEmail.password)
  if (!isMatchPassword) {
    throw createError(401, 'Invalid Email or Password!')
  }
  // await authService.updateLastLogin(findEmail.id)


  const accessToken = await jwtService.genToken({ id: findEmail.id, role: findEmail.role })
  const { password: userPassword, ...userWithoutPassword } = findEmail;
  res.status(200).json({
    success: true,
    accessToken,
    user: userWithoutPassword
  });
}

authController.googleLogin = async (req, res, next) => {
  const { idToken, role = 'PATIENT' } = req.body;

  // Verify the ID token with Google
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const { email, given_name, family_name, picture } = ticket.getPayload();

  // Check if the user already exists
  let account = await authService.findAccountByEmail(email);
  let profile;
  if (!account) {
    // Create new account
    account = await authService.createAccount({
      email,
      password: crypto.randomBytes(32).toString('hex'),
      role
    });
    const { phone } = req.body;
    if (role === 'PATIENT') {
      profile = await authService.createPatientProfile({
        accountId: account.id,
        hn: generateHN(),
        firstName: given_name,
        lastName: family_name,
        phone
      });
    } else if (role === 'DOCTOR') {
      profile = await authService.createDoctorProfile({
        accountId: account.id,
        firstName: given_name,
        lastName: family_name,
        phone
      });
    } else {
      throw createError(400, 'Invalid role for profile creation');
    }
  } else {
    // Optionally fetch profile if needed
    profile = null;
  }

  // Generate JWT token
  const accessToken = await jwtService.genToken({ id: account.id, role: account.role });

  res.status(200).json({
    success: true,
    accessToken,
    account: {
      id: account.id,
      email: account.email,
      role: account.role,
      picture
    },
    profile
  });
}

authController.getMe = async (req, res, next) => {
  if (!req.user) {
    throw createError(401, "Unauthorization")
  }
  const user = req.user
  if (!user) {
    throw createError(404, "User not found");
  }

  const { password, ...userWithoutPassword } = user

  res.status(200).json({ user: userWithoutPassword })
}


authController.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw createError(400, "Email is required.");

  await authService.requestPasswordReset(email);

  res.status(200).json({ message: "Password reset link sent." });
};


authController.resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) throw createError(400, "Token and new password are required.");

  await authService.resetPasswordWithToken(token, newPassword);

  res.status(200).json({ message: "Password has been reset successfully." });
};

export default authController