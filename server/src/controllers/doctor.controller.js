import prisma from "../config/prisma.config.js";

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        Account: true,      // include account info (email, phone, etc.)
        specialties: {
          include: {
            Specialty: true
          }
        }    // include specialty info
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
      specialties: {
        include: {
          Specialty: true
        }
      },
      Account: true, // contains firstName, lastName, etc.
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

// อาจพัง
// export const updateDoctorProfile = async (req, res, next) => {

//   try {
//     // req.user is the authenticated account (from passport session)
//     const account = req.user;
//     console.log('DEBUG updateDoctorProfile req.user:', account);
//     if (!account || account.role !== 'DOCTOR') {
//       console.log('NOT AUTHORIZED: req.user =', account);
//       return res.status(403).json({ error: 'Not authorized', user: account });
//     }
//     // Only allow these fields to be updated
//     let { firstName, lastName, address, specialties, birtDate, birthDate, bio } = req.body;
//     // Convert empty string specialtyId to null and ensure it's an integer if present
//     if (specialties === "") specialties = null;
//     if (typeof specialties === "string" && specialties !== null) {
//       const parsed = parseInt(specialties, 10);
//       if (!isNaN(parsed)) specialties = parsed;
//     }
//     if (specialties && Array.isArray(specialties)) {
//       updateData.specialties = {
//         set: specialties.map(id => ({ specialtyId: id }))
//         // set จะ replace รายการทั้งหมด (ถ้าต้องการ add หรือ remove ใช้ connect/disconnect)
//       };
//     }
//     // Convert empty string address to null
//     if (address === "") address = null;
//     // Convert empty string bio to null
//     if (bio === "") bio = null;
//     // Find the doctor profile
//     const doctor = await prisma.doctor.findUnique({
//       where: { accountId: account.id },
//     });
//     if (!doctor) {
//       return res.status(404).json({ error: 'Doctor profile not found' });
//     }
//     // Update doctor fields
//     let updateData = {
//       firstName,
//       lastName,
//       address,
//       bio
//     };
//     // Do not update birthDate here; Doctor model does not have a birthDate field
//     // Remove undefined fields
//     Object.keys(updateData).forEach(key => {
//       if (updateData[key] === undefined) {
//         delete updateData[key];
//       }
//     });
//     // Remove specialtyId if it is null (Prisma throws if you try to set it to null)
//     if (updateData.specialtyId === null) {
//       delete updateData.specialtyId;
//     }
//     const updated = await prisma.doctor.update({
//       where: { id: doctor.id },
//       data: updateData,
//       include: {
//         specialties: {
//           include: {
//             Specialty: true
//           }
//         },
//         Account: true
//       }
//     });
//     res.json({ success: true, doctor: updated });
//   } catch (err) {
//     next(err);
//   }
// };

export const updateDoctorProfile = async (req, res, next) => {
  try {
    const account = req.user;
    if (!account || account.role !== 'DOCTOR') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    // Only allow these fields to be updated
    let { firstName, lastName, address, specialties, bio } = req.body;

    // Normalize values
    if (address === "") address = null;
    if (bio === "") bio = null;

    // Find doctor profile
    const doctor = await prisma.doctor.findUnique({
      where: { accountId: account.id },
    });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    // Prepare updateData object
    let updateData = { firstName, lastName, address, bio };
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    // Handle specialties if provided and array
    if (Array.isArray(specialties)) {
      updateData.specialties = {
        set: specialties.map(id => ({ specialtyId: Number(id) }))
      };
    }

    // Update doctor
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

