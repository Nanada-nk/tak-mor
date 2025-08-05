import prisma from '../config/prisma.config.js';
import createError from '../utils/create-error.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import r2 from '../config/r2.js';
import hashService from '../services/hash.service.js';

const accountController = {};


accountController.updateAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const allowedFields = ['phone', 'profilePictureUrl'];
    const data = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    }
    if (Object.keys(data).length === 0) {
      throw createError(400, 'No account fields provided to update.');
    }
    const updated = await prisma.account.update({
      where: { id: userId },
      data,
    });
    res.json({ message: 'Account updated', account: updated });
  } catch (err) {
    next(err);
  }
};

export default accountController;


accountController.changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw createError(400, 'Current and new password are required.');
    }
    const user = await prisma.account.findUnique({ where: { id: userId } });
    if (!user) throw createError(404, 'User not found.');
    const isMatch = await hashService.comparePassword(currentPassword, user.password);
    if (!isMatch) throw createError(400, 'Current password is incorrect.');
    const complexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!complexityRegex.test(newPassword)) {
      throw createError(400, 'Password must be at least 8 characters and include uppercase, lowercase, and a number.');
    }
    const hashed = await hashService.hash(newPassword);
    await prisma.account.update({ where: { id: userId }, data: { password: hashed } });
    res.json({ message: 'Password changed successfully.' });
  } catch (err) {
    next(err);
  }
};


accountController.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, 'No file uploaded', 'profilePicture');
    }
    const userId = req.user.id;
    const userEmail = req.user.email || '';
    const emailPrefix = userEmail.split('@')[0] || 'user';
    const processedBuffer = await sharp(req.file.buffer)
      .resize(256, 256)
      .jpeg({ quality: 80 })
      .toBuffer();


    const fileName = `profilepic_${emailPrefix}_${userId}.jpg`;


    await r2.send(new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: processedBuffer,
      ContentType: 'image/jpeg',

    }));


    const publicUrl = `https://pub-${process.env.ACCOUNT_ID}.r2.dev/${fileName}`;


    const updated = await prisma.account.update({
      where: { id: userId },
      data: { profilePictureUrl: publicUrl },
    });

    res.json({ message: 'Profile picture uploaded', url: publicUrl, account: updated });
  } catch (err) {
    next(err);
  }
};

