import prisma from "../config/prisma.config.js";

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        Account: true,      
        specialties: {
          include: {
            Specialty: true
          }
        }    
      }
    });
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};


export const getDoctorById = async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) return res.status(400).json({ error: "Invalid doctor id" });
  const doctor = await prisma.doctor.findUnique({
    where: { id },
    include: {
      specialties: {
        include: {
          Specialty: true
        }
      },
      Account: true, 
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


export const updateDoctorProfile = async (req, res, next) => {
  try {
    const account = req.user;
    if (!account || account.role !== 'DOCTOR') {
      return res.status(403).json({ error: 'Not authorized' });
    }


    let { firstName, lastName, address, specialties, bio } = req.body;

 
    if (address === "") address = null;
    if (bio === "") bio = null;

   
    const doctor = await prisma.doctor.findUnique({
      where: { accountId: account.id },
    });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    
    let updateData = { firstName, lastName, address, bio };
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) delete updateData[key];
    });

   
    if (Array.isArray(specialties)) {
     
      await prisma.doctorSpecialty.deleteMany({ where: { doctorId: doctor.id } });
     
      await prisma.doctorSpecialty.createMany({
        data: specialties.map(id => ({ doctorId: doctor.id, specialtyId: Number(id) })),
        skipDuplicates: true
      });
    }


    const updated = await prisma.doctor.update({
      where: { id: doctor.id },
      data: updateData,
      include: {
        specialties: { include: { Specialty: true } },
        Account: true
      }
    });

    res.json({ success: true, doctor: updated });
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req, res) => {
  const doctorId = parseInt(req.params.id);
  const {
    firstName,
    lastName,
    address,
    phone,
    email,
    role,
  } = req.body;

  try {
    const updatedDoctor = await prisma.doctor.update({
      where: { id: doctorId },
      data: {
        firstName,
        lastName,
        address,
        Account: {
          update: {
            phone,
            email,
            role,
          },
        },
      },
      include: {
        Account: true,
      },
    });

    res.json(updatedDoctor);
  } catch (error) {
    console.error("Update doctor error:", error);
    res.status(500).json({ message: 'Failed to update doctor' });
  }
};
