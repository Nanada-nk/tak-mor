import prisma from "../config/prisma.config.js";
import generateVN from "../utils/generateVN.js";
export const createAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      date,         // ISO string or Date
      startTime,    // "HH:mm"
      endTime,      // "HH:mm"
      symptoms,
      price,
      status = "PENDING"
    } = req.body;

    // Optionally: validate required fields here

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

      // Get all appointments for a doctor (with patient and doctor info)
      export const getAppointmentsByDoctor = async (req, res) => {
        try {
          const doctorId = Number(req.params.doctorId);
          if (!doctorId) return res.status(400).json({ error: "Invalid doctor id" });
      
          const appointments = await prisma.appointment.findMany({
            where: { doctorId },
            orderBy: { date: 'desc' },
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