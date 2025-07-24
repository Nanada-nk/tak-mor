import express from 'express'
import {addManualSlot, getAvailableSlots} from '../controllers/booking.controller.js'

const bookingRouter = express.Router();

bookingRouter.post('/:doctorId/slots', addManualSlot);
bookingRouter.get('/:doctorId/slots', getAvailableSlots);



export default bookingRouter



