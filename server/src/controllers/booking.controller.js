import prisma from "../config/prisma.config.js"


const slotLength = 30; // 30-minute windows

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
  const { doctorId } = req.params;
  const { dayOfWeek, startTime, endTime } = req.body;
  if (dayOfWeek === undefined || !startTime || !endTime) return res.status(400).json({ error: "Missing fields" });
  const rec = await prisma.doctorAvailability.create({ data: { doctorId: Number(doctorId), dayOfWeek, startTime, endTime, isActive: true }});
  res.status(201).json(rec);
};

export const addManualSlot = async (req, res) => {
  const { doctorId } = req.params;
  const { availableDate, startTime, endTime } = req.body;
  if (!availableDate || !startTime || !endTime) return res.status(400).json({ error: "Missing" });
  const rec = await prisma.doctorAvailableSlot.create({
    data: { doctorId: Number(doctorId), availableDate: new Date(availableDate), startTime, endTime, source: "manual", isActive:true }
  });
  res.status(201).json(rec);
};

export const getAvailableSlots = async (req, res) => {
  const doctorId = Number(req.params.doctorId);
  const date = req.query.date;
  if (!doctorId || !date) return res.status(400).json({ error: "Missing params" });
  const day = new Date(date).getDay();

  const custom = await prisma.doctorAvailableSlot.findMany({
    where: { doctorId, availableDate: new Date(date), isActive: true },
    orderBy: { startTime: "asc" }
  });

  if (custom.length) {
    return res.json(custom);
  }

  const avail = await prisma.doctorAvailability.findMany({
    where: { doctorId, dayOfWeek: day, isActive: true }
  });

  let slots = [];
  for (const r of avail) {
    slots = slots.concat(generateSlots(r).map(s => ({
      availableDate: date,
      ...s,
      source: "generated",
      isActive: true
    })));
  }

  res.json(slots);
};