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
  try {
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

    const accessToken = await jwtService.genAccessToken({
      id: findEmail.id,
      role: findEmail.role,
    });
    console.log('new access token check', accessToken)


    const refreshToken = await jwtService.genRefreshToken(findEmail.id)
    console.log('refreshToken', refreshToken)

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + sevenDaysInMs),
        account: {
          connect: {
            id: findEmail.id
          }
        }
      }
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: sevenDaysInMs
    })



    const { password: userPassword, ...userWithoutPassword } = findEmail;
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: userWithoutPassword,
    });
  } catch (error) {
    next(error);
  }

};


authController.googleLoginPatient = async (req, res, next) => {
  try {
    const { idToken, phone } = req.body;
    const role = "PATIENT";
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log('ticket', ticket)

    const { email, given_name, family_name, picture } = ticket.getPayload();

    if (!given_name || !family_name) {
      throw createError(400, "Google account missing name information");
    }

    let account = await authService.findAccountByEmail(email);
    let profile;
    if (!account) {
      const userPhone = phone || 'N/A';
      account = await authService.createAccount({
        email,
        password: crypto.randomBytes(32).toString("hex"),
        role,
        phone: userPhone,
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

    const accessToken = await jwtService.genAccessToken({
      id: account.id,
      role: account.role,
    });
    console.log('accessToken', accessToken)

    const refreshToken = await jwtService.genRefreshToken(account.id);
    console.log('refreshToken', refreshToken)

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + sevenDaysInMs),
        account: { connect: { id: account.id } },
      },
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: sevenDaysInMs,
    });

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: account.id,
        email: account.email,
        role: account.role,
        patientProfile: profile,
        doctorProfile: null
      },
    });
  } catch (error) {
    next(error);
  }
};


authController.googleLoginDoctor = async (req, res, next) => {
  try {
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
      const userPhone = phone || 'N/A';
      account = await authService.createAccount({
        email,
        password: crypto.randomBytes(32).toString("hex"),
        role,
        phone: userPhone,
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

    const accessToken = await jwtService.genAccessToken({
      id: account.id,
      role: account.role,
    });
    console.log('accessToken', accessToken)


    const refreshToken = await jwtService.genRefreshToken(account.id);
    console.log('refreshToken', refreshToken)

    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + sevenDaysInMs),
        account: { connect: { id: account.id } },
      },
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: sevenDaysInMs,
    });

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: account.id,
        email: account.email,
        role: account.role,
        patientProfile: null,
        doctorProfile: profile
      },
    });
  } catch (error) {
    next(error);
  }
};


authController.facebookLogin = (req, res, next) => {
  const { role = 'PATIENT' } = req.query;
  const state = Buffer.from(JSON.stringify({ role })).toString('base64');
  console.log('state', state)
  const facebookLoginUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${process.env.BACKEND_URL}/api/auth/facebook/callback&scope=email,public_profile&state=${state}`;
  res.redirect(facebookLoginUrl);
}


authController.facebookCallback = async (req, res, next) => {
  try {
    const { code, state } = req.query;
    if (!code || !state) throw createError(400, 'Facebook login was cancelled or failed.');

    const decodedState = JSON.parse(Buffer.from(state, 'base64').toString('utf8'));
    const role = decodedState.role || 'PATIENT';


    const tokenResponse = await axios.get('https://graph.facebook.com/v18.0/oauth/access_token', {
      params: {
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        redirect_uri: `${process.env.BACKEND_URL}/api/auth/facebook/callback`,
        code,
      },
    });
    const { access_token } = tokenResponse.data;


    const userProfileResponse = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email,first_name,last_name',
        access_token,
      },
    });
    const { id: facebookId, email, first_name, last_name } = userProfileResponse.data;
    if (!email) throw createError(400, "Could not retrieve email from Facebook.");


    let account = await authService.findAccountByEmail(email);
    console.log('account', account)

    if (account && !account.isActive) {
      account = await authService.reactivateAndLinkFacebook(account.id, facebookId);
    } else if (!account) {
      const randomPassword = crypto.randomBytes(32).toString('hex');
      const hashedPassword = await hashService.hash(randomPassword);
      account = await authService.createAccount({
        email,
        password: hashedPassword,
        role: role,
        facebookId: facebookId,
        isActive: true,
        phone: 'N/A',
      });

      if (role === 'DOCTOR') {
        await authService.createDoctorProfile({ accountId: account.id, firstName: first_name, lastName: last_name });
      } else {
        await authService.createPatientProfile({ accountId: account.id, hn: generateHN(), firstName: first_name, lastName: last_name });
      }
    } else if (account && !account.facebookId) {
      account = await authService.linkFacebookToAccount(account.id, facebookId);
    }



    const accessToken = await jwtService.genAccessToken({ id: account.id, role: account.role });
    console.log('accessToken', accessToken)

    const refreshToken = await jwtService.genRefreshToken(account.id);
    console.log('refreshToken', refreshToken)


    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + sevenDaysInMs),
        account: { connect: { id: account.id } },
      },
    });


    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: sevenDaysInMs
    });



    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${accessToken}`);
  } catch (error) {

    const errorMessage = encodeURIComponent(error.response?.data?.message || error.message || 'An unknown error occurred.');
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?error=${errorMessage}`);
  }
};


authController.facebookDataDeletion = async (req, res, next) => {
  try {
    const { signed_request } = req.body;
    if (!signed_request) {
      throw createError(400, 'Invalid Facebook data deletion request');
    }

    const [encodedSig, payload] = signed_request.split('.');
    const expectedSig = crypto
      .createHmac('sha256', process.env.FACEBOOK_APP_SECRET)
      .update(payload)
      .digest('base64url');

    if (encodedSig !== expectedSig) {
      throw createError(400, 'Invalid request signature');
    }

    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    console.log('decodedPayload', decodedPayload)

    const facebookUserId = decodedPayload.user_id;
    console.log('facebookUserId', facebookUserId)

    await authService.deactivateAccountByFacebookId(facebookUserId);

    const confirmationCode = `deactivated_${facebookUserId}`;
    res.status(200).json({
      url: `${process.env.FRONTEND_URL}/data-deletion-status?code=${confirmationCode}`,
      confirmation_code: confirmationCode,
    });
    console.log('confirmationCode', confirmationCode)
  } catch (error) {
    next(error);
  }
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
