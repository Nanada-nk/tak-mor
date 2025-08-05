import prisma from "../config/prisma.config.js";
import generateVN from "../utils/generateVN.js";
export const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      date, 
      startTime, 
      endTime,
      symptoms,
      price,
      status = "PENDING",
    } = req.body;



    const appointment = await prisma.appointment.create({
      data: {
        vn: generateVN(),
        patientId,
        doctorId,
        date: new Date(date),
        startTime,
        endTime,
        symptoms,
        price,
        status,
      },
    });

    res.status(201).json(appointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create appointment" });
  }
};


export const getAppointmentsByDoctor = async (req, res) => {
  try {
    const doctorId = Number(req.params.doctorId);
    if (!doctorId) return res.status(400).json({ error: "Invalid doctor id" });

    const appointments = await prisma.appointment.findMany({
      where: { doctorId },
      orderBy: { date: "desc" },
      include: {
        Patient: {
          include: {
            PatientMedicalProfile: true,
            Account: true,
          },
        },
        Doctor: true,
      },
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};


export const getDailyAppointments = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Missing date parameter." });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        date: new Date(date),
      }, 
      include: {
        Doctor: true,
        Patient: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching daily appointments:", error);
    return res
      .status(500)
      .json({ error: "Failed to fetch daily appointments." });
  }
};

export const getAppointmentsByPatient = async (req, res) => {
  try {
    const patientId = Number(req.params.patientId);
    if (!patientId)
      return res.status(400).json({ error: "Invalid patient id" });

    const appointments = await prisma.appointment.findMany({
      where: { patientId },
      orderBy: { date: "desc" },
      include: {
        Doctor: {
          include: {
            Account: true,
          },
        },
        Patient: {
          include: {
            PatientMedicalProfile: true,
            Account: true,
          },
        },
      },
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
