import authService from "../services/auth.service.js";
import jwtService from "../services/jwt.service.js";
import hashService from "../services/hash.service.js";
import generateHN from "../utils/generateHN.js";
import { OAuth2Client } from "google-auth-library";
import createError from "../utils/create-error.js";
import crypto from "crypto";
import prisma from "../config/prisma.config.js";
import { token } from "morgan";


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

  //ByNada
  const refreshToken = await jwtService.refreshToken(findEmail.id)

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      expiresAt: new Date(Date.now() + 60 * 1000), // 1 minutes
      account: {
        connect: {
          id: findEmail.id
        }
      }
    }
  })

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: 60 * 24 * 60 * 60 * 1000
  })



  const { password: userPassword, ...userWithoutPassword } = findEmail;
  res.status(200).json({
    success: true,
    message: "Login successful",
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

//ByNada
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

//ByNada
// NEW: Controller to verify the OTP
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

//ByNada
// MODIFIED: Now requires a token from OTP verification
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



//ByNada
authController.refresh = async (req, res, next) => {
  try {
    // console.log('sdgsrtgvrstrbymrtkybjrkrtkyjrtkyjkr')
    const oldToken = req.cookies.refreshToken
    console.log('oldTeq.cookie', oldToken)

    if (!oldToken) {
      throw createError(401, 'unauth')
    }

    let userId
    const oldRefresh = await prisma.refreshToken.findFirst({
      where: {
        token: oldToken
      },
      select: {
        accountId: true,
        expiresAt: true
      }
    })

    if (!oldRefresh) {
      throw createError(401, 'Invalid token');
    }

    userId = oldRefresh.accountId

    if (new Date() < oldRefresh.expiresAt) createError(401)



    const newRefreshToken = await jwtService.newAccessToken(userId)

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        expiresAt: new Date(Date.now() + 60 * 1000), // 1 min
        account: {
          connect: {
            id: userId 
          }
        }
      }
    })

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
      // maxAge: 60 * 24 * 60 * 60 * 1000 // 60 days
      maxAge: 60 * 1000 // 1 min
    })

    res.status(200).json({ accessToken: newRefreshToken })

  } catch (err) {
    console.log('err', err)
  }
}

export default authController;
