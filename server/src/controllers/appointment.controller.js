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