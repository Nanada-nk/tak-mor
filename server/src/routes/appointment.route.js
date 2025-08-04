import express from 'express';
import { createAppointment, getAppointmentsByDoctor, getDailyAppointments } from '../controllers/appointment.controller.js';
const appointmentRouter = express.Router();

appointmentRouter.post("/", createAppointment);

// Get all appointments for a doctor
appointmentRouter.get("/", getDailyAppointments);
appointmentRouter.get("/doctor/:doctorId", getAppointmentsByDoctor);

export default appointmentRouter;