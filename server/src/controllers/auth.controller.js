import authService from "../services/auth.service.js";
import jwtService from "../services/jwt.service.js";
import hashService from "../services/hash.service.js";
import generateHN from "../utils/generateHN.js";
import { OAuth2Client } from "google-auth-library";
import createError from "../utils/create-error.js";
import crypto from "crypto";

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
    account: { connect: { id: newAccount.id } },
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
    account: { connect: { id: newAccount.id } },
  });
  res.status(201).json({
    message: "Register Doctor Successfully",
    account: newAccount,
    profile,
  });
};




authController.login = async (req, res, next) => {
  const { email, password } = req.body;
  const findEmail = await authService.findAccountByEmail(email);
  if (!findEmail) {
    throw createError(401, "Invalid Email or Password!");
  }

  // if (!findEmail.enabled) {
  //   throw createError(403, "Your account has been disabled. Please contact support.");
  // }

  const isMatchPassword = await hashService.comparePassword(
    password,
    findEmail.password
  );
  if (!isMatchPassword) {
    throw createError(401, "Invalid Email or Password!");
  }
  // await authService.updateLastLogin(findEmail.id)

  const accessToken = await jwtService.genToken({
    id: findEmail.id,
    role: findEmail.role,
  });
  console.log('new access token check', accessToken)
  const { password: userPassword, ...userWithoutPassword } = findEmail;
  res.status(200).json({
    success: true,
    accessToken,
    user: userWithoutPassword,
  });
};

// Google Login for Patient
authController.googleLoginPatient = async (req, res, next) => {
  const { idToken, phone } = req.body;
  const role = "PATIENT";
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, given_name, family_name, picture } = ticket.getPayload();
  if (!given_name || !family_name) {
    throw createError(400, "Google account missing name information");
  }
  let account = await authService.findAccountByEmail(email);
  let profile;
  if (!account) {
    account = await authService.createAccount({
      email,
      password: crypto.randomBytes(32).toString("hex"),
      role,
      phone,
    });
    profile = await authService.createPatientProfile({
      accountId: account.id,
      hn: generateHN(),
      firstName: given_name,
      lastName: family_name,
    });
  } else {
    const doctorProfile = await authService.findDoctorProfileByAccountId(account.id);
    if (doctorProfile) {
      throw createError(400, "Account already has a doctor profile. Cannot create patient profile.");
    }
    profile = await authService.findPatientProfileByAccountId(account.id);
    if (!profile) {
      profile = await authService.createPatientProfile({
        accountId: account.id,
        hn: generateHN(),
        firstName: given_name,
        lastName: family_name,
      });
    }
  }
  const accessToken = await jwtService.genToken({
    id: account.id,
    role: account.role,
  });
  res.status(200).json({
    success: true,
    accessToken,
    account: {
      id: account.id,
      email: account.email,
      role: account.role,
      picture,
    },
    profile,
  });
};

// Google Login for Doctor
authController.googleLoginDoctor = async (req, res, next) => {
  const { idToken, phone } = req.body;
  const role = "DOCTOR";
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, given_name, family_name, picture } = ticket.getPayload();
  if (!given_name || !family_name) {
    throw createError(400, "Google account missing name information");
  }
  let account = await authService.findAccountByEmail(email);
  let profile;
  if (!account) {
    account = await authService.createAccount({
      email,
      password: crypto.randomBytes(32).toString("hex"),
      role,
      phone,
    });
    profile = await authService.createDoctorProfile({
      accountId: account.id,
      firstName: given_name,
      lastName: family_name,
    });
  } else {
    const patientProfile = await authService.findPatientProfileByAccountId(account.id);
    if (patientProfile) {
      throw createError(400, "Account already has a patient profile. Cannot create doctor profile.");
    }
    profile = await authService.findDoctorProfileByAccountId(account.id);
    if (!profile) {
      profile = await authService.createDoctorProfile({
        accountId: account.id,
        firstName: given_name,
        lastName: family_name,
      });
    }
  }
  const accessToken = await jwtService.genToken({
    id: account.id,
    role: account.role,
  });
  res.status(200).json({
    success: true,
    accessToken,
    account: {
      id: account.id,
      email: account.email,
      role: account.role,
      picture,
    },
    profile,
  });
};


  authController.getMe = async (req, res, next) => {
    try {
      if (!req.user) {
        throw createError(401, "Unauthorized");
      }
      const account = req.user
      // const account = await authService.findAccountById(req.user.id);
      // console.log('account', account)

      if (!account) {
        throw createError(404, "User not found");
      }

  //     const account = await authService.findAccountById(userId);
  // console.log(account.patientProfile);

      const { password, ...userWithoutPassword } = account;
      res.status(200).json({ user: userWithoutPassword });
    } catch (error) {
      console.log("getMe error", error)
      next(error);
    }
  }

authController.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) throw createError(400, "Email is required.");

  await authService.requestPasswordReset(email);

  res.status(200).json({ message: "Password reset link sent." });
};

authController.resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword)
    throw createError(400, "Token and new password are required.");

  await authService.resetPasswordWithToken(token, newPassword);

  res.status(200).json({ message: "Password has been reset successfully." });
};

export default authController;
