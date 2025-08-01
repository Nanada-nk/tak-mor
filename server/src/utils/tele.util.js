import { v4 as uuidv4 } from 'uuid'

function generateRoomId(appointmentId, options = {}) {
  const prefix = options.prefix || 'room';

  if (
    !appointmentId ||
    (typeof appointmentId !== 'string' && typeof appointmentId !== 'number') ||
    String(appointmentId).trim() === ''
  ) {
    throw new TypeError("'appointmentId' is required and must be a non-empty string or number.");
  }

  const uniqueIdPart = uuidv4();
  return `${prefix}-${appointmentId}-${uniqueIdPart}`;
}

export default generateRoomId;