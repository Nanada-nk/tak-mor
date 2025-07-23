import prisma from "../config/prisma.config.js"
import  emailService  from "../services/email.service.js"
import hashService from "./hash.service.js"
import crypto from 'crypto'
import createError from "../utils/create-error.js"

const authService = {}

authService.findAccountByEmail = (email) => {
  return prisma.account.findUnique({
    where: { email }
  })
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

authService.requestPasswordReset = async (email) => {
  const user = await prisma.account.findUnique({ where: { email } });
  if (!user) throw createError(404, "User not found");

  const resetToken = crypto.randomBytes(32).toString('hex');
  const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.account.update({
    where: { email },
    data: { passwordResetToken, passwordResetExpires }
  });

  // console.log("Password Reset Token (for testing):", resetToken)

  try {
    await emailService.sendPasswordResetEmail(user.email, resetToken);
  } catch (error) {
    
    throw createError(500, "Could not send password reset email.");
  }
}

authService.resetPasswordWithToken = async (token, newPassword) => {

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await prisma.account.findFirst({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: { gte: new Date() } 
    }
  });

  if (!user) {
    throw createError(400, "Password reset token is invalid or has expired.");
  }

  const hashedNewPassword = await hashService.hash(newPassword);


  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedNewPassword,
      passwordResetToken: null,
      passwordResetExpires: null
    }
  });
}

export default authService