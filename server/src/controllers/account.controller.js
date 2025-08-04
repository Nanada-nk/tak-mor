import prisma from '../config/prisma.config.js';
import createError from '../utils/create-error.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import r2 from '../config/r2.js';

const accountController = {};

// Update account info (phone, profilePictureUrl, etc.)
accountController.updateAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Only allow updating specific fields
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

// --- Profile Picture Upload ---
accountController.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError(400, 'No file uploaded', 'profilePicture');
    }
    const userId = req.user.id;
    const userEmail = req.user.email || '';
    // Get email before @
    const emailPrefix = userEmail.split('@')[0] || 'user';
    // Process image with sharp (resize to 256x256, jpeg)
    const processedBuffer = await sharp(req.file.buffer)
      .resize(256, 256)
      .jpeg({ quality: 80 })
      .toBuffer();

    // Use consistent filename: emailPrefix_id.jpg
    const fileName = `profilepic_${emailPrefix}_${userId}.jpg`;

    // Upload to R2 (Remove ACL - not supported by R2)
    await r2.send(new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
      Body: processedBuffer,
      ContentType: 'image/jpeg',
      // Remove ACL line - R2 doesn't support this
    }));

    // Use the correct PUBLIC URL format
    const publicUrl = `https://pub-${process.env.ACCOUNT_ID}.r2.dev/${fileName}`;

    // Update user profilePictureUrl in DB
    const updated = await prisma.account.update({
      where: { id: userId },
      data: { profilePictureUrl: publicUrl },
    });

    res.json({ message: 'Profile picture uploaded', url: publicUrl, account: updated });
  } catch (err) {
    next(err);
  }
};

