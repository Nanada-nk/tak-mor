import prisma from "../config/prisma.config.js";


const slotLength = 30; 

function generateSlots(range) {
  const [sh, sm] = range.startTime.split(":").map(Number);
  const [eh, em] = range.endTime.split(":").map(Number);
  let cur = sh * 60 + sm, end = eh * 60 + em;
  const out = [];
  while (cur + slotLength <= end) {
    const from = `${String(Math.floor(cur / 60)).padStart(2,'0')}:${String(cur %60).padStart(2,'0')}`;
    cur += slotLength;
    const to = `${String(Math.floor(cur / 60)).padStart(2,'0')}:${String(cur %60).padStart(2,'0')}`;
    out.push({ startTime: from, endTime: to });
  }
  return out;
}

export const addFixedAvailability = async (req, res) => {
  try {
    const { doctorId } = req.params;
  const { dayOfWeek, startTime, endTime } = req.body;

  if (dayOfWeek === undefined || !startTime || !endTime) return res.status(400).json({ error: "Missing fields" });
   const overlap = await prisma.doctorAvailability.findFirst({
            where: {
                doctorId: Number(doctorId),
                dayOfWeek: Number(dayOfWeek),
                OR: [
                    {
                        startTime: { lt: endTime },
                        endTime: { gt: startTime }
                    }
                ]
            }
        });
        if (overlap) {
          
            return res.status(409).json({ error: "เวลาว่างแบบประจำนี้ ถูกเพิ่มไปแล้ว " });
        }
  const rec = await prisma.doctorAvailability.create({ data: { doctorId: Number(doctorId), dayOfWeek, startTime, endTime, isActive: true }});
  res.status(201).json(rec);
  } catch (error) {
    console.error("Error adding fixed availability:", error);
    res.status(500).json({ error: "Failed to add fixed availability" });
  }
  
};

export const addManualSlot = async (req, res) => {
  const { doctorId } = req.params;
  const { availableDate, startTime, endTime } = req.body;
  if (!availableDate || !startTime || !endTime) return res.status(400).json({ error: "Missing" });

 
  const overlap = await prisma.doctorAvailableSlot.findFirst({
    where: {
      doctorId: Number(doctorId),
      availableDate: new Date(availableDate),
      isActive: true,
      OR: [
        {
          startTime: { lt: endTime },
          endTime: { gt: startTime }
        }
      ]
    }
  });

  if (overlap) {
    return res.status(409).json({ error: "เวลานี้ได้ถูกบันทึกไว้แล้ว ❌" });
  }

const selectedDate = new Date(availableDate);
selectedDate.setUTCHours(0, 0, 0, 0);

  const rec = await prisma.doctorAvailableSlot.create({
    data: { doctorId: Number(doctorId), availableDate: selectedDate, startTime, endTime, source: "manual", isActive: true }
  });
  res.status(201).json(rec);
};


export const getAvailableSlots = async (req, res) => {
    const doctorId = Number(req.params.doctorId);
    const date = req.query.date;

    if (!doctorId || !date) {
        return res.status(400).json({ error: "Missing params" });
    }

    const day = new Date(date).getDay();

    try {
        const appointments = await prisma.appointment.findMany({
            where: {
                doctorId,
                date: new Date(date),
                status: { not: "CANCELLED" }
            },
            select: {
                startTime: true
            }
        });

        const bookedStartTimes = appointments.map(a => a.startTime);

     
        const custom = await prisma.doctorAvailableSlot.findMany({
            where: { doctorId, availableDate: new Date(date), isActive: true },
            orderBy: { startTime: "asc" }
        });

        if (custom.length) {
            const filteredCustom = custom.filter(
                (slot) => !bookedStartTimes.includes(slot.startTime)
            );
            return res.json(filteredCustom.map(slot => ({ ...slot, source: 'manual' })));
        }

   
        const avail = await prisma.doctorAvailability.findMany({
            where: { doctorId, dayOfWeek: day, isActive: true }
        });

        let slots = [];
        for (const r of avail) {
            slots = slots.concat(
                generateSlots(r).map(s => ({
                    availableDate: date,
                    ...s,
                    id: r.id,
                    source: "generated",
                    isActive: true
                }))
            );
        }

        const filteredSlots = slots.filter(
            (slot) => !bookedStartTimes.includes(slot.startTime)
        );

        return res.json(filteredSlots);
    } catch (error) {
        console.error("Error in getAvailableSlots:", error);
        return res.status(500).json({ error: "Failed to fetch available slots" });
    }
};

export const deleteManualSlot = async (req, res) => {
  const { slotId } = req.params;
  try {
    const deletedSlot = await prisma.doctorAvailableSlot.update({
      where: { id: Number(slotId) },
      data: { isActive: false },
    });
    if (!deletedSlot) {
      return res.status(404).json({ error: "Manual slot not found." });
    }
    res.status(200).json({ message: "Manual slot deleted successfully." });
  } catch (error) {
    console.error("Error deleting manual slot:", error);
    res.status(500).json({ error: "Failed to delete manual slot" });
  }
};

export const deleteFixedAvailability = async (req, res) => {
  const { availabilityId } = req.params;
  try {
    const deletedAvailability = await prisma.doctorAvailability.update({
      where: { id: Number(availabilityId) },
      data: { isActive: false },
    });
    if (!deletedAvailability) {
      return res.status(404).json({ error: "Fixed availability not found." });
    }
    res.status(200).json({ message: "Fixed availability deleted successfully." });
  } catch (error) {
    console.error("Error deleting fixed availability:", error);
    res.status(500).json({ error: "Failed to delete fixed availability" });
  }
};