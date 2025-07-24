import prisma from "../config/prisma.config.js"
import { generateSlots } from "../utils/generate-slots.js";

export const addManualSlot = async (req, res) => {
  try {
    const doctorId = Number(req.params.doctorId);
    const { date, startTime, endTime } = req.body;

    const newSlot = await prisma.doctorAvailableSlot.create({
      data: {
        doctorId,
        date: new Date(date),
        startTime,
        endTime,
        source: 'manual',
      },
    });

    res.status(201).json(newSlot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const doctorId = Number(req.params.doctorId);
    const dateStr = req.query.date;
    const date = new Date(dateStr);
    const dayOfWeek = date.getDay();

    const fixed = await prisma.doctorAvailability.findMany({
      where: { doctorId, dayOfWeek, isActive: true },
    });

    const manual = await prisma.doctorAvailableSlot.findMany({
      where: {
        doctorId,
        date,
        isActive: true,
        isBooked: false,
      },
    });

    const appointments = await prisma.appointment.findMany({
      where: { doctorId, date },
    });

    const bookedStartTimes = new Set(appointments.map(a => a.startTime));

    let fixedSlots = [];

    fixed.forEach((f) => {
      const slots = generateSlots(f.startTime, f.endTime, 60);
      slots.forEach(s => {
        if (!bookedStartTimes.has(s.startTime)) {
          fixedSlots.push({
            date: dateStr,
            startTime: s.startTime,
            endTime: s.endTime,
            source: 'generated',
          });
        }
      });
    });

    const allSlots = [...fixedSlots, ...manual];

    res.json(allSlots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
