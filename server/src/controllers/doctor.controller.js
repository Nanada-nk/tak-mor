import prisma from "../config/prisma.config.js";

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        account: true,      // include account info (email, phone, etc.)
        specialty: true     // include specialty info
      }
    });
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

// doctor.controller.ts
export const getDoctorById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid doctor id" });
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      specialty: true,
      account: true, // contains firstName, lastName, etc.
    },
  });

  if (!doctor) return res.status(404).json({ error: "Doctor not found" });
  res.json(doctor);
};

export const getDoctorAvailabilityByDay = async (req, res, next) => {
  try {
    const doctorId = Number(req.params.id);
    const dayOfWeek = Number(req.query.dayOfWeek);
    if (!doctorId || dayOfWeek === undefined) {
      return res.status(400).json({ error: "Missing doctorId or dayOfWeek" });
    }
    const availabilities = await prisma.doctorAvailability.findMany({
      where: {
        doctorId,
        dayOfWeek,
        isActive: true,
      },
      select: {
        startTime: true,
        endTime: true,
      },
      orderBy: { startTime: "asc" }
    });
    res.json(availabilities);
  } catch (err) {
    next(err);
  }
};