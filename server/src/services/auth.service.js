import prisma from "../config/prisma.config.js"
import  emailService  from "../services/email.service.js"
import hashService from "./hash.service.js"
import crypto from 'crypto'
import createError from "../utils/create-error.js"

const authService = {}

// authService.findAccountByEmail = (email) => {
//   return prisma.account.findUnique({
//     where: { email }
//   })
// }

authService.findAccountByEmail = async (email) => {
  return await prisma.account.findUnique({
    where: { email },
    include: {
      patientProfile: true, 
      doctorProfile: true
    },
  });
}

authService.findAccountById = (id) => {
  
  return prisma.account.findUnique({
    where: { id },
    include: { 
      patientProfile: true,
      doctorProfile: true }
  })
}

authService.createAccount = (data) => {
  return prisma.account.create({ data })
}

authService.createPatientProfile = (data) => {
  return prisma.patient.create({ data });
}

authService.createDoctorProfile = (data) => {
  return prisma.doctor.create({ data });
}


// Find patient profile by accountId
authService.findPatientProfileByAccountId = (accountId) => {
  return prisma.patient.findUnique({
    where: { accountId }
  });
};

// Find doctor profile by accountId
authService.findDoctorProfileByAccountId = (accountId) => {
  return prisma.doctor.findUnique({
    where: { accountId }
  });
};

authService.updateLastLogin = (userId) => {
  return prisma.account.update({
    where: { id: userId },
    data: { lastLogin: new Date() },
  })
}

//ByNada
authService.requestPasswordReset = async (email) => {
  const account = await prisma.account.findUnique({ where: { email } });
  if (!account) throw createError(404, "Account with this email not found.");

  // Generate a 4-digit OTP
  const otp = crypto.randomInt(1000, 9999).toString();
  console.log('otp', otp)

  const hashedOtp = await hashService.hash(otp);
  console.log('hashedOtp', hashedOtp)

  // OTP is valid for 5 minutes
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
  console.log('otpExpires', otpExpires)

  await prisma.account.update({
    where: { email },
    data: {
      passwordResetToken: hashedOtp,
      passwordResetExpires: otpExpires
    }
  });

  try {
    // Send the plain OTP to the user's email
    await emailService.sendOtpEmail(account.email, otp);
  } catch (error) {
    console.log('error', error)
    throw createError(500, "Could not send OTP email.");
  }
};

//ByNada
// NEW: Verifies OTP and generates a secure token for password reset
authService.verifyOtp = async (email, otp) => {
  const account = await prisma.account.findUnique({
    where: { email }
  });
  console.log('account', account)

  if (!account || !account.passwordResetToken || account.passwordResetExpires < new Date()) {
    throw createError(400, "OTP is invalid or has expired.");
  }

  const isMatch = await hashService.comparePassword(otp, account.passwordResetToken);
  if (!isMatch) {
    throw createError(400, "Invalid OTP provided.");
  }

  // OTP is correct, now generate a secure, single-use token for the reset password step
  const resetToken = crypto.randomBytes(32).toString('hex');
  console.log('resetToken', resetToken)

  const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log('hashedResetToken', hashedResetToken)

  // This token is valid for 5 minutes
  const resetTokenExpires = new Date(Date.now() + 5 * 60 * 1000);

  await prisma.account.update({
    where: { id: account.id },
    data: {
      passwordResetToken: hashedResetToken,
      passwordResetExpires: resetTokenExpires,
    }
  });

  // Return the unhashed token to be used by the frontend for the final reset step
  return resetToken;
};

//ByNada
// MODIFIED: Uses the token from OTP verification to reset the password
authService.resetPasswordWithToken = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const account = await prisma.account.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { gte: new Date() }
    }
  });
  console.log('account', account)

  if (!account) {
    throw createError(400, "Password reset token is invalid or has expired.");
  }

  const hashedNewPassword = await hashService.hash(newPassword);

  await prisma.account.update({
    where: { id: account.id },
    data: {
      password: hashedNewPassword,
      passwordResetToken: null,
      passwordResetExpires: null
    }
  });
};

export default authService
