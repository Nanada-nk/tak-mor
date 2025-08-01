import express from 'express';
import { createAppointment, getAppointmentsByDoctor } from '../controllers/appointment.controller.js';
const appointmentRouter = express.Router();

appointmentRouter.post("/", createAppointment);

// Get all appointments for a doctor
appointmentRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

export default appointmentRouter;