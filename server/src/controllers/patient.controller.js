import prisma from '../config/prisma.config.js';


export const createProfile = async (req, res) => {
  const  patientId  = Number(req.params.patientId);
  let { height, weight, bloodType, congenital, allergies, surgeries, medications } = req.body;
  height = height !== undefined && height !== null && height !== "" ? Number(height) : null;
  weight = weight !== undefined && weight !== null && weight !== "" ? Number(weight) : null;
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
  let { height, weight, bloodType, congenital, allergies, surgeries, medications } = req.body;
  height = height !== undefined && height !== null && height !== "" ? Number(height) : null;
  weight = weight !== undefined && weight !== null && weight !== "" ? Number(weight) : null;
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
    console.error('Update medical profile error:', err);
    res.status(500).json({ error: "Failed to update profile", details: err.message });
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

// Update patient basic info (firstName, lastName, address)
export const updatePatientInfo = async (req, res) => {
  const patientId = Number(req.params.patientId);
  const { firstName, lastName, address } = req.body;
  if (!firstName && !lastName && !address) {
    return res.status(400).json({ error: 'No patient fields provided to update.' });
  }
  try {
    const updated = await prisma.patient.update({
      where: { id: patientId },
      data: {
        ...(firstName !== undefined ? { firstName } : {}),
        ...(lastName !== undefined ? { lastName } : {}),
        ...(address !== undefined ? { address } : {}),
      },
    });
    res.json({ message: 'Patient info updated', patient: updated });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update patient info' });
  }
};