import prisma from "../config/prisma.config.js";

export const createAppointmentAfterPayment = async (req, res) => {
  const {
    vn,
    patientId,
    doctorId,
    date,
    startTime,
    endTime,
    price,
    paymentId,
  } = req.body

  try {
    const appointment = await prisma.appointment.create({
      data: {
        vn,
        patientId,
        doctorId,
        date: new Date(date), // assume ISO string
        startTime,
        endTime,
        price,
        paymentId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return res.status(201).json(appointment)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to create appointment' })
  }
}

export const createAppointment  = async (req,res,next) => {
  try {
    const { patientId, doctorId , data , startTime , endTime , price } = req.body

    // Basic validation
    if (!patientId || !doctorId || !date || !startTime || !endTime || !price) {
      return next(createError(400, 'Missing required fields for appointment.', 'missing_fields'));
    }

    // ตรวจสอบว่า Doctor และ Patient มีอยู่จริง
    const patientExists = await prisma.patient.findUnique({ where: { id: parseInt(patientId) } });
    const doctorExists = await prisma.doctor.findUnique({ where: { id: parseInt(doctorId) } });

    if (!patientExists) {
      return next(createError(404, `Patient with ID ${patientId} not found.`, 'patientId'));
    }
    if (!doctorExists) {
      return next(createError(404, `Doctor with ID ${doctorId} not found.`, 'doctorId'));
    }

    // TODO: Logic ตรวจสอบ Available Slot ของคุณหมอ ควรอยู่ตรงนี้
    // หากไม่ว่าง: return next(createError(409, 'The selected time slot is not available.', 'time_slot'));

    const newAppointment = await prisma.appointment.create({
      data: {
        patientId: parseInt(patientId),
        doctorId: parseInt(doctorId),
        date: new Date(date), // แปลงเป็น Date object
        startTime,
        endTime,
        price: parseFloat(price),
        status: 'PENDING',
        vn: `APPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
      },
      include: {
        Patient: { select: { firstName: true, lastName: true, hn: true } },
        Doctor: { select: { firstName: true, lastName: true } }
      }
    });

    res.status(201).json({
      message: 'Appointment created successfully.',
      appointment: newAppointment
    });

  } catch (error) {
    next(error)
  }
}