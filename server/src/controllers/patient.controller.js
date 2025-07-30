import prisma from '../config/prisma.config.js';


export const createProfile = async (req, res) => {
  const  patientId  = Number(req.params.patientId);
  const { bloodType, congenital, allergies, surgeries, medications } = req.body;
  const { height, weight } = Number(req.body);
console.log("Received request body:", req.body);
  try {
    const existing = await prisma.patientMedicalProfile.findUnique({ where: { patientId } });

    if (existing) {
      console.log("Profile already exists for patientId:", patientId);
      return res.status(409).json({ error: "Profile already exists" });
    }

    const profile = await prisma.patientMedicalProfile.create({
      data: {
        patientId,
        height,
        weight,
        bloodType,
        congenital,
        allergies,
        surgeries,
        medications,
      },
    });

    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create profile" });
  }
};

export const updateProfile = async (req, res) => {
  const  patientId  = Number(req.params.patientId);
  const { bloodType, congenital, allergies, surgeries, medications } = req.body;
  const { height, weight } = Number(req.body);
  try {
    const profile = await prisma.patientMedicalProfile.update({
      where: { patientId },
      data: {
        height,
        weight,
        bloodType,
        congenital,
        allergies,
        surgeries,
        medications,
      },
    });

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const getProfile = async (req, res) => {
  const patientId  = Number(req.params.patientId);

  try {
    const profile = await prisma.patientMedicalProfile.findUnique({
      where: { patientId },
    });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};
