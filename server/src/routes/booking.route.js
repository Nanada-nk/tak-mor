import express from 'express'
import {addManualSlot, getAvailableSlots, addFixedAvailability} from '../controllers/booking.controller.js'

const bookingRouter = express.Router();


bookingRouter.post("/:doctorId/availability", addFixedAvailability);
bookingRouter.post("/:doctorId/slots", addManualSlot);
bookingRouter.get("/:doctorId/slots", getAvailableSlots);


export default bookingRouter



