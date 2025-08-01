import prisma from '../config/prisma.config.js';
import createError from '../utils/create-error.js';

const accountController = {};

// Update account info (phone, profilePictureUrl, etc.)
accountController.updateAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { phone, profilePictureUrl } = req.body;
    if (!phone && !profilePictureUrl) {
      throw createError(400, 'No account fields provided to update.');
    }
    const updated = await prisma.account.update({
      where: { id: userId },
      data: {
        ...(phone !== undefined ? { phone } : {}),
        ...(profilePictureUrl !== undefined ? { profilePictureUrl } : {}),
      },
    });
    res.json({ message: 'Account updated', account: updated });
  } catch (err) {
    next(err);
  }
};

export default accountController;
