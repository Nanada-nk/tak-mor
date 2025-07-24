export function generateSlots(start, end, durationMinutes) {
  const slots = [];
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  let current = new Date(2000, 0, 1, sh, sm);
  const endTime = new Date(2000, 0, 1, eh, em);

  while (current < endTime) {
    const next = new Date(current.getTime() + durationMinutes * 60000);
    if (next > endTime) break;

    const format = (d) => d.toTimeString().slice(0, 5);
    slots.push({ startTime: format(current), endTime: format(next) });

    current = next;
  }

  return slots;
}


