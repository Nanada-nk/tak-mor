import prisma from "../config/prisma.config.js";

export const getAllSpecialties = async (req, res, next) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.json(specialties);
  } catch (err) {
    next(err);
  }
};

export const createSpecialty = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Specialty name is required.' });
    }
    // Check if specialty exists (case-insensitive, fallback for MySQL)
    const all = await prisma.specialty.findMany();
    const existing = all.find(s => s.name.trim().toLowerCase() === name.trim().toLowerCase());
    if (existing) {
      return res.status(200).json(existing);
    }
    const specialty = await prisma.specialty.create({
      data: { name: name.trim(), description: '' }
    });
    res.status(201).json(specialty);
  } catch (err) {
    next(err);
  }
};
