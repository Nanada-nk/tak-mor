import express from 'express'
import {addManualSlot, getAvailableSlots, addFixedAvailability, deleteFixedAvailability, deleteManualSlot} from '../controllers/booking.controller.js'

const bookingRouter = express.Router();


bookingRouter.post("/:doctorId/availability", addFixedAvailability);
bookingRouter.post("/:doctorId/slots", addManualSlot);
bookingRouter.get("/:doctorId/slots", getAvailableSlots);

bookingRouter.delete("/fixed-availability/:availabilityId", deleteFixedAvailability);
bookingRouter.delete("/manual-slot/:slotId", deleteManualSlot);

export default bookingRouter



